import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Package, MapPin, Clock, CheckCircle, XCircle, Truck, Search, Filter, Calendar, Loader2 } from 'lucide-react';
import { getMyOrders } from '../service/OrderService';

export default function MyOrders() {
    const userId = localStorage.getItem("userId");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        const fetchMyOrders = async () => {
            if (!userId) {
                setError("User not found. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await getMyOrders(userId);
                setOrders(response || []);
            } catch (e) {
                console.error("Error fetching orders:", e);
                setError("Failed to load orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchMyOrders();
    }, [userId]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/images/placeholder.jpg';
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        const baseUrl = 'https://localhost:7217';
        return `${baseUrl}/images/${imagePath}`;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered':
                return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'In Transit':
                return <Truck className="w-5 h-5 text-blue-400" />;
            case 'Processing':
                return <Clock className="w-5 h-5 text-yellow-400" />;
            case 'Cancelled':
                return <XCircle className="w-5 h-5 text-red-400" />;
            default:
                return <Package className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'confirmed':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'Cancelled':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statusOptions = ['All', 'Delivered', 'confirmed', 'Pending', 'Cancelled'];

    // Loading Component
    const LoadingComponent = () => (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Loading your orders...</h3>
            <p className="text-blue-200">Please wait while we fetch your order history</p>
        </div>
    );

    // Error Component
    const ErrorComponent = () => (
        <div className="text-center py-16">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Orders</h3>
            <p className="text-blue-200 mb-4">{error}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900">
                <div className="relative">
                    <div className="absolute inset-0 "></div>
                    <div className="relative px-6 py-8">
                        <div className="max-w-6xl flex flex-col items-center mx-auto">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
                                <p className="text-blue-200">Track and manage your recent purchases</p>
                            </div>

                            {/* Loading State */}
                            {loading && <LoadingComponent />}

                            {/* Error State */}
                            {error && !loading && <ErrorComponent />}

                            {/* Content - only show when not loading and no error */}
                            {!loading && !error && (
                                <>
                                    {/* Search and Filter */}
                                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search orders..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="relative">
                                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent appearance-none cursor-pointer"
                                            >
                                                {statusOptions.map(status => (
                                                    <option key={status} value={status} className="bg-gray-800 text-white">
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Orders Grid */}
                                    {filteredOrders.length > 0 ? (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {filteredOrders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:w-[500px] hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
                                                >
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        {/* Product Image */}
                                                        <div className="flex-shrink-0">
                                                            <div className="w-24 h-24 bg-white/20 rounded-xl overflow-hidden border border-white/10">
                                                                <img
                                                                    src={getImageUrl(order.productImage)}
                                                                    alt={order.itemName || 'Product'}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.src = '/images/placeholder.jpg';
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Order Details */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <h3 className="text-lg font-bold text-white truncate pr-2">
                                                                    {order.itemName || 'Unknown Item'}
                                                                </h3>
                                                                <span className="text-[16px] mt-1 font-medium text-green-300 whitespace-nowrap">
                                                                    {order.price || 'N/A'}
                                                                </span>
                                                            </div>

                                                            {/* Quantity */}
                                                            <div className="flex items-center mb-3">
                                                                <Package className="w-4 h-4 text-blue-300 mr-2" />
                                                                <span className="text-blue-200 text-sm">
                                                                    Quantity: <span className="font-semibold text-white">{order.quantity || 0}</span>
                                                                </span>
                                                            </div>

                                                            {/* Status and Order Date */}
                                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                                                <div className="flex items-center">
                                                                    {getStatusIcon(order.status)}
                                                                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                                        {order.status || 'Unknown'}
                                                                    </span>
                                                                </div>
                                                                
                                                            </div>

                                                            {/* Delivery Time */}
                                                            {order.deliveryTime && (
                                                                <div className="flex items-center mb-4">
                                                                    <Calendar className="w-4 h-4 text-green-300 mr-2" />
                                                                    <span className="text-green-200 text-sm">
                                                                        <span className="font-medium">Delivery:</span> {order.deliveryTime}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Address */}
                                                            {order.address && (
                                                                <div className="flex items-start">
                                                                    <MapPin className="w-4 h-4 text-purple-300 mr-2 mt-0.5 flex-shrink-0" />
                                                                    <span className="text-purple-200 text-sm leading-relaxed">
                                                                        {order.address}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        /* Empty State */
                                        <div className="text-center py-16">
                                            <Package className="w-16 h-16 text-white/40 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
                                            <p className="text-blue-200">
                                                {orders.length === 0 
                                                    ? "You haven't placed any orders yet" 
                                                    : "Try adjusting your search or filter criteria"
                                                }
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}