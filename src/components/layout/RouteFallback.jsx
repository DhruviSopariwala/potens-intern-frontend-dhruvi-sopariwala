import { Skeleton } from '@/components/ui/Skeleton'
import { Page } from './Page'
import { Stack } from './Stack'

export function RouteFallback() {
  return (
    <Page aria-busy="true" aria-label="Loading">
      <Stack gap="lg">
        <div className="space-y-2.5">
          <Skeleton className="h-8 w-3/4 max-w-xs" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-3 w-5/6 max-w-sm" />
        </div>
        <Stack gap="sm">
          <Skeleton className="h-[4.5rem] w-full" />
          <Skeleton className="h-[4.5rem] w-full" />
          <Skeleton className="h-[4.5rem] w-full" />
        </Stack>
      </Stack>
    </Page>
  )
}
