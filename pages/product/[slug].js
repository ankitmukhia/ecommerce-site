/* The fact that is file is inside square bracket is, it's going to be dynamic */
import React, { useState } from 'react'

import { client, urlFor } from '../../lib/client'

import { Product } from '../../components'

import { useStateContext } from '../../context/StateContaext';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ProductDetails = ({ product, products}) => {
    /* Destructuring the values from the product */
    const { image, name, details, price} = product;

    const [index, setIndex] = useState(0)

    const {decQty, incQty, qty, onAdd } = useStateContext();
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} className="product-detail-image"/>
                </div>
                {/* This div is for image carousel */}
                <div className="small-images-container">
                    {image?.map((item, i)=> (
                        <img 
                        key={i}
                        src={urlFor(item)}
                        className={i === index ? "small-image selected-image" : "small-image"}
                        onMouseEnter={()=> setIndex(i)}
                        />
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
                        <p>  (20) </p>
                    </div>
                    <h4>Details : </h4>
                    <p>{details}</p>
                    <p className='price'>₹{price}</p>
                    <div className='quantity'>
                        <h3>Quantity: </h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={()=> onAdd(product, qty)}>Add to Cart</button>
                        <button type='button' className='buy-now'>Buy Now</button>
                    </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((item) =>(
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
        </div>
    </div>
  )
}
/* The question is how are we going to get specific picture data, example=> 
when we click to the headphone it should show to exact price that is Set
for that product same with Speaker */
 
/* well we can get it by making api call to get specific product */


export const getServerSideProps = async ({params: { slug }}) => { //* desteructure params and outside of the params we can get access to the actual url query
    /* This query is going to be used to fetch product details from the product page we are on */
    const query = `*[_type == "product" && slug.current == '${slug}'] [0]`;
    /* And the other hand we also want to fetch all similar products next line of cod is for that */
    const productsQuery = '*[_type == "product"]'
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
  /* Whatever getServerSideProps returns that gets populated into our function */
    return{
      props: {products, product}
    }
  }
export default ProductDetails