import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  FileText, 
  Settings, 
  Bell,
  TrendingUp,
  Users,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';



export default function DistributorDashboard() {
  const [userName] = useState("John Smith");
  const name = localStorage.getItem('name');
  const navigate = useNavigate();
  
  const dashboardCards = [
    {
      title: "Requested Orders",
      navigate: "/requestedOrders",
      subtitle: "Pending approval",
      icon: ShoppingCart,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      trend: "+12%"
    },
    {
      title: "Approved Orders",
      navigate: "/newOrders",
      subtitle: "Ready to process",
      icon: Package,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      trend: "+8%"
    },
    {
      title: "My Quotations",
      count: "42",
      navigate: "/quotations",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      trend: "+15%"
    },
    {
      title: "Settings",
      navigate: "/settings",
      subtitle: "Manage account",
      icon: Settings,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500/10",
      trend: ""
    }
  ];

  const quickStats = [
    {
      label: "Total Revenue",
      value: "$48,230",
      icon: DollarSign,
      change: "+12.5%"
    },
    {
      label: "Active Clients",
      value: "156",
      icon: Users,
      change: "+4.2%"
    },
    {
      label: "Growth Rate",
      value: "18.4%",
      icon: TrendingUp,
      change: "+2.1%"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br pt-20 md:pt-30 from-purple-900 via-blue-900 to-indigo-900 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Welcome back, {name}!
                  </h1>
                  <p className="text-white/80 text-lg">
                    Here's what's happening with your distribution business today.
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <div className="text-right">
                    <p className="text-white/60 text-sm">Today's Date</p>
                    <p className="text-white font-semibold text-lg">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                    <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-emerald-400 text-sm mt-1 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <div 
                key={index}
                onClick={()=> {navigate(card.navigate)}}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${card.bgColor}`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  {card.trend && (
                    <div className="text-emerald-400 text-sm font-semibold bg-emerald-400/10 px-3 py-1 rounded-full">
                      {card.trend}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-white text-xl font-bold">{card.title}</h3>
                  <div className="flex items-baseline space-x-2">
                  </div>
                  <p className="text-white/70 text-sm">{card.subtitle}</p>
                </div>

                <div className="mt-6 flex items-center text-white/60 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">View details</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

         
        </div>
      </div>
    </>
  );
}