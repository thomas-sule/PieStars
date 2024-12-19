import db from '../db/connection'
import { Pie, User } from '../../models/pies'

// Fetch all pies
export async function getPies(): Promise<Pie[]> {
  try {
    const allPies = await db('BakeryAwards')
    return allPies.map((pie) => ({
      ...pie, // Spread all the properties directly
      img: pie.img || '/images/pie-cartoon-image.jpeg', // Ensure img is null if missing
    }))
  } catch (error) {
    console.error('Error fetching pies:', error)
    throw new Error('Failed to fetch pies')
  }
}

// Fetch a single pie by its ID
export async function getPieById(id: number) {
  try {
    const result = await db('BakeryAwards').where({ id }).first()
    return result || null
  } catch (error) {
    console.error(`Error fetching pie by ID ${id}:`, error)
    throw new Error('Database query failed')
  }
}

// Fetch all pie shops (with 'Bakery' and 'Address' fields)
export async function getPieStores(): Promise<
  { bakery: string; address: string }[]
> {
  try {
    const result = await db('BakeryAwards').select('Bakery', 'Address')
    return result || [] // Return the result directly or an empty array
  } catch (error) {
    console.error('Error fetching pie shops:', error)
    throw new Error('Failed to fetch pie shops')
  }
}

// Fetch a pie shop by its name
export async function getPieStoreByName(
  bakery: string,
): Promise<{ bakery: string; address: string } | null> {
  try {
    const result = await db('BakeryAwards').where('Bakery', bakery).first()

    return result || null // Return the result directly, or null if not found
  } catch (error) {
    console.error(`Error fetching pie shop with name ${bakery}:`, error)
    throw new Error('Failed to fetch pie shop')
  }
}

// Fetch pies by flavor (returns an array of pies)
export async function getPiesByFlavor(flavor: string): Promise<Pie[]> {
  try {
    const result = await db('BakeryAwards').where('flavor', flavor)

    return result || [] // Return the result directly, or an empty array if no pies are found
  } catch (error) {
    console.error(`Error fetching pies by flavor ${flavor}:`, error)
    throw new Error(`Failed to fetch pies by flavor ${flavor}`)
  }
}

// Gets all User Rating Data
export async function getUserData(user: string): Promise<User[]> {
  try {
    const result = await db('userratings')
      .join('BakeryAwards', 'userratings.pieId', '=', 'BakeryAwards.id')
      .where('userratings.auth0_id', user)
    return result
  } catch (error) {
    console.error(`Error fetching user`, error)
    throw new Error(`Failed to fetch user`)
  }
}

// Adds a new rating to the database
export async function addRating(
  user: string,
  pieId: number,
  rating: number,
): Promise<void> {
  try {
    const existingRating = await db('userratings')
      .where('auth0_id', user)
      .andWhere('pieId', pieId)
      .first()

    if (existingRating) {
      await db('userratings')
        .where({ auth0_id: user, pieId })
        .update({ rating })
      console.log(`Rating updated for pie ${pieId} by user ${user}`)
    } else {
      await db('userratings').insert({ auth0_id: user, pieId, rating })
      console.log(`Rating added for pie ${pieId} by user ${user}`)
    }
  } catch (error) {
    console.error('Error adding/updating rating:', error)
    throw new Error('Failed to add/update rating')
  }
}
