"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type HealthData = {
  heartRate: number
  heartRateHistory: { time: string; value: number }[]
  steps: number
  stepsHistory: { time: string; value: number }[]
  sleep: number
  sleepHistory: { time: string; value: number }[]
  mood: number
  moodHistory: { time: string; value: number }[]
  water: number
  waterHistory: { time: string; value: number }[]
  lastSync: Date
  syncing: boolean
}

type HealthDataContextType = {
  data: HealthData
  updateMood: (value: number) => void
  updateWater: (value: number) => void
  syncDevice: () => void
  resetData: () => void
  moodTheme: string
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined)

const generateRandomHistory = (min: number, max: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const hour = i % 24
    const time = `${hour.toString().padStart(2, "0")}:00`
    const value = Math.floor(Math.random() * (max - min + 1)) + min
    return { time, value }
  })
}

const initialHealthData: HealthData = {
  heartRate: 72,
  heartRateHistory: generateRandomHistory(60, 100, 24),
  steps: 8432,
  stepsHistory: generateRandomHistory(0, 1000, 24),
  sleep: 7.5,
  sleepHistory: generateRandomHistory(0, 10, 7),
  mood: 4,
  moodHistory: generateRandomHistory(1, 5, 7),
  water: 5,
  waterHistory: generateRandomHistory(0, 8, 7),
  lastSync: new Date(),
  syncing: false,
}

export function HealthDataProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [data, setData] = useState<HealthData>(initialHealthData)
  const [moodTheme, setMoodTheme] = useState<string>("neutral")

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + Math.floor(Math.random() * 5) - 2)),
        steps: prev.steps + Math.floor(Math.random() * 10),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const updateMood = (value: number) => {
    // Map mood value to theme name
    const moodThemeMap: Record<number, string> = {
      1: "sad",
      2: "meh",
      3: "neutral",
      4: "good",
      5: "great",
    }

    setMoodTheme(moodThemeMap[value] || "neutral")

    setData((prev) => ({
      ...prev,
      mood: value,
      moodHistory: [{ time: new Date().toLocaleTimeString(), value }, ...prev.moodHistory.slice(0, 6)],
    }))
  }

  const updateWater = (value: number) => {
    setData((prev) => ({
      ...prev,
      water: value,
      waterHistory: [{ time: new Date().toLocaleTimeString(), value }, ...prev.waterHistory.slice(0, 6)],
    }))
  }

  const syncDevice = () => {
    setData((prev) => ({ ...prev, syncing: true }))

    // Simulate sync delay
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        syncing: false,
        lastSync: new Date(),
        heartRate: Math.floor(Math.random() * (90 - 65) + 65),
        steps: prev.steps + Math.floor(Math.random() * 500),
        sleep: Math.random() * (8.5 - 6.5) + 6.5,
        heartRateHistory: generateRandomHistory(60, 100, 24),
        stepsHistory: [...prev.stepsHistory.slice(0, 23), { time: "23:00", value: Math.floor(Math.random() * 1000) }],
        sleepHistory: [
          ...prev.sleepHistory.slice(0, 6),
          { time: new Date().toLocaleDateString(), value: Math.random() * (8.5 - 6.5) + 6.5 },
        ],
      }))
    }, 2000)
  }

  const resetData = () => {
    setData(initialHealthData)
    setMoodTheme("neutral")
  }

  return (
    <HealthDataContext.Provider value={{ data, updateMood, updateWater, syncDevice, resetData, moodTheme }}>
      {children}
    </HealthDataContext.Provider>
  )
}

export function useHealthData() {
  const context = useContext(HealthDataContext)
  if (context === undefined) {
    throw new Error("useHealthData must be used within a HealthDataProvider")
  }
  return context
}
