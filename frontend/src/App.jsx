import { useState } from 'react'
import './App.css'
import ItemPage from './pages/itemPage/itemPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/buyPage/buyPage';
import Login from './pages/auth/login/login';
import Signup from './pages/auth/signup/signup';
import CartPage from './pages/cartPage/cart';

function App() {
  
  let getToken = localStorage.getItem("Token");

  return (
    <>
      <Router>
        <Routes>
          {!getToken && <Route path='/' element={<Login/>}/>}
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>

          {getToken && <Route path='/' element={<ItemPage/>}/>}
          <Route path='/itemPage' element={<ItemPage/>}/>
          <Route path="/bugPage" element={<BuyPage/>}/>
          <Route path='/cartPage' element={<CartPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
