import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { getApprovedOrders } from '../service/OrderItemService';
import { Package, MapPin, Clock, DollarSign, Hash, ShoppingCart } from 'lucide-react';


export default function NewOrders() {

    const [orders, setOrders] = useState([]);
    const distributorId = localStorage.getItem('userId');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchingOrders = async () => {
          try {
            setLoading(true);
            const response = await getApprovedOrders(distributorId);

            setTimeout(() => {
                setOrders(response);
                setLoading(false);
              }, 500);

            setError(null);
          } catch (e) {
            console.error("error in fetching orders : ", e);
            if (e.response && e.response.status === 404) {
                // Treat as no approved orders
                setOrders([]);
                setError(null);
            }else {
                setError("Failed to fetch orders. Please try again later.");
              }
          } finally {
            setLoading(false);
          }
        };
        fetchingOrders();
      }, []);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/images/placeholder.jpg';
        
        if (imagePath.startsWith('http')) {
          return imagePath;
        }
        
        const baseUrl = 'https://localhost:7217'; 
        return `${baseUrl}/images/${imagePath}`;
      };
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading approved orders...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-8 border border-red-300/30 max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-red-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Error Loading Orders</h3>
              <p className="text-red-200 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Approved Orders
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Manage and track your approved orders with real-time updates
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4 text-blue-200">
              <div className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>{orders.length} Orders</span>
              </div>
              <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                <span>Ready for Processing</span>
              </div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">No Approved Orders</h3>
              <p className="text-blue-200">You don't have any approved orders at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <div
                  key={order.itemId}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
                >
                  {/* Product Image */}
                  <div className="relative mb-6">
                    <div className="aspect-w-16 aspect-h-12 rounded-xl overflow-hidden bg-gray-200">
                      <img
                        src={getImageUrl(order.productImage)}
                        alt={order.itemName}
                        className="w-full h-48 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Approved
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {order.itemName}
                      </h3>
                    </div>

                    {/* Item ID & Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-200">
                        <Hash className="w-4 h-4 mr-2" />
                        <span className="text-sm">ID: {order.itemId}</span>
                      </div>
                      <div className="flex items-center text-blue-200">
                        <Package className="w-4 h-4 mr-2" />
                        <span className="text-sm">Qty: {order.quantity}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center text-green-300">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="text-2xl font-bold">${order.price}</span>
                      <span className="text-sm text-blue-200 ml-2">
                        (Total: ${(order.price * order.quantity).toFixed(2)})
                      </span>
                    </div>

                    {/* Delivery Time */}
                    <div className="flex items-center text-yellow-300">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">Delivery: {order.deliveryTime}</span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start text-blue-200">
                      <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm line-clamp-2">{order.address}</span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
