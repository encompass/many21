import express from 'express'

import ApiError from '../errors/ApiError'
import User from '../models/user'
import Stickers from '../models/sticker'

import buildSticker from '../controllers/stickerControllers'

const router = express.Router()

// Users Administartion
// Not needed so much, as users are only admins here...
router.get('users/:userId', (req, res) => {
  res.json({ message: "Single User..." })
})


router.post('users/:userId', (req, res) => {
  res.json({ message: "Create User..." })
})


router.delete('users/:userId', (req, res) => {
  res.json({ message: "Delete User..." })
})

router.put('users/:userId', (req, res) => {
  res.json({ message: "Update User..." })
})

// Get a list of all the strickers made
// Should have pagination
router.get('/stickers', (req, res) => {
  buildSticker()
  res.json({
    message: 'QRCODE: created...',
  })
})

export default router