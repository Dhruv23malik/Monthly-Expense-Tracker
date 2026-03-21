import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const RecentTransactions = ({ expenses, onDelete }) => {
  const [filter, setFilter] = useState('All');

  const getBadgeClass = (category) => {
    const map = {
      'Food': 'badge-food',
      'Transport': 'badge-transport',
      'Utilities': 'badge-utilities',
      'Entertainment': 'badge-entertainment'
    };
    return map[category] || 'badge-other';
  };

  const filteredExpenses = filter === 'All' 
    ? expenses 
    : expenses.filter(e => e.category === filter);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'fit-content' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem' }}>Recent Transactions</h3>
        <select 
          className="form-select" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredExpenses.length === 0 ? (
          <p className="text-secondary" style={{ textAlign: 'center', padding: '2rem 0' }}>No transactions found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ paddingBottom: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Transaction</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Category</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Amount</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.slice(0, 6).map((expense) => (
                <tr key={expense.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 0' }}>
                    <p style={{ fontWeight: '500', fontSize: '0.95rem' }}>{expense.title}</p>
                    <p className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                      {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </td>
                  <td style={{ padding: '1rem 0' }}>
                    <span className={`badge ${getBadgeClass(expense.category)}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0', fontWeight: '600' }}>
                    -₹{expense.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn btn-icon btn-ghost" title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button className="btn btn-icon btn-ghost" style={{ color: 'var(--danger)' }} onClick={() => onDelete(expense.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="btn btn-ghost" style={{ width: '100%', marginTop: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactions;
