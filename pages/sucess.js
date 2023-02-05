import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '@/context/StateContaext';

const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  return (
    <div className='sucess-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your Order!</h2>
            <p className='email-msg'>Check your email inbox for the receipt.</p>
            <p className='description'>
                If you hae any question please email
                <a className='email' href='mailto:ankitcode93@gmail.com'>
                    ankitcode93@gmail.com
                </a>
            </p>
            <Link href="/">
             <button type='button' width="300px" className='btn'>
                Continue Shooping
             </button>
            </Link>
        </div>
    </div>
  )
}

export default Success