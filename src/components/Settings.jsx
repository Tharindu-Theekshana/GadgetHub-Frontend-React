import React, { useState } from 'react'
import Navbar from './Navbar'
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  MapPin, 
  Shield, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'address', label: 'Addresses', icon: MapPin }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSave = () => {
    // Add save logic here
    console.log('Saving settings:', formData);
  };

  const handleDeleteAccount = () => {
    // Add delete account logic here
    console.log('Deleting account...');
    setShowDeleteModal(false);
  };

  const DeleteAccountModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/20">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
          <h3 className="text-xl font-bold text-white">Delete Account</h3>
        </div>
        
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete your account? This action cannot be undone and you will lose all your data permanently.
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-medium mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
        />
      </div>
      <div className="mt-12 pt-8 border-t border-red-500/30">
        <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <div className="flex items-start justify-between">
            <div>
                <h3 className="text-xl font-bold text-red-300 mb-2">Danger Zone</h3>
                <p className="text-red-200 mb-4">
                Once you delete your account, there is no going back. Please be certain.
                </p>
            </div>
            </div>
            <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
            >
            <Trash2 className="w-5 h-5 mr-2" />
            Delete Account
            </button>
        </div>
        </div>
    </div>
    
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">Current Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.currentPassword}
            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
            placeholder="Enter current password"
            className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">New Password</label>
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => handleInputChange('newPassword', e.target.value)}
          placeholder="Enter new password"
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-white font-medium mb-2">Confirm New Password</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          placeholder="Confirm new password"
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
        />
      </div>
      
      {/* Two-Factor Authentication */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Two-Factor Authentication</h4>
            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            Enable
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div>
            <h4 className="text-white font-medium capitalize">{key} Notifications</h4>
            <p className="text-gray-400 text-sm">
              Receive {key} notifications about orders and updates
            </p>
          </div>
          <button
            onClick={() => handleNotificationChange(key)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              value ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white font-medium mb-4">Saved Payment Methods</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-white">•••• •••• •••• 1234</p>
                <p className="text-gray-400 text-sm">Expires 12/25</p>
              </div>
            </div>
            <button className="text-red-400 hover:text-red-300">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          Add Payment Method
        </button>
      </div>
    </div>
  );

  const renderAddressSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white font-medium mb-4">Saved Addresses</h4>
        <div className="space-y-3">
          <div className="flex items-start justify-between p-3 bg-white/10 rounded-lg">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
              <div>
                <p className="text-white font-medium">Home</p>
                <p className="text-gray-400 text-sm">123 Main Street, City, State 12345</p>
              </div>
            </div>
            <button className="text-red-400 hover:text-red-300">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          Add Address
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'payment':
        return renderPaymentSettings();
      case 'address':
        return renderAddressSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br pt-20 from-purple-900 via-blue-900 to-indigo-900">
        <div className="relative">
          <div className="absolute inset-0"></div>
          <div className="relative px-6 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-blue-200">Manage your account preferences and settings</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8">
                    <nav className="space-y-2">
                      {settingsTabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                              activeTab === tab.id
                                ? 'bg-white/20 text-white border border-white/30'
                                : 'text-blue-200 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <IconComponent className="w-5 h-5 mr-3" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        {settingsTabs.find(tab => tab.id === activeTab)?.label}
                      </h2>
                      <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>

                    {renderTabContent()}

                    {/* Danger Zone - Delete Account */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && <DeleteAccountModal />}
    </>
  );
}