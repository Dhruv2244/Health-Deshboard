import { Skeleton } from "@/components/ui/skeleton"

export function DetailedStatsSkeleton() {
  return (
    <div className="container py-6 space-y-8">
      <Skeleton className="h-10 w-64" />

      <Skeleton className="h-10 w-full max-w-md" />

      <Skeleton className="h-96 w-full rounded-xl" />

      <Skeleton className="h-96 w-full rounded-xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  )
}
