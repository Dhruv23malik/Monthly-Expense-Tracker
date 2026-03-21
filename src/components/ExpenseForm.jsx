import React, { useState } from 'react';

const ExpenseForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    onAdd({
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    });
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', width: '100%', padding: '2.5rem' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Add New Expense</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Expense Title</label>
          <input 
            type="text" 
            name="title" 
            className="form-input" 
            placeholder="e.g. Weekly Groceries"
            value={formData.title}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="grid-2-1" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input 
              type="number" 
              name="amount" 
              className="form-input" 
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input 
              type="date" 
              name="date" 
              className="form-input" 
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            name="category" 
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Food">Food & Dining</option>
            <option value="Transport">Transportation</option>
            <option value="Utilities">Utilities & Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
