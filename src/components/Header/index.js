import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-header">
        <div className="nav-bar-large-container">
          <Link to="/">
            <div className="header-logo-container">
              <img
                src="https://res.cloudinary.com/daari0y7l/image/upload/v1644069309/Group_7731_1_qmgjyu.png"
                className="website-logo"
                alt="website logo"
              />
            </div>
          </Link>

          <ul className="nav-menu">
            <Link to="/" className="nav-link">
              <li className="nav-menu-item">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="nav-menu-item">Bookshelves</li>
            </Link>
          </ul>
          <Link to="/login">
            <button
              className="logout-desktop-btn"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </nav>

      <nav className="nav-header-mobile">
        <div className="nav-bar-large-container">
          <Link to="/">
            <div className="header-logo-container">
              <img
                src="https://res.cloudinary.com/daari0y7l/image/upload/v1644069309/Group_7731_1_qmgjyu.png"
                className="website-logo"
                alt="website logo"
              />
            </div>
          </Link>

          <ul className="nav-menu">
            <Link to="/" className="nav-link">
              <li className="nav-menu-item">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="nav-menu-item">Shelves</li>
            </Link>
          </ul>
          <Link to="/login">
            <button
              className="logout-desktop-btn"
              type="button"
              onClick={onClickLogout}
            >
              <img
                src="https://res.cloudinary.com/daari0y7l/image/upload/v1644981337/transparent-web-interface-icons-icon-logout-icon-5f8bbf9bc2f138.8715297616029940757985_qfwk1t.png"
                alt="log out"
                className="log-out-m"
              />
            </button>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
