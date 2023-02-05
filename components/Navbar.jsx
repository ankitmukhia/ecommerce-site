import React from 'react'
import Link from 'next/link';
/* Here we are importing our shooping Iceon from react itself */
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';

import { useStateContext } from '@/context/StateContaext';

const Navebar = () => {
  const { showCart, setShowCart, totalQuentities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">City Super Bazar</Link>
      </p>
      <button type='button' className="cart-icon" onClick={() => setShowCart (true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuentities}</span>
      </button>

     {showCart && <Cart />}
    </div>
  )
}

export default Navebar