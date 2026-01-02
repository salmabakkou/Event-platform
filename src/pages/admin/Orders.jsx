import React, { useState, useEffect } from 'react';
import { RefreshCw, User, Phone, Mail, DollarSign, Calendar, ChevronDown } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../../api/orders.api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating status');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'confirmed': return 'border-l-4 border-green-500 bg-green-50';
      case 'completed': return 'border-l-4 border-blue-500 bg-blue-50';
      case 'cancelled': return 'border-l-4 border-red-500 bg-red-50';
      default: return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto text-[#0b3d2e]" size={40} />
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900">Orders</h1>
              <p className="text-gray-600 text-center mt-1">{orders.length} total orders</p>
            </div>
            <button
              onClick={fetchOrders}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0b3d2e] text-white rounded-lg hover:bg-[#0a3528] transition-colors w-full md:w-auto"
            >
              <RefreshCw size={18} />
              Refresh Orders
            </button>
          </div>
        </div>

        {/* Mobile Cards & Desktop Table */}
        <div className="space-y-4 md:space-y-0">
          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                  {/* Status Bar */}
                  <div className={`px-4 py-3 ${getStatusColor(order.status)}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">{getStatusText(order.status)}</span>
                      <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {/* Customer Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#0b3d2e]/10 flex items-center justify-center">
                        <User size={20} className="text-[#0b3d2e]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 truncate">{order.customer?.fullName || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <DollarSign size={16} className="text-[#0b3d2e]" />
                          <span className="font-bold text-[#0b3d2e]">
                            {order.totalAmount?.toFixed(2)} MAD
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400" />
                        <span className="text-sm truncate">{order.customer?.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-sm truncate">{order.customer?.email || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b3d2e] focus:border-[#0b3d2e] outline-none appearance-none bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        {/* Status Column with Dropdown */}
                        <td className="px-6 py-4">
                          <div className="relative w-40">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0b3d2e] focus:border-[#0b3d2e] outline-none appearance-none ${getStatusColor(order.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
                          </div>
                        </td>

                        {/* Customer Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#0b3d2e]/10 flex items-center justify-center mr-3">
                              <User size={18} className="text-[#0b3d2e]" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">
                                {order.customer?.fullName || 'N/A'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {order.items?.length || 0} items
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Column */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-gray-400" />
                              <span>{order.customer?.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              <span className="truncate max-w-[200px]">
                                {order.customer?.email || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Amount Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-[#0b3d2e]" />
                            <span className="font-bold text-[#0b3d2e]">
                              {order.totalAmount?.toFixed(2)} MAD
                            </span>
                          </div>
                        </td>

                        {/* Date Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}