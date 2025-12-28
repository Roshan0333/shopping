import { useState } from 'react'
import './App.css'
import ItemPage from './pages/itemPage/itemPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/buyPage/buyPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ItemPage/>}/>
          <Route path="/bugPage" element={<BuyPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
