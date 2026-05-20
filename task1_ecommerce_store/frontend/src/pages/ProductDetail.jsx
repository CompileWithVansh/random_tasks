import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function ProductDetail({ user, onCartUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then(({ data }) => setProduct(data.product)).catch(() => navigate('/products'));
  }, [id]);

  const addToCart = async () => {
    if (!user) return navigate('/login');
    await API.post('/cart/add', { productId: product._id, quantity: 1 });
    onCartUpdate();
    alert('Added to cart!');
  };

  if (!product) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '20px' }}>← Back</button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <img src={product.images?.[0]?.url || 'https://via.placeholder.com/500'} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
        <div>
          <p style={{ color: '#1976d2', fontSize: '0.8rem', textTransform: 'uppercase' }}>{product.category}</p>
          <h1>{product.name}</h1>
          <p style={{ color: '#666', margin: '8px 0' }}>by {product.brand}</p>
          <p style={{ margin: '16px 0' }}>
            <span className="price" style={{ fontSize: '1.5rem' }}>₹{product.price}</span>
            {product.originalPrice && <span className="old-price">₹{product.originalPrice}</span>}
          </p>
          <p style={{ lineHeight: 1.6, color: '#555' }}>{product.description}</p>
          <p style={{ margin: '16px 0', color: product.stock > 0 ? 'green' : 'red' }}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </p>
          {product.stock > 0 && (
            <button onClick={addToCart} className="btn btn-primary">Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
}
