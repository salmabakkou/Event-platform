import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ShoppingBag, 
  Clock,
  DollarSign,
  Plus,
  ChevronRight,
  MapPin,
  Tag,
  Users
} from 'lucide-react';
import { getEvents } from '../../api/events.api';
import { getAllOrders } from '../../api/orders.api';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const eventsRes = await getEvents();
      const events = eventsRes.data || [];
      
      const ordersRes = await getAllOrders();
      const orders = ordersRes.data || [];
      
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      
      setStats({
        totalEvents: events.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        pendingOrders: pendingOrders
      });
      
      const sortedEvents = [...events]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
      setRecentEvents(sortedEvents);
      
      const sortedOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
      setRecentOrders(sortedOrders);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8B1E1E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-center">Overview of your platform</p>
        </div>

        {/* Stats Cards - Style luxe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Events Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <div className="p-3 bg-[#0B3D2E]/10 rounded-xl">
                <Calendar className="text-[#0B3D2E]" size={24} />
              </div>
            </div>
            <Link 
              to="/admin/eventList" 
              className="text-sm text-[#0B3D2E] hover:text-[#8B1E1E] font-medium flex items-center gap-1"
            >
              View events <ChevronRight size={16} />
            </Link>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
            </div>
            <Link 
              to="/admin/orders" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View orders <ChevronRight size={16} />
            </Link>
          </div>

          {/* Pending Orders Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className={`text-sm font-medium ${stats.pendingOrders > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
              {stats.pendingOrders > 0 ? 'Action needed' : 'All clear'}
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)} MAD</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              All time sales
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/admin/addEvent"
              className="bg-gradient-to-r from-[#0B3D2E] to-[#1a5c48] text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Plus size={20} />
                </div>
                <h3 className="font-bold text-lg">New Event</h3>
              </div>
              <p className="text-white/80 text-sm">Create a new event</p>
            </Link>

            <Link 
              to="/admin/eventList"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-[#0B3D2E]/10 rounded-lg">
                  <Calendar className="text-[#0B3D2E]" size={20} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Manage Events</h3>
              </div>
              <p className="text-gray-600 text-sm">Edit or delete events</p>
            </Link>

            <Link 
              to="/admin/orders"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="text-blue-600" size={20} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Manage Orders</h3>
              </div>
              <p className="text-gray-600 text-sm">Process orders</p>
            </Link>
          </div>
        </div>

        {/* Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Events */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Events</h2>
              <Link 
                to="/admin/eventList" 
                className="text-sm text-[#0B3D2E] hover:text-[#8B1E1E] font-medium"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No events yet</p>
              ) : (
                recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#0B3D2E]/10 rounded-lg flex items-center justify-center">
                        <Calendar className="text-[#0B3D2E]" size={20} />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Clock size={12} />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#0B3D2E]">{event.price} MAD</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link 
                to="/admin/orders" 
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customer?.fullName || 'Customer'}</p>
                          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{order.items?.length || 0} items</span>
                      <span className="font-bold text-[#0B3D2E]">{order.totalAmount} MAD</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}