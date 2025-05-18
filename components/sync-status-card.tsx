"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useHealthData } from "./health-data-provider"
import { motion } from "framer-motion"

interface SyncStatusCardProps {
  lastSync: Date
  syncing: boolean
}

export function SyncStatusCard({ lastSync, syncing }: SyncStatusCardProps) {
  const { syncDevice } = useHealthData()

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins === 1) return "1 minute ago"
    if (diffMins < 60) return `${diffMins} minutes ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours === 1) return "1 hour ago"
    if (diffHours < 24) return `${diffHours} hours ago`

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return "1 day ago"
    return `${diffDays} days ago`
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="flex items-center">
          <motion.div
            animate={{ rotate: syncing ? 360 : 0 }}
            transition={{ duration: 2, repeat: syncing ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
          </motion.div>
          Device Sync Status
        </CardTitle>
        <CardDescription>Last synced: {formatTimeAgo(lastSync)}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${syncing ? "bg-green-500" : "bg-amber-500"}`}></div>
            <span className="text-sm font-medium">{syncing ? "Syncing in progress..." : "Ready to sync"}</span>
          </div>

          <Button onClick={syncDevice} disabled={syncing} variant="outline" className="w-full">
            {syncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
