import type { Experiment, ObjectItem, Version } from '@/types'
import { mockExperiment } from '@/data/mockExperiment'
import { mockObjects } from '@/data/mockObjects'
import { mockVersionsMap } from '@/data/mockMonitor'
import { TICK_INTERVAL_MS, TOTAL_TICKS } from '@/data/simulationConfig'

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

// REST simulation

export async function fetchExperiment(): Promise<Experiment> {
  await delay(1000)
  return { ...mockExperiment }
}

export async function fetchObjects(): Promise<ObjectItem[]> {
  await delay(1000)
  return JSON.parse(JSON.stringify(mockObjects))
}

export async function fetchVersionsMap(): Promise<Record<string, Version[]>> {
  await delay(1000)
  return JSON.parse(JSON.stringify(mockVersionsMap))
}

// SSE-like stream (Option A: client computes, stream only pushes tick signal)

interface StreamHandlers {
  onTick: (tick: number, isLast: boolean) => void
  onComplete: () => void
}

export function subscribeToExperimentStream(handlers: StreamHandlers): () => void {
  let currentTick = 0
  const timerId = setInterval(() => {
    currentTick++
    const isLast = currentTick >= TOTAL_TICKS
    handlers.onTick(currentTick, isLast)
    if (isLast) {
      clearInterval(timerId)
      handlers.onComplete()
    }
  }, TICK_INTERVAL_MS)

  return () => clearInterval(timerId)
}

// Mutations (REST simulation — callers use fire & forget)

export async function stopExperiment(_id: string): Promise<void> {
  await delay(300)
}

export async function rerunExperiment(_id: string): Promise<void> {
  await delay(300)
}

export async function applyVersion(_objectId: string, _versionId: string): Promise<void> {
  await delay(300)
}

export async function revertVersion(_objectId: string): Promise<void> {
  await delay(300)
}
