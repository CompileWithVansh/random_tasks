import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    API.get('/products?featured=true&limit=4').then(({ data }) => setFeatured(data.products)).catch(() => {});
  }, []);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1>Welcome to ShopVerse</h1>
        <p style={{ color: '#666', margin: '12px 0 24px' }}>Your one-stop shop for everything</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>

      {featured.length > 0 && (
        <>
          <h2>Featured Products</h2>
          <div className="grid">
            {featured.map((p) => (
              <Link to={`/products/${p._id}`} key={p._id} className="card">
                <img src={p.images?.[0]?.url || 'https://via.placeholder.com/300x180'} alt={p.name} />
                <div className="card-body">
                  <h3>{p.name}</h3>
                  <p><span className="price">₹{p.price}</span>{p.originalPrice && <span className="old-price">₹{p.originalPrice}</span>}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
