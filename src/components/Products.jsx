import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { getAllProducts } from '../service/ProductService';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import api from '../service/api';
import { addTOCart } from '../service/OrderItemService';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({}); // Track quantities for each product

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('userId');

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/images/placeholder.jpg';
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        const baseUrl = 'https://localhost:7217'; 
        return `${baseUrl}/images/${imagePath}`;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getAllProducts();

                setTimeout(() => {
                    setProducts(response);
                    // Initialize quantities to 1 for each product
                    const initialQuantities = {};
                    response.forEach(product => {
                        initialQuantities[product.id] = 1;
                    });
                    setQuantities(initialQuantities);
                    setLoading(false);
                }, 300);

            } catch (e) {
                console.error("error in fetching products ", e);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 99) { // Set reasonable limits
            setQuantities(prev => ({
                ...prev,
                [productId]: newQuantity
            }));
        }
    };

    const incrementQuantity = (productId) => {
        updateQuantity(productId, (quantities[productId] || 1) + 1);
    };

    const decrementQuantity = (productId) => {
        updateQuantity(productId, (quantities[productId] || 1) - 1);
    };

    const handleQuantityInputChange = (productId, value) => {
        const numValue = parseInt(value) || 1;
        updateQuantity(productId, numValue);
    };

    const handleAddToCart = async (product) => {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            alert("Login as customer to add product to cart.");
        } else {
            const quantity = quantities[product.id] || 1;
            console.log('Added to cart:', { ...product, quantity });
            
            try {
                
                const productWithQuantity = { ...product, quantity };
                const response = await addTOCart(productWithQuantity, userId);
                  
                alert(`Added ${quantity} ${product.name}(s) to cart!`);
                
                // Reset quantity to 1 after adding
                updateQuantity(product.id, 1);
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Failed to add product to cart. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
                {/* Page Header */}
                <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Our Products
                            </h1>
                            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                                Discover our carefully curated collection of premium products
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            /* Loading Skeleton */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse border border-white/20">
                                        <div className="bg-white/20 h-48 rounded-xl mb-4"></div>
                                        <div className="bg-white/20 h-4 rounded mb-2"></div>
                                        <div className="bg-white/20 h-4 rounded w-3/4 mb-4"></div>
                                        <div className="bg-white/20 h-10 rounded-lg mb-2"></div>
                                        <div className="bg-white/20 h-10 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Products Grid */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <div 
                                        key={product.id} 
                                        className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105 border border-white/20 hover:border-white/30"
                                    >
                                        {/* Product Image */}
                                        <div className="relative mb-4 overflow-hidden rounded-xl">
                                            <img 
                                                src={getImageUrl(product.image)} 
                                                alt={product.name}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="space-y-4">
                                            <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-purple-200 transition-colors">
                                                {product.name}
                                            </h3>


                                            {/* Quantity Selector */}
                                            <div className="space-y-2">
                                                <label className="text-white text-sm font-medium">
                                                    Quantity
                                                </label>
                                                <div className="flex items-center space-x-3 md:mx-3 mx-9">
                                                    {/* Decrease Button */}
                                                    <button
                                                        onClick={() => decrementQuantity(product.id)}
                                                        disabled={quantities[product.id] <= 1}
                                                        className="w-10 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                                                    >
                                                        <Minus size={16} />
                                                    </button>

                                                    {/* Quantity Input */}
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="99"
                                                        value={quantities[product.id] || 1}
                                                        onChange={(e) => handleQuantityInputChange(product.id, e.target.value)}
                                                        className="w-30 h-8 text-center bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    />

                                                    {/* Increase Button */}
                                                    <button
                                                        onClick={() => incrementQuantity(product.id)}
                                                        disabled={quantities[product.id] >= 99}
                                                        className="w-10 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button 
                                                onClick={() => handleAddToCart(product)}
                                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                                            >
                                                <ShoppingCart size={18} />
                                                <span>
                                                    Add {quantities[product.id] > 1 ? `${quantities[product.id]} ` : ''}to Cart
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && products.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🛍️</div>
                                <h3 className="text-2xl font-semibold text-white mb-2">No Products Found</h3>
                                <p className="text-purple-200">Check back later for amazing products!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}