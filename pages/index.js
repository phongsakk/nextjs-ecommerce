import React from 'react'

import { Footer, FooterBanner, HeroBanner, Product } from '../components'
import { client } from '../lib/client'

const Home = ({ products, banners }) => {
  console.log({ products, banners, b: banners[0] })
  return (
    <>
      <HeroBanner banner={banners[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery)

  const bannersQuery = '*[_type == "banner"]'
  const banners = await client.fetch(bannersQuery)

  return {
    props: {
      products,
      banners
    }
  }
}

export default Home
