<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  type Plugin,
} from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip)

const props = defineProps<{
  history: number[]
  warningThreshold: number
  criticalThreshold: number
  unit?: string
}>()

const lineColor = computed(() => {
  const last = props.history.at(-1)
  if (last === undefined) return '#43a43c'
  if (last >= props.criticalThreshold) return '#f56c6c'
  if (last >= props.warningThreshold) return '#e6a23c'
  return '#43a43c'
})

const WINDOW = 10
const TICK_S = 1

function toMmSs(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const chartData = computed(() => {
  const full = props.history
  const data = full.slice(-WINDOW)
  const len = data.length
  const startTick = Math.max(0, full.length - WINDOW)
  const labels = data.map((_, i) => toMmSs((startTick + i) * TICK_S))

  return {
    labels,
    datasets: [
      {
        data,
        borderColor: lineColor.value,
        backgroundColor: lineColor.value + '26',
        borderWidth: 1.5,
        fill: true,
        tension: 0.3,
        pointRadius: data.map((_, i) => (i === len - 1 ? 3 : 0)),
        pointHoverRadius: 4,
        pointBackgroundColor: lineColor.value,
      },
      {
        data: Array(len).fill(props.warningThreshold),
        borderColor: '#e6a23c',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
      },
      {
        data: Array(len).fill(props.criticalThreshold),
        borderColor: '#f56c6c',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
      },
    ],
  }
})

const crosshairPlugin: Plugin<'line'> = {
  id: 'crosshair',
  afterDraw(chart) {
    const active = chart.tooltip?.getActiveElements()
    if (!active?.length) return

    const ctx = chart.ctx
    const yScale = chart.scales['y']
    if (!yScale) return
    const x = active[0]!.element.x
    const topY = yScale.top
    const bottomY = yScale.bottom
    const idx = active[0]!.index
    const value = chart.data.datasets[0]?.data[idx] as number | null
    if (value == null) return

    // vertical line
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, topY)
    ctx.lineTo(x, bottomY)
    ctx.lineWidth = 1
    ctx.strokeStyle = '#909399'
    ctx.setLineDash([3, 3])
    ctx.stroke()

    // value label above the line
    const unit = props.unit ? ` ${props.unit}` : ''
    const label = `${value}${unit}`
    ctx.font = '10px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    const padding = 4
    const textWidth = ctx.measureText(label).width
    const boxW = textWidth + padding * 2
    const boxH = 14
    const labelX = Math.min(Math.max(x, boxW / 2), chart.width - boxW / 2)
    const labelY = topY - 2

    ctx.fillStyle = '#303133'
    ctx.beginPath()
    ctx.roundRect(labelX - boxW / 2, labelY - boxH, boxW, boxH, 3)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.fillText(label, labelX, labelY - 1)
    ctx.restore()
  },
}

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false as const,
  layout: { padding: { top: 20 } },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: {
      display: true,
      ticks: {
        color: '#606266',
        font: { size: 9 },
        maxRotation: 0,
      },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      display: true,
      position: 'right' as const,
      ticks: {
        color: '#606266',
        font: { size: 9 },
        maxTicksLimit: 3,
        callback: (v: unknown) => String(v),
      },
      grid: { display: false },
      border: { display: false },
    },
  },
}))
</script>

<template>
  <div class="sparkline-wrapper">
    <Line v-if="history.length > 0" :data="chartData" :options="options" :plugins="[crosshairPlugin]" />
  </div>
</template>

<style scoped>
.sparkline-wrapper {
  height: 96px;
}
</style>
