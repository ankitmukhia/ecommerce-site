/* In here we gonna manage our intire State of Application */

import product from '@/sanity_ecommerce/schemas/product';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-hot-toast'; // This line is going to be that little Popup notifacation while we add stuff in card //


const Context = createContext();

export const StateContext = ({ children }) => { // Functional Component
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuentities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)


    let foundProduct;
    let index;

    /* This is the (2nd) Logic we have done which does check that the item of number is already there
    or not, in simple word it checks if chart already has 1 number of item, if we add the same item
    again it gonna recocnize that its already in cart and its gonna increase the Qty in the exesting
    Qty it means it will be 2 items */
   const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) =>item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((setTotalQuantities)=> setTotalQuantities + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct)=> {
              if(cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
              }  
            })

            setCartItems(updatedCartItems);
        }else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
   }
   /* This is the (4th) Logic here we are doing setingup our Remove funcanilaty in the cart side that little cross x button */
      const onRemove = (product) => {
         foundProduct = cartItems.find((item)=> item._id === product._id )
         const  newCartItems = cartItems.filter((item)=> item._id !==  product._id )

         setTotalPrice((prevtotalPrice) => prevtotalPrice - foundProduct.price * foundProduct.quantity)
         setTotalQuantities((prevtotalQuentities)=> prevtotalQuentities - foundProduct.quantity);
         setCartItems(newCartItems);
      }


   /* This is the (3rd) Logic it does increase the number and decrese the Number for our Cart side*/
   const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item)=> item._id === id )
        index = cartItems.findIndex((product)=> product._id === id)

        const newCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prevtotalPrice) => prevtotalPrice + foundProduct.price)
            setTotalQuantities((prevtotalQuentities)=> prevtotalQuentities + 1 )
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
                setTotalPrice((prevtotalPrice) => prevtotalPrice - foundProduct.price)
                setTotalQuantities((prevtotalQuentities)=> prevtotalQuentities - 1 )
            }
        }
   }


   /* This is the (1st) Logic we have Done which does increase the number and decrese the Number */

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const decQty = () => {
        setQty((prevQty) =>{
            if(prevQty - 1 < 1) return 1; return prevQty  - 1
        })
    }


    return(
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuentities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context) //This gonna alow us to use our state just like a Hook
