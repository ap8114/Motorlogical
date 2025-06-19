// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const InventoryManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('inventory');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [showItemDetailsModal, setShowItemDetailsModal] = useState(false);
const [demo, selectedItem] = useState()
  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: 'INV-2025-001',
      name: '2025 SUV Model X',
      category: 'SUV',
      quantity: 15,
      status: 'Active',
      lastUpdated: '2025-06-15',
      notes: 'Popular model, consider increasing stock',
      price: 45000
    },
    {
      id: 'INV-2025-002',
      name: '2025 Sedan Model S',
      category: 'Sedan',
      quantity: 8,
      status: 'Active',
      lastUpdated: '2025-06-12',
      notes: 'New shipment expected next month',
      price: 38500
    },
    {
      id: 'INV-2025-003',
      name: '2025 Luxury Model L',
      category: 'Luxury',
      quantity: 3,
      status: 'Active',
      lastUpdated: '2025-06-05',
      notes: 'Limited stock, high demand',
      price: 72000
    },
    {
      id: 'INV-2025-004',
      name: '2025 Compact Model C',
      category: 'Compact',
      quantity: 22,
      status: 'Active',
      lastUpdated: '2025-05-20',
      notes: 'Sufficient stock available',
      price: 26000
    },
    {
      id: 'INV-2025-005',
      name: '2025 Electric Model E',
      category: 'Electric',
      quantity: 0,
      status: 'Inactive',
      lastUpdated: '2025-06-01',
      notes: 'Out of stock, new shipment delayed',
      price: 58000
    },
    {
      id: 'INV-2025-006',
      name: '2025 Hybrid Model H',
      category: 'Hybrid',
      quantity: 7,
      status: 'Active',
      lastUpdated: '2025-06-10',
      notes: 'Stock running low, reorder soon',
      price: 42500
    }
  ]);

  // Sample inventory history data
  const inventoryHistory = [
    { date: '2025-06-15', action: 'Stock Update', quantity: '+5', user: 'John Doe' },
    { date: '2025-06-10', action: 'Stock Update', quantity: '+10', user: 'Sarah Johnson' },
    { date: '2025-05-28', action: 'Initial Stock', quantity: '+15', user: 'Mike Wilson' },
    { date: '2025-05-20', action: 'Price Update', quantity: '0', user: 'John Doe' }
  ];

  // Sample categories for dropdown
  const categories = [
    { id: '1', name: 'SUV' },
    { id: '2', name: 'Sedan' },
    { id: '3', name: 'Luxury' },
    { id: '4', name: 'Compact' },
    { id: '5', name: 'Electric' },
    { id: '6', name: 'Hybrid' }
  ];

  // Form state for add/edit item
  const [itemForm, setItemForm] = useState({
    id: '',
    name: '',
    category: '',
    quantity: 0,
    status: 'Active',
    lastUpdated: '',
    notes: '',
    price: 0
  });

  // Initialize charts
  useEffect(() => {
    const inventoryStatsChart = echarts.init(document.getElementById('inventory-stats-chart'));
    const statsOption = {
      animation: false,
      title: {
        text: 'Inventory Statistics',
        left: 'center',
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Stock Level', 'Value'],
        bottom: 0
      },
      xAxis: {
        type: 'category',
        data: ['SUV', 'Sedan', 'Luxury', 'Compact', 'Electric', 'Hybrid'],
        axisLabel: {
          interval: 0
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Stock',
          position: 'left'
        },
        {
          type: 'value',
          name: 'Value ($)',
          position: 'right',
          axisLabel: {
            formatter: '${value}k'
          }
        }
      ],
      series: [
        {
          name: 'Stock Level',
          type: 'bar',
          data: [15, 8, 3, 22, 0, 7],
          color: '#4F46E5'
        },
        {
          name: 'Value',
          type: 'line',
          yAxisIndex: 1,
          data: [675, 308, 216, 572, 0, 297],
          color: '#10B981'
        }
      ]
    };
    inventoryStatsChart.setOption(statsOption);

    const categoryDistributionChart = echarts.init(document.getElementById('category-distribution-chart'));
    const categoryOption = {
      animation: false,
      title: {
        text: 'Category Distribution',
        left: 'center',
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        bottom: 0
      },
      series: [
        {
          name: 'Category',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 15, name: 'SUV', itemStyle: { color: '#F59E0B' } },
            { value: 8, name: 'Sedan', itemStyle: { color: '#3B82F6' } },
            { value: 3, name: 'Luxury', itemStyle: { color: '#8B5CF6' } },
            { value: 22, name: 'Compact', itemStyle: { color: '#10B981' } },
            { value: 0, name: 'Electric', itemStyle: { color: '#EF4444' } },
            { value: 7, name: 'Hybrid', itemStyle: { color: '#6366F1' } }
          ]
        }
      ]
    };
    categoryDistributionChart.setOption(categoryOption);

    const handleResize = () => {
      inventoryStatsChart.resize();
      categoryDistributionChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      inventoryStatsChart.dispose();
      categoryDistributionChart.dispose();
    };
  }, [inventory]);

  // Initialize item details chart
  const itemDetailsChartRef = useRef < HTMLDivElement > (null);

  useEffect(() => {
    if (showItemDetailsModal && selectedItem && itemDetailsChartRef.current) {
      const itemHistoryChart = echarts.init(itemDetailsChartRef.current);
      const historyOption = {
        animation: false,
        title: {
          text: 'Stock History',
          left: 'center',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          name: 'Stock Level'
        },
        series: [
          {
            name: 'Stock Level',
            type: 'line',
            data: [5, 8, 12, 10, 7, selectedItem.quantity],
            color: '#4F46E5',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(79, 70, 229, 0.3)' },
                  { offset: 1, color: 'rgba(79, 70, 229, 0.1)' }
                ]
              }
            },
            smooth: true
          }
        ]
      };
      itemHistoryChart.setOption(historyOption);

      return () => {
        itemHistoryChart.dispose();
      };
    }
  }, [showItemDetailsModal, selectedItem]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  console.log(selectedItem.name); // for example

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Handle view item details
  const handleViewItemDetails = (item) => {
    setSelectedItem(item);
    setShowItemDetailsModal(true);
  };

  // Handle edit item
  const handleEditItem = (item) => {
    setItemForm({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      status: item.status,
      lastUpdated: item.lastUpdated,
      notes: item.notes,
      price: item.price
    });
    setShowAddItemModal(true);
  };

  // Handle save item
  const handleSaveItem = () => {
    if (itemForm.id) {
      // Update existing item
      setInventory(inventory.map(item =>
        item.id === itemForm.id ? {
          ...item,
          name: itemForm.name,
          category: itemForm.category,
          quantity: itemForm.quantity,
          status: itemForm.status,
          lastUpdated: new Date().toISOString().split('T')[0],
          notes: itemForm.notes,
          price: itemForm.price
        } : item
      ));
    } else {
      // Add new item
      const newItem = {
        id: `INV-2025-${String(inventory.length + 1).padStart(3, '0')}`,
        name: itemForm.name,
        category: itemForm.category,
        quantity: itemForm.quantity,
        status: itemForm.status,
        lastUpdated: new Date().toISOString().split('T')[0],
        notes: itemForm.notes,
        price: itemForm.price
      };
      setInventory([...inventory, newItem]);
    }
    setShowAddItemModal(false);
  };

  // Handle create new item
  const handleCreateNewItem = () => {
    setItemForm({
      id: '',
      name: '',
      category: '',
      quantity: 0,
      status: 'Active',
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: '',
      price: 0
    });
    setShowAddItemModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirmation(true);
  };

  // Handle delete item
  const handleDeleteItem = () => {
    if (itemToDelete) {
      setInventory(inventory.filter(item => item.id !== itemToDelete));
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    }
  };

  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' ||
      item.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      statusFilter === 'all' ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get stock level indicator
  const getStockLevelIndicator = (quantity) => {
    if (quantity === 0) {
      return 'bg-red-100 text-red-800';
    } else if (quantity < 5) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  // Calculate statistics
  const totalItems = inventory.length;
  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(item => item.quantity < 5).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div>
        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center"> Inventory Management
              </h1>
              <p className="text-gray-600 mt-1">Manage all vehicle inventory in one place</p>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-3">
              <a
                href="https://readdy.ai/home/c8a6bcde-470a-4a15-8148-ac3671c15e32/a52cc47e-9a13-4d7b-ba7f-f2308dbea63f"
                data-readdy="true"
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-shopping-cart mr-2"></i> Order Management
              </a>
              <button
                onClick={handleCreateNewItem}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-plus mr-2"></i> Add New Item
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'inventory'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <i className="fas fa-warehouse mr-2"></i> Inventory List
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'reports'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <i className="fas fa-chart-bar mr-2"></i> Reports
              </button>
            </nav>
          </div>

          {activeTab === 'inventory' && (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                      <i className="fas fa-car text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-600">Total Models</h2>
                      <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <i className="fas fa-arrow-up mr-1"></i> 8%
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <i className="fas fa-cubes text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-600">Total Stock</h2>
                      <p className="text-2xl font-bold text-gray-800">{totalStock}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <i className="fas fa-arrow-up mr-1"></i> 12%
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <i className="fas fa-exclamation-triangle text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-600">Low Stock</h2>
                      <p className="text-2xl font-bold text-gray-800">{lowStockItems}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-red-500 flex items-center">
                      <i className="fas fa-arrow-up mr-1"></i> 3%
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <i className="fas fa-dollar-sign text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-600">Total Value</h2>
                      <p className="text-2xl font-bold text-gray-800">${totalValue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <i className="fas fa-arrow-up mr-1"></i> 15%
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
              </div>

              {/* Filters and Charts */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Filters</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <div className="relative">
                        <select
                          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                          <option value="all">All Categories</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.name.toLowerCase()}>{category.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="relative">
                        <select
                          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="all">All Statuses</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className={`fas ${showAdvancedFilters ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
                        Advanced Filters
                      </button>
                    </div>
                    {showAdvancedFilters && (
                      <div className="space-y-4 mt-4 border-t pt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Level</label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs text-gray-500">Min</label>
                              <input
                                type="number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500">Max</label>
                              <input
                                type="number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="100"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs text-gray-500">Min ($)</label>
                              <input
                                type="number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500">Max ($)</label>
                              <input
                                type="number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="100000"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                            Apply Filters
                          </button>
                          <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="mt-6 pt-6 border-t">
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-file-export mr-2"></i> Export Inventory
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div id="inventory-stats-chart" style={{ height: '250px' }}></div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div id="category-distribution-chart" style={{ height: '250px' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">Inventory List</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      className={`flex items-center px-3 py-1 ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'} border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap`}
                      onClick={() => setViewMode('list')}
                    >
                      <i className="fas fa-list mr-1"></i> List
                    </button>
                    <button
                      className={`flex items-center px-3 py-1 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'} border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap`}
                      onClick={() => setViewMode('grid')}
                    >
                      <i className="fas fa-th-large mr-1"></i> Grid
                    </button>
                    <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-filter mr-1"></i> Filter
                    </button>
                    <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-sort mr-1"></i> Sort
                    </button>
                    <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-file-export mr-1"></i> Export
                    </button>
                  </div>
                </div>

                {viewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Updated
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredInventory.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                              {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockLevelIndicator(item.quantity)}`}>
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(item.lastUpdated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${item.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  id={`view-details-${item.id}`}
                                  className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap"
                                  title="View Details"
                                  onClick={() => handleViewItemDetails(item)}
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button
                                  onClick={() => handleEditItem(item)}
                                  className="text-blue-600 hover:text-blue-900 cursor-pointer !rounded-button whitespace-nowrap"
                                  title="Edit Item"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => handleDeleteConfirmation(item.id)}
                                  className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap"
                                  title="Delete Item"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                <div className="relative inline-block text-left">
                                  <button className="text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                                    <i className="fas fa-ellipsis-v"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInventory.map((item) => (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">Quantity</p>
                              <p className={`text-lg font-semibold ${item.quantity === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Price</p>
                              <p className="text-lg font-semibold text-gray-900">${item.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="mt-4 text-sm text-gray-500">
                            <p className="truncate">{item.notes}</p>
                          </div>
                          <div className="mt-5 flex justify-between items-center pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                            </p>
                            <div className="flex space-x-2">
                              <button
                                id={`view-details-${item.id}`}
                                className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap"
                                title="View Details"
                                onClick={() => handleViewItemDetails(item)}
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                onClick={() => handleEditItem(item)}
                                className="text-blue-600 hover:text-blue-900 cursor-pointer !rounded-button whitespace-nowrap"
                                title="Edit Item"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteConfirmation(item.id)}
                                className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap"
                                title="Delete Item"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      Previous
                    </button>
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredInventory.length}</span> of{' '}
                        <span className="font-medium">{filteredInventory.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                          <span className="sr-only">Previous</span>
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                          1
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                          2
                        </button>
                        <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                          <span className="sr-only">Next</span>
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'reports' && (
            <div className="min-h-[600px]">
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Report Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Inventory Summary</option>
                        <option>Stock Level Report</option>
                        <option>Category Analysis</option>
                        <option>Value Distribution</option>
                        <option>Inventory Movement</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Last 6 Months</option>
                        <option>Year to Date</option>
                        <option>Custom Range</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dealership</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>All Dealerships</option>
                        <option>City Motors</option>
                        <option>Highway Auto</option>
                        <option>Luxury Cars Inc</option>
                        <option>Downtown Autos</option>
                        <option>Valley Vehicles</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-sync-alt mr-2"></i> Generate Report
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-800">Inventory Summary Report</h2>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-print mr-1"></i> Print
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-file-pdf mr-1"></i> PDF
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-file-excel mr-1"></i> Excel
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Models
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Units
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Low Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Out of Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SUV</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$675,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sedan</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$308,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Luxury</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$216,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Compact</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$572,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Electric</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hybrid</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$297,500</td>
                      </tr>
                      <tr className="bg-gray-50 font-medium">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">TOTAL</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">6</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">55</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">2</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">$2,068,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Report generated on: June 19, 2025 at 10:30 AM</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Export History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Format
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 18, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Inventory Summary</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PDF</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap">Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 15, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Stock Level Report</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Excel</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap">Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 10, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Category Analysis</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PDF</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap">Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Add/Edit Item Modal */}
      {showAddItemModal && (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-car text-indigo-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {itemForm.id ? `Edit Item - ${itemForm.id}` : 'Add New Item'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">
                          Item Name *
                        </label>
                        <input
                          type="text"
                          id="item-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={itemForm.name}
                          onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category *
                        </label>
                        <div className="relative mt-1">
                          <select
                            id="category"
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={itemForm.category}
                            onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                          >
                            <option value="">-- Select Category --</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i className="fas fa-chevron-down text-xs"></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                          Quantity *
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-l-md cursor-pointer !rounded-button whitespace-nowrap"
                            onClick={() => setItemForm({ ...itemForm, quantity: Math.max(0, itemForm.quantity - 1) })}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            min="0"
                            className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-none"
                            value={itemForm.quantity}
                            onChange={(e) => setItemForm({ ...itemForm, quantity: parseInt(e.target.value) || 0 })}
                          />
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-r-md cursor-pointer !rounded-button whitespace-nowrap"
                            onClick={() => setItemForm({ ...itemForm, quantity: itemForm.quantity + 1 })}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price ($) *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            id="price"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            value={itemForm.price}
                            onChange={(e) => setItemForm({ ...itemForm, price: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status *
                        </label>
                        <div className="mt-1 flex items-center">
                          <div className="flex items-center">
                            <input
                              id="status-active"
                              name="status"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              checked={itemForm.status === 'Active'}
                              onChange={() => setItemForm({ ...itemForm, status: 'Active' })}
                            />
                            <label htmlFor="status-active" className="ml-3 block text-sm font-medium text-gray-700">
                              Active
                            </label>
                          </div>
                          <div className="flex items-center ml-6">
                            <input
                              id="status-inactive"
                              name="status"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              checked={itemForm.status === 'Inactive'}
                              onChange={() => setItemForm({ ...itemForm, status: 'Inactive' })}
                            />
                            <label htmlFor="status-inactive" className="ml-3 block text-sm font-medium text-gray-700">
                              Inactive
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          id="notes"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={itemForm.notes}
                          onChange={(e) => setItemForm({ ...itemForm, notes: e.target.value })}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={handleSaveItem}
                >
                  {itemForm.id ? 'Update Item' : 'Add Item'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowAddItemModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-exclamation-triangle text-red-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Item
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={handleDeleteItem}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {showItemDetailsModal && selectedItem && (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <i className="fas fa-car text-indigo-600"></i>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedItem.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedItem.id} - {selectedItem.category}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowItemDetailsModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-base font-medium text-gray-800">Item Details</h4>
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <p className="mt-1">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedItem.status)}`}>
                                {selectedItem.status}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Quantity</p>
                            <p className="mt-1 text-sm text-gray-900">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockLevelIndicator(selectedItem.quantity)}`}>
                                {selectedItem.quantity}
                              </span>
                              {selectedItem.quantity === 0 && (
                                <span className="ml-2 text-red-600">Out of stock</span>
                              )}
                              {selectedItem.quantity > 0 && selectedItem.quantity < 5 && (
                                <span className="ml-2 text-yellow-600">Low stock</span>
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Price</p>
                            <p className="mt-1 text-sm text-gray-900">${selectedItem.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Total Value</p>
                            <p className="mt-1 text-sm text-gray-900">${(selectedItem.price * selectedItem.quantity).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Last Updated</p>
                            <p className="mt-1 text-sm text-gray-900">
                              {new Date(selectedItem.lastUpdated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-base font-medium text-gray-800">Notes</h4>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600">{selectedItem.notes || 'No notes available.'}</p>
                        </div>
                      </div>

                      <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-base font-medium text-gray-800">Quick Actions</h4>
                        </div>
                        <div className="p-4 space-y-2">
                          <button
                            onClick={() => {
                              setShowItemDetailsModal(false);
                              handleEditItem(selectedItem);
                            }}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-edit mr-2"></i> Edit Item
                          </button>
                          <button
                            onClick={() => {
                              setShowItemDetailsModal(false);
                              handleDeleteConfirmation(selectedItem.id);
                            }}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-trash mr-2"></i> Delete Item
                          </button>
                          <button
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-shopping-cart mr-2"></i> Order More
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-base font-medium text-gray-800">Vehicle Information</h4>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <img
                                src={`https://readdy.ai/api/search-image?query=modern%2520$%7BselectedItem.category.toLowerCase%28%29%7D%2520car%2520on%2520plain%2520white%2520background%252C%2520professional%2520product%2520photography%252C%2520high%2520quality%252C%2520detailed%252C%2520studio%2520lighting%252C%2520clean%2520background&width=400&height=300&seq=${selectedItem.id}&orientation=landscape`}
                                alt={selectedItem.name}
                                className="w-full h-auto rounded-lg object-cover"
                              />
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Model</p>
                                <p className="mt-1 text-sm text-gray-900">{selectedItem.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Category</p>
                                <p className="mt-1 text-sm text-gray-900">{selectedItem.category}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Year</p>
                                <p className="mt-1 text-sm text-gray-900">2025</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Engine</p>
                                <p className="mt-1 text-sm text-gray-900">
                                  {selectedItem.category === 'Electric' ? 'Electric Motor' :
                                    selectedItem.category === 'Hybrid' ? 'Hybrid Engine' :
                                      '2.0L Turbo'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Transmission</p>
                                <p className="mt-1 text-sm text-gray-900">Automatic</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-base font-medium text-gray-800">Stock History</h4>
                        </div>
                        <div className="p-4">
                          <div ref={itemDetailsChartRef} style={{ height: '200px' }}></div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                          <h4 className="text-base font-medium text-gray-800">Inventory History</h4>
                          <button className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer !rounded-button whitespace-nowrap">
                            View All
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Action
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantity Change
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  User
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {inventoryHistory.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(record.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </td>
                                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                    {record.action}
                                  </td>
                                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                                    <span className={`font-medium ${record.quantity.startsWith('+') ? 'text-green-600' : record.quantity.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                                      {record.quantity}
                                    </span>
                                  </td>
                                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {record.user}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="text-base font-medium text-gray-800">Related Documents</h4>
                        </div>
                        <div className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <i className="fas fa-file-pdf text-red-500 mr-3 text-lg"></i>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Product Specification</p>
                                  <p className="text-xs text-gray-500">PDF, 2.4 MB</p>
                                </div>
                              </div>
                              <button className="text-indigo-600 hover:text-indigo-800 cursor-pointer !rounded-button whitespace-nowrap">
                                <i className="fas fa-download"></i>
                              </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <i className="fas fa-file-image text-blue-500 mr-3 text-lg"></i>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Vehicle Images</p>
                                  <p className="text-xs text-gray-500">ZIP, 15.7 MB</p>
                                </div>
                              </div>
                              <button className="text-indigo-600 hover:text-indigo-800 cursor-pointer !rounded-button whitespace-nowrap">
                                <i className="fas fa-download"></i>
                              </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <i className="fas fa-file-excel text-green-500 mr-3 text-lg"></i>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Pricing Sheet</p>
                                  <p className="text-xs text-gray-500">XLSX, 1.2 MB</p>
                                </div>
                              </div>
                              <button className="text-indigo-600 hover:text-indigo-800 cursor-pointer !rounded-button whitespace-nowrap">
                                <i className="fas fa-download"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowItemDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
