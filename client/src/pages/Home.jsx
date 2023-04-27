import React from 'react'
import {Banner} from "../components/Banner.jsx";
import {About} from "../components/About.jsx";
import {ProductsPreview} from '../components/ProductsPreview.jsx';


const Home =()=> {
  return (
    <>
     <Banner/>
     <ProductsPreview/>
     <About/>
    </>
  )
}

export default Home
