import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { urlFor } from '../lib/client'

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link
        href={`/product/${slug.current}`}
      >
        <div className='product-card'>
          <div className='_img product-image' >
            <Image 
              src={urlFor(image && image[0])}
              alt={slug.current}
              // layout='fill'
              width={250}
              height={250}
            />
          </div>
          <div className="product-name">
          {name}
          </div>
          <div className="product-price">
          ${price}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Product