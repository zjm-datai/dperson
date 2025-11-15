'use client'

import { create } from "zustand"

import { defaultSystemFeatures } from '@/types/feature'
import type { SystemFeatures } from "@/types/feature"

type GlobalPublicStore = {
  isGlobalPending: boolean
  setIsGlobalPending: (isPending: boolean) => void
  systemFeatures: SystemFeatures
  setSystemFeatures: (systemFeatures: SystemFeatures) => void
}


export const useGlobalPublicStore = create<GlobalPublicStore>(set => ({
    isGlobalPending: true,
    setIsGlobalPending: (isPending: boolean) => set(() => ({ isGlobalPending: isPending })),
    systemFeatures: defaultSystemFeatures,
    setSystemFeatures: (systemFeatures: SystemFeatures) => set(() => ({ systemFeatures })),
}))