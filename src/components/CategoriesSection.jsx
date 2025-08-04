import { Camera, Gamepad2, Headphones, Laptop, Phone, Watch } from 'lucide-react';
import React from 'react'

export default function CategoriesSection() {

    const categories = [
        { name: "Smartphones", icon: <Phone className="w-8 h-8" />, count: "2.5k+" },
        { name: "Laptops", icon: <Laptop className="w-8 h-8" />, count: "1.2k+" },
        { name: "Audio", icon: <Headphones className="w-8 h-8" />, count: "890+" },
        { name: "Wearables", icon: <Watch className="w-8 h-8" />, count: "650+" },
        { name: "Cameras", icon: <Camera className="w-8 h-8" />, count: "420+" },
        { name: "Gaming", icon: <Gamepad2 className="w-8 h-8" />, count: "1.8k+" }
      ];

  return (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Explore our vast collection of premium gadgets</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform flex justify-center">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
