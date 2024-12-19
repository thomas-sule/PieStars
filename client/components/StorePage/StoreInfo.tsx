// Bakery description, any history, and details
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStoreByBakery } from '../../apis/api'
import { useQuery } from '@tanstack/react-query'

const StoreInfo = () => {
  const { id } = useParams()

  // Initialising the store state with hardcoded data for simplicity
  const {
    data: store,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['stores'],
    queryFn: () => getStoreByBakery(String(id)),
  })
  if (isLoading) {
    return <div>Loading stores...</div>
  }

  if (isError) {
    return (
      <div>There was an error loading the stores. Please try again later.</div>
    )
  }
  return (
    <div className="store-info">
      <img
        src={'/images/pie-store-image.jpeg'}
        alt={store?.bakery}
        style={{ width: '400px', height: 'auto', borderRadius: '8px' }}
      />

      <h2>{store?.bakery}</h2>
      {/* <p>{store.description}</p> */}
      <p>
        <strong>Location:</strong> {store?.address}
      </p>
      <p>{/* <strong>Current Rating:</strong> {store.rating} stars */}</p>
    </div>
  )
}

export default StoreInfo
