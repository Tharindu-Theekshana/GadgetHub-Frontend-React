import React, { useState } from 'react';
import { MapPin, Check, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../service/OrderService';



export default function PlaceOrder() {

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'address':
        return value.length < 10 ? 'Please enter a complete address' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = await placeOrder(formData.address,userId);
    alert(response.message);
    setOrderPlaced(true);
    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full text-center border border-white/20">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Order Placed!</h2>
            <p className="text-white/80 mb-6">
              Thank you for your order. We'll deliver to your specified address.
            </p>
            <button
              onClick={() => {navigate("/myOrders")}}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              View Order Status
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br pt-30 from-purple-900 via-blue-900 to-indigo-900 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Your Order
            </h1>
            <p className="text-white/80 text-lg">
              Enter your delivery address to place your order
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Delivery Address</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full bg-white/5 border ${errors.address ? 'border-red-400' : 'border-white/20'} rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none`}
                    placeholder="Enter your complete delivery address including street, building number, apartment, city, zip code, and any special delivery instructions..."
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>

                
                

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Order...
                    </div>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}