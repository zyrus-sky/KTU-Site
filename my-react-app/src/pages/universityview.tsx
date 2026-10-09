import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import CountUp from '@/components/bits/countup'
import SpotlightCard from '@/components/bits/spotlightcard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { branchPass, notices, regionStats, uniStats } from '@/data/portal'

export default function UniversityView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {uniStats.map(s => (
          <SpotlightCard key={s.label} theme="light" className="rounded-xl! p-5!">
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <CountUp to={s.value} separator="," className="mt-2 block text-2xl font-semibold tabular-nums" />
          </SpotlightCard>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {notices.map(n => (
                <TableRow key={n.title} className="cursor-pointer">
                  <TableCell className="w-16 text-xs tabular-nums text-muted-foreground">{new Date(n.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</TableCell>
                  <TableCell className="whitespace-normal">{n.title}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{n.tag}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pass rate by branch</CardTitle>
            <CardDescription>B.Tech S6, May 2026</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPass} margin={{ top: 20, left: -20, right: 4 }}>
                <CartesianGrid vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="branch" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={12} />
                <Bar dataKey="pass" fill="#a1a1aa" radius={4}>
                  <LabelList dataKey="pass" position="top" fontSize={11} formatter={(v: unknown) => `${v}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Colleges by cluster</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {regionStats.map(r => (
                  <TableRow key={r.zone}>
                    <TableCell>{r.zone}</TableCell>
                    <TableCell className="text-right tabular-nums">{r.colleges}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
