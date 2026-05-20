import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const categories = ['all', 'electronics', 'clothing', 'accessories', 'footwear', 'home', 'sports'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    API.get(`/products?${params}`).then(({ data }) => setProducts(data.products)).catch(() => {});
  }, [category, search]);

  return (
    <div className="container">
      <h1>Products</h1>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', flex: 1, minWidth: '200px' }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}>
          {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
      </div>
      {products.length === 0 ? (
        <p className="empty">No products found</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <Link to={`/products/${p._id}`} key={p._id} className="card">
              <img src={p.images?.[0]?.url || 'https://via.placeholder.com/300x180'} alt={p.name} />
              <div className="card-body">
                <h3>{p.name}</h3>
                <p style={{ color: '#666', fontSize: '0.8rem' }}>{p.category}</p>
                <p><span className="price">₹{p.price}</span>{p.originalPrice && <span className="old-price">₹{p.originalPrice}</span>}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
