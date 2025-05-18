"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  data: any[]
  dataKey: string
  color: string
  icon: React.ReactNode
  isSelected: boolean
  onToggleSelect: () => void
}

export function MetricCard({ title, value, data, dataKey, color, icon, isSelected, onToggleSelect }: MetricCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-200 metric-card ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onToggleSelect} className="h-8 w-8">
          {isSelected ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mt-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-2xl font-bold">{value}</div>
          </motion.div>

          <div className="h-32 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  fillOpacity={1}
                  fill={`url(#color${title})`}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
