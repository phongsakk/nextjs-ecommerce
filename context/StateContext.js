import React from 'react'
import toast from 'react-hot-toast'

const Context = React.createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = React.useState(false)
  const [cartItems, setCartItems] = React.useState([])
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [totalQuantities, setTotalQuantities] = React.useState(0)
  const [qty, setQty] = React.useState(1)

  // let foundProduct
  // let index

  const onAdd = (product, quantity) => {
    const productIsInCart = cartItems.find(item => item._id === product._id)
    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)

    if (productIsInCart) {
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
      setTotalQuantities(prevQuantities => prevQuantities + quantity)
      setCartItems(prevCartItems => ([...prevCartItems, { ...product }]))
    }
    toast.success(`${qty} ${product.name} added to cart`)
    setQty(1)
  }

  const removeCartItem = (product) => {
    setCartItems(prevCartItems => prevCartItems.filter((item => item._id !== product._id)))
    setTotalPrice(prevTotalPrice => prevTotalPrice - product.price * product.quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - product.quantity)
  }

  const toggleCartItemsQuantities = (id, value) => {
    let foundProduct = cartItems.find(item => item._id === id)

    if (value === 'inc') {
      setCartItems(prevCartItems => prevCartItems.map(
        item => item._id === foundProduct._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems(prevCartItems => prevCartItems.map(
          item => item._id === foundProduct._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ))
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
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
        removeCartItem,
        totalPrice,
        totalQuantities,
        toggleCartItemsQuantities,
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