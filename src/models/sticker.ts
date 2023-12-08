import mongoose from 'mongoose'
// https://www.npmjs.com/package/uuid-base58
import { uuid58 } from 'uuid-base58';

const stickerLifetimeInDays = Number(process.env.STICKER_LIFETIME_IN_DAYS)

const getLetterNumberPass = (digits: number) => {
  const dictionaryLetters = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"
  const dictionaryLength = dictionaryLetters.length
  let publishKey = ""
  for (let i = 0; i < digits; i++) {
     publishKey = publishKey + dictionaryLetters.charAt(Math.floor(Math.random() * dictionaryLength))
  }
  return publishKey
}

const stickerSchema = new mongoose.Schema({
  // The them that should load with the page.
  sticker_theme: {
    type: String,
    enum: ['standard', 'birthday', 'wedding'],
    default: 'standard',
    index: true,
    required: true,
  },
  // The optional email if the creator wants to be notified of the reciever scanning the email
  notification_email: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v)
      },
      message: (props: any) => `${props.value} is not a valid email address.`,
    },
  },
  // This is used in the URL to give the id of the card.
  unique_id: {
    type: String,
    required: true,
    default: uuid58()
  },
  // The hash of the number combination for the editor password printed on each card
  // The number on the card is not stored in our database.
  unique_pass: {
    type: String,
    required: true,
    default: getLetterNumberPass(6),
  },
  // The various states of the sticker.  Used to change the behaviour or the sticker
  printed: {
    type: Date,
    required: true,
  },
  // The expiration date is calculated from this date
  first_scan: {
    type: Date,
  },
  // This is the moment it is published so no one else can add content to it.
  publish_date: {
    type: Date,
  },
})

stickerSchema.virtual('expiration_date').get(function () {
  return this.publish_date = stickerLifetimeInDays * 24 * 60 * 60 * 1000
})

export default mongoose.model('Sticker', stickerSchema)
