import React, { useState, useEffect } from 'react';

const SalespersonCustomerInfo = () => {
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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [editCustomer, setEditCustomer] = useState({
    id: 0,
    name: '',
    phone: '',
    email: null
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

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
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const sortedCustomers = React.useMemo(() => {
    let sortableItems = [...filteredCustomers];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCustomers, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);

  const customerOrders = selectedCustomer
    ? orders.filter(order => order.customerId === selectedCustomer.id)
    : [];

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-success text-white';
      case 'Processing': return 'bg-info text-white';
      case 'Cancelled': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  };

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        {/* Customer Header */}
        <div className="mb-5">
          <h1 className="h2 text-dark mb-2">Customer Management</h1>
          <p className="text-muted">
            View and manage your customer information and order history
          </p>
        </div>

        {/* Customer Stats */}
        <div className="row mb-5">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card border-left-primary h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="mr-3 bg-primary text-white rounded-circle p-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <div className="text-sm text-muted">Total Customers</div>
                    <div className="h4 font-weight-bold">{customers.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card border-left-success h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="mr-3 bg-success text-white rounded-circle p-3">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div>
                    <div className="text-sm text-muted">Total Orders</div>
                    <div className="h4 font-weight-bold">{orders.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-left-purple h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="mr-3 bg-danger text-white rounded-circle p-3">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <div className="text-sm text-muted">Average Orders/Customer</div>
                    <div className="h4 font-weight-bold">
                      {(orders.length / customers.length).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="card shadow mb-5">
          <div className="card-header bg-white py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <h2 className="h5 mb-3 mb-md-0">My Customers</h2>
            <span className="badge bg-light text-dark">
              <i className="fas fa-clipboard-list me-2"></i>
              {filteredCustomers.length} customers
            </span>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-8 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="mt-3 me-2">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, phone or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="btn btn-primary"
                >
                  <i className="fas fa-plus me-2"></i>
                  Add Customer
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    {['name', 'phone', 'email', 'totalOrders', 'lastOrderDate'].map((key) => (
                      <th key={key} onClick={() => requestSort(key)} className="cursor-pointer">
                        <div className="d-flex align-items-center">
                          {key === 'name' && 'Customer Name'}
                          {key === 'phone' && 'Phone'}
                          {key === 'email' && 'Email'}
                          {key === 'totalOrders' && 'Total Orders'}
                          {key === 'lastOrderDate' && 'Last Order Date'}
                          {sortConfig.key === key && (
                            <span className="ms-1">
                              <i className={`fas ${sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.length > 0 ? (
                    currentCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className={selectedCustomer?.id === customer.id ? 'table-active' : ''}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                              {customer.name?.charAt(0)}
                            </div>
                            <div className="ms-3">
                              <div className="fw-bold text-truncate" style={{ maxWidth: 120 }}>{customer.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-truncate" style={{ maxWidth: 140 }}>{customer.phone}</td>
                        <td className="text-truncate" style={{ maxWidth: 180 }}>
                          {customer.email || <span className="text-muted fst-italic">Not provided</span>}
                        </td>
                        <td className="fw-bold">{customer.totalOrders}</td>
                        <td>{formatDate(customer.lastOrderDate)}</td>
                        <td className="text-end">
                          <div className="d-flex flex-wrap justify-content-end gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(e, customer);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                // handleDeleteClick(customer);
                              }}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-5">
                        <i className="fas fa-inbox fa-2x text-muted mb-3"></i>
                        <p className="text-muted">No customers found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


            {/* Pagination */}
            {filteredCustomers.length > 0 && (
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
                <div className="mb-3 mb-md-0">
                  Showing {indexOfFirstItem + 1} to{' '}
                  {Math.min(indexOfLastItem, filteredCustomers.length)} of{' '}
                  {filteredCustomers.length} customers
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Customer Order History */}
        {selectedCustomer && (
          <div className="card shadow mb-5">
            <div className="card-header bg-white py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <h2 className="h5 mb-3 mb-md-0">Customer Order History</h2>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedCustomer(null)}
              >
                <i className="fas fa-times me-2"></i> Close
              </button>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h3 className="h6">{selectedCustomer.name}</h3>
                  <div className="text-muted">
                    <i className="fas fa-phone me-2"></i>
                    {selectedCustomer.phone}
                  </div>
                  {selectedCustomer.email && (
                    <div className="text-muted">
                      <i className="fas fa-envelope me-2"></i>
                      {selectedCustomer.email}
                    </div>
                  )}
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="text-muted">Total Orders</div>
                  <div className="h4">{selectedCustomer.totalOrders}</div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Order Number</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrders.length > 0 ? (
                      customerOrders.map((order, index) => (
                        <tr key={order.id}>
                          <td className="fw-bold">{order.orderNumber}</td>
                          <td>{formatDate(order.date)}</td>
                          <td>{order.items}</td>
                          <td>${order.amount.toFixed(2)}</td>
                          <td>
                            <span className={`badge ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="fas fa-eye me-2"></i> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-5">
                          <i className="fas fa-inbox fa-2x text-muted mb-3"></i>
                          <p className="text-muted">No orders found for this customer</p>
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
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Customer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsAddModalOpen(false)}
                  ></button>
                </div>
                <form onSubmit={handleAddCustomer}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        required
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        className="form-control"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        required
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        className="form-control"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        className="form-control"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsAddModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Add Customer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Customer Modal */}
        {isEditModalOpen && (
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Customer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsEditModalOpen(false)}
                  ></button>
                </div>
                <form onSubmit={handleEditCustomer}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        required
                        value={editCustomer.name}
                        onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                        className="form-control"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        required
                        value={editCustomer.phone}
                        onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                        className="form-control"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={editCustomer.email || ''}
                        onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value || null })}
                        className="form-control"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalespersonCustomerInfo;