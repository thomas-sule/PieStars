// Form to rate a pie
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import request from 'superagent'
import { addRating } from '../../apis/api'
import { User } from '../../../models/pies'
import { useAuth0 } from '@auth0/auth0-react'

const RatingForm = ({ pieId }: { pieId: string }) => {
  const [rating, setRating] = useState(0)
  const { user } = useAuth0()

  const client = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (rating: User) => {
      addRating(rating)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['rating'] })
    },
  })

  const handleClick = (star: number) => {
    setRating(star)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addMutation.mutate({
      auth0_id: user?.sub as string,
      pieId: pieId,
      rating: rating,
    })
    console.log('Rating submitted:', rating)
  }

  const handleKeyDown = (star, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(star)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: '30px' }}>
        <label className="rating-label">
          Rate this pie:
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleClick(star)}
                onKeyDown={(e) => handleKeyDown(star, e)}
                tabIndex={0}
                className={`star ${star <= rating ? 'filled' : ''}`}
                role="button"
                aria-label={`${star} stars`}
                style={{
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '0 5px',
                }}
              >
                &#9733; {/* Unicode star symbol */}
              </span>
            ))}
          </div>
        </label>
      </div>
      <button type="submit" tabIndex={0}>
        Submit
      </button>{' '}
    </form>
  )
}

export default RatingForm
