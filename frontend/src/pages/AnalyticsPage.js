/**
 * Analytics Page - Financial Analytics and Insights
 */
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, PieChart, Calendar } from 'lucide-react';
import { analyticsAPI } from '../services/api';
import toast from 'react-hot-toast';

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAnalytics();
  }, [selectedMonth, selectedYear]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getSummary(selectedMonth, selectedYear);
      setSummary(response.data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      toast.error('Failed to load analytics data');
      // Set default empty data
      setSummary({
        total_income: 0,
        total_expenses: 0,
        net_balance: 0,
        savings_rate: 0,
        spending_by_category: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track your financial performance and insights</p>
      </div>

      {/* Month/Year Selector */}
      <div className="mb-6 flex gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="px-4 py-2 rounded-lg border"
          style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2000, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="px-4 py-2 rounded-lg border"
          style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Total Income</p>
              <p className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                ₹{parseFloat(summary?.total_income || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Total Expenses</p>
              <p className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                ₹{parseFloat(summary?.total_expenses || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              <TrendingDown size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Net Balance</p>
              <p className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                ₹{parseFloat(summary?.net_balance || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <PieChart size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Savings Rate</p>
              <p className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                {parseFloat(summary?.savings_rate || 0).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Spending by Category */}
      <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Spending by Category
        </h2>
        {summary?.spending_by_category && summary.spending_by_category.length > 0 ? (
          <div className="space-y-4">
            {summary.spending_by_category.map((item, index) => {
              const percentage = summary.total_expenses > 0 
                ? (item.total / summary.total_expenses) * 100 
                : 0;
              
              return (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.category_name || 'Unknown'}
                    </span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      ₹{parseFloat(item.total).toFixed(2)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: item.category_color || '#6366f1' 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>
            No spending data available for this period. Start adding transactions!
          </p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
