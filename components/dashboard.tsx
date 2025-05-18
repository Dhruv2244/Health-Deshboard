"use client"

import { useHealthData } from "./health-data-provider"
import { SyncStatusCard } from "./sync-status-card"
import { MetricCard } from "./metric-card"
import { MoodTracker } from "./mood-tracker"
import { WaterTracker } from "./water-tracker"
import { GraphOverlay } from "./graph-overlay"
import { useState } from "react"
import { Heart, Footprints, Moon, Droplets } from "lucide-react"

export default function Dashboard() {
  const { data, moodTheme } = useHealthData()
  const [showOverlay, setShowOverlay] = useState(false)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])

  const toggleMetric = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))

    if (!showOverlay && !selectedMetrics.includes(metric)) {
      setShowOverlay(true)
    }

    if (selectedMetrics.length === 1 && selectedMetrics.includes(metric)) {
      setShowOverlay(false)
    }
  }

  // Adjust content based on mood
  const renderMoodSpecificContent = () => {
    if (moodTheme === "sad") {
      return (
        <div className="bg-card rounded-xl shadow-sm p-4 border text-center mb-6">
          <p className="text-muted-foreground">Simplified view active. Focus on what matters.</p>
        </div>
      )
    }

    if (moodTheme === "great") {
      return (
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl shadow-md p-6 border-2 mb-6">
          <h2 className="text-xl font-bold mb-2">Premium Dashboard Experience</h2>
          <p className="text-muted-foreground">Your excellent mood has unlocked enhanced visuals and features!</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="container py-6 space-y-8 animate-fade-in">
      {renderMoodSpecificContent()}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SyncStatusCard lastSync={data.lastSync} syncing={data.syncing} />

        <div className="md:col-span-2 bg-card rounded-xl shadow-md p-6 border">
          <h2 className="text-xl font-semibold mb-4">Today's Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-muted-foreground text-sm">Heart Rate</p>
              <p className="text-2xl font-bold">{data.heartRate}</p>
              <p className="text-xs text-muted-foreground">BPM</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Steps</p>
              <p className="text-2xl font-bold">{data.steps.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">steps</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Sleep</p>
              <p className="text-2xl font-bold">{data.sleep}</p>
              <p className="text-xs text-muted-foreground">hours</p>
            </div>
          </div>
        </div>
      </div>

      {showOverlay && selectedMetrics.length > 0 && (
        <GraphOverlay
          metrics={selectedMetrics}
          data={data}
          onClose={() => {
            setShowOverlay(false)
            setSelectedMetrics([])
          }}
        />
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dashboard-content`}>
        <MetricCard
          title="Heart Rate"
          value={`${data.heartRate} BPM`}
          data={data.heartRateHistory}
          dataKey="value"
          color="#ff6384"
          icon={<Heart className="h-5 w-5" />}
          isSelected={selectedMetrics.includes("heartRate")}
          onToggleSelect={() => toggleMetric("heartRate")}
        />

        <MetricCard
          title="Steps"
          value={data.steps.toLocaleString()}
          data={data.stepsHistory}
          dataKey="value"
          color="#36a2eb"
          icon={<Footprints className="h-5 w-5" />}
          isSelected={selectedMetrics.includes("steps")}
          onToggleSelect={() => toggleMetric("steps")}
        />

        <MetricCard
          title="Sleep"
          value={`${data.sleep} hrs`}
          data={data.sleepHistory}
          dataKey="value"
          color="#9966ff"
          icon={<Moon className="h-5 w-5" />}
          isSelected={selectedMetrics.includes("sleep")}
          onToggleSelect={() => toggleMetric("sleep")}
        />

        <MetricCard
          title="Water"
          value={`${data.water} cups`}
          data={data.waterHistory}
          dataKey="value"
          color="#4bc0c0"
          icon={<Droplets className="h-5 w-5" />}
          isSelected={selectedMetrics.includes("water")}
          onToggleSelect={() => toggleMetric("water")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoodTracker />
        <WaterTracker />
      </div>
    </div>
  )
}
