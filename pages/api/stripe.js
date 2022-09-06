import Stripe from "stripe"
import env from "../../lib/stripe-variable"

export const handler = async (req, res) => {
  const stripe = new Stripe(env.secretKey)
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1Lf1JiBwk3bEbdPQGW1wk7ur' },
          { shipping_rate: 'shr_1Lf1KRBwk3bEbdPQIGbfF4pn' },
        ],
        line_items: req.body.map(item => {
          const image = item.image[0].asset._ref
          const newImage = image.replace('image-', 'https://cdn.sanity.io/images/ympvhusi/production/').replace('-webp', '.webp')

          return {
            price_data: {
              currency: 'thb',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?cancel=true`,
      }

      const session = await stripe.checkout.sessions.create(params);
      
      res.status(201).json(session)
    } catch (error) {
      console.log({ error }, 'error')
      res.status(200).json({ error })
    }
  }
}

export default handler