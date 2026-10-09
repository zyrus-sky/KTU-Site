import { useState } from 'react'
import { Check, CheckCircle2, Clock, Download, MapPin, Users } from 'lucide-react'
import JellyRadio from '@/components/bits/jellyradio'
import SpotlightCard from '@/components/bits/spotlightcard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { backlogs, examSchedule, members, pyqSessions, student, subjects, today } from '@/data/portal'

const courses = [...subjects.map(s => ({ code: s.code, name: s.name, backlog: false, sem: student.semester })), ...backlogs.map(b => ({ ...b, backlog: true }))]

const steps = [
  { label: 'Internal marks uploaded', done: true },
  { label: 'Course registration approved by HOD', done: true },
  { label: 'Exam fee paid (Rs 1,350)', done: false },
  { label: 'Hall ticket issued', done: false },
]

const rules = [
  'Report to the hall 30 minutes before the exam. FN starts at 9:30 AM, AN at 1:30 PM.',
  'Bring the printed hall ticket and your college ID card.',
  'Non-programmable calculators are allowed. Phones and smart watches are not.',
  'Late entry is allowed only in the first 30 minutes.',
]

export default function Examination() {
  const regOpen = new Date('2026-10-14')
  const daysToReg = Math.ceil((regOpen.getTime() - today.getTime()) / 86400000)
  const [kind, setKind] = useState<'notes' | 'pyq'>('notes')
  const [got, setGot] = useState(new Set<string>())
  const [joined, setJoined] = useState(new Set<string>())
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Examination</h1>
        <p className="text-sm text-muted-foreground">B.Tech {student.semester} (R) December 2026, {student.scheme}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <SpotlightCard theme="light" className="rounded-xl! p-5!">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="size-4" />Registration</div>
          <div className="mt-2 text-xl font-semibold">Opens in {daysToReg} days</div>
          <p className="mt-1 text-sm text-muted-foreground">Oct 14 to Nov 6. Late fee after that.</p>
        </SpotlightCard>
        <SpotlightCard theme="light" className="rounded-xl! p-5!">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Download className="size-4" />Hall ticket</div>
          <div className="mt-2 text-xl font-semibold">From Nov 25</div>
          <Button variant="outline" size="sm" className="mt-2" disabled>Download</Button>
        </SpotlightCard>
        <SpotlightCard theme="light" className="rounded-xl! p-5!">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" />Exam centre</div>
          <div className="mt-2 text-xl font-semibold">Own college</div>
          <p className="mt-1 text-sm text-muted-foreground">{student.college}</p>
        </SpotlightCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Timetable</CardTitle>
            <CardDescription>Provisional, may change after registration closes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Session</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examSchedule.map(e => (
                  <TableRow key={e.code}>
                    <TableCell className="tabular-nums">{new Date(e.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</TableCell>
                    <TableCell><span className="text-muted-foreground">{e.code}</span> <span className="font-medium">{e.name}</span></TableCell>
                    <TableCell className="text-right"><Badge variant="outline">{e.session}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {steps.map(s => (
                <div key={s.label} className="flex items-center gap-3 text-sm">
                  {s.done ? <CheckCircle2 className="size-4" /> : <span className="size-4 rounded-full border-2 border-dashed border-muted-foreground/40" />}
                  <span className={s.done ? '' : 'text-muted-foreground'}>{s.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>On exam day</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                {rules.map(r => <li key={r}>{r}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle>Notes and question papers</CardTitle>
            <CardDescription>For your {student.semester} courses and backlogs</CardDescription>
          </div>
          <JellyRadio items={[{ value: 'notes', label: 'Notes' }, { value: 'pyq', label: 'PYQ' }]} value={kind} onChange={v => setKind(v as 'notes' | 'pyq')} size="sm" chipColor="#f4f4f5" activeColor="#e4e4e7" textColor="#71717a" activeTextColor="#09090b" ariaLabel="Material" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {courses.map(c => (
                <TableRow key={c.code}>
                  <TableCell className="w-20 text-muted-foreground">{c.code}</TableCell>
                  <TableCell className="whitespace-normal">
                    {c.name}
                    {c.backlog && <span className="ml-2 text-xs text-destructive">backlog, {c.sem}</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {(kind === 'notes' ? ['M1', 'M2', 'M3', 'M4', 'M5'] : pyqSessions).map(f => {
                        const id = `${kind}-${c.code}-${f}`
                        return (
                          <Button key={f} variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => setGot(g => new Set(g).add(id))}>
                            {got.has(id) ? <Check /> : <Download />}{f}
                          </Button>
                        )
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Course communities</CardTitle>
          <CardDescription>Each group has the students from KTU colleges taking the same course this semester</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {courses.map(c => {
            const on = joined.has(c.code)
            return (
              <div key={c.code} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{c.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="size-3" />{members[c.code] + (on ? 1 : 0)} students{c.backlog && ', supply batch'}</div>
                </div>
                <Button size="sm" variant={on ? 'outline' : 'default'} onClick={() => setJoined(j => { const n = new Set(j); if (on) n.delete(c.code); else n.add(c.code); return n })}>
                  {on ? 'Leave' : 'Join'}
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
