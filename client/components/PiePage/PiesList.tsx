// OPTIONAL
// Displays a list of pies with the bakery location and perhaps images

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPies } from '../../apis/api'
import { Pie } from '../../../models/pies'

const PiesList = () => {
  const [pies, setPies] = useState<Pie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPies = async () => {
      try {
        const pieData = await getPies()
        setPies(pieData)
      } catch (err) {
        setError('Failed to fetch pies')
        console.error('Error fetching pies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPies()
  }, [])

  if (loading) return <div>Loading pies...</div>
  if (error) return <div>{error}</div>

  return (
    <div> 
      <h2>All Rated Pies</h2>
      <div className="leaderboard-container">

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Flavor</th>
            <th>Place</th>
            <th>Baker</th>
            <th>Bakery</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {pies.map((pie) => (
            <tr key={pie.id}>
              <td>
                <Link to={`/pies/${pie.id}`}>{pie.flavor}</Link>{' '}
              </td>
              <td>{pie.place}</td>
              <td>{pie.baker}</td>
              <td>
                <Link to={`/stores/${pie.bakery}`}>{pie.bakery}</Link>{' '}
              </td>
              <td>{pie.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default PiesList
