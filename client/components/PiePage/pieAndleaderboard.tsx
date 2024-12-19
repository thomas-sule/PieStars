// Layout component to manage the layout across all pages
import Leaderboard from './Leaderboard'
import { Outlet } from 'react-router-dom'

const Pieboard = () => {
  return (
    <div className="pieboard-container">
      <div className="left-column">
        <div>
          <Leaderboard />
        </div>
      </div>
      <div className="spacer"></div>{' '}
      <div className="right-column">
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Pieboard
