// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';
const OrderManagement= () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('orders');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dealershipFilter, setDealershipFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2025-001',
      customerName: 'John Smith',
      dealership: 'City Motors',
      products: ['2025 SUV Model X', 'Extended Warranty'],
      quantity: 1,
      status: 'Pending',
      orderDate: '2025-06-15',
      estimatedDelivery: '2025-07-15',
      notes: 'Customer requested black exterior with tan interior',
      totalAmount: 45000
    },
    {
      id: 'ORD-2025-002',
      customerName: 'Sarah Johnson',
      dealership: 'Highway Auto',
      products: ['2025 Sedan Model S', 'Premium Package'],
      quantity: 1,
      status: 'Processing',
      orderDate: '2025-06-12',
      estimatedDelivery: '2025-07-10',
      notes: 'Customer financing approved',
      totalAmount: 38500
    },
    {
      id: 'ORD-2025-003',
      customerName: 'Michael Rodriguez',
      dealership: 'Luxury Cars Inc',
      products: ['2025 Luxury Model L', 'Technology Package', 'Extended Warranty'],
      quantity: 1,
      status: 'Shipped',
      orderDate: '2025-06-05',
      estimatedDelivery: '2025-06-25',
      notes: 'Expedited shipping requested',
      totalAmount: 72000
    },
    {
      id: 'ORD-2025-004',
      customerName: 'David Wilson',
      dealership: 'Downtown Autos',
      products: ['2025 Compact Model C'],
      quantity: 2,
      status: 'Delivered',
      orderDate: '2025-05-20',
      estimatedDelivery: '2025-06-10',
      notes: 'Fleet purchase',
      totalAmount: 52000
    },
    {
      id: 'ORD-2025-005',
      customerName: 'Jessica Brown',
      dealership: 'Valley Vehicles',
      products: ['2025 Electric Model E', 'Home Charging Station'],
      quantity: 1,
      status: 'Cancelled',
      orderDate: '2025-06-01',
      estimatedDelivery: '2025-07-01',
      notes: 'Customer changed mind',
      totalAmount: 58000
    },
    {
      id: 'ORD-2025-006',
      customerName: 'Robert Lee',
      dealership: 'Metro Motors',
      products: ['2025 Hybrid Model H', 'Premium Sound System'],
      quantity: 1,
      status: 'Processing',
      orderDate: '2025-06-10',
      estimatedDelivery: '2025-07-05',
      notes: 'Custom paint job requested',
      totalAmount: 42500
    }
  ]);

  // Sample dealership data for dropdown
  const dealerships = [
    { id: '1', name: 'City Motors' },
    { id: '2', name: 'Highway Auto' },
    { id: '3', name: 'Luxury Cars Inc' },
    { id: '4', name: 'Downtown Autos' },
    { id: '5', name: 'Valley Vehicles' },
    { id: '6', name: 'Metro Motors' }
  ];

  // Sample products data for dropdown
  const products = [
    { id: '1', name: '2025 SUV Model X' },
    { id: '2', name: '2025 Sedan Model S' },
    { id: '3', name: '2025 Luxury Model L' },
    { id: '4', name: '2025 Compact Model C' },
    { id: '5', name: '2025 Electric Model E' },
    { id: '6', name: '2025 Hybrid Model H' },
    { id: '7', name: 'Extended Warranty' },
    { id: '8', name: 'Premium Package' },
    { id: '9', name: 'Technology Package' },
    { id: '10', name: 'Premium Sound System' },
    { id: '11', name: 'Home Charging Station' }
  ];

  // Form state for edit order
  const [orderForm, setOrderForm] = useState({
    id: '',
    customerName: '',
    dealership: '',
    products: [],
    quantity: 1,
    status: 'Pending',
    orderDate: '',
    estimatedDelivery: '',
    notes: '',
    totalAmount: 0
  });




  // Handle view order details
  const handleViewOrderDetails = () => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
  };

  // Handle edit order
  const handleEditOrder = () => {
    setOrderForm({
      id: order.id,
      customerName: order.customerName,
      dealership: order.dealership,
      products: order.products,
      quantity: order.quantity,
      status: order.status,
      orderDate: order.orderDate,
      estimatedDelivery: order.estimatedDelivery,
      notes: order.notes,
      totalAmount: order.totalAmount
    });
    setShowEditOrderModal(true);
  };

  // Handle save order
  const handleSaveOrder = () => {
    setOrders(orders.map(o =>
      o.id === orderForm.id ? {
        ...o,
        customerName: orderForm.customerName,
        dealership: orderForm.dealership,
        products: orderForm.products,
        quantity: orderForm.quantity,
        status: orderForm.status,
        estimatedDelivery: orderForm.estimatedDelivery,
        notes: orderForm.notes
      } : o
    ));
    setShowEditOrderModal(false);
  };

  // Handle create new order
  const handleCreateNewOrder = () => {
    setOrderForm({
      id: `ORD-2025-${String(orders.length + 1).padStart(3, '0')}`,
      customerName: '',
      dealership: '',
      products: [],
      quantity: 1,
      status: 'Pending',
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: '',
      notes: '',
      totalAmount: 0
    });
    setShowEditOrderModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = () => {
    setOrderToDelete(id);
    setShowDeleteConfirmation(true);
  };

  // Handle delete order
  const handleDeleteOrder = () => {
    if (orderToDelete) {
      setOrders(orders.filter(o => o.id !== orderToDelete));
      setShowDeleteConfirmation(false);
      setOrderToDelete(null);
    }
  };

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.dealership.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'all' ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesDealership =
      dealershipFilter === 'all' ||
      order.dealership === dealershipFilter;
    
    return matchesSearch && matchesStatus && matchesDealership;
  });

  // Get status badge color
  const getStatusBadgeColor = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  const handleSheetUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: 'binary' });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const sheetData = XLSX.utils.sheet_to_json(ws);

    // Update existing orders with the new data from the uploaded file
    const updatedOrders = orders.map(existingOrder => {
      const updatedOrder = sheetData.find(row => row.id === existingOrder.id); // Match by order ID
      return updatedOrder
        ? {
            ...existingOrder, // Merge existing order
            ...updatedOrder,   // Update with the new data
            status: updatedOrder.status || existingOrder.status, // Ensure the status is preserved
            totalAmount: updatedOrder.totalAmount || existingOrder.totalAmount // Handle totalAmount
          }
        : existingOrder; // If order doesn't match, keep it as is
    });

    // Add new orders from the uploaded data
    const newOrders = sheetData.filter(row =>
      !orders.find(existing => existing.id === row.id) // Add if the order ID doesn't exist in the current list
    ).map(item => ({
      id: item.id,
      customerName: item.customerName,
      dealership: item.dealership,
      products: item.products || [],
      quantity: item.quantity || 1,
      status: item.status || 'Pending',
      orderDate: item.orderDate || new Date().toISOString().split('T')[0],
      estimatedDelivery: item.estimatedDelivery || '',
      notes: item.notes || '',
      totalAmount: item.totalAmount || 0
    }));

    // Combine updated orders with newly added orders
    setOrders([...updatedOrders, ...newOrders]);
  };

  reader.readAsBinaryString(file);
};


