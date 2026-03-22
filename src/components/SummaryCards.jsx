import React, { useState } from 'react';
import { IndianRupee, CreditCard, PiggyBank, Edit2, Check } from 'lucide-react';

const SummaryCards = ({ totalExpenses, monthlyBudget, remainingBalance, onUpdateBudget }) => {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (onUpdateBudget && !isNaN(budgetInput) && Number(budgetInput) >= 0) {
      onUpdateBudget(Number(budgetInput));
    }
    setIsEditingBudget(false);
  };

  return (
    <div className="grid-3">
      <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Total Expenses</p>
            <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>
              {formatCurrency(totalExpenses)}
            </h3>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <IndianRupee size={24} />
          </div>
        </div>
        <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--danger)', fontWeight: '500' }}>+12.5%</span> from last month
        </p>
      </div>

      <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <p className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Monthly Budget</p>
            {isEditingBudget ? (
              <form onSubmit={handleBudgetSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <input 
                  type="number" 
                  autoFocus 
                  value={budgetInput} 
                  onChange={(e) => setBudgetInput(e.target.value)} 
                  style={{ 
                    width: '100px', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-color)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }} 
                />
                <button type="submit" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} />
                </button>
              </form>
            ) : (
              <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {formatCurrency(monthlyBudget)}
                <button onClick={() => { setBudgetInput(monthlyBudget); setIsEditingBudget(true); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }} title="Edit Budget">
                  <Edit2 size={16} />
                </button>
              </h3>
            )}
          </div>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <CreditCard size={24} />
          </div>
        </div>
        <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
          For {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Remaining Balance</p>
            <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem', color: remainingBalance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              {formatCurrency(Math.abs(remainingBalance))}
            </h3>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <PiggyBank size={24} />
          </div>
        </div>
        <div style={{ width: '100%', backgroundColor: 'var(--bg-color)', height: '6px', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            backgroundColor: remainingBalance >= 0 ? 'var(--success)' : 'var(--danger)', 
            width: `${Math.min((totalExpenses / monthlyBudget) * 100, 100)}%`
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
