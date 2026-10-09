import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import CometDial from '@/components/bits/cometdial'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { timeline, today } from '@/data/portal'
import { cn } from '@/lib/utils'
import UniversityView from './universityview'
import StudentView from './studentview'
import EzygoView from './ezygoview'

const heads = {
  university: 'University',
  student: 'Student',
  ezygo: 'Attendance',
}

const start = new Date(timeline[0].date).getTime()
const WEEK = 7 * 86400000
const weekOf = (d: string | Date) => Math.floor((new Date(d).getTime() - start) / WEEK) + 1
const fmt = (t: number) => new Date(t).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

export default function Home({ view }: { view: keyof typeof heads }) {
  const [week, setWeek] = useState(weekOf(today))
  const last = weekOf(timeline[timeline.length - 1].date)
  const from = start + (week - 1) * WEEK
  const next = timeline.find(e => weekOf(e.date) >= week)
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <h1 className="mb-5 text-2xl font-semibold tracking-tight">{heads[view]}</h1>
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            {view === 'university' && <UniversityView />}
            {view === 'student' && <StudentView />}
            {view === 'ezygo' && <EzygoView />}
          </motion.div>
        </AnimatePresence>
      </div>
      <Card className="h-fit xl:sticky xl:top-22">
        <CardHeader>
          <CardTitle>Academic timeline</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CometDial value={week} min={1} max={last} step={1} unit="" label="Semester week" size={210} accent="#18181b" ink="#18181b" onChange={setWeek} />
          <p className="mt-1 text-sm text-muted-foreground">Week {week}, {fmt(from)} to {fmt(from + WEEK - 86400000)}</p>
          <div className="mt-5 w-full space-y-0.5">
            {timeline.map(e => {
              const w = weekOf(e.date)
              return (
                <button key={e.date} type="button" onClick={() => setWeek(w)} className={cn('flex w-full items-start justify-between gap-3 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted', w < week && 'text-muted-foreground', e === next && 'bg-muted')}>
                  <span>
                    {e.title}
                    {e === next && <span className="block text-xs text-muted-foreground">{e.note}</span>}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{fmt(new Date(e.date).getTime())}</span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
