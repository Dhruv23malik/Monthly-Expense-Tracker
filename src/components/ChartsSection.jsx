import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const ChartsSection = ({ expenses }) => {
  // Mock data for Line/Bar chart
  const weeklyData = [
    { name: 'Mon', spend: 120 },
    { name: 'Tue', spend: 45 },
    { name: 'Wed', spend: 300 },
    { name: 'Thu', spend: 80 },
    { name: 'Fri', spend: 150 },
    { name: 'Sat', spend: 90 },
    { name: 'Sun', spend: 200 }
  ];

  // Mock data for Pie chart
  const pieData = [
    { name: 'Food', value: 400 },
    { name: 'Transport', value: 300 },
    { name: 'Utilities', value: 300 },
    { name: 'Entertainment', value: 200 },
  ];
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#64748b'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem' }}>Spending Trend</h3>
          <select className="form-select" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div style={{ height: '260px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
              <Tooltip 
                cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="spend" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Expenses by Category</h3>
        <div style={{ display: 'flex', alignItems: 'center', height: '220px' }}>
          <div style={{ width: '50%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pieData.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: COLORS[i % COLORS.length] }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem' }}>
                  <span className="text-secondary">{item.name}</span>
                  <span style={{ fontWeight: '600' }}>₹{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
