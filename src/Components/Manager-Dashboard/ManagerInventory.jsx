// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';

// interface InventoryItem {
//   id: string;
//   name: string;
//   quantity: number;
//   category: string;
//   notes: string;
//   status: 'Active' | 'Inactive';
//   lastUpdated: string;
// }

const ManagerInventory= () => {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: '1',
      name: 'Premium Leather Seats',
      quantity: 24,
      category: 'Interior',
      notes: 'High-quality leather seats for luxury models',
      status: 'Active',
      lastUpdated: '2025-06-15'
    },
    {
      id: '2',
      name: 'LED Headlights',
      quantity: 36,
      category: 'Exterior',
      notes: 'Energy-efficient LED headlights for all models',
      status: 'Active',
      lastUpdated: '2025-06-17'
    },
    {
      id: '3',
      name: 'Performance Brake Pads',
      quantity: 48,
      category: 'Parts',
      notes: 'High-performance brake pads for sports models',
      status: 'Active',
      lastUpdated: '2025-06-18'
    },
    {
      id: '4',
      name: 'Navigation System',
      quantity: 12,
      category: 'Electronics',
      notes: 'Advanced GPS navigation systems',
      status: 'Inactive',
      lastUpdated: '2025-06-10'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    category: 'Interior',
    notes: '',
    status: 'Active'
  });

  const categories = ['Interior', 'Exterior', 'Electronics', 'Parts', 'Accessories'];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      quantity: 1,
      category: 'Interior',
      notes: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      notes: item.notes,
      status: item.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (editingItem) {
      // Update existing item
      setInventoryItems(inventoryItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, lastUpdated: currentDate } 
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        id: (inventoryItems.length + 1).toString(),
        ...formData,
        lastUpdated: currentDate
      };
      setInventoryItems([...inventoryItems, newItem]);
    }
    
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
          <div className="h-1 w-24 bg-indigo-600 mt-4"></div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full md:w-64 text-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-filter text-gray-400"></i>
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full md:w-48 text-sm appearance-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                </div>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-toggle-on text-gray-400"></i>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full md:w-40 text-sm appearance-none cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                </div>
              </div>
            </div>

            {/* Add New Button */}
            <button
              onClick={handleAddNew}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md !rounded-button whitespace-nowrap hover:bg-indigo-700 transition-colors cursor-pointer flex items-center justify-center"
            >
              <i className="fas fa-plus mr-2"></i>Add New Item
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <i className={`fas ${
                              item.category === 'Interior' ? 'fa-couch' :
                              item.category === 'Exterior' ? 'fa-car-side' :
                              item.category === 'Electronics' ? 'fa-microchip' :
                              item.category === 'Parts' ? 'fa-cogs' :
                              'fa-box'
                            } text-indigo-600`}></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{item.notes}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No inventory items found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <i className="fas fa-boxes text-indigo-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">Total Items</h3>
                <p className="text-3xl font-bold text-gray-800">{inventoryItems.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">Active Items</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {inventoryItems.filter(item => item.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fas fa-times-circle text-red-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">Inactive Items</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {inventoryItems.filter(item => item.status === 'Inactive').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 h-24"
                      placeholder="Enter any additional notes about this item"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          id="status-active"
                          type="radio"
                          name="status"
                          checked={formData.status === 'Active'}
                          onChange={() => setFormData({ ...formData, status: 'Active' })}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="status-active" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                          Active
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="status-inactive"
                          type="radio"
                          name="status"
                          checked={formData.status === 'Inactive'}
                          onChange={() => setFormData({ ...formData, status: 'Inactive' })}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="status-inactive" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md !rounded-button whitespace-nowrap text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md !rounded-button whitespace-nowrap hover:bg-indigo-700 cursor-pointer"
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerInventory;
