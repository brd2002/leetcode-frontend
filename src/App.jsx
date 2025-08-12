import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./Components/NavBar.jsx";
import MainHeroSection from "./Components/Hero-Components/MainHeroSection.jsx";
import ProgrammingLanguageClock from "./Components/MidSection-Component/MidSection.jsx";


function App() {
  return (
   <>
       <div className="">
           <NavBar />
           <MainHeroSection/>
           <ProgrammingLanguageClock/>
       </div>

   </>
  )
}

export default App
