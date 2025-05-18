"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useHealthData } from "./health-data-provider"
import { Droplets, Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"

export function WaterTracker() {
  const { data, updateWater } = useHealthData()
  const maxCups = 8

  const handleIncrease = () => {
    if (data.water < maxCups) {
      updateWater(data.water + 1)
    }
  }

  const handleDecrease = () => {
    if (data.water > 0) {
      updateWater(data.water - 1)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplets className="mr-2 h-5 w-5 text-cyan-500" />
          Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-32 h-40 border-2 border-cyan-500 rounded-b-xl rounded-t-sm">
            <motion.div
              className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-b-lg"
              initial={{ height: 0 }}
              animate={{ height: `${(data.water / maxCups) * 100}%` }}
              transition={{ duration: 0.5 }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold">{data.water}</span>
                <span className="text-sm block">of {maxCups} cups</span>
              </div>
            </div>

            {/* Cup markings */}
            {Array.from({ length: maxCups }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-0.5 bg-cyan-200 left-0"
                style={{ bottom: `${(i / maxCups) * 100}%` }}
              />
            ))}
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" size="icon" onClick={handleDecrease} disabled={data.water <= 0}>
              <Minus className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              onClick={handleIncrease}
              disabled={data.water >= maxCups}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Cup
            </Button>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            <p>
              Daily goal: {maxCups} cups ({data.water * 250}ml / {maxCups * 250}ml)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
