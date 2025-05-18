"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useHealthData } from "./health-data-provider"
import { motion } from "framer-motion"

const moods = [
  { value: 1, emoji: "😔", label: "Sad" },
  { value: 2, emoji: "😕", label: "Meh" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😁", label: "Great" },
]

export function MoodTracker() {
  const { data, updateMood, moodTheme } = useHealthData()

  const moodDescriptions = {
    1: "Feeling down today. The dashboard has been simplified to be gentle on your eyes and mind.",
    2: "Not the best day? The interface reflects a bit of uncertainty, just like how you might be feeling.",
    3: "Neutral mood detected. The dashboard maintains its standard appearance.",
    4: "You're having a good day! The dashboard is more vibrant to match your positive energy.",
    5: "Fantastic mood! Enjoy an enhanced premium interface that matches your excellent state of mind.",
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <motion.div
              key={data.mood}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-6xl mb-2"
            >
              {moods.find((m) => m.value === data.mood)?.emoji || "😐"}
            </motion.div>
            <p className="text-lg font-medium">{moods.find((m) => m.value === data.mood)?.label || "Neutral"}</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              {moodDescriptions[data.mood as keyof typeof moodDescriptions] || moodDescriptions[3]}
            </p>
          </div>

          <div className="flex justify-between w-full max-w-md">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => updateMood(mood.value)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  data.mood === mood.value ? "bg-primary/20 scale-110" : "hover:bg-muted"
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs mt-1">{mood.label}</span>
              </button>
            ))}
          </div>

          <div className="text-sm text-muted-foreground text-center mt-4">
            <p>Your mood selection affects the entire dashboard appearance!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
