// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Navbar/Header/Header'
import ExplorerMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
        <Header/>
        <ExplorerMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} setCategory={setCategory} />
        
    </div>
  )
}

export default Home