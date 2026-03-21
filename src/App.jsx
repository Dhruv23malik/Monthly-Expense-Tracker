import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import ChartsSection from './components/ChartsSection.jsx';
import RecentTransactions from './components/RecentTransactions.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Load expenses from local storage or start empty
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expense_tracker_data');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Save expenses whenever they change
  useEffect(() => {
    localStorage.setItem('expense_tracker_data', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([{ id: Date.now(), ...expense }, ...expenses]);
    setActiveTab('dashboard');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Load budget from local storage or set default
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const savedBudget = localStorage.getItem('expense_tracker_budget');
    return savedBudget ? Number(savedBudget) : 25000;
  });

  // Save budget whenever it changes
  useEffect(() => {
    localStorage.setItem('expense_tracker_budget', monthlyBudget.toString());
  }, [monthlyBudget]);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBalance = monthlyBudget - totalExpenses;

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
              {activeTab === 'dashboard' ? 'Dashboard' : 
               activeTab === 'add' ? 'Add Expense' : 'Reports'}
            </h1>
            <p className="text-secondary">Hello, Dhruv 👋</p>
          </div>
          {activeTab !== 'add' && (
            <button className="btn btn-primary" onClick={() => setActiveTab('add')}>
              + New Expense
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
          <>
            <SummaryCards 
              totalExpenses={totalExpenses} 
              monthlyBudget={monthlyBudget} 
              remainingBalance={remainingBalance}
              onUpdateBudget={setMonthlyBudget}
            />
            <div className="grid-2-1">
              <ChartsSection expenses={expenses} />
              <RecentTransactions expenses={expenses} onDelete={deleteExpense} />
            </div>
          </>
        )}

        {activeTab === 'add' && (
          <ExpenseForm onAdd={addExpense} onCancel={() => setActiveTab('dashboard')} />
        )}
        
        {activeTab === 'reports' && (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <h2>Reports</h2>
            <p className="text-secondary" style={{ marginTop: '1rem' }}>Detailed reports coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
