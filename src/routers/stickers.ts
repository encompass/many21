import express from 'express'
const router = express.Router()

import Sticker from '../models/sticker'
import ApiError from '../errors/ApiError'

router.get('/:stickerId', (req, res) => {
  // Try to find the sticker based on this id...
  // Based on the status return:
  //     - New sticker view... and with code register sticker
  //     - Add Images or Videos to Stickers
  //     -> Publish sticker --->
  res.json({
    message: 'Show a sticker based on its status',
  })
})
//Handle file uploads here...
router.post('/:stickerId', (req, res) => {
  res.json({
    message: 'Uploading images and videos to sticker',
  })
})
// A place to review all the stickers before the person
router.get('/r/:stickerId/:uploadId', (req, res) => {
  res.json({
    message: 'Remove a uploaded file',
  })
})
router.get('/r/:stickerId', (req, res) => {
  res.json({
    message: 'Review uploads before publishing.',
  })
})


export default router
