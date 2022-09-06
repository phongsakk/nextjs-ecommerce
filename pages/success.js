import React from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runFirework } from '../lib/utils'

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()
  React.useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFirework()
  }, [setCartItems, setTotalPrice, setTotalQuantities])

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email inbox for the receipt.</p>
        <p className='description'>
          If you have any questions, please email
          <a href='mailto:order@example.com' className='email'>
            order@example
          </a>
        </p>
        <Link href='/'>
          <button type='button' width='300px' className='btn'>
            Continued Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success