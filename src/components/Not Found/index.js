import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />

    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/daari0y7l/image/upload/v1644147111/Group_7484_h04zqg.png"
        alt="not-found"
        className="not-found-img"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found <br />
        Please go back to the homepage
      </p>
      <Link to="/" className="not-found-link">
        <button type="button" className="not-found-home-button">
          Go Back to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
