import React from 'react'
import { useParams } from 'react-router-dom'

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{id: string}>()

  // 模擬數據
  const restaurants = [
    { 
      id: 1, 
      name: '意大利麵館', 
      description: '正宗意大利風味', 
      cuisine: '意大利',
      address: '台北市大安區復興南路一段',
      phone: '02-1234-5678'
    },
    { 
      id: 2, 
      name: '日式拉麵店', 
      description: '道地日本拉麵', 
      cuisine: '日式',
      address: '台北市信義區信義路五段',
      phone: '02-8765-4321'
    }
  ]

  const restaurant = restaurants.find(r => r.id === parseInt(id || '0'))

  if (!restaurant) {
    return <div className="text-center mt-10">找不到餐廳</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {restaurant.cuisine}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
        
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">餐廳資訊</h2>
          <p><strong>地址：</strong>{restaurant.address}</p>
          <p><strong>電話：</strong>{restaurant.phone}</p>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail