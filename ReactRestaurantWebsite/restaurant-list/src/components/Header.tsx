import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">餐廳列表</Link>
      </div>
    </header>
  )
}

export default Header