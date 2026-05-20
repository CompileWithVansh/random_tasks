import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Cart({ user, onCartUpdate }) {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const fetchCart = async () => {
    const { data } = await API.get('/cart');
    setCart(data.cart);
  };

  const updateQty = async (productId, quantity) => {
    await API.put('/cart/update', { productId, quantity });
    fetchCart();
    onCartUpdate();
  };

  const remove = async (productId) => {
    await API.delete(`/cart/remove/${productId}`);
    fetchCart();
    onCartUpdate();
  };

  if (!user) return <div className="container empty"><p>Please login to view cart</p></div>;

  const total = cart.items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>Shop Now</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
          <div>
            {cart.items.map((item) => (
              <div key={item.product?._id} className="cart-item">
                <img src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/70'} alt="" />
                <div className="cart-item-info">
                  <strong>{item.product?.name}</strong>
                  <p>₹{item.product?.price}</p>
                </div>
                <div className="cart-item-actions">
                  <button className="qty-btn" onClick={() => updateQty(item.product?._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.product?._id, item.quantity + 1)}>+</button>
                  <button className="btn btn-danger btn-sm" onClick={() => remove(item.product?._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-box">
            <h3>Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{total > 500 ? 'Free' : '₹50'}</span></div>
            <div className="summary-row summary-total"><span>Total</span><span>₹{total + (total > 500 ? 0 : 50)}</span></div>
            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: '16px' }}>Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
