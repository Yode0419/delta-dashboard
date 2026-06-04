import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Experiment } from '@/types'

const emptyExperiment: Experiment = { id: '', name: '', status: 'running', progress: 0, duration: 0 }

export const useExperimentStore = defineStore('experiment', () => {
  const experiment = ref<Experiment>({ ...emptyExperiment })
  let _base: Experiment = { ...emptyExperiment }

  function hydrate(data: Experiment) {
    _base = { ...data }
    experiment.value = { ...data }
  }

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
    experiment.value = { ..._base, status: 'running', progress: 0, duration: 0 }
  }

  return {
    experiment,
    hydrate,
    stop,
    complete,
    tickDuration,
    tickProgress,
    reset,
  }
})
