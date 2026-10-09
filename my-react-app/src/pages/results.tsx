import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, FileSearch } from 'lucide-react'
import JellyRadio from '@/components/bits/jellyradio'
import CountUp from '@/components/bits/countup'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { gradePoint, results } from '@/data/portal'
import { cn } from '@/lib/utils'

const sems = Object.keys(results) as (keyof typeof results)[]
const published: Record<string, string> = { S6: 'Aug 2026', S5: 'Feb 2026', S4: 'Aug 2025', S3: 'Mar 2025' }

export default function Results() {
  const [sem, setSem] = useState<string>(sems[0])
  const rows = results[sem]
  const credits = rows.reduce((a, r) => a + r.credits, 0)
  const sgpa = rows.reduce((a, r) => a + r.credits * gradePoint[r.grade], 0) / credits
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Exam results</h1>
          <p className="text-sm text-muted-foreground">B.Tech regular exams, grades as published by the university</p>
        </div>
        <JellyRadio items={sems} value={sem} onChange={setSem} size="sm" chipColor="#f4f4f5" activeColor="#e4e4e7" textColor="#71717a" activeTextColor="#09090b" ariaLabel="Semester" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="gap-1 px-5 py-5">
          <span className="text-sm text-muted-foreground">SGPA</span>
          <CountUp key={sem} to={Number(sgpa.toFixed(2))} className="text-2xl font-semibold tabular-nums" />
        </Card>
        <Card className="gap-1 px-5 py-5">
          <span className="text-sm text-muted-foreground">Credits</span>
          <span className="text-2xl font-semibold tabular-nums">{credits}</span>
        </Card>
        <Card className="gap-1 px-5 py-5">
          <span className="text-sm text-muted-foreground">Published</span>
          <span className="text-2xl font-semibold">{published[sem]}</span>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle>{sem} grade card</CardTitle>
            <CardDescription>{rows.length} courses, {rows.some(r => r.grade === 'F') ? `${rows.filter(r => r.grade === 'F').length} failed` : 'all passed'}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><FileSearch />Apply for revaluation</Button>
            <Button size="sm"><Download />Download PDF</Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div key={sem} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map(r => (
                    <TableRow key={r.code}>
                      <TableCell className="text-muted-foreground">{r.code}</TableCell>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-right tabular-nums">{r.credits}</TableCell>
                      <TableCell className="text-right"><span className={cn('inline-flex h-7 min-w-9 items-center justify-center rounded-md border px-1.5 font-mono text-xs font-semibold', r.grade === 'F' ? 'border-destructive text-destructive' : r.grade === 'S' ? 'border-foreground' : 'text-muted-foreground')}>{r.grade}</span></TableCell>
                      <TableCell className="text-right tabular-nums">{gradePoint[r.grade]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">Revaluation and answer script copy requests close 10 days after a result is published. The fee is Rs 500 per paper.</p>
    </div>
  )
}
