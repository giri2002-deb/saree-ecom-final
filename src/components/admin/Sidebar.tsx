import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Calendar,
  Users,
  BarChart3,
  Tags,
  MapPin,
  Settings,
  Home,
  Image,
  Mail,
  LogOut,
  Sparkles,
  Heart
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Saree Collection', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '5' },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'users', label: 'Customers', icon: Users },
  { id: 'statistics', label: 'Analytics', icon: BarChart3 },
  { id: 'brands', label: 'Brands', icon: Tags },
  { id: 'locations', label: 'Stores', icon: MapPin },
];

const contentItems = [
  { id: 'home-banner', label: 'Home Banner', icon: Home },
  { id: 'featured-collection', label: 'Featured Collection', icon: Sparkles },
  { id: 'about-banner', label: 'About Saree', icon: Heart },
  { id: 'contact', label: 'Contact Page', icon: Mail },
];

export const Sidebar = ({ currentPage, onPageChange, onLogout }: SidebarProps) => {
  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg">SAREE</div>
            <div className="text-xs text-pink-300 font-normal">Admin Panel</div>
          </div>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800 hover:transform hover:scale-105'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Website Content
            </h3>
            <div className="space-y-1">
              {contentItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform scale-105'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800 hover:transform hover:scale-105'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="p-3 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 hover:transform hover:scale-105"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};