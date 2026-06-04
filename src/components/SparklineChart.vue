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

const chartData = computed(() => {
  const data = [...props.history]
  const len = data.length
  const labels = data.map((_, i) => i)

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
        pointBackgroundColor: lineColor.value,
      },
      {
        data: Array(len).fill(props.warningThreshold),
        borderColor: '#e6a23c',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
      {
        data: Array(len).fill(props.criticalThreshold),
        borderColor: '#f56c6c',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
    ],
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false as const,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { parsed: { y: number | null } }) =>
          `${ctx.parsed.y ?? ''} ${props.unit ?? ''}`.trim(),
      },
    },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
}
</script>

<template>
  <div class="sparkline-wrapper">
    <Line v-if="history.length > 0" :data="chartData" :options="options" />
  </div>
</template>

<style scoped>
.sparkline-wrapper {
  height: 80px;
}
</style>
