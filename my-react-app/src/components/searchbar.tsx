import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { notices, subjects } from '@/data/portal'
import { cn } from '@/lib/utils'

const index = [
  { label: 'University dashboard', group: 'Pages', to: '/' },
  { label: 'Student dashboard', group: 'Pages', to: '/student' },
  { label: 'Ezygo attendance', group: 'Pages', to: '/ezygo' },
  { label: 'Exam results', group: 'Pages', to: '/results' },
  { label: 'Examination and timetable', group: 'Pages', to: '/examination' },
  ...subjects.map(s => ({ label: `${s.code} ${s.name}`, group: 'Subjects', to: '/ezygo' })),
  ...notices.map(n => ({ label: n.title, group: 'Notices', to: '/' })),
]

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(0)
  const ref = useRef<HTMLInputElement>(null)
  const nav = useNavigate()
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? index.filter(i => i.label.toLowerCase().includes(t)).slice(0, 8) : []
  }, [q])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        ref.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const go = (to: string) => {
    nav(to)
    setQ('')
    setOpen(false)
    ref.current?.blur()
  }
  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={ref}
        value={q}
        aria-label="Search"
        className="rounded-full bg-muted/50 pl-9"
        onChange={e => { setQ(e.target.value); setHi(0); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setHi(h => Math.min(h + 1, hits.length - 1)) }
          if (e.key === 'ArrowUp') { e.preventDefault(); setHi(h => Math.max(h - 1, 0)) }
          if (e.key === 'Enter' && hits[hi]) go(hits[hi].to)
          if (e.key === 'Escape') { setQ(''); ref.current?.blur() }
        }}
      />
      <AnimatePresence>
        {open && q && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-11 right-0 left-0 z-50 overflow-hidden rounded-lg border bg-popover p-1 shadow-lg">
            {hits.length === 0 && <p className="px-3 py-2 text-sm text-muted-foreground">Nothing found for "{q}"</p>}
            {hits.map((h, i) => (
              <button key={h.group + h.label} type="button" onMouseDown={() => go(h.to)} onMouseEnter={() => setHi(i)} className={cn('flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm', i === hi && 'bg-muted')}>
                <span className="truncate">{h.label}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{h.group}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
