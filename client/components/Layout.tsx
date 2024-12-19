// Layout component to manage the layout across all pages
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Layout = () => {
  return (
    <div className="layout">
      <div>
      <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <div>
      <Footer />
      </div>
    </div>
  )
}

export default Layout
