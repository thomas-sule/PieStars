import { Link } from 'react-router-dom'
import { getPies } from '../../apis/api'
import { useQuery } from '@tanstack/react-query'

const BestPies = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['pies'],
    queryFn: getPies,
  })

  if (isLoading) {
    return <div>Loading pies...</div>
  }

  if (isError) {
    return (
      <div>There was an error loading the pies. Please try again later.</div>
    )
  }

  if (!data) {
    return <div>No data available</div>
  }

  const filteredPies = data.filter((pie) => {
    console.log('Pie place:', pie.place)
    return pie.place === 'Gold Award'
  })
  console.log('Filtered Pies:', filteredPies)

  return (
    <div className="best-pies-container">
      <h2>Our Best Gold Award Pies</h2>
      <div className="best-pies-flexbox">
        {filteredPies.length === 0 ? (
          <p>No Gold Award pies found.</p>
        ) : (
          filteredPies.map((pie) => (
            <div className="pie-card" key={pie.id}>
              <Link to={`/flavor/${pie.flavor}`} className="pie-card-link">
                <h3>{pie.flavor}</h3>
                <img
                  src={pie.img || '/images/pie-cartoon-image.jpeg'}
                  alt={pie.flavor}
                  className="pie-image"
                />
                <p>{pie.place}</p>
                <p>{pie.bakery}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BestPies
