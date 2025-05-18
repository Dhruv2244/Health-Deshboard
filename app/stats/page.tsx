import { Suspense } from "react"
import DetailedStats from "@/components/detailed-stats"
import { DetailedStatsSkeleton } from "@/components/detailed-stats-skeleton"

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<DetailedStatsSkeleton />}>
        <DetailedStats />
      </Suspense>
    </main>
  )
}
