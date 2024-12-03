import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Restaurant {
  id: number
  name: string
  description: string
  cuisine: string
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // 模擬數據，實際項目中替換為真實API
        const mockRestaurants: Restaurant[] = [
          { id: 1, name: '意大利麵館', description: '正宗意大利風味', cuisine: '意大利' },
          { id: 2, name: '日式拉麵店', description: '道地日本拉麵', cuisine: '日式' },
          { id: 3, name: '中式小館', description: '家常川菜', cuisine: '中式' }
        ]
        setRestaurants(mockRestaurants)
        setLoading(false)
      } catch (error) {
        console.error('加載餐廳失敗', error)
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  if (loading) {
    return <div className="text-center mt-10">加載中...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">餐廳列表</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {restaurants.map(restaurant => (
          <div 
            key={restaurant.id} 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
            <p className="text-gray-600 mb-4">{restaurant.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {restaurant.cuisine}
              </span>
              <Link 
                to={`/restaurant/${restaurant.id}`} 
                className="text-blue-600 hover:underline"
              >
                查看詳情
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantList