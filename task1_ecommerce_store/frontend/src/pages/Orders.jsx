import { useState, useEffect } from 'react';
import API from '../api';

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) API.get('/orders/my').then(({ data }) => setOrders(data.orders)).catch(() => {});
  }, [user]);

  if (!user) return <div className="container empty"><p>Please login to view orders</p></div>;

  return (
    <div className="container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="empty">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Order #{order._id.slice(-6)}</strong>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`status status-${order.status}`}>{order.status}</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              {order.items.map((item, i) => (
                <span key={i} style={{ fontSize: '0.85rem', color: '#555' }}>
                  {item.name} x{item.quantity}{i < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
            <p style={{ marginTop: '8px', fontWeight: 'bold' }}>Total: ₹{order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
}
