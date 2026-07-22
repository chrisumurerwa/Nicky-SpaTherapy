import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Services from '../pages/Services/Services'
import Packages from '../pages/Packages/Packages'
import Gallery from '../pages/Gallery/Gallery'
import Booking from '../pages/Booking/Booking'
import Contact from '../pages/Contact/Contact'
import Dashboard from '../pages/Dashboard/Dashboard'
import NotFound from '../pages/NotFound/NotFound'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/packages" element={<MainLayout><Packages /></MainLayout>} />
        <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
        <Route path="/booking" element={<MainLayout><Booking /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
