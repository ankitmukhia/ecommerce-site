import React from 'react'


/* importing client from sanity from client Folder */
import { client } from  '../lib/client'

import { HeroBanner, FooterBanner, Product} from '../components'

const Home = ({products, bannerData}) =>(
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className="products-heading">
        <h2>Best Seeling Products</h2>
        <p>Best Seeling Products</p>
      </div>

      <div className="products-container">
        {products?.map( (product)=> <Product 
        key={product._id} product={product}/>)}
      </div>


      <FooterBanner footerBanner={bannerData && bannerData[0]}
      />
    </div>
  )
/* In next js we use something call getServerSideProps for fatching data 
Here we are doing the same fatching data from sanity data from database */
export const getServerSideProps = async () => {
  /* Here we are forming sanity query */
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

/* Whatever getServerSideProps returns that gets populated into our function */
  return{
    props: {products, bannerData}
  }
}

export default Home