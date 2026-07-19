import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Notices } from './pages/Notices'
import { Admissions } from './pages/Admissions'
import { Gallery } from './pages/Gallery'
import { Contact } from './pages/Contact'
import { PortalSelector } from './pages/PortalSelector'
import { PortalPlaceholder } from './pages/PortalPlaceholder'
import { TeacherDashboard } from './pages/TeacherDashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { StudentDashboard } from './pages/StudentDashboard'

// Scroll helper to reset view on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="notices" element={<Notices />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portal" element={<PortalSelector />} />
          <Route path="portal/:portalType" element={<PortalPlaceholder />} />
          <Route path="portal/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="portal/admin/dashboard" element={<AdminDashboard />} />
          <Route path="portal/student/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
