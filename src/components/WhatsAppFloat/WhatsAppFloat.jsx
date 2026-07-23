import { FaWhatsapp } from 'react-icons/fa'
import './WhatsAppFloat.css'

const WHATSAPP_NUMBER = '250787326503'

const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noreferrer"
    className="whatsapp-float"
    aria-label="Chat on WhatsApp"
  >
    <span className="whatsapp-label">
      Need Help? <strong>Chat with us</strong>
    </span>
    <span className="whatsapp-icon-wrap">
      <FaWhatsapp size={24} />
    </span>
  </a>
)

export default WhatsAppFloat
