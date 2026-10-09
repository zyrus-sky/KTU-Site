import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import TopPanel from '@/components/toppanel'
import Sidebar from '@/components/sidebar'
import Home from '@/pages/home'
import Results from '@/pages/results'
import Examination from '@/pages/examination'

function Shell() {
  return (
    <div className="min-h-svh bg-muted/30">
      <TopPanel />
      <Sidebar />
      <main className="px-4 pt-22 pb-10 md:pl-[92px] md:pr-6">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home view="university" />} />
          <Route path="student" element={<Home view="student" />} />
          <Route path="ezygo" element={<Home view="ezygo" />} />
          <Route path="results" element={<Results />} />
          <Route path="examination" element={<Examination />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
