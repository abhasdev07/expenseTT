/**
 * Categories Page - Category Management
 */
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Tag } from 'lucide-react';
import { categoriesAPI } from '../services/api';
import toast from 'react-hot-toast';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterType, setFilterType] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    icon: 'circle',
    color: '#6366f1',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Only show error if it's not an auth error (interceptor handles that)
      if (error.response?.status !== 401 && error.response?.status !== 422) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to load categories';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoriesAPI.update(editingCategory.id, formData);
        toast.success('Category updated successfully');
      } else {
        await categoriesAPI.create(formData);
        toast.success('Category created successfully');
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save category:', error);
      // Only show error if it's not an auth error (interceptor handles that)
      if (error.response?.status !== 401 && error.response?.status !== 422) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to save category';
        toast.error(errorMessage);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoriesAPI.delete(id);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      // Only show error if it's not an auth error (interceptor handles that)
      if (error.response?.status !== 401 && error.response?.status !== 422) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to delete category';
        toast.error(errorMessage);
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      type: 'expense',
      icon: 'circle',
      color: '#6366f1',
    });
  };

  const filteredCategories = categories.filter((cat) => {
    if (filterType === 'all') return true;
    return cat.type === filterType;
  });

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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Categories</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Organize your transactions with custom categories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          New Category
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <option value="all">All Categories</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
            <Tag size={48} className="mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>No categories found. Create your first category!</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <Tag size={24} style={{ color: category.color }} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                {category.name}
              </h3>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: category.type === 'income' ? '#d1fae5' : '#fee2e2',
                  color: category.type === 'income' ? '#065f46' : '#991b1b',
                }}
              >
                {category.type === 'income' ? 'Income' : 'Expense'}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg shadow-xl max-w-md w-full" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    required
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Color
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-12 rounded-lg border cursor-pointer"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
