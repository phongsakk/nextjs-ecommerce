import Image from 'next/image'
import React from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'

import { useStateContext } from '../../context/StateContext'
import Product from '../../components/Product'
import { client, urlFor } from '../../lib/client'

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = React.useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()

  const { image, name, details, price } = product

  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className='image-container'>
            <div className='_img product-detail-image'>
              <Image
                src={urlFor(image && image[index])}
                alt={name}
                width={555}
                height={555}
              />
            </div>
          </div>

          <div className='small-images-container'>
            {image?.map((item, i) => (
              <div
                className={i === index ? '_img small-image selected-image' : '_img small-image'}
                key={i}
                onMouseEnter={() => setIndex(i)}
              >
                <Image
                  src={urlFor(item)}
                  alt={`${name} img${i}}`}
                  width={555}
                  height={555}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>

            <p>
              (20)
            </p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>

          <div className="quantity">
            <h3>Quantity: </h3>

            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>
                {qty}
              </span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>

            <button
              type='button'
              className='buy-now'
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map(item => (
              <Product product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: {
      slug: `${product.slug.current}`
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({
  params: { slug }
}) => {
  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`
  const productsQuery = `*[_type == "product"]`

  const product = await client.fetch(productQuery)
  const products = await client.fetch(productsQuery)

  return {
    props: { product, products }
  }
}

export default ProductDetails