import * as db from '../../server/functions/pies.ts'
import express from 'express'

const router = express.Router()

// GET /api/v1/pies
router.get('/', async (req, res) => {
  try {
    const pies = await db.getPies()
    res.status(200).json(pies)
  } catch (e) {
    console.error('Error fetching pies:', e)
    res.status(500).json({ error: 'Failed to fetch pies' })
  }
})

// GET /api/v1/pies/stores
router.get('/stores', async (req, res) => {
  try {
    const pies = await db.getPieStores()

    if (pies.length === 0) {
      return res.status(404).json({ message: 'No pie stores found' })
    }

    res.status(200).json(pies)
  } catch (error) {
    console.error('Error fetching pie stores:', error)
    res.status(500).json({ error: 'Failed to retrieve pie stores' })
  }
})

// Patch /api/v1/
router.patch('/User/:user', async (req, res) => {
  try {
    const user = String(req.params.user)
    const { rating, pieId } = req.body
    console.log(req.body)
    await db.addRating(user, pieId, rating)
    return res.status(200).json({ message: 'User data updated successfully' })
  } catch (error) {
    console.log(error)
  }
})

//Get /api/v1/User/:user or /:flavor/:id/:user
router.get('/User/:user', async (req, res) => {
  try {
    const user = String(req.params.user)
    const userData = await db.getUserData(user)
    res.json(userData)
  } catch (error) {
    console.log(error)
  }
})

// GET /api/v1/pies/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const pie = await db.getPieById(id)

    if (!pie) {
      return res.status(404).json({ message: `Pie with ID ${id} not found` })
    }

    res.status(200).json(pie)
  } catch (error) {
    console.error('Error fetching pie by ID:', error)
    res.status(500).json({
      error: `Failed to fetch pie with ID ${req.params.id}`,
    })
  }
})

// GET /api/v1/pies/stores/:bakery
router.get('/stores/:bakery', async (req, res) => {
  try {
    const bakery = req.params.bakery
    const store = await db.getPieStoreByName(bakery)

    if (!store) {
      return res
        .status(404)
        .json({ message: `Pie stores "${bakery}" not found` })
    }

    res.status(200).json(store)
  } catch (error) {
    console.error('Error fetching pie store by name:', error)
    res.status(500).json({ error: 'Failed to fetch pie store by name' })
  }
})

// GET /api/v1/pies/flavor/:flavor
router.get('/flavor/:flavor', async (req, res) => {
  try {
    const flavor = req.params.flavor
    const pies = await db.getPiesByFlavor(flavor)

    if (pies.length === 0) {
      return res
        .status(404)
        .json({ message: `No pies found for flavor: ${flavor}` })
    }

    res.status(200).json(pies)
  } catch (error) {
    console.error('Error fetching pies by flavor:', error)
    res.status(500).json({ error: `Failed to fetch pies for flavor` })
  }
})

export default router
