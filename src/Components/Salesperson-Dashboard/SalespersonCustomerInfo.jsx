// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';

// interface Customer {
//   id: number;
//   name: string;
//   phone: string;
//   email: string | null;
//   totalOrders: number;
//   lastOrderDate: string;
// }

// interface Order {
//   id: number;
//   customerId: number;
//   orderNumber: string;
//   date: string;
//   amount: number;
//   status: 'Completed' | 'Processing' | 'Cancelled';
//   items: number;
// }

const SalespersonCustomerInfo= () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@example.com',
      totalOrders: 8,
      lastOrderDate: '2025-06-10T14:30:00'
    },
    {
      id: 2,
      name: 'Emily Johnson',
      phone: '+1 (555) 234-5678',
      email: 'emily.j@example.com',
      totalOrders: 5,
      lastOrderDate: '2025-06-15T09:45:00'
    },
    {
      id: 3,
      name: 'Michael Brown',
      phone: '+1 (555) 345-6789',
      email: null,
      totalOrders: 3,
      lastOrderDate: '2025-06-05T11:20:00'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      phone: '+1 (555) 456-7890',
      email: 'sarah.w@example.com',
      totalOrders: 12,
      lastOrderDate: '2025-06-18T16:10:00'
    },
    {
      id: 5,
      name: 'David Miller',
      phone: '+1 (555) 567-8901',
      email: 'david.m@example.com',
      totalOrders: 2,
      lastOrderDate: '2025-05-28T13:30:00'
    },
    {
      id: 6,
      name: 'Jennifer Garcia',
      phone: '+1 (555) 678-9012',
      email: null,
      totalOrders: 7,
      lastOrderDate: '2025-06-12T10:15:00'
    },
    {
      id: 7,
      name: 'Robert Wilson',
      phone: '+1 (555) 789-0123',
      email: 'robert.w@example.com',
      totalOrders: 4,
      lastOrderDate: '2025-06-17T09:00:00'
    },
    {
      id: 8,
      name: 'Lisa Martinez',
      phone: '+1 (555) 890-1234',
      email: 'lisa.m@example.com',
      totalOrders: 9,
      lastOrderDate: '2025-06-14T14:45:00'
    }
  ]);
  
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerId: 1,
      orderNumber: 'ORD-2025-001',
      date: '2025-06-10T14:30:00',
      amount: 249.99,
      status: 'Completed',
      items: 3
    },
    {
      id: 2,
      customerId: 1,
      orderNumber: 'ORD-2025-008',
      date: '2025-05-25T11:45:00',
      amount: 129.50,
      status: 'Completed',
      items: 2
    },
    {
      id: 3,
      customerId: 2,
      orderNumber: 'ORD-2025-015',
      date: '2025-06-15T09:45:00',
      amount: 349.95,
      status: 'Completed',
      items: 4
    },
    {
      id: 4,
      customerId: 3,
      orderNumber: 'ORD-2025-023',
      date: '2025-06-05T11:20:00',
      amount: 89.99,
      status: 'Completed',
      items: 1
    },
    {
      id: 5,
      customerId: 4,
      orderNumber: 'ORD-2025-032',
      date: '2025-06-18T16:10:00',
      amount: 199.95,
      status: 'Processing',
      items: 2
    },
    {
      id: 6,
      customerId: 5,
      orderNumber: 'ORD-2025-041',
      date: '2025-05-28T13:30:00',
      amount: 74.50,
      status: 'Completed',
      items: 1
    },
    {
      id: 7,
      customerId: 6,
      orderNumber: 'ORD-2025-047',
      date: '2025-06-12T10:15:00',
      amount: 299.99,
      status: 'Completed',
      items: 3
    },
    {
      id: 8,
      customerId: 7,
      orderNumber: 'ORD-2025-052',
      date: '2025-06-17T09:00:00',
      amount: 149.95,
      status: 'Processing',
      items: 2
    },
    {
      id: 9,
      customerId: 8,
      orderNumber: 'ORD-2025-061',
      date: '2025-06-14T14:45:00',
      amount: 399.99,
      status: 'Completed',
      items: 5
    },
    {
      id: 10,
      customerId: 1,
      orderNumber: 'ORD-2025-068',
      date: '2025-06-01T10:30:00',
      amount: 179.95,
      status: 'Cancelled',
      items: 2
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [editCustomer, setEditCustomer] = useState<{
    id: number,
    name: string,
    phone: string,
    email: string | null,
  }>({
    id: 0,
    name: '',
    phone: '',
    email: null
  });
  
  const [sortConfig, setSortConfig] = useState<{
    key ,
    direction: 'ascending' | 'descending',
  }>({ key , direction: 'ascending' })

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const customer = {
      id: customers.length + 1,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email || null,
      totalOrders: 0,
      lastOrderDate: new Date().toISOString()
    };
    setCustomers([...customers, customer]);
    setNewCustomer({ name: '', phone: '', email: '' });
    setIsAddModalOpen(false);
  };
  
  const handleEditClick = (e, customer) => {
    e.stopPropagation();
    setEditCustomer({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email
    });
    setIsEditModalOpen(true);
  };
  
  const handleEditCustomer = (e) => {
    e.preventDefault();
    const updatedCustomers = customers.map(customer => {
      if (customer.id === editCustomer.id) {
        return {
          ...customer,
          name: editCustomer.name,
          phone: editCustomer.phone,
          email: editCustomer.email
        };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    setIsEditModalOpen(false);
    
    // Update selected customer if it's the one being edited
    if (selectedCustomer && selectedCustomer.id === editCustomer.id) {
      setSelectedCustomer({
        ...selectedCustomer,
        name: editCustomer.name,
        phone: editCustomer.phone,
        email: editCustomer.email
      });
    }
  };
  
  const itemsPerPage = 5;
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });
  
  // Sort customers if sort config is set
  const sortedCustomers = React.useMemo(() => {
    let sortableItems = [...filteredCustomers];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a < b) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a > b) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCustomers, sortConfig]);
  
  // Paginate customers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  
  // Get customer orders
  const customerOrders = selectedCustomer
    ? orders.filter(order => order.customerId === selectedCustomer.id)
    : [];
  
  // Handle sorting
  const requestSort = (key) => {
    let direction;
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Customer Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your customer information and order history
          </p>
        </div>
        
        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <i className="fas fa-users text-blue-500 text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <i className="fas fa-shopping-cart text-green-500 text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <i className="fas fa-chart-line text-purple-500 text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Orders/Customer</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(orders.length / customers.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">My Customers</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredCustomers.length} customers
            </span>
          </div>
          <div className="h-1 w-24 bg-blue-500 mb-6"></div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, phone or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm !rounded-button"
                />
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)} 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer whitespace-nowrap !rounded-button"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Customer
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('name')}
                    >
                      <div className="flex items-center">
                        Customer Name
                        {sortConfig.key === 'name' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ?
                              <i className="fas fa-sort-up"></i> :
                              <i className="fas fa-sort-down"></i>
                            }
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('phone')}
                    >
                      <div className="flex items-center">
                        Phone
                        {sortConfig.key === 'phone' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ?
                              <i className="fas fa-sort-up"></i> :
                              <i className="fas fa-sort-down"></i>
                            }
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('email')}
                    >
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === 'email' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ?
                              <i className="fas fa-sort-up"></i> :
                              <i className="fas fa-sort-down"></i>
                            }
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('totalOrders')}
                    >
                      <div className="flex items-center">
                        Total Orders
                        {sortConfig.key === 'totalOrders' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ?
                              <i className="fas fa-sort-up"></i> :
                              <i className="fas fa-sort-down"></i>
                            }
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('lastOrderDate')}
                    >
                      <div className="flex items-center">
                        Last Order Date
                        {sortConfig.key === 'lastOrderDate' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'ascending' ?
                              <i className="fas fa-sort-up"></i> :
                              <i className="fas fa-sort-down"></i>
                            }
                          </span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCustomers.length > 0 ? (
                    currentCustomers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''} hover:bg-gray-100 cursor-pointer`}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-lg">
                                {customer.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.email || <span className="text-gray-400 italic">Not provided</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {customer.totalOrders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(customer.lastOrderDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer !rounded-button"
                            onClick={(e) => handleEditClick(e, customer)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {filteredCustomers.length > 0 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredCustomers.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredCustomers.length}</span> customers
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                        } !rounded-button`}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          } cursor-pointer whitespace-nowrap !rounded-button`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                        } !rounded-button`}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Customer Order History */}
        {selectedCustomer && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-gray-800">Customer Order History</h2>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button"
                onClick={() => setSelectedCustomer(null)}
              >
                <i className="fas fa-times mr-1"></i> Close
              </button>
            </div>
            <div className="h-1 w-24 bg-purple-500 mb-6"></div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedCustomer.name}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                      <i className="fas fa-phone mr-2"></i>
                      {selectedCustomer.phone}
                    </div>
                    {selectedCustomer.email && (
                      <div className="mt-1 flex items-center text-sm text-gray-600">
                        <i className="fas fa-envelope mr-2"></i>
                        {selectedCustomer.email}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-sm text-gray-600">Total Orders</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedCustomer.totalOrders}</div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customerOrders.length > 0 ? (
                      customerOrders.map((order, index) => (
                        <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.orderNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${order.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 cursor-pointer !rounded-button">
                              <i className="fas fa-eye mr-1"></i> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No orders found for this customer
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Add Customer Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Customer</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 !rounded-button"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleAddCustomer}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button"
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 !rounded-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 !rounded-button"
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Edit Customer Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Customer</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 !rounded-button"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleEditCustomer}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editCustomer.name}
                    onChange={(e) => setEditCustomer({...editCustomer, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button"
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={editCustomer.phone}
                    onChange={(e) => setEditCustomer({...editCustomer, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editCustomer.email || ''}
                    onChange={(e) => setEditCustomer({...editCustomer, email: e.target.value || null})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 !rounded-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 !rounded-button"
                  >
                    Save Changes
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

export default SalespersonCustomerInfo;
