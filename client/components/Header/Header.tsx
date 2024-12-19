import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated.tsx'

function Header() {
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleSignOut = () => {
    logout()
    console.log('sign out')
  }
  console.log(user?.given_name)

  const handleSignIn = () => {
    loginWithRedirect()
    console.log('sign in')
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="/images/pie-stars.png"
            alt="Pie Stars Logo"
            className="logo-img"
          />
        </Link>
      </div>
      <h1 className="page-title">Pie Stars</h1>

      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pies">Pies</Link>
          </li>
          <li>
            <Link to="/stores">Stores</Link>
          </li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <IfNotAuthenticated>
          <button className="login-button" onClick={handleSignIn}>
            <Link to="/login">Login</Link>
          </button>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <button className="login-button" onClick={handleSignOut}>
            <Link to="/login">Logout </Link>
          </button>
          <button className="user-profile">
            <Link to="/User"> {user?.name}</Link>
          </button>
        </IfAuthenticated>
      </div>
    </header>
  )
}

export default Header
