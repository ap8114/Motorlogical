import React, { useState, useEffect } from 'react';
import { FiEye, FiLock } from 'react-icons/fi';

import {
  Table,
  Button,
  Modal,
  Form,
  Dropdown,
  Toast,
  Spinner,
  ButtonGroup,
  Pagination
} from 'react-bootstrap';
import {
  FaEye,
  FaEdit,
  FaPlus,
  FaDownload,
  FaSearch,
  FaChevronDown,
  FaExclamationTriangle,
  FaInbox,
  FaSync,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const OrdersManagement = () => {
  // Sample order data with paymentStatus field
  const [orders, setOrders] = useState([
    { id: 'ORD-2025-1042', product: 'Premium Brake Pads', quantity: 8, status: 'completed', date: '06/12/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: true },
    { id: 'ORD-2025-1041', product: 'Performance Air Filter', quantity: 12, status: 'processing', date: '06/11/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: false },
    { id: 'ORD-2025-1040', product: 'Synthetic Motor Oil (5L)', quantity: 20, status: 'pending', date: '06/10/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: false },
    { id: 'ORD-2025-1039', product: 'Headlight Assembly', quantity: 2, status: 'completed', date: '06/09/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: true },
    { id: 'ORD-2025-1038', product: 'Transmission Fluid', quantity: 15, status: 'cancelled', date: '06/08/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: false },
    { id: 'ORD-2025-1037', product: 'Wiper Blades (Set)', quantity: 30, status: 'completed', date: '06/07/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: true },
    { id: 'ORD-2025-1036', product: 'Cabin Air Filter', quantity: 10, status: 'processing', date: '06/06/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: false },
    { id: 'ORD-2025-1035', product: 'Spark Plugs (Set of 4)', quantity: 25, status: 'completed', date: '06/05/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: true },
    { id: 'ORD-2025-1034', product: 'Brake Fluid', quantity: 12, status: 'pending', date: '06/04/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: false },
    { id: 'ORD-2025-1033', product: 'Power Steering Fluid', quantity: 8, status: 'completed', date: '06/03/2025', dealership: 'Eastside Motors', location: 'Seattle, WA', paymentStatus: true },
  ]);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: '', title: '', message: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isFinanceUser, setIsFinanceUser] = useState(false); // Finance department access

  // Form states
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productName, setProductName] = useState('Select a product');
  const [quantity, setQuantity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusName, setStatusName] = useState('');
  const [formErrors, setFormErrors] = useState({ product: false, quantity: false });

  // Status colors
  const statusColors = {
    pending: 'warning',
    processing: 'primary',
    completed: 'success',
    cancelled: 'danger'
  };

  // Payment status colors
  const paymentStatusColors = {
    true: 'success',
    false: 'warning'
  };

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      setFilteredOrders(orders);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleExport = () => {
    showNotification('success', 'Export Started', 'Your orders are being exported to Excel. The download will begin shortly.');

    setTimeout(() => {
      console.log('Exporting orders to Excel:', orders);
      showNotification('success', 'Export Complete', 'Your orders have been successfully exported to Excel.');
    }, 2000);
  };

  const showNotification = (type, title, message) => {
    setToastData({ type, title, message });
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleNewOrder = () => {
    setSelectedProduct('');
    setProductName('Select a product');
    setQuantity('');
    setFormErrors({ product: false, quantity: false });
    setShowNewOrderModal(true);
  };

  const handleCloseNewOrderModal = () => {
    setShowNewOrderModal(false);
  };

  const handleSubmitOrder = () => {
    const errors = {
      product: !selectedProduct,
      quantity: !quantity || isNaN(quantity) || quantity < 1
    };

    setFormErrors(errors);

    if (!errors.product && !errors.quantity) {
      // Simulate form submission
      const newOrder = {
        id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        product: productName,
        quantity: parseInt(quantity, 10),
        status: 'pending',
        date: new Date().toLocaleDateString(),
        dealership: 'Eastside Motors',
        location: 'Seattle, WA',
        paymentStatus: false // Default to unpaid
      };

      console.log('Order submitted:', newOrder);

      // In a real app, you would call an API here
      setOrders([...orders, newOrder]);
      setShowNewOrderModal(false);
      showNotification('success', 'Order Created', 'Your order has been created successfully.');
    }
  };

  const handleViewOrder = (orderId, edit = false) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setCurrentOrder(order);
      setSelectedStatus(order.status);
      setStatusName(order.status.charAt(0).toUpperCase() + order.status.slice(1));
      setEditMode(edit);
      setShowViewOrderModal(true);
    }
  };

  const handleSaveOrder = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order =>
        order.id === currentOrder.id
          ? { 
              ...order, 
              status: selectedStatus, 
              quantity: parseInt(currentOrder.quantity, 10),
              paymentStatus: currentOrder.paymentStatus 
            }
          : order
      );

      setOrders(updatedOrders);
      setShowViewOrderModal(false);
      showNotification('success', 'Order Updated', 'Your order has been updated successfully.');
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setStatusName(status.charAt(0).toUpperCase() + status.slice(1));
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`badge bg-${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    return (
      <span className={`badge bg-${paymentStatus ? 'success' : 'warning'}`}>
        {paymentStatus ? "Paid" : "Pending"}
      </span>
    );
  };

  const products = [
    { id: 'product-1', name: 'Premium Brake Pads' },
    { id: 'product-2', name: 'Performance Air Filter' },
    { id: 'product-3', name: 'Synthetic Motor Oil (5L)' },
    { id: 'product-4', name: 'Headlight Assembly' },
    { id: 'product-5', name: 'Transmission Fluid' }
  ];

  // Pagination component
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FaChevronLeft size={12} />
        </Pagination.Prev>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FaChevronRight size={12} />
        </Pagination.Next>
      </Pagination>
    );
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Finance Mode Toggle */}
      <div className="position-absolute top-0 end-0 mt-3 me-3">
        <Button 
          variant={isFinanceUser ? "success" : "outline-secondary"} 
          size="sm"
          onClick={() => setIsFinanceUser(!isFinanceUser)}
          className="d-flex align-items-center"
        >
          <FiLock className="me-1" />
          Finance Mode: {isFinanceUser ? 'ON' : 'OFF'}
        </Button>
      </div>

      <div className='bg-white shadow-sm py-3 mb-2 '>
        <h3 className=' py-1 ms-3'>Finance Department</h3>
        <p className='text-muted ms-3'>All recent and pending orders in one place</p>
      </div>
      
      {/* Action Bar - Responsive */}
      <div className="row mb-3 mb-md-4">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <Button variant="primary" className="w-100 w-md-auto" onClick={handleNewOrder}>
            <FaPlus className="me-2" />
            New Order
          </Button>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column flex-md-row align-items-stretch">
            <div className="flex-grow-1 mb-2 mb-md-0 me-md-2">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <Button
              variant="outline-secondary"
              className="w-100 w-md-auto mt-2 mt-md-0"
              onClick={handleExport}
            >
              <FaDownload className="me-2" />
              <span className="d-none d-md-inline">Export to Excel</span>
              <span className="d-md-none">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" variant="primary" />
          <span className="ms-3">Loading orders...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-danger text-center p-4 rounded">
          <div className="d-flex justify-content-center mb-3">
            <FaExclamationTriangle size={48} className="text-danger" />
          </div>
          <h3 className="h5 mb-2">Unable to load orders</h3>
          <p className="mb-3">There was an error fetching your order data. Please try again later.</p>
          <Button variant="danger">
            <FaSync className="me-2" />
            Retry
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredOrders.length === 0 && (
        <div className="card text-center p-5">
          <div className="d-flex justify-content-center mb-4">
            <FaInbox size={48} className="text-muted" />
          </div>
          <h3 className="h5 mb-2">No orders found</h3>
          <p className="text-muted mb-4">You haven't created any orders yet or no orders match your search criteria.</p>
          <Button variant="primary" onClick={handleNewOrder}>
            <FaPlus className="me-2" />
            Create your first order
          </Button>
        </div>
      )}

      {/* Orders Table - Desktop */}
      {!loading && !error && filteredOrders.length > 0 && !isMobile && (
        <div className="card">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-semibold text-primary">{order.id}</td>
                    <td>{order.product}</td>
                    <td className="">{order.quantity}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{getPaymentStatusBadge(order.paymentStatus)}</td>
                    <td>{order.date}</td>
                    <td className="text-end">
                      <ButtonGroup size="sm" className="gap-2">

                        <Button
                          variant="link" className="text-primary p-0 mr-2"
                          onClick={() => handleViewOrder(order.id, false)}
                        >
                          <FiEye /> {/* View Icon */}
                        </Button>

                        <Button
                          variant=""
                          onClick={() => handleViewOrder(order.id, true)}
                        >
                          <FaEdit /> {/* Edit Icon */}
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="card-footer d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
            <div className="mb-3 mb-md-0 text-center text-md-start">
              <p className="small mb-0">
                Showing <span className="fw-semibold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="fw-semibold">
                  {indexOfLastItem > filteredOrders.length ? filteredOrders.length : indexOfLastItem}
                </span> of{' '}
                <span className="fw-semibold">{filteredOrders.length}</span> results
              </p>
            </div>
            {renderPagination()}
          </div>
        </div>
      )}

      {/* Mobile Orders List */}
      {!loading && !error && filteredOrders.length > 0 && isMobile && (
        <div className="card">
          <div className="list-group list-group-flush">
            {currentItems.map((order) => (
              <div key={order.id} className="list-group-item p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div className="fw-bold text-primary">{order.id}</div>
                    <div className="text-muted small">{order.date}</div>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    {getStatusBadge(order.status)}
                    <div className="mt-1">{getPaymentStatusBadge(order.paymentStatus)}</div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="fw-medium">{order.product}</div>
                    <div className="text-muted small">Quantity: {order.quantity}</div>
                  </div>

                  <div>
                    <ButtonGroup size="sm">
                     <Button
                          variant="link" className="text-primary p-0 mr-2"
                          onClick={() => handleViewOrder(order.id, false)}
                        >
                          <FiEye /> {/* View Icon */}
                        </Button>
                      <Button
                        variant="btn-secondary"
                        className="p-1 px-2"
                        onClick={() => handleViewOrder(order.id, true)}
                      >
                        <FaEdit />
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>

                <div className="d-flex justify-content-between small">
                  <div className="text-muted">Dealership: {order.dealership}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="card-footer d-flex flex-column align-items-center py-3">
            <div className="mb-3 text-center">
              <p className="small mb-0">
                Showing <span className="fw-semibold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="fw-semibold">
                  {indexOfLastItem > filteredOrders.length ? filteredOrders.length : indexOfLastItem}
                </span> of{' '}
                <span className="fw-semibold">{filteredOrders.length}</span> results
              </p>
            </div>
            {renderPagination()}
          </div>
        </div>
      )}

      {/* New Order Modal */}
      <Modal show={showNewOrderModal} onHide={handleCloseNewOrderModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start d-flex align-items-center justify-content-between">
                  {productName}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {products.map((product) => (
                    <Dropdown.Item
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setProductName(product.name);
                        setFormErrors({ ...formErrors, product: false });
                      }}
                    >
                      {product.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {formErrors.product && (
                <Form.Text className="text-danger">Please select a product</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setFormErrors({ ...formErrors, quantity: false });
                  }}
                  min="1"
                />
                <span className="input-group-text">units</span>
              </div>
              {formErrors.quantity && (
                <Form.Text className="text-danger">Please enter a valid quantity</Form.Text>
              )}
            </Form.Group>

            <input type="hidden" name="dealership" value="Eastside Motors" />
            <input type="hidden" name="location" value="Seattle, WA" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewOrderModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitOrder}>
            Create Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View/Edit Order Modal */}
      <Modal show={showViewOrderModal} onHide={() => setShowViewOrderModal(false)} centered>
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Modal.Title>Order Details</Modal.Title>
            <span className={`badge bg-${statusColors[selectedStatus]}`}>
              {statusName}
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-light p-3 rounded mb-4">
            <div className="row">
              <div className="col-md-6 mb-2">
                <p className="small text-muted mb-0">Order ID</p>
                <p className="mb-0">{currentOrder?.id}</p>
              </div>
              <div className="col-md-6 mb-2">
                <p className="small text-muted mb-0">Date</p>
                <p className="mb-0">{currentOrder?.date}</p>
              </div>
              <div className="col-md-6">
                <p className="small text-muted mb-0">Dealership</p>
                <p className="mb-0">{currentOrder?.dealership}</p>
              </div>
              <div className="col-md-6">
                <p className="small text-muted mb-0">Location</p>
                <p className="mb-0">{currentOrder?.location}</p>
              </div>
            </div>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control
                type="text"
                value={currentOrder?.product || ''}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="number"
                  value={currentOrder?.quantity || ''}
                  onChange={(e) => setCurrentOrder({ ...currentOrder, quantity: e.target.value })}
                  readOnly={!editMode}
                />
                <span className="input-group-text">units</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Status</Form.Label>
              {editMode && isFinanceUser ? (
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                    {currentOrder?.paymentStatus ? "Paid" : "Pending"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item onClick={() => setCurrentOrder({ ...currentOrder, paymentStatus: true })}>
                      Paid
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCurrentOrder({ ...currentOrder, paymentStatus: false })}>
                      Pending
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className={`badge bg-${paymentStatusColors[currentOrder?.paymentStatus]} p-2 w-100 text-start`}>
                  {currentOrder?.paymentStatus ? "Paid" : "Pending"}
                </div>
              )}
            </Form.Group>

            {editMode && (
              <Form.Group className="mb-3">
                <Form.Label>Order Status</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start d-flex align-items-center justify-content-between">
                    {statusName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item onClick={() => handleStatusSelect('pending')}>Pending</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusSelect('processing')}>Processing</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusSelect('completed')}>Completed</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusSelect('cancelled')}>Cancelled</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewOrderModal(false)}>
            Close
          </Button>
          {!editMode ? (
            <Button variant="primary" onClick={() => handleViewOrder(currentOrder?.id, true)}>
              Edit Order
            </Button>
          ) : (
            <Button variant="success" onClick={handleSaveOrder}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Notification Toast */}
      <div className={`position-fixed ${isMobile ? 'bottom-0 start-0 end-0 p-3' : 'bottom-0 end-0 p-3'}`} style={{ zIndex: 11 }}>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          className={isMobile ? 'w-100' : ''}
        >
          <Toast.Header className={`bg-${toastData.type === 'success' ? 'success' : 'danger'} text-white`}>
            <strong className="me-auto">{toastData.title}</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
            ></button>
          </Toast.Header>
          <Toast.Body className={toastData.type === 'success' ? 'text-success' : 'text-danger'}>
            {toastData.message}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default OrdersManagement;