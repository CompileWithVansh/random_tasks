import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import API from './api';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (user) fetchCartCount();
  }, [user]);

  const fetchCartCount = async () => {
    try {
      const { data } = await API.get('/cart');
      setCartCount(data.cart.items.reduce((s, i) => s + i.quantity, 0));
    } catch {}
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    navigate('/');
  };

  return (
    <>
      <nav>
        <Link to="/" className="nav-brand">🛒 ShopVerse</Link>
        <div className="nav-links">
          <Link to="/products">Shop</Link>
          {user ? (
            <>
              <Link to="/cart">Cart{cartCount > 0 && <span className="badge">{cartCount}</span>}</Link>
              <Link to="/orders">Orders</Link>
              <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail user={user} onCartUpdate={fetchCartCount} />} />
        <Route path="/cart" element={<Cart user={user} onCartUpdate={fetchCartCount} />} />
        <Route path="/checkout" element={<Checkout user={user} onCartUpdate={fetchCartCount} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
