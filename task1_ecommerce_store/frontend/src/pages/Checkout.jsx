import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Checkout({ user, onCartUpdate }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ street: '', city: '', state: '', zipCode: '', country: 'India', paymentMethod: 'cod' });
  const [loading, setLoading] = useState(false);

  if (!user) { navigate('/login'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/orders', {
        shippingAddress: { street: form.street, city: form.city, state: form.state, zipCode: form.zipCode, country: form.country },
        paymentMethod: form.paymentMethod,
      });
      onCartUpdate();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="summary-box">
        <div className="form-group">
          <label>Street</label>
          <input required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label>City</label>
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>
          <div className="form-group">
            <label>State</label>
            <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label>ZIP Code</label>
            <input required value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label>Payment</label>
          <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
            <option value="cod">Cash on Delivery</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
          {loading ? 'Placing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
