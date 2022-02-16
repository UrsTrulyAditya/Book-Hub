import {FaGoogle, FaInstagram, FaYoutube, FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <nav className="footer-container">
      <div className="container">
        <FaGoogle className="social-icon" testid="pintrest-social-icon" />
        <FaTwitter className="social-icon" testid="instagram-social-icon" />
        <FaInstagram className="social-icon" testid="twitter-social-icon" />
        <FaYoutube className="social-icon" testid="facebook-social-icon" />
      </div>
      <p className="footer-description para">Contact us</p>
    </nav>
  )
}
