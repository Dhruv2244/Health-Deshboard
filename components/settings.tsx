"use client"

import { useHealthData } from "./health-data-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { ModeToggle } from "./mode-toggle"
import { RefreshCw, RotateCcw, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function Settings() {
  const { data, syncDevice, resetData, moodTheme } = useHealthData()
  const [notifications, setNotifications] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [syncInterval, setSyncInterval] = useState(30)

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleResetData = () => {
    resetData()
    toast({
      title: "Data reset",
      description: "All your health data has been reset to default values.",
    })
  }

  // Adjust content based on mood
  const renderMoodSpecificContent = () => {
    if (moodTheme === "sad") {
      return (
        <div className="bg-card rounded-xl shadow-sm p-4 border text-center mb-6">
          <p className="text-muted-foreground">Essential settings only. Simplified for clarity.</p>
        </div>
      )
    }

    if (moodTheme === "great") {
      return (
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl shadow-md p-6 border-2 mb-6">
          <h2 className="text-xl font-bold mb-2">Premium Settings Experience</h2>
          <p className="text-muted-foreground">Enhanced configuration options available in your excellent mood!</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="container py-6 space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">Settings</h1>

      {renderMoodSpecificContent()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dashboard-content">
        <Card className="card">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the dashboard looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Theme</Label>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts about your health metrics</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
            <CardDescription>Manage device synchronization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-sync">Auto Sync</Label>
                <p className="text-sm text-muted-foreground">Automatically sync with your device</p>
              </div>
              <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
            </div>

            {autoSync && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                  <span className="text-sm font-medium">{syncInterval}</span>
                </div>
                <Slider
                  id="sync-interval"
                  min={5}
                  max={60}
                  step={5}
                  value={[syncInterval]}
                  onValueChange={(value) => setSyncInterval(value[0])}
                />
              </div>
            )}

            <div className="pt-2">
              <Button onClick={syncDevice} disabled={data.syncing} className="w-full">
                {data.syncing ? (
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
          <CardFooter className="text-xs text-muted-foreground">
            Last synced: {data.lastSync.toLocaleString()}
          </CardFooter>
        </Card>

        <Card className="card">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your health data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="destructive" onClick={handleResetData} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset All Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
