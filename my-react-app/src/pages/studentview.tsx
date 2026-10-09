import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import CountUp from '@/components/bits/countup'
import SpotlightCard from '@/components/bits/spotlightcard'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { sgpa, student, subjects } from '@/data/portal'

export default function StudentView() {
  return (
    <div className="space-y-6">
      <Card className="flex-row items-center gap-5 px-6">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold">{student.name[0]}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{student.name}</h2>
            <Badge variant="secondary">{student.semester}</Badge>
            <Badge variant="outline">{student.scheme}</Badge>
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">{student.regNo}, {student.branch}, {student.college}</p>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SpotlightCard theme="light" className="rounded-xl! p-5!">
          <div className="text-sm text-muted-foreground">CGPA</div>
          <CountUp to={student.cgpa} className="mt-2 block text-2xl font-semibold tabular-nums" />
          <div className="mt-1 text-xs text-muted-foreground">after 6 semesters</div>
        </SpotlightCard>
        <SpotlightCard theme="light" className="rounded-xl! p-5!">
          <div className="text-sm text-muted-foreground">Credits earned</div>
          <div className="mt-2 text-2xl font-semibold tabular-nums"><CountUp to={student.credits} /><span className="text-base text-muted-foreground">/{student.totalCredits}</span></div>
          <Progress value={(student.credits / student.totalCredits) * 100} className="mt-3 h-1.5" />
        </SpotlightCard>
        <SpotlightCard theme="light" className="rounded-xl! p-5!">
          <div className="text-sm text-muted-foreground">Activity points</div>
          <div className="mt-2 text-2xl font-semibold tabular-nums"><CountUp to={student.activityPoints} /><span className="text-base text-muted-foreground">/100</span></div>
          <Progress value={student.activityPoints} className="mt-3 h-1.5" />
        </SpotlightCard>
        <SpotlightCard theme="light" className="rounded-xl! p-5!">
          <div className="text-sm text-muted-foreground">Backlogs</div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">{student.backlogs}</div>
          <div className="mt-1 text-xs text-muted-foreground">{student.backlogs ? 'CST307, supply exam on 9 Dec' : 'none pending'}</div>
        </SpotlightCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>SGPA by semester</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sgpa} margin={{ top: 20, left: -20, right: 4 }}>
                <CartesianGrid vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="sem" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis domain={[6, 10]} tickLine={false} axisLine={false} fontSize={12} />
                <Bar dataKey="value" fill="#a1a1aa" radius={4} maxBarSize={44}>
                  <LabelList dataKey="value" position="top" fontSize={11} formatter={(v: unknown) => Number(v).toFixed(2)} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>This semester</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {subjects.slice(0, 5).map(s => (
              <div key={s.code} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate"><span className="text-muted-foreground">{s.code}</span> {s.name}</span>
                <span className="tabular-nums text-muted-foreground">{Math.round((s.attended / s.total) * 100)}%</span>
              </div>
            ))}
            <Link to="/ezygo" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'mt-2 w-full' })}>Open attendance</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
