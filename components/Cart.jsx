import React, { useRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '@/context/StateContaext';
import { urlFor } from '@/lib/client';
import Link from 'next/link';
import getStripe from '@/lib/getStripe';


const Cart = () => {

  const cartRef = useRef()
  const {totalPrice, cartItems, onRemove,  totalQuentities,setShowCart, toggleCartItemQuanitity } = useStateContext();

  const handleCheckout = async ()  => {
    const stripe = await getStripe();

    // now we are going to make api request to our own next.js backend

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });


  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
        <div className="cart-container">
          {/* This button is for getting back and showing all our add items number  */}
           <button 
           type='button'
           className="cart-heading"
           onClick={()=> setShowCart(false)}>
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({ totalQuentities } items)</span>
           </button>
           
           {/* This is ween we do not have any items in the cart then it gonna show this */}
           {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={140}/>
              <h3>Your shooping bag is empty</h3>
              <Link href="/" >
                <button type='button'
                onClick={()=> setShowCart(false)}
                className="btn"> Continue Shopping
                </button>
              </Link>
            </div>
           )}
    
           <div className="product-container">
            {cartItems.length >= 1 && cartItems.map((item, index)=> (
              <div className='product' key={index}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" />
                <div className="item-desc">
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>₹{item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                            <span className='minus' onClick={()=> toggleCartItemQuanitity(item._id, 'dec')}><AiOutlineMinus /></span>
                            <span className="num" >{item.quantity}</span>
                            <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                      </p>
                    </div>
                    <button type='button' className='remove-item' onClick={()=> onRemove(item)}>
                        <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div >
            ))}
           </div>
           {cartItems.length >= 1 && (
             <div className='cart-bottom'>
                <div className='total'>
                    <h3>Subtotal:</h3>
                    <h3>₹{totalPrice}</h3>
                </div>
                <div className='btn-container'>
                  <button type='button' className='btn' onClick={handleCheckout}>
                      Pay with Stripe
                  </button>
                </div>
             </div>
           )}
        </div>
    </div>
  )
}

export default Cart