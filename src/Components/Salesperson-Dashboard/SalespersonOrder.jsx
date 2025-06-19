import React, { useState, useEffect } from 'react';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// interface Order {
//   id: string;
//   product: string;
//   productId: number;
//   quantity: number;
//   customerName: string;
//   customerPhone: string;
//   notes: string;
//   status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
//   orderDate: string;
// }

const SalespersonOrder = ({ orders, userId }) => {

  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleSubmit = (e) => {
  e.preventDefault(); // prevent page reload
  // your form logic here
  console.log("Form submitted");
};

  useEffect(() => {
    if (Array.isArray(orders)) {
      const result = orders.filter(order => order.salespersonId === userId);
      setFilteredOrders(result);
    }
  }, [orders, userId]);

  // State declarations (unchanged)
  const [products, setProducts] = useState();

  const [formData, setFormData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState();
  const [alert, setAlert] = useState();
  
  const ordersPerPage = 5;

  // Show alert and auto-hide
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Handle input change (unchanged)
  const handleInputChange = (e) => {}

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // Validation
  //   if (!formData.customerName || !formData.customerPhone) {
  //     setAlert({type: 'error', message: 'Please fill in all required fields'});
  //     return;
  //   }
    
  //   try {
  //     // Submit logic (unchanged)
      
  //     // Show success
  //     setAlert({type: 'success', message: 'Order submitted successfully!'});
      
  //     // Reset form
  //     setFormData({});
      
  //   } catch (error) {
  //     setAlert({type: 'error', message: 'Failed to submit order. Please try again.'});
  //   }
  // };

  // Filter and pagination logic (unchanged)
  
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);


  // const filteredOrders = orders.filter(order => order.salespersonId === userId);


  // Helper functions (unchanged)
  const formatDate = (dateString) => {};
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-warning text-dark';
      case 'Processing': return 'bg-info text-white';
      case 'Shipped': return 'bg-primary text-white';
      case 'Delivered': return 'bg-success text-white';
      default: return 'bg-secondary text-white';
    }
  };
  const getStatusIndex = (status) => {};

  return (
    <div className="min-vh-100 bg-light py-4">
      {/* Alert notifications */}
      {alert && (
        <div className={`fixed-top m-4 alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}
      
      <div className="container">
        {/* Place Order Form */}
        <div className="mb-5">
          <h2 className="h2 text-dark mb-3">
            Place Order <span className="text-primary">.</span>
          </h2>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="productId" className="form-label">
                      Product
                    </label>
                    <select
                      id="productId"
                      name="productId"
                      value={formData.productId}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="customerName" className="form-label">
                      Customer Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="customerPhone" className="form-label">
                      Customer Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-12">
                    <label htmlFor="notes" className="form-label">
                      Order Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                  >
                    <i className="fas fa-plus me-2"></i>
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Order Status Tracker */}
        <div className="mb-5">
          <h2 className="h2 text-dark mb-3">
            Order Status Tracker <span className="text-primary">.</span>
          </h2>
          
          {selectedOrder ? (
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                  <div className="mb-3 mb-md-0">
                    <h3 className="h5 mb-1">{selectedOrder.id}</h3>
                    <p className="text-muted mb-0">{formatDate(selectedOrder.orderDate)}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-muted me-2">Order for:</span>
                    <span className="fw-medium">{selectedOrder.customerName}</span>
                  </div>
                </div>
                
                <div className="order-tracker">
                  <div className="progress mb-4" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar"
                      style={{ width: `${(getStatusIndex(selectedOrder.status) + 1) * 25}%` }}
                    ></div>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status, index) => {
                      const currentIndex = getStatusIndex(selectedOrder.status);
                      const isComplete = index < currentIndex;
                      const isCurrent = index === currentIndex;
                      
                      return (
                        <div key={status} className="text-center position-relative" style={{ zIndex: 1 }}>
                          <div 
                            className={`d-inline-flex align-items-center justify-content-center rounded-circle ${isComplete || isCurrent ? 'bg-primary text-white' : 'bg-light text-muted border'}`}
                            style={{ width: '40px', height: '40px' }}
                          >
                            {isComplete ? <i className="fas fa-check"></i> : index + 1}
                          </div>
                          <div className={`mt-2 fw-medium ${isCurrent ? 'text-primary' : ''}`}>
                            {status}
                          </div>
                          <div className="text-muted small mt-1">
                            {index <= currentIndex ? formatDate(selectedOrder.orderDate) : '-'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm text-center py-5">
              <div className="card-body">
                <i className="fas fa-box-open text-muted fs-1 mb-3"></i>
                <p className="text-muted mb-0">No order selected to track</p>
              </div>
            </div>
          )}
        </div>
        
        {/* My Orders Table */}
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
            <h2 className="h2 text-dark mb-3 mb-md-0">
              My Orders <span className="text-primary">.</span>
            </h2>
            <span className="badge bg-light text-dark fs-6 px-3 py-2">
              <i className="fas fa-clipboard-list me-2"></i>
              {filteredOrders.length} orders
            </span>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="col-md-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                
                <div className="col-md-2 text-md-end">
                  <button className="btn btn-outline-secondary w-100">
                    <i className="fas fa-download me-2"></i> Export
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Customer Details</th>
                      <th>Order Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.length > 0 ? (
                      currentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="fw-medium">{order.id}</td>
                          <td>{order.product}</td>
                          <td>{order.quantity}</td>
                          <td>
                            <div className="fw-medium">{order.customerName}</div>
                            <div className="text-muted small">{order.customerPhone}</div>
                          </td>
                          <td className="text-nowrap">{formatDate(order.orderDate)}</td>
                          <td>
                            <span className={`badge ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="fas fa-eye me-1"></i> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-5">
                          <i className="fas fa-inbox fs-1 text-muted mb-3"></i>
                          <p className="text-muted">No orders found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {filteredOrders.length > 0 && (
                <div className="card-footer bg-white">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="mb-2 mb-md-0">
                      Showing {indexOfFirstOrder + 1} to{' '}
                      {Math.min(indexOfLastOrder, filteredOrders.length)} of{' '}
                      {filteredOrders.length} orders
                    </div>
                    
                    <nav>
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                          >
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalespersonOrder;