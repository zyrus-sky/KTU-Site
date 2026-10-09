import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import JellyRadio from '@/components/bits/jellyradio'
import SearchBar from '@/components/searchbar'
import { Button } from '@/components/ui/button'
import { student } from '@/data/portal'
import logo from '@/assets/ktu-logo.png'

const views = [
  { value: '/', label: 'University' },
  { value: '/student', label: 'Student' },
  { value: '/ezygo', label: 'Ezygo' },
]

export default function TopPanel() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [last, setLast] = useState('/')
  if (last !== pathname && views.some(v => v.value === pathname)) setLast(pathname)
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b bg-background/85 backdrop-blur">
      <div className="flex h-full items-center gap-4 px-4 md:px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src={logo} alt="KTU" className="size-9 object-contain" />
          <div className="hidden leading-tight lg:block">
            <div className="text-sm font-semibold">APJ Abdul Kalam</div>
            <div className="text-xs text-muted-foreground">Technological University</div>
          </div>
        </Link>
        <div className="flex flex-1 justify-center">
          <JellyRadio items={views} value={last} onChange={v => nav(v)} size="sm" chipColor="#f4f4f5" activeColor="#e4e4e7" textColor="#71717a" activeTextColor="#09090b" ariaLabel="Dashboard" />
        </div>
        <div className="hidden sm:block sm:w-56 md:w-72">
          <SearchBar />
        </div>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
        </Button>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{student.name[0]}</div>
      </div>
    </header>
  )
}
