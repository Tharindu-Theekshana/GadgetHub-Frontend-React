import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { ShoppingCart, Package, Clock, Plus, Minus, Trash2, Calendar, Loader2, XCircle } from 'lucide-react';
import { getOrderItems } from '../service/OrderItemService';

export default function MyCart() {
    const userId = localStorage.getItem("userId");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getOrderItems(userId);
                console.log('Cart items response:', response); // Debug log
                setCartItems(response || []);
            } catch (e) {
                console.error("Error fetching cart items:", e);
                setError("Failed to load cart items. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, [userId]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/images/placeholder.jpg';
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        const baseUrl = 'https://localhost:7217';
        return `${baseUrl}/images/${imagePath}`;
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
            case 'ready':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'pending':
            case 'processing':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'in cart':
            case 'draft':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) return;
        setCartItems(prev => 
            prev.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (itemId) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price?.toString().replace('$', '') || 0);
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    // Loading Component
    const LoadingComponent = () => (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Loading your cart...</h3>
            <p className="text-blue-200">Please wait while we fetch your items</p>
        </div>
    );

    // Error Component
    const ErrorComponent = () => (
        <div className="text-center py-16">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Cart</h3>
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
                    <div className="absolute inset-0"></div>
                    <div className="relative px-6 py-8">
                        <div className="max-w-6xl mx-auto">
                            {/* Header */}
                            <div className="mb-8 flex flex-col items-center">
                                <div className="flex items-center mb-4">
                                    <ShoppingCart className="w-8 h-8 text-white mr-3" />
                                    <h1 className="text-3xl font-bold text-white">My Cart</h1>
                                </div>
                                <p className="text-blue-200">Review and manage your selected items</p>
                            </div>

                            {/* Loading State */}
                            {loading && <LoadingComponent />}

                            {/* Error State */}
                            {error && !loading && <ErrorComponent />}

                            {/* Content - only show when not loading and no error */}
                            {!loading && !error && (
                                <>
                                    {cartItems.length > 0 ? (
                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                            {/* Cart Items */}
                                            <div className="xl:col-span-2 space-y-6">
                                                {cartItems.map((item, index) => (
                                                    <div
                                                        key={item.id || index}
                                                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
                                                    >
                                                        <div className="flex flex-col lg:flex-row gap-6">
                                                            {/* Product Image */}
                                                            <div className="flex-shrink-0">
                                                                <div className="w-32 h-32 bg-white/20 rounded-xl overflow-hidden border border-white/10">
                                                                    <img
                                                                        src={getImageUrl(item.productImage)}
                                                                        alt={item.itemName || 'Product'}
                                                                        className="w-full h-full object-cover"
                                                                        onError={(e) => {
                                                                            e.target.src = '/images/placeholder.jpg';
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Item Details */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                                                                    <div>
                                                                        <h3 className="text-xl font-semibold text-white mb-2">
                                                                            {item.itemName || item.productName || 'Unknown Item'}
                                                                        </h3>
                                                                        
                                                                        {/* Price */}
                                                                        <div className="text-2xl font-bold text-green-300 mb-3">
                                                                            ${item.price || '0.00'}
                                                                        </div>
                                                                    </div>

                                                                    {/* Remove Button */}
                                                                    <button
                                                                        onClick={() => removeItem(item.id)}
                                                                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors border border-red-500/30 hover:border-red-500/50"
                                                                    >
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </div>

                                                                {/* Status */}
                                                                {item.status && (
                                                                    <div className="flex items-center mb-3">
                                                                        <Package className="w-4 h-4 text-blue-300 mr-2" />
                                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                                                                            {item.status}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {/* Delivery Time */}
                                                                {item.deliveryTime && (
                                                                    <div className="flex items-center mb-4">
                                                                        <Calendar className="w-4 h-4 text-green-300 mr-2" />
                                                                        <span className="text-green-200 text-sm">
                                                                            <span className="font-medium">Delivery:</span> {item.deliveryTime}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {/* Quantity Controls */}
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center space-x-3">
                                                                        <span className="text-white font-medium">Quantity:</span>
                                                                        <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                                                                            <button
                                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                                className="p-2 hover:bg-white/10 transition-colors rounded-l-lg"
                                                                                disabled={item.quantity <= 1}
                                                                            >
                                                                                <Minus className="w-4 h-4 text-white" />
                                                                            </button>
                                                                            <span className="px-4 py-2 text-white font-semibold min-w-[3rem] text-center">
                                                                                {item.quantity || 1}
                                                                            </span>
                                                                            <button
                                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                                className="p-2 hover:bg-white/10 transition-colors rounded-r-lg"
                                                                            >
                                                                                <Plus className="w-4 h-4 text-white" />
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    {/* Item Total */}
                                                                    <div className="text-right">
                                                                        <div className="text-sm text-blue-200">Subtotal:</div>
                                                                        <div className="text-lg font-bold text-white">
                                                                            ${((parseFloat(item.price?.toString().replace('$', '') || 0)) * item.quantity).toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Order Summary */}
                                            <div className="xl:col-span-1">
                                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8">
                                                    <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                                                    
                                                    <div className="space-y-4 mb-6">
                                                        <div className="flex justify-between text-blue-200">
                                                            <span>Items ({cartItems.length})</span>
                                                            <span>${calculateTotal()}</span>
                                                        </div>
                                                        <div className="flex justify-between text-blue-200">
                                                            <span>Shipping</span>
                                                            <span>Free</span>
                                                        </div>
                                                        <div className="flex justify-between text-blue-200">
                                                            <span>Tax</span>
                                                            <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                                                        </div>
                                                        <div className="border-t border-white/20 pt-4">
                                                            <div className="flex justify-between text-xl font-bold text-white">
                                                                <span>Total</span>
                                                                <span>${(parseFloat(calculateTotal()) + parseFloat(calculateTotal()) * 0.1).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105">
                                                            Proceed to Checkout
                                                        </button>
                                                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/20 hover:border-white/30">
                                                            Continue Shopping
                                                        </button>
                                                    </div>

                                                    {/* Estimated Delivery */}
                                                    <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                                                        <div className="flex items-center text-green-300 mb-2">
                                                            <Clock className="w-4 h-4 mr-2" />
                                                            <span className="font-medium">Estimated Delivery</span>
                                                        </div>
                                                        <p className="text-green-200 text-sm">
                                                            3-5 business days
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Empty Cart State */
                                        <div className="text-center py-20">
                                            <ShoppingCart className="w-20 h-20 text-white/40 mx-auto mb-6" />
                                            <h3 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h3>
                                            <p className="text-blue-200 mb-8 max-w-md mx-auto">
                                                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                                            </p>
                                            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105">
                                                Start Shopping
                                            </button>
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