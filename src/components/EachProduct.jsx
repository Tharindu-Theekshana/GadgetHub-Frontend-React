import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import { getById } from '../service/ProductService';
import { ArrowLeft, Package, Image as ImageIcon, FileText, Star, ShoppingCart, Heart, Share2, Zap, Camera } from 'lucide-react';
import { addTOCart } from '../service/OrderItemService';


export default function EachProduct() {

    const location = useLocation();
    const id = location.state?.id;
    const [product,setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [quantities, setQuantities] = useState({}); 
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProduct = async () => {
            
            try {
                const response = await getById(id);
                
                setTimeout(() => {
                    setProduct(response)
                    setLoading(false);
                  }, 500);
                setError(null);
                console.log(response)
                
            } catch (e) {
                console.error("error in fetching products ", e);
                setError("Failed to fetch product details. Please try again later.");
            }finally {
                setLoading(false);
              }
        };
        fetchProduct();
    }, [id]);

    

      const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
      };
    
      const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
      };
    
      const handleGoBack = () => {
        window.history.back();

      };

      const updateQuantity = (productId, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 99) { // Set reasonable limits
            setQuantities(prev => ({
                ...prev,
                [productId]: newQuantity
            }));
        }
    };

      const handleAddToCart = async () => {
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
    
      if (loading) {
        return (
          <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading product details...</p>
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
                  <h3 className="text-xl font-semibold text-white mb-2">Error Loading Product</h3>
                  <p className="text-red-200 mb-4">{error}</p>
                  <div className="space-y-2">
                    <button 
                      onClick={() => window.location.reload()}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                    <button 
                      onClick={handleGoBack}
                      className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
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
              
              {/* Back Button */}
              <button
                onClick={handleGoBack}
                className="flex items-center text-blue-200 hover:text-white transition-colors mb-8 group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                <span>Back to Products</span>
              </button>
    
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                
                {/* Product Image Section */}
                <div className="space-y-6">
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative">
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                          <Camera className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    
                      <img
                        src={`https://localhost:7217/images/${product.image}`}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                      
                      
                      
                    </div>
                  </div>
    
                  
                  
                </div>
    
                {/* Product Details Section */}
                <div className="space-y-8">
                  
                  {/* Product Title & Rating */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {product.name}
                      </h1>
                      {product.inStock && (
                        <div className="flex items-center bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                          <Zap className="w-4 h-4 mr-1" />
                          In Stock
                        </div>
                      )}
                    </div>
                    
                    
                  </div>
    
                  {/* Price */}
                  
    
                  {/* Description */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <FileText className="w-6 h-6 text-blue-300 mr-3" />
                      <h2 className="text-2xl font-bold text-white">Description</h2>
                    </div>
                    <p className="text-blue-100 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
    
                  {/* Product Details */}
                  {(product.brand || product.category) && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-4">Product Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {product.brand && (
                          <div>
                            <span className="text-blue-300 font-medium">Brand:</span>
                            <p className="text-white">{product.brand}</p>
                          </div>
                        )}
                        {product.category && (
                          <div>
                            <span className="text-blue-300 font-medium">Category:</span>
                            <p className="text-white">{product.category}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
    
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
