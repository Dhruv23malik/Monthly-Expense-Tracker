import React from 'react';
import { LayoutDashboard, PlusCircle, PieChart, Wallet } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'add', label: 'Add Expense', icon: <PlusCircle size={20} /> },
    { id: 'reports', label: 'Reports', icon: <PieChart size={20} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--card-bg)',
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '36px', height: '36px',
          backgroundColor: 'var(--primary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white'
        }}>
          <Wallet size={20} />
        </div>
        <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.025em' }}>ExpenseTracker</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: activeTab === item.id ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === item.id ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              width: '100%',
              fontSize: '0.95rem'
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Pro Account</h4>
        <p className="text-secondary" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>Unlock advanced reports and unlimited categories.</p>
        <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>Upgrade Now</button>
      </div>
    </aside>
  );
};

export default Sidebar;
