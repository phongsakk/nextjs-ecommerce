import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { urlFor } from '../lib/client'

const HeroBanner = ({ banner }) => {

  console.log({ b: banner })
  if (!banner) return null

  console.log({ u: urlFor(banner.image) })
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{banner.smallText}</p>

        <h3>{banner.midText}</h3>

        <h1>{banner.largeText}</h1>

        <div className="hero-banner-image">
          <Image
            src={urlFor(banner.image)}
            alt={banner.product}
            layout='fill'
          />
        </div>

        <div>
          <Link href={`/product/${banner._id}`}>
            <button type='button'>
              {banner.buttonText}
            </button>
          </Link>

          <div className='desc'>
            <h5>Description</h5>

            <p>{banner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
