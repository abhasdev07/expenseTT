/**
 * Dashboard Page - Main overview with dynamic data
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Wallet, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { analyticsAPI } from '../services/api';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const now = new Date();
      const response = await analyticsAPI.getSummary(now.getMonth() + 1, now.getFullYear());
      setSummary(response.data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      // Only show error if it's not an auth error (interceptor handles that)
      if (error.response?.status !== 401 && error.response?.status !== 422) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to load dashboard data';
        toast.error(errorMessage);
      }
      // Set default empty data on error
      setSummary({
        total_income: 0,
        total_expenses: 0,
        net_balance: 0,
        savings_rate: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalIncome = parseFloat(summary?.total_income || 0);
  const totalExpenses = parseFloat(summary?.total_expenses || 0);
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((netBalance / totalIncome) * 100) : 0;

  const stats = [
    {
      name: 'Total Income',
      value: formatCurrency(totalIncome),
      change: '0%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      name: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: '0%',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      name: 'Net Balance',
      value: formatCurrency(netBalance),
      change: '0%',
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      name: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      change: '0%',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const changeValue = parseFloat(stat.change);
          const isPositive = changeValue >= 0;
          
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                    {stat.value}
                  </p>
                  {changeValue !== 0 && (
                    <div className="flex items-center mt-2 text-sm">
                      {isPositive ? (
                        <ArrowUpRight size={16} className="text-green-600" />
                      ) : (
                        <ArrowDownRight size={16} className="text-red-600" />
                      )}
                      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                        {stat.change}
                      </span>
                      <span className="ml-1" style={{ color: 'var(--text-tertiary)' }}>vs last month</span>
                    </div>
                  )}
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/transactions" className="btn btn-primary text-center">
            Add Transaction
          </Link>
          <Link to="/budgets" className="btn btn-secondary text-center">
            Create Budget
          </Link>
          <Link to="/goals" className="btn btn-secondary text-center">
            Set Goal
          </Link>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Recent Transactions
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your recent transactions will appear here. Start by adding your first transaction!
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
