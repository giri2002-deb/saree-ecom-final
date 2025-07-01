import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Shop from './components/Shop';
import AdminPage from './pages/admin/AdminPage';
import { Dashboard } from './components/admin/Dashboard';
import { LoginForm } from './components/admin/LoginForm';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/admin/" element={<LoginForm onLoginSuccess={() => console.log("logged")} />} />
        <Route path="/admin/*" element={<AdminPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>

      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
