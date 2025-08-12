import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./Components/NavBar.jsx";
import MainHeroSection from "./Components/Hero-Components/MainHeroSection.jsx";
import ProgrammingLanguageClock from "./Components/MidSection-Component/MidSection.jsx";
import FooterComponent from "./Components/FooterSection/FooterComponent.jsx";


function App() {
  return (
   <>
           <div className="w-full">
               <NavBar />
               <MainHeroSection />
               <ProgrammingLanguageClock/>
               <FooterComponent/>
           </div>
   </>
  )
}

export default App
