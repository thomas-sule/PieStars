// Custom hook to manage pie rating logic
// useHooks.ts
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPies, getPieByFlavor } from '../apis/api'

// Custom hook for managing rating state
export const useRating = (initialRating: number | null = null) => {
  const [rating, setRating] = useState<number | null>(initialRating)

  const updateRating = (newRating: number) => {
    setRating(newRating)
  }

  return { rating, updateRating }
}

// Custom hook for getting the pie ID from the URL parameters
export const usePieId = () => {
  const { id } = useParams<{ id: string }>()
  return id
}


export function useGetPie(){
  return useQuery({
    queryKey: ['Bacon & Egg'],
    queryFn: () => getPies(),
  })
}

export const usePieFlavor = ()=>{
  const { flavor } = useParams<{ flavor: string }>()
  return flavor as string
}


//getting pie by flavor
export const useGetPieByFlavor = () => {
  const flavor = usePieFlavor()

  return useQuery({
    queryKey: ['pie', flavor],
    queryFn: () => getPieByFlavor(flavor),
    enabled: !!flavor,
  })
}