import React,{useState} from 'react'
import'./Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = ({searchquery,recent1, recent2 ,setRecent1, setRecent2}) => {

  const[category,setCategory] = useState("All")

  return (
    <div>
      
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}  setRecent1={setRecent1} setRecent2={setRecent2}/>
      <FoodDisplay category={category} searchquery={searchquery} recent1={recent1} recent2={recent2} />
      <AppDownload/>
    </div>
  )
}

export default Home
