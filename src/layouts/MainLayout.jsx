import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import '../components/Navbar/Navbar.css'
import '../components/Footer/Footer.css'

const MainLayout = ({ children }) => (
  <div style={{ minHeight: '100vh', background: '#f7f1e9' }}>
    <div style={{ background: 'linear-gradient(160deg, #1a0e08 0%, #2a1c12 100%)', paddingBottom: '1px' }}>
      <Navbar />
    </div>
    {children}
    <Footer />
  </div>
)

export default MainLayout
