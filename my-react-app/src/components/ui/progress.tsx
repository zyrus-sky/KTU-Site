import { cn } from '@/lib/utils'

export function Progress({ value, className, barClassName }: { value: number; className?: string; barClassName?: string }) {
  return (
    <div data-slot="progress" className={cn('bg-primary/10 relative h-2 w-full overflow-hidden rounded-full', className)}>
      <div className={cn('bg-primary h-full rounded-full transition-all duration-700', barClassName)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}
