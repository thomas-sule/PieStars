// Displays leaderboard of top-rated pies
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPiesByFlavor } from '../../apis/api'

const PieLeaderboard = ({ pieflavor }: { pieflavor: string }) => {
  const {
    data: leaderboard,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['flavor'],
    queryFn: () => getPiesByFlavor(pieflavor as string),
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
      <h2>The Leaderboard</h2>
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
                  <Link to={`/pies/${pie.id}`}>{pie.flavor}</Link>{' '}
                </td>
                <td>{pie.place} stars</td>
                <td>
                  <Link to={`/store/${pie.bakery}`}>{pie.bakery}</Link>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PieLeaderboard
