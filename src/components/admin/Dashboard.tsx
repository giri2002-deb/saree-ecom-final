import { TrendingUp, Users, ShoppingCart, DollarSign, Package, Star, Heart, Sparkles } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹2,45,231', change: '+20.1%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Orders Today', value: '28', change: '+12.5%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Happy Customers', value: '1,847', change: '+8.2%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Saree Collection', value: '456', change: '+3.1%', icon: Package, color: 'text-pink-600', bg: 'bg-pink-100' },
  ];

  const recentOrders = [
    { id: '#SAR3210', customer: 'Priya Sharma', product: 'Red Silk Saree', amount: '₹2,499', status: 'Completed' },
    { id: '#SAR3209', customer: 'Anita Patel', product: 'Pink Floral Cotton', amount: '₹1,299', status: 'Processing' },
    { id: '#SAR3208', customer: 'Meera Singh', product: 'Blue Georgette', amount: '₹1,899', status: 'Shipped' },
    { id: '#SAR3207', customer: 'Kavya Reddy', product: 'Banarasi Silk', amount: '₹4,999', status: 'Completed' },
  ];

  const topSarees = [
    { name: 'Red Silk Saree with Golden Border', sales: 45, revenue: '₹1,12,455', rating: 4.8 },
    { name: 'Pink Floral Cotton Saree', sales: 32, revenue: '₹41,568', rating: 4.6 },
    { name: 'Royal Blue Georgette Saree', sales: 28, revenue: '₹53,172', rating: 4.7 },
    { name: 'Traditional Banarasi Silk', sales: 15, revenue: '₹74,985', rating: 4.9 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50 to-rose-50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Saree Collection Dashboard
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-500" />
            Welcome back! Here's your saree business overview
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-pink-100 p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:transform hover:scale-105">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.color}`}>
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change} from last month
                    </span>
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-pink-100 p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.amount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sarees */}
        <div className="bg-white rounded-xl border border-pink-100 p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-900">Top Selling Sarees</h3>
          </div>
          <div className="space-y-4">
            {topSarees.map((saree, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{saree.name}</p>
                  <p className="text-sm text-gray-600">{saree.sales} sales</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{saree.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{saree.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};