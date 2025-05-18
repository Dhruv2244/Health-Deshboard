"use client"

import type React from "react"

import { useHealthData } from "./health-data-provider"

export function MoodThemeWrapper({ children }: { children: React.ReactNode }) {
  const { moodTheme } = useHealthData()

  return <div className={`mood-${moodTheme} transition-all duration-500`}>{children}</div>
}
