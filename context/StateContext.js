import React from 'react'
import toast from 'react-hot-toast'

const Context = React.createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = React.useState(false)
  const [cartItems, setCartItems] = React.useState([])
  const [totalPrice, settotalPrice] = React.useState(0)
  const [totalQuantities, setTotalQuantities] = React.useState(0)
  const [qty, setQty] = React.useState(1)

  const onAdd = (product, quantity) => {
    const productIsInCart = cartItems.find(item => item._id === product._id)

    if (productIsInCart) {
      settotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity

      setCartItems(prevCartItems => prevCartItems.push(product))
    }
    toast.success(`${qty} ${product.name} added to cart`)
  }

  const incQty = () => setQty(prevQty => prevQty + 1)

  const decQty = () => setQty(prevQty => prevQty - 1 > 0
    ? prevQty - 1
    : 1
  )

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => React.useContext(Context)