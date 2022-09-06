import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { urlFor } from '../lib/client'

const FooterBanner = ({ banner: {
  discount, smallText, midText, largeText, largeText2, saleTime, buttonText, product, image, desc
} }) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText}</h3>
          <h3>{largeText2}</h3>
          <p>{moment(saleTime).format('MMMM Do YYYY')}</p>
        </div>

        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`} >
            <button type='button'>{buttonText}</button>
          </Link>
        </div>

        <div className='footer-banner-image'>
          <div className='_img' style={{ width: 400, height: 400 }}>
            <Image
              src={urlFor(image)}
              alt={product}
              layout='fill'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterBanner