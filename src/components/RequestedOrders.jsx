import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { getConfirmedOrders } from '../service/OrderItemService';
import { 
    Package, 
    MapPin, 
    Send, 
    Eye,
    Filter,
    Search,
    Calendar,
    User,
    Hash
  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
  

export default function RequestedOrders() {

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(()=>{
        const fetchOrders = async () => {
            try{
                setLoading(true);
                const response = await getConfirmedOrders();
                
                setTimeout(() => {
                    setOrders(response);
                    setFilteredOrders(orders);
                    setLoading(false);
                  }, 500);

            }catch(e){
                console.error("error fetching orders : ",e);
                setLoading(false);
            }
        };
        fetchOrders();
    },[]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/images/placeholder.jpg';
        
        if (imagePath.startsWith('http')) {
          return imagePath;
        }
        
        const baseUrl = 'https://localhost:7217'; 
        return `${baseUrl}/images/${imagePath}`;
      };

      useEffect(() => {
        let filtered = orders;
        
        // Filter by search term
        if (searchTerm) {
          filtered = filtered.filter(order =>
            order.itemName.toLowerCase().includes(searchTerm.toLowerCase())
            
          );
        }
        
        // Filter by status
        if (statusFilter !== 'all') {
          filtered = filtered.filter(order => order.status === statusFilter);
        }
        
        setFilteredOrders(filtered);
      }, [searchTerm, statusFilter, orders]);

      const getStatusColor = (status) => {
        switch (status) {
          
          case 'confirmed':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
          default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
      };
    
      const formatStatus = (status) => {
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      };
    
      const handleSendQuotation = (itemId,quantity) => {
        navigate("/sendQuotation", {state: {itemId,quantity}})    
      };
    
      if (loading) {
        return (
          <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-center">Loading orders...</p>
              </div>
            </div>
          </>
        );
      }
    
      return (
        <>
          <Navbar />
          <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 px-4 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Requested Orders
                  </h1>
                  <p className="text-white/80 text-lg">
                    Manage and respond to customer order requests
                  </p>
                  <div className="mt-4 flex items-center space-x-4 text-white/60">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      <span>{filteredOrders.length} Orders</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Updated Today</span>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Filters and Search */}
              <div className="mb-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 appearance-none"
                        >
                          <option value="all">All Status</option>
                          
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Orders Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.itemId}
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                       
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {formatStatus(order.status)}
                      </span>
                    </div>
    
                    {/* Product Image and Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <img
                          src={getImageUrl(order.productImage)}
                          alt={order.itemName}
                          className="w-16 h-16 rounded-xl object-cover border border-white/20"
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg mb-1 truncate">
                          {order.itemName}
                        </h3>
                        <p className="text-white/70 text-sm">
                          Quantity: <span className="font-medium">{order.quantity}</span>
                        </p>
                      </div>
                    </div>
    
                    {/* Customer Info */}
                    <div className="mb-4">
                      <div className="flex items-center text-white/80 mb-2">
                        <User className="w-4 h-4 mr-2 text-purple-400" />
                        <span className="text-sm font-medium">{order.customerName}</span>
                      </div>
                      <div className="flex items-start text-white/70">
                        <MapPin className="w-4 h-4 mr-2 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-2">{order.address}</span>
                      </div>
                    </div>
    
                    {/* Request Date */}
                    <div className="mb-6">
                      <p className="text-white/60 text-xs">
                        Requested on {new Date(order.requestDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      
                      <button
                        onClick={() => handleSendQuotation(order.itemId,order.quantity)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
    
              {/* Empty State */}
              {filteredOrders.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
                    <Package className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">No Orders Found</h3>
                    <p className="text-white/70">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'No requested orders available at the moment'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      );
    }
