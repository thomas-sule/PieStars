import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../apis/api'
import { UserRating } from '../../../models/pies'
import { Link } from 'react-router-dom'

function User() {
  const { isAuthenticated, user } = useAuth0()

  const { data, isError, isPending } = useQuery({
    queryKey: ['rating', user?.sub],
    queryFn: () => getData(user?.sub as string),
  })

  if (isPending) {
    return <div>Pending pies...</div>
  }

  if (isError) {
    return (
      <div>There was an error loading the pies. Please try again later.</div>
    )
  }
  const sortedData = data.sort(
    (a: UserRating, b: UserRating) => b.rating - a.rating,
  )

  return (
    <div>
      <h2 className="profile-name">
        {isAuthenticated ? user?.name : 'people'}&apos;s Profile
      </h2>
      <img
        src={'/images/pie-cartoon-image.jpeg'}
        alt={'pie'}
        className="pie-profile"
      />
      <h2>
        {' '}
        <strong>Favourite Pies: {''}</strong>
      </h2>

      <div className="table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Pie Name</th>
              <th>Rating</th>
              <th>Store</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((rating: UserRating) => (
              <tr key={rating.pieId}>
                <td>
                  <Link to={`/pies/${rating.pieId}`}>{rating.flavor}</Link>{' '}
                </td>
                <td>{rating.rating} stars</td>
                <td>
                  <Link to={`/stores/${rating.bakery}`}>{rating.bakery}</Link>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User
