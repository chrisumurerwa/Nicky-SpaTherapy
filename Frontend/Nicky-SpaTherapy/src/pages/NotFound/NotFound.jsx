import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => (
  <div className="notfound-page">
    <div className="notfound-inner">
      <span className="notfound-icon">🌿</span>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  </div>
)

export default NotFound
