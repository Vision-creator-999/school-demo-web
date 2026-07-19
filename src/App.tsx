import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Gateway } from './pages/Gateway'
import { Home } from './pages/Home'
import { Home_hindi } from './pages/Home_hindi'
import { About } from './pages/About'
import { About_hindi } from './pages/About_hindi'
import { Notices } from './pages/Notices'
import { Notices_hindi } from './pages/Notices_hindi'
import { Admissions } from './pages/Admissions'
import { Admissions_hindi } from './pages/Admissions_hindi'
import { Gallery } from './pages/Gallery'
import { Gallery_hindi } from './pages/Gallery_hindi'
import { Contact } from './pages/Contact'
import { Contact_hindi } from './pages/Contact_hindi'
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
          <Route index element={<Gateway />} />
          <Route path="home" element={<Home />} />
          <Route path="home_hindi" element={<Home_hindi />} />
          <Route path="about" element={<About />} />
          <Route path="about_hindi" element={<About_hindi />} />
          <Route path="notices" element={<Notices />} />
          <Route path="notices_hindi" element={<Notices_hindi />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="admissions_hindi" element={<Admissions_hindi />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery_hindi" element={<Gallery_hindi />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact_hindi" element={<Contact_hindi />} />
          <Route path="portal" element={<PortalSelector />} />
          <Route path="portal/:portalType" element={<PortalPlaceholder />} />
          <Route path="portal/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="portal/admin/dashboard" element={<AdminDashboard />} />
          <Route path="portal/student/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<Gateway />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
