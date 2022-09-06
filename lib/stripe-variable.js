export const env = {
  secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '',
  publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
}

export default env