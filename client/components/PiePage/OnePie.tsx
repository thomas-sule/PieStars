import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPieById } from '../../apis/api'
import { PieData } from '../../../models/pies'
import RatingForm from './RatingForm'
import { IfAuthenticated } from '../Authenticated'

const OnePie = () => {
  const { id } = useParams<{ id: string }>()

  const [pie, setPie] = useState<PieData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchPie = async () => {
      try {
        const pieData = await getPieById(Number(id))
        setPie(pieData)
      } catch (error) {
        setIsError(true)
        console.error('Error fetching pie:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPie()
  }, [id])

  if (isLoading) {
    return <div>Loading pie details...</div>
  }

  if (isError) {
    return (
      <div>
        There was an error loading the pie details. Please try again later.
      </div>
    )
  }

  if (!pie) {
    return <div>No pie data available</div>
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', marginTop: '10%' }}></div>
      <div style={{ flex: '2', paddingLeft: '0px' }}>
        <img
          src={pie.img || '/images/pie-cartoon-image.jpeg'}
          alt={pie.flavor}
          className="pie-profile"
        />
        <h2>{pie.flavor}</h2>
        <p>{pie.place}</p>
        <p>{pie.bakery}</p>
        <p>{pie.address}</p>
        <IfAuthenticated>
          <RatingForm pieId={id as string} />
        </IfAuthenticated>
      </div>
    </div>
  )
}

export default OnePie
