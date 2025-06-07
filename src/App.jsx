import React from 'react'

import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AI_Suggetion from './pages/AI_Suggetion'
import VirtualTryOn from './pages/VirtualTryOn'
import Cart from './pages/Cart'
import { Routes, Route } from 'react-router-dom'



const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/ai_suggetions" element={<AI_Suggetion />} />
        <Route path="/virtual_try_on" element={<VirtualTryOn />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

    </>

  )
}

export default App
