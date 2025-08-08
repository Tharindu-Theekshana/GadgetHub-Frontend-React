import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { getQuotations } from '../service/Quotation';
import { 
    FileText, 
    DollarSign, 
    Package, 
    Calendar,
    Eye,
    Edit,
    Filter,
    Search,
    Clock,
    Hash,
    CheckCircle,
    XCircle,
    AlertCircle
  } from 'lucide-react';
import { useLocation } from 'react-router-dom';


export default function Quotations() {

    const [quotations, setQuotations] = useState([]);
    const distributorId = localStorage.getItem('userId');
    const [filteredQuotations, setFilteredQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchQuotations = async () => {
            try{
                setLoading(true);
                const response = await getQuotations(distributorId);
                
                setTimeout(() => {
                    setQuotations(response);
                    setFilteredQuotations(response);
                    setLoading(false);
                  }, 500);
            }catch(e){
                console.error("error in fetching quotations : ",e);
            }
        };
        fetchQuotations(); 
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
        let filtered = quotations;
        
        // Filter by search term
        if (searchTerm) {
          filtered = filtered.filter(quotation =>
            quotation.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) 
           
          );
        }
        
        // Filter by status
        if (statusFilter !== 'all') {
          filtered = filtered.filter(quotation => quotation.status === statusFilter);
        }
        
        setFilteredQuotations(filtered);
      }, [searchTerm, statusFilter, quotations]);
    
      const getStatusColor = (status) => {
        switch (status) {
          case 'pending':
            return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
          case 'accepted':
            return 'bg-green-500/20 text-green-400 border-green-500/30';
          case 'rejected':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
          default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
      };
    
      const getStatusIcon = (status) => {
        switch (status) {
          case 'pending':
            return <Clock className="w-4 h-4" />;
          case 'accepted':
            return <CheckCircle className="w-4 h-4" />;
          case 'rejected':
            return <XCircle className="w-4 h-4" />;
          default:
            return <AlertCircle className="w-4 h-4" />;
        }
      };
    
      const formatStatus = (status) => {
        if (!status) return 'Unknown';
        return status.charAt(0).toUpperCase() + status.slice(1);
      };
    
      const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      };
    
     
    
      if (loading) {
        return (
          <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-center">Loading quotations...</p>
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
                    My Quotations
                  </h1>
                  <p className="text-white/80 text-lg">
                    View and manage all your submitted quotations
                  </p>
                  <div className="mt-4 flex items-center space-x-4 text-white/60">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      <span>{filteredQuotations.length} Quotations</span>
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
                        placeholder="Search quotations..."
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
                          <option value="all" className='bg-indigo-900'>All Status</option>
                          <option value="pending" className='bg-indigo-900'>Pending</option>
                          <option value="accepted" className='bg-indigo-900'>Accepted</option>
                          <option value="rejected" className='bg-indigo-900'>Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Quotations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredQuotations.map((quotation) => (
                  <div
                    key={quotation.quotationId}
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                  >
                    {/* Quotation Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Hash className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-semibold">{quotation.quotationId}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(quotation.status)}`}>
                        {getStatusIcon(quotation.status)}
                        <span>{formatStatus(quotation.status)}</span>
                      </span>
                    </div>
    
                    {/* Product Image and Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <img
                          src={getImageUrl(quotation.productImage)}
                          alt={quotation.itemName || 'Product'}
                          className="w-16 h-16 rounded-xl object-cover border border-white/20"
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg mb-1 truncate">
                          {quotation.itemName || 'Unknown Item'}
                        </h3>
                        <p className="text-white/70 text-sm">
                          Order Item: <span className="font-medium">{quotation.orderItemId}</span>
                        </p>
                      </div>
                    </div>
    
                    {/* Quotation Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/70">
                          <DollarSign className="w-4 h-4 mr-2 text-purple-400" />
                          <span className="text-sm">Price per unit</span>
                        </div>
                        <span className="text-white font-semibold">${quotation.price?.toFixed(2) || '0.00'}</span>
                      </div>
    
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/70">
                          <Package className="w-4 h-4 mr-2 text-purple-400" />
                          <span className="text-sm">Quantity</span>
                        </div>
                        <span className="text-white font-semibold">{quotation.quantity || 0}</span>
                      </div>
    
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/70">
                          <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                          <span className="text-sm">Delivery Date</span>
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {formatDate(quotation.estimatedDeliveryTime)}
                        </span>
                      </div>
                    </div>
    
                    {/* Total Value */}
                    <div className="bg-white/5 rounded-2xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 font-medium">Total Quote Value</span>
                        <span className="text-white font-bold text-xl">
                          ${((quotation.price || 0) * (quotation.quantity || 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                     
                    </div>
                  </div>
                ))}
              </div>
    
              {/* Empty State */}
              {filteredQuotations.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
                    <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">No Quotations Found</h3>
                    <p className="text-white/70">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'No quotations available at the moment'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      );
    }