const handleDownloadCSV = () => {
    const ws = utils.json_to_sheet(orders);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Orders");
    writeFile(wb, "Orders_Export.csv");
  };
  return (
    <div>
          {/* Main Content */}
        <main className="p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center"> Order Management
              </h1>
              <p className="text-gray-600 mt-1">Manage all vehicle orders in one place</p>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-3">
          <button
              onClick={handleDownloadCSV}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition whitespace-nowrap"
            >
              <i className="fas fa-download mr-2"></i> Download CSV
            </button>
              <button
                onClick={handleCreateNewOrder}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-plus mr-2"></i> Create New Order
              </button>
            </div>
          </div>
 

       

          {/* Order Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Order List</h3>
              <div className="flex items-center space-x-2">
                <input
                type="file"
                accept=".csv, .xlsx"
                onChange={handleSheetUpload}
                className="px-4 py-2 border rounded-lg text-sm cursor-pointer text-gray-700 bg-white hover:bg-gray-100 whitespace-nowrap"
                title="Upload Dealership Sheet"
              />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dealership
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Est. Delivery
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.dealership}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="max-w-xs truncate">
                          {order.products}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="text-blue-600 hover:text-blue-900 cursor-pointer !rounded-button whitespace-nowrap"
                            title="Edit Order"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteConfirmation(order.id)}
                            className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap"
                            title="Cancel Order"
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
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                    <span className="font-medium">{filteredOrders.length}</span> results
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
        </main>

 {/* Order Detail Modal */}
      {showOrderDetailModal && selectedOrder && (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center border-b pb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center" id="modal-title">
                        <i className="fas fa-shopping-cart text-indigo-600 mr-2"></i>
                        Order Details - {selectedOrder.id}
                      </h3>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Customer Information</h4>
                        <div className="mt-3 space-y-2">
                          <div>
                            <span className="text-sm text-gray-500">Customer Name:</span>
                            <p className="text-sm font-medium text-gray-900">{selectedOrder.customerName}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Dealership:</span>
                            <p className="text-sm font-medium text-gray-900">{selectedOrder.dealership}</p>
                          </div>
                        </div>
                        
                        <h4 className="text-sm font-medium text-gray-700 border-b pb-2 mt-6">Order Dates</h4>
                        <div className="mt-3 space-y-2">
                          <div>
                            <span className="text-sm text-gray-500">Order Date:</span>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(selectedOrder.orderDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Estimated Delivery:</span>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Product Information</h4>
                        <div className="mt-3">
                          <span className="text-sm text-gray-500">Products:</span>
                          <ul className="mt-1 space-y-1">
                            {selectedOrder.products.map(() => (
                              <li key={index} className="text-sm font-medium text-gray-900 flex items-center">
                                <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                                {product}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4">
                            <span className="text-sm text-gray-500">Quantity:</span>
                            <p className="text-sm font-medium text-gray-900">{selectedOrder.quantity}</p>
                          </div>
                          
                          <div className="mt-4">
                            <span className="text-sm text-gray-500">Total Amount:</span>
                            <p className="text-lg font-bold text-gray-900">${selectedOrder.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Notes</h4>
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {selectedOrder.notes || 'No notes available for this order.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => handleEditOrder(selectedOrder)}
                >
                  <i className="fas fa-edit mr-2"></i> Edit Order
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowOrderDetailModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditOrderModal && (
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
                    <i className="fas fa-edit text-indigo-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {orderForm.id ? `Edit Order - ${orderForm.id}` : 'Create New Order'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700">
                          Customer Name *
                        </label>
                        <input
                          type="text"
                          id="customer-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={orderForm.customerName}
                          onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dealership" className="block text-sm font-medium text-gray-700">
                          Dealership *
                        </label>
                        <div className="relative mt-1">
                          <select
                            id="dealership"
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={orderForm.dealership}
                            onChange={(e) => setOrderForm({...orderForm, dealership: e.target.value})}
                          >
                            <option value="">-- Select Dealership --</option>
                            {dealerships.map(dealership => (
                              <option key={dealership.id} value={dealership.name}>{dealership.name}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i className="fas fa-chevron-down text-xs"></i>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="products" className="block text-sm font-medium text-gray-700">
                          Products *
                        </label>
                        <div className="relative mt-1">
                          <select
                            id="products"
                            multiple
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={orderForm.products}
                            onChange={(e) => {
                              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                              setOrderForm({...orderForm, products: selectedOptions});
                            }}
                          >
                            {products.map(product => (
                              <option key={product.id} value={product.name}>{product.name}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i className="fas fa-chevron-down text-xs"></i>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple products</p>
                      </div>
                      
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                          Quantity *
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-l-md cursor-pointer !rounded-button whitespace-nowrap"
                            onClick={() => setOrderForm({...orderForm, quantity: Math.max(1, orderForm.quantity - 1)})}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            min="1"
                            className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-none"
                            value={orderForm.quantity}
                            onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value) || 1})}
                          />
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-r-md cursor-pointer !rounded-button whitespace-nowrap"
                            onClick={() => setOrderForm({...orderForm, quantity: orderForm.quantity + 1})}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status *
                        </label>
                        <div className="relative mt-1">
                          <select
                            id="status"
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={orderForm.status}
                            onChange={(e) => setOrderForm({...orderForm, status: e.target.value})}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i className="fas fa-chevron-down text-xs"></i>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="estimated-delivery" className="block text-sm font-medium text-gray-700">
                          Estimated Delivery Date
                        </label>
                        <input
                          type="date"
                          id="estimated-delivery"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={orderForm.estimatedDelivery}
                          onChange={(e) => setOrderForm({...orderForm, estimatedDelivery: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          id="notes"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={orderForm.notes}
                          onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
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
                  onClick={handleSaveOrder}
                >
                  {orderForm.id ? 'Update Order' : 'Create Order'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowEditOrderModal(false)}
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
                      Cancel Order
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to cancel this order? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={handleDeleteOrder}
                >
                  Cancel Order
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Keep Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
