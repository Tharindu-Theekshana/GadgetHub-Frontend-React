import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Settings, User, Bell, LogOut } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 1,
      title: "My Orders",
      icon: ShoppingBag,
      count: "12",
      description: "Track your recent orders",
      bgColor: "bg-gradient-to-br from-pink-500 to-rose-500",
      hoverColor: "hover:from-pink-600 hover:to-rose-600",
      navigate: "/myOrders"
    },
    {
      id: 2,
      title: "My Cart",
      icon: ShoppingCart,
      count: "3",
      description: "Items ready for checkout",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
      hoverColor: "hover:from-emerald-600 hover:to-teal-600",
      navigate: "/myCart"
    },
    {
      id: 3,
      title: "Settings",
      icon: Settings,
      count: "",
      description: "Manage your preferences",
      bgColor: "bg-gradient-to-br from-violet-500 to-purple-500",
      hoverColor: "hover:from-violet-600 hover:to-purple-600",
      navigate: "/settings"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 ">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0"></div>
        <div className="relative px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex md:justify-center justify-between items-center md:mb-16 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Welcome back, {name}!
                  </h1>
                  <p className="text-blue-200 mt-1">Ready to continue your journey?</p>
                </div>
              </div>
              
              
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {dashboardCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={()=> {navigate(card.navigate)}}
                    className={`${card.bgColor} ${card.hoverColor} rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {card.title}
                    </h3>
                    
                    <p className="text-white/80 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-white/60 group-hover:text-white/80 transition-colors">
                      <span className="text-sm font-medium">View details</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

           
          </div>
        </div>
      </div>
    </div>
    </>
  );
}