"use client"

import { useHealthData } from "./health-data-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function DetailedStats() {
  const { data, moodTheme } = useHealthData()

  // Prepare weekly data
  const weeklyData = [
    { day: "Mon", heartRate: 75, steps: 9200, sleep: 7.2, mood: 4, water: 6 },
    { day: "Tue", heartRate: 72, steps: 8500, sleep: 6.8, mood: 3, water: 5 },
    { day: "Wed", heartRate: 78, steps: 10200, sleep: 7.5, mood: 5, water: 7 },
    { day: "Thu", heartRate: 70, steps: 7800, sleep: 8.0, mood: 4, water: 8 },
    { day: "Fri", heartRate: 74, steps: 9500, sleep: 7.0, mood: 4, water: 6 },
    { day: "Sat", heartRate: 68, steps: 6500, sleep: 8.5, mood: 5, water: 4 },
    { day: "Sun", heartRate: 71, steps: 7200, sleep: 8.2, mood: 4, water: 5 },
  ]

  // Adjust content based on mood
  const renderMoodSpecificContent = () => {
    if (moodTheme === "sad") {
      return (
        <div className="bg-card rounded-xl shadow-sm p-4 border text-center mb-6">
          <p className="text-muted-foreground">Simplified statistics view. Focus on essential data.</p>
        </div>
      )
    }

    if (moodTheme === "great") {
      return (
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl shadow-md p-6 border-2 mb-6">
          <h2 className="text-xl font-bold mb-2">Premium Statistics Experience</h2>
          <p className="text-muted-foreground">Enhanced data visualization unlocked by your excellent mood!</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="container py-6 space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">Detailed Statistics</h1>

      {renderMoodSpecificContent()}

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6 mt-6">
          <Card className="card">
            <CardHeader>
              <CardTitle>Heart Rate (24 Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.heartRateHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[50, 110]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff6384"
                      strokeWidth={2}
                      name="BPM"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader>
              <CardTitle>Steps (24 Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.stepsHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#36a2eb" name="Steps" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6 mt-6">
          <Card className="card">
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="heartRate"
                      stroke="#ff6384"
                      fill="#ff638420"
                      name="Heart Rate (BPM)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="sleep"
                      stroke="#9966ff"
                      fill="#9966ff20"
                      name="Sleep (hours)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dashboard-content">
            <Card className="card">
              <CardHeader>
                <CardTitle>Weekly Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="steps" fill="#36a2eb" name="Steps" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>Weekly Mood & Water</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#ffcd56"
                        strokeWidth={2}
                        name="Mood"
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="water"
                        stroke="#4bc0c0"
                        strokeWidth={2}
                        name="Water (cups)"
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
