import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { CalendarClock, FileCheck2, LayoutGrid, LifeBuoy, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: false },
  { to: '/results', label: 'Exam results', icon: FileCheck2, end: true },
  { to: '/examination', label: 'Examination', icon: CalendarClock, end: true },
]

const extra = [
  { label: 'Syllabus', icon: ScrollText },
  { label: 'Help desk', icon: LifeBuoy },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const dash = ['/', '/student', '/ezygo'].includes(pathname)
  return (
    <motion.aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      initial={false}
      animate={{ width: open ? 232 : 68 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className={cn('fixed top-16 bottom-0 left-0 z-30 hidden flex-col overflow-hidden border-r bg-background py-4 md:flex', open && 'shadow-xl')}
    >
      <nav className="flex flex-col gap-1 px-3">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => cn('flex h-10 items-center gap-3 rounded-md px-[13px] text-sm font-medium transition-colors', (to === '/' ? dash : isActive) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}
          >
            <Icon className="size-[18px] shrink-0" />
            <motion.span animate={{ opacity: open ? 1 : 0, x: open ? 0 : -6 }} className="whitespace-nowrap">{label}</motion.span>
          </NavLink>
        ))}
      </nav>
      <div className="mx-4 my-4 border-t" />
      <div className="flex flex-col gap-1 px-3">
        {extra.map(({ label, icon: Icon }) => (
          <button key={label} type="button" className="flex h-10 items-center gap-3 rounded-md px-[13px] text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Icon className="size-[18px] shrink-0" />
            <motion.span animate={{ opacity: open ? 1 : 0, x: open ? 0 : -6 }} className="whitespace-nowrap">{label}</motion.span>
          </button>
        ))}
      </div>
      <motion.div animate={{ opacity: open ? 1 : 0 }} className="mt-auto px-5 text-xs whitespace-nowrap text-muted-foreground">
        Odd semester 2026
      </motion.div>
    </motion.aside>
  )
}
