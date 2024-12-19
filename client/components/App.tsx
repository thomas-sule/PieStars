import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import BestPies from './LandingPage/BestPies'
import StoreInfo from './StorePage/StoreInfo'
import PiesList from './PiePage/PiesList'
import StoreList from './StorePage/StoreList'
import OnePie from './PiePage/OnePie'

import Pieboard from './PiePage/pieAndleaderboard'
import User from './LandingPage/User'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<BestPies />} />
          <Route path="/pies/" element={<PiesList />} />
          <Route path="/user/" element={<User />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/flavor/:flavor" element={<Pieboard />}>
            <Route path=":id" element={<OnePie />} />
          </Route>
          <Route path="/pies/:id" element={<OnePie />} />
          <Route path="/stores/:id" element={<StoreInfo />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
