import React, { useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
    DollarSign, 
    Package, 
    Clock, 
    Send, 
    ArrowLeft,
    AlertCircle,
    Check,
    FileText,
    Calendar,
    Truck,
    Calculator  
  } from 'lucide-react';
import { sendQuotation } from '../service/Quotation';


export default function SendQuotation() {

    const location = useLocation();
    const itemId = location.state?.itemId;
    const distributorId = localStorage.getItem("userId");
    const navigate = useNavigate();


    const orderData = {
        quantity: location.state?.quantity,
        unit: location.state?.unit || 'units',
        
    };

    const [formData, setFormData] = useState({
        price: '',
        availabilityStock: '',
        estimatedDeliveryTime: ''
      });
    
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [quotationSent, setQuotationSent] = useState(false);

      const validateField = (name, value) => {
        switch (name) {
          case 'price':
            const price = parseFloat(value);
            if (!value || isNaN(price) || price <= 0) {
              return 'Please enter a valid price greater than 0';
            }
            return '';
          case 'availabilityStock':
            const stock = parseInt(value);
            if (!value || isNaN(stock) || stock < 0) {
              return 'Please enter a valid stock quantity (0 or greater)';
            }
            return '';
          case 'estimatedDeliveryTime':
            if (!value) {
              return 'Please select an estimated delivery date';
            }
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
              return 'Delivery date cannot be in the past';
            }
            return '';
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
    
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        await sendQuotation(formData,distributorId,itemId);
        
        setQuotationSent(true);
        setIsSubmitting(false);
      };
 
      if (quotationSent) {
        return (
          <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full text-center border border-white/20">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Quotation Sent!</h2>
                <p className="text-white/80 mb-6">
                  Your quotation sent successfully!
                </p>
                <button
                  onClick={() => navigate("/quotations")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 mr-4"
                >
                  View Quotations
                </button>
                <button
                  onClick={() => navigate("/requestedOrders")} // Fixed navigation path
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold border mt-4 border-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Back to Orders
                </button>
              </div>
            </div>
          </>
        );
      }
    
      return (
        <>
          <Navbar />
          <div className="min-h-screen bg-gradient-to-br md:pt-25 pt-20 from-purple-900 via-blue-900 to-indigo-900 px-4 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header Section */}
              <div className="mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center mb-4">
                    <button 
                      onClick={() => navigate(-1)}
                      className="mr-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Send Quotation
                      </h1>
                      <p className="text-white/80 text-lg">
                        Provide pricing and availability details for order #{itemId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="grid grid-col-1 gap-8">
                {/* Order Details */}
               
    
                {/* Quotation Form */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center mb-6">
                    <Send className="w-6 h-6 text-purple-400 mr-3" />
                    <h2 className="text-2xl font-bold text-white">Quotation Details</h2>
                  </div>
    
                  <div className="space-y-6">
                    {/* Price Input */}
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Unit Price (LKR) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          step="0.01"
                          min="0"
                          className={`w-full bg-white/5 border ${errors.price ? 'border-red-400' : 'border-white/20'} rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.price}
                        </p>
                      )}
                    </div>
    
                    {/* Stock Availability */}
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Available Stock *
                      </label>
                      <div className="relative">
                        <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="number"
                          name="availabilityStock"
                          value={formData.availabilityStock}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          min="0"
                          className={`w-full bg-white/5 border ${errors.availabilityStock ? 'border-red-400' : 'border-white/20'} rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                          placeholder={`Available ${orderData.unit}`}
                        />
                      </div>
                      {errors.availabilityStock && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.availabilityStock}
                        </p>
                      )}
                    </div>
    
                    {/* Delivery Date */}
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Estimated Delivery Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="date"
                          name="estimatedDeliveryTime"
                          value={formData.estimatedDeliveryTime}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full bg-white/5 border ${errors.estimatedDeliveryTime ? 'border-red-400' : 'border-white/20'} rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 [color-scheme:dark]`}
                          placeholder="Select delivery date"
                        />
                      </div>
                      {errors.estimatedDeliveryTime && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.estimatedDeliveryTime}
                        </p>
                      )}
                    </div>
    
                    {/* Quote Summary */}
                    {formData.price && formData.availabilityStock && (
                      <div className="bg-white/5 rounded-2xl p-6 mt-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Calculator className="w-5 h-5 mr-2" />
                          Quote Summary
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-white/80">
                            <span>Unit Price:</span>
                            <span>LKR {parseFloat(formData.price || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-white/80">
                            <span>Requested Quantity:</span>
                            <span>{orderData.quantity} {orderData.unit}</span>
                          </div>
                          <div className="flex justify-between text-white/80">
                            <span>Available Stock:</span>
                            <span>{formData.availabilityStock} {orderData.unit}</span>
                          </div>
                          {formData.estimatedDeliveryTime && (
                            <div className="flex justify-between text-white/80">
                              <span>Delivery Date:</span>
                              <span>{new Date(formData.estimatedDeliveryTime).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}</span>
                            </div>
                          )}
                          <div className="border-t border-white/20 pt-3">
                            <div className="flex justify-between text-white font-bold text-lg">
                              <span>Total Quote:</span>
                              <span>LKR {(parseFloat(formData.price || 0) * orderData.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
    
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Sending Quotation...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Send Quotation
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }