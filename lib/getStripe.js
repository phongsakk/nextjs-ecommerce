import { loadStripe } from '@stripe/stripe-js'
import env from './stripe-variable'

let stripePromise

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.publicKey)
  }

  return stripePromise
}

export default getStripe