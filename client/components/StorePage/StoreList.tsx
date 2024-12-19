import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getStores } from '../../apis/api'

const StoreList = () => {
  const {
    data: stores,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['stores'],
    queryFn: () => getStores(),
  })
  if (isLoading) {
    return <div>Loading pies...</div>
  }

  if (isError) {
    return (
      <div>There was an error loading the pies. Please try again later.</div>
    )
  }
  return (
    <div>
      <h2>All Rated Stores</h2>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Location</th>
              {/* <th>Pies Rated</th> */}
              {/* <th>Average Rating</th> */}
            </tr>
          </thead>
          <tbody>
            {stores?.length ? (
              stores.map((store, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/stores/${store.bakery}`}>{store.bakery}</Link>
                  </td>
                  <td>{store.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No stores available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StoreList
