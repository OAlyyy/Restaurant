import React from 'react'
import {Banner} from "../components/Banner.jsx";
import {ProductsPreview} from '../components/ProductsPreview.jsx';


const Home =()=> {
  return (
    <div className='homePage'>
     <Banner/>
     <ProductsPreview/>
    </div>
    
  )
}

export default Home
