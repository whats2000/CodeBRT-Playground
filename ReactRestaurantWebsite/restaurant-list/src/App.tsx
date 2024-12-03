import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RestaurantList from './pages/RestaurantList'
import RestaurantDetail from './pages/RestaurantDetail'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App