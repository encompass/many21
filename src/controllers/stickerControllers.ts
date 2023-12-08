import Sticker from '../models/sticker'

// https://www.freecodecamp.org/news/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9/
// Create a sticker and save it to the system.
export const buildSticker: any = () => {
  const sticker = Sticker.create({
    sticker_theme : "standard",
  })
}

// Handle the upload of a image or video to a sticker.
export const addStickerFile: any = () => {
  console.log('Handle the upload of sticker...')
}

export default buildSticker

