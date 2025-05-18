"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { motion } from "framer-motion"

interface GraphOverlayProps {
  metrics: string[]
  data: any
  onClose: () => void
}

export function GraphOverlay({ metrics, data, onClose }: GraphOverlayProps) {
  // Map metric names to their data and properties
  const metricMap = {
    heartRate: {
      data: data.heartRateHistory,
      color: "#ff6384",
      name: "Heart Rate (BPM)",
      dataKey: "value",
    },
    steps: {
      data: data.stepsHistory,
      color: "#36a2eb",
      name: "Steps",
      dataKey: "value",
    },
    sleep: {
      data: data.sleepHistory,
      color: "#9966ff",
      name: "Sleep (hours)",
      dataKey: "value",
    },
    water: {
      data: data.waterHistory,
      color: "#4bc0c0",
      name: "Water (cups)",
      dataKey: "value",
    },
  }

  // Prepare combined data for the selected metrics
  const combinedData = metrics.map((metric) => {
    const metricInfo = metricMap[metric as keyof typeof metricMap]
    return {
      name: metricInfo.name,
      data: metricInfo.data,
      color: metricInfo.color,
      dataKey: metricInfo.dataKey,
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <CardTitle>Metric Comparison</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="ml-auto">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <XAxis dataKey="time" allowDuplicatedCategory={false} />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />

                {combinedData.map((item, index) => (
                  <Line
                    key={item.name}
                    yAxisId={index === 0 ? "left" : "right"}
                    data={item.data}
                    name={item.name}
                    type="monotone"
                    dataKey={item.dataKey}
                    stroke={item.color}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>Select multiple metrics from the dashboard cards to compare them</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
