import { useState } from 'react'
import { motion } from 'motion/react'
import { RefreshCw } from 'lucide-react'
import JellyRadio from '@/components/bits/jellyradio'
import CountUp from '@/components/bits/countup'
import SpotlightCard from '@/components/bits/spotlightcard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { subjects } from '@/data/portal'
import { cn } from '@/lib/utils'

type Limit = '75' | '80' | '85'

const verdict = (attended: number, total: number, limit: number) => {
  const p = limit / 100
  if (attended / total >= p) {
    const skip = Math.floor((attended - p * total) / p)
    return { ok: true, n: skip, text: skip === 0 ? 'On the line, do not miss the next class' : `You can miss ${skip} more ${skip === 1 ? 'class' : 'classes'}` }
  }
  const need = Math.ceil((p * total - attended) / (1 - p))
  return { ok: false, n: need, text: `Attend the next ${need} ${need === 1 ? 'class' : 'classes'} to get back to ${limit}%` }
}

export default function EzygoView() {
  const [limit, setLimit] = useState<Limit>('75')
  const att = subjects.reduce((a, s) => a + s.attended, 0)
  const tot = subjects.reduce((a, s) => a + s.total, 0)
  const overall = (att / tot) * 100
  const short = subjects.filter(s => (s.attended / s.total) * 100 < Number(limit)).length
  return (
    <div className="space-y-6">
      <Card className="flex-col gap-6 px-6 sm:flex-row sm:items-center">
        <div className="w-40 shrink-0">
          <div className="text-4xl font-semibold tabular-nums"><CountUp to={Number(overall.toFixed(1))} />%</div>
          <div className="text-xs text-muted-foreground">overall</div>
          <Progress value={overall} className="mt-3" barClassName={overall < Number(limit) ? 'bg-destructive' : ''} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Ezygo attendance</h2>
            <Badge variant="outline">Synced 9:40 AM</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{att} of {tot} hours attended across {subjects.length} courses. {short === 0 ? 'Every course is above the limit.' : `${short} ${short === 1 ? 'course is' : 'courses are'} below ${limit}%.`}</p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <span className="text-sm text-muted-foreground">Minimum</span>
            <JellyRadio size="sm" value={limit} onChange={v => setLimit(v as Limit)} items={[{ value: '75', label: '75%' }, { value: '80', label: '80%' }, { value: '85', label: '85%' }]} chipColor="#f4f4f5" activeColor="#e4e4e7" textColor="#71717a" activeTextColor="#09090b" ariaLabel="Minimum attendance" />
            <Button variant="ghost" size="sm" className="ml-auto"><RefreshCw />Refresh</Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {subjects.map((s, i) => {
          const pct = (s.attended / s.total) * 100
          const v = verdict(s.attended, s.total, Number(limit))
          return (
            <motion.div key={s.code} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <SpotlightCard theme="light" className="h-full rounded-xl! p-5!">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{s.code}</div>
                    <div className="truncate font-medium">{s.name}</div>
                  </div>
                  <span className={cn('text-xl font-semibold tabular-nums', !v.ok && 'text-destructive')}>{pct.toFixed(0)}%</span>
                </div>
                <Progress value={pct} className="mt-4" barClassName={v.ok ? '' : 'bg-destructive'} />
                <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                  <span className="text-muted-foreground tabular-nums">{s.attended}/{s.total} hours</span>
                  <span className={cn('tabular-nums', v.ok ? 'text-muted-foreground' : 'text-destructive')}>{v.ok ? `${v.n} spare` : `${v.n} short`}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
              </SpotlightCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
