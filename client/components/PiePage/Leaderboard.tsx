// Displays leaderboard of top-rated pies
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPiesByFlavor } from '../../apis/api'

const Leaderboard = () => {
  const { flavor } = useParams()
  const {
    data: leaderboard,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['flavor'],
    queryFn: () => getPiesByFlavor(flavor as string),
  })

  // Initializing the pie state with hardcoded data for simplicity
  if (isPending) {
    return <div>Loading pies...</div>
  }

  if (isError) {
    return (
      <div>There was an error loading the pies. Please try again later.</div>
    )
  }
  console.log(leaderboard)
  return (
    <div>
      <h2>The Pie Flavor Leaderboard</h2>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Pie Name</th>
              <th>Rating</th>
              <th>Store</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((pie) => (
              <tr key={pie.id}>
                <td>
                  <Link to={`${pie.id}`}>{pie.flavor}</Link>{' '}
                </td>
                <td>{pie.place}</td>
                <td>
                  <Link to={`/stores/${pie.bakery}`}>{pie.bakery}</Link>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
