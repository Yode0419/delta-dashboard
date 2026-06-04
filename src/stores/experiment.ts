import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Experiment } from '@/types'
import { mockExperiment } from '@/data/mock'

export const useExperimentStore = defineStore('experiment', () => {
  const experiment = ref<Experiment>({ ...mockExperiment })

  function stop() {
    experiment.value.status = 'stopped'
  }

  function complete() {
    experiment.value.status = 'completed'
  }

  function tickDuration() {
    experiment.value.duration++
  }

  function tickProgress(tick: number, totalTicks: number) {
    experiment.value.progress = Math.round((tick / totalTicks) * 100)
  }

  function reset() {
    experiment.value = { ...mockExperiment, status: 'running', progress: 0, duration: 0 }
  }

  return {
    experiment,
    stop,
    complete,
    tickDuration,
    tickProgress,
    reset,
  }
})
