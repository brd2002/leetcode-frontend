import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./Components/NavBar.jsx";
import MainHeroSection from "./Components/Hero-Components/MainHeroSection.jsx";

function App() {
  return (
   <>
       <div className="">
           <NavBar />
           <MainHeroSection/>
           {/*<h1 className="font-[Monolisa]"> Hello world</h1>*/}
       </div>
   </>
  )
}

export default App
