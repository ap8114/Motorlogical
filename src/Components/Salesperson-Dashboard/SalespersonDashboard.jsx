import React, { useState } from 'react';

const SalespersonDashboard = () => {
    // Sample data for orders
    const [orders, setOrders] = useState([
        { id: 'ORD-2506', customer: 'John Smith', product: 'Premium Laptop', quantity: 2, status: 'Delivered', date: '2025-06-15' },
        { id: 'ORD-2498', customer: 'Emma Wilson', product: 'Wireless Headphones', quantity: 1, status: 'Processing', date: '2025-06-17' },
        { id: 'ORD-2487', customer: 'Michael Brown', product: 'Smart Watch', quantity: 3, status: 'Shipped', date: '2025-06-18' },
        { id: 'ORD-2475', customer: 'Sarah Davis', product: 'Bluetooth Speaker', quantity: 1, status: 'Pending', date: '2025-06-19' },
    ]);
    
    // Sample data for inventory
    const [inventory, setInventory] = useState([
        { name: 'Premium Laptop', sku: 'LP-2025-PRO', quantity: 25, status: 'In Stock' },
        { name: 'Wireless Headphones', sku: 'WH-350-BLK', quantity: 42, status: 'In Stock' },
        { name: 'Smart Watch', sku: 'SW-120-SLV', quantity: 8, status: 'Low Stock' },
        { name: 'Bluetooth Speaker', sku: 'BS-500-RED', quantity: 0, status: 'Out of Stock' },
        { name: 'Wireless Charger', sku: 'WC-100-WHT', quantity: 15, status: 'In Stock' },
        { name: 'External SSD', sku: 'SSD-1TB-BLK', quantity: 3, status: 'Low Stock' },
    ]);
    
    // Sample data for customers
    const [customers, setCustomers] = useState([
        { name: 'John Smith', phone: '(555) 123-4567', email: 'john.smith@example.com', totalOrders: 5, lastOrderDate: '2025-06-15' },
        { name: 'Emma Wilson', phone: '(555) 987-6543', email: 'emma.w@example.com', totalOrders: 3, lastOrderDate: '2025-06-17' },
        { name: 'Michael Brown', phone: '(555) 456-7890', email: 'michael.b@example.com', totalOrders: 8, lastOrderDate: '2025-06-18' },
        { name: 'Sarah Davis', phone: '(555) 789-0123', email: 'sarah.d@example.com', totalOrders: 1, lastOrderDate: '2025-06-19' },
    ]);
    
    // Form state for new order
    const [newOrder, setNewOrder] = useState({
        product: '',
        quantity: 1,
        customerName: '',
        customerPhone: '',
        orderNotes: '',
    });
    
    // State for expanded customer
    const [expandedCustomer, setExpandedCustomer] = useState(null);
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({
            ...newOrder,
            [name]: value,
        });
    };
    
    // Handle quantity change with buttons
    const handleQuantityChange = (amount) => {
        setNewOrder({
            ...newOrder,
            quantity: Math.max(1, newOrder.quantity + amount),
        });
    };
    
    // Handle form submission
    const handleSubmitOrder = (e) => {
        e.preventDefault();
        // Here you would typically send the order to an API
        const newOrderEntry = {
            id: `ORD-${Math.floor(Math.random() * 1000)}`,
            customer: newOrder.customerName,
            product: newOrder.product,
            quantity: newOrder.quantity,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
        };
        setOrders([newOrderEntry, ...orders]);
        // Reset form
        setNewOrder({
            product: '',
            quantity: 1,
            customerName: '',
            customerPhone: '',
            orderNotes: '',
        });
    };
    
    // Toggle customer expansion
    const toggleCustomerExpansion = (customerName) => {
        if (expandedCustomer === customerName) {
            setExpandedCustomer(null);
        } else {
            setExpandedCustomer(customerName);
        }
    };
    
    // Get status color class
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-success text-white';
            case 'Shipped':
                return 'bg-primary text-white';
            case 'Processing':
                return 'bg-warning text-dark';
            case 'Pending':
                return 'bg-secondary text-white';
            default:
                return 'bg-light text-dark';
        }
    };
    
    // Get inventory status color class
    const getInventoryStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'bg-success text-white';
            case 'Low Stock':
                return 'bg-warning text-dark';
            case 'Out of Stock':
                return 'bg-danger text-white';
            default:
                return 'bg-light text-dark';
        }
    };
    
    return (
        <div className="container-fluid p-0">
            <div className="container py-4">
                <div className="mb-4">
                    <h1 className="h2">Welcome back, Sales Manager</h1>
                    <p className="text-muted">Here's what's happening with your sales today.</p>
                </div>
                
                {/* Stats Cards */}
                <div className="row mb-4">
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-circle bg-primary bg-opacity-10 text-primary">
                                        <i className="fas fa-shopping-cart fs-4"></i>
                                    </div>
                                    <div className="ms-3">
                                        <p className="text-muted mb-1">Total Orders</p>
                                        <h3 className="mb-0">125</h3>
                                        <p className="text-success mb-0">
                                            <i className="fas fa-arrow-up me-1"></i>
                                            12% up
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-circle bg-success bg-opacity-10 text-success">
                                        <i className="fas fa-dollar-sign fs-4"></i>
                                    </div>
                                    <div className="ms-3">
                                        <p className="text-muted mb-1">Total Revenue</p>
                                        <h3 className="mb-0">$12,426</h3>
                                        <p className="text-success mb-0">
                                            <i className="fas fa-arrow-up me-1"></i>
                                            8% up
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-circle bg-info bg-opacity-10 text-info">
                                        <i className="fas fa-users fs-4"></i>
                                    </div>
                                    <div className="ms-3">
                                        <p className="text-muted mb-1">Total Customers</p>
                                        <h3 className="mb-0">1,205</h3>
                                        <p className="text-success mb-0">
                                            <i className="fas fa-arrow-up me-1"></i>
                                            5% up
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6 col-lg-3 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-circle bg-warning bg-opacity-10 text-warning">
                                        <i className="fas fa-box fs-4"></i>
                                    </div>
                                    <div className="ms-3">
                                        <p className="text-muted mb-1">Products in Stock</p>
                                        <h3 className="mb-0">85</h3>
                                        <p className="text-danger mb-0">
                                            <i className="fas fa-arrow-down me-1"></i>
                                            3% down
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Order Management Section */}
                <div className="card mb-4">
                    <div className="card-header bg-white">
                        <h2 className="h5 mb-0">
                            <i className="fas fa-clipboard-list me-2"></i>
                            Order Management
                        </h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmitOrder}>
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="product" className="form-label">Product</label>
                                    <select
                                        id="product"
                                        name="product"
                                        value={newOrder.product}
                                        onChange={handleInputChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Select a product</option>
                                        {inventory.map((item) => (
                                            <option key={item.sku} value={item.name} disabled={item.status === 'Out of Stock'}>
                                                {item.name} {item.status === 'Out of Stock' ? '(Out of Stock)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="col-md-6">
                                    <label htmlFor="quantity" className="form-label">Quantity</label>
                                    <div className="input-group">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(-1)}
                                            className="me-2"
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={newOrder.quantity}
                                            onChange={handleInputChange}
                                            min="1"
                                            className="form-control text-center"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(1)}
                                            className="ms-2"
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="col-md-6">
                                    <label htmlFor="customerName" className="form-label">Customer Name</label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        name="customerName"
                                        value={newOrder.customerName}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                
                                <div className="col-md-6">
                                    <label htmlFor="customerPhone" className="form-label">Customer Phone</label>
                                    <input
                                        type="tel"
                                        id="customerPhone"
                                        name="customerPhone"
                                        value={newOrder.customerPhone}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                
                                <div className="col-12">
                                    <label htmlFor="orderNotes" className="form-label">Order Notes</label>
                                    <textarea
                                        id="orderNotes"
                                        name="orderNotes"
                                        rows={3}
                                        value={newOrder.orderNotes}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    ></textarea>
                                </div>
                                
                                <div className="col-12 text-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="fas fa-plus me-2"></i>
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </form>
                        
                        <h3 className="h5 mb-3">My Orders</h3>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>{order.product}</td>
                                            <td>{order.quantity}</td>
                                            <td>
                                                <span className={`badge ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="mt-4">
                            <h4 className="h6 mb-3">Order Status Tracker</h4>
                            <div className="d-flex justify-content-between">
                                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status, index) => (
                                    <div key={status} className="text-center">
                                        <div className={`rounded-circle d-inline-flex align-items-center justify-content-center ${index === 0 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{width: '36px', height: '36px'}}>
                                            {index === 0 && <i className="fas fa-clipboard-check"></i>}
                                            {index === 1 && <i className="fas fa-cog"></i>}
                                            {index === 2 && <i className="fas fa-shipping-fast"></i>}
                                            {index === 3 && <i className="fas fa-check"></i>}
                                        </div>
                                        <div className="small mt-1">{status}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Inventory Section */}
                <div className="card mb-4">
                    <div className="card-header bg-white">
                        <h2 className="h5 mb-0">
                            <i className="fas fa-boxes me-2"></i>
                            Inventory
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                            <div className="mb-3 mb-md-0 position-relative">
                                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                <input
                                    type="text"
                                    className="form-control ps-5"
                                    placeholder="Search inventory..."
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-secondary d-flex align-items-center">
                                    <span className="badge bg-success me-2" style={{width: '8px', height: '8px'}}></span>
                                    In Stock
                                </button>
                                <button className="btn btn-sm btn-outline-secondary d-flex align-items-center">
                                    <span className="badge bg-warning me-2" style={{width: '8px', height: '8px'}}></span>
                                    Low Stock
                                </button>
                                <button className="btn btn-sm btn-outline-secondary d-flex align-items-center">
                                    <span className="badge bg-danger me-2" style={{width: '8px', height: '8px'}}></span>
                                    Out of Stock
                                </button>
                            </div>
                        </div>
                        
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>SKU</th>
                                        <th>Quantity Available</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory.map((item) => (
                                        <tr key={item.sku}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-light rounded p-2 me-3">
                                                        <i className="fas fa-box text-muted"></i>
                                                    </div>
                                                    <div>{item.name}</div>
                                                </div>
                                            </td>
                                            <td>{item.sku}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                <span className={`badge ${getInventoryStatusColor(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                            <div className="mb-2 mb-md-0">
                                Showing <b>1</b> to <b>{inventory.length}</b> of <b>{inventory.length}</b> items
                            </div>
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-sm mb-0">
                                    <li className="page-item">
                                        <button className="page-link">
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                    </li>
                                    <li className="page-item active">
                                        <button className="page-link">1</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link">
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                
                {/* Customer Information Section */}
                <div className="card">
                    <div className="card-header bg-white">
                        <h2 className="h5 mb-0">
                            <i className="fas fa-users me-2"></i>
                            Customer Information
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-4">
                            <div className="position-relative">
                                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                <input
                                    type="text"
                                    className="form-control ps-5"
                                    placeholder="Search customers..."
                                />
                            </div>
                        </div>
                        
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Customer Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Total Orders</th>
                                        <th>Last Order Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <React.Fragment key={customer.name}>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{width: '36px', height: '36px'}}>
                                                            <span className="text-primary fw-medium">
                                                                {customer.name.split(' ').map(n => n[0]).join('')}
                                                            </span>
                                                        </div>
                                                        <div>{customer.name}</div>
                                                    </div>
                                                </td>
                                                <td>{customer.phone}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.totalOrders}</td>
                                                <td>{customer.lastOrderDate}</td>
                                                <td className="text-end">
                                                    <button
                                                        onClick={() => toggleCustomerExpansion(customer.name)}
                                                        className="btn btn-sm btn-link text-decoration-none"
                                                    >
                                                        View History
                                                        <i className={`fas fa-chevron-${expandedCustomer === customer.name ? 'up' : 'down'} ms-1`}></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedCustomer === customer.name && (
                                                <tr>
                                                    <td colSpan={6} className="bg-light">
                                                        <div className="p-3">
                                                            <h5 className="mb-3">Order History</h5>
                                                            <div className="row g-3">
                                                                <div className="col-md-6">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <div className="d-flex justify-content-between mb-2">
                                                                                <span className="fw-medium">ORD-2506</span>
                                                                                <span className="text-muted">2025-06-15</span>
                                                                            </div>
                                                                            <p className="text-muted">Premium Laptop (2)</p>
                                                                            <div className="d-flex justify-content-between mt-2">
                                                                                <span className="text-success fw-medium">$1,998.00</span>
                                                                                <span className="badge bg-success">Delivered</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {customer.name === "John Smith" && (
                                                                    <div className="col-md-6">
                                                                        <div className="card">
                                                                            <div className="card-body">
                                                                                <div className="d-flex justify-content-between mb-2">
                                                                                    <span className="fw-medium">ORD-2487</span>
                                                                                    <span className="text-muted">2025-06-10</span>
                                                                                </div>
                                                                                <p className="text-muted">Wireless Headphones (1)</p>
                                                                                <div className="d-flex justify-content-between mt-2">
                                                                                    <span className="text-success fw-medium">$129.99</span>
                                                                                    <span className="badge bg-success">Delivered</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="text-end mt-3">
                                                                <button className="btn btn-sm btn-outline-secondary">
                                                                    View All Orders
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                            <div className="mb-2 mb-md-0">
                                Showing <b>1</b> to <b>{customers.length}</b> of <b>{customers.length}</b> customers
                            </div>
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-sm mb-0">
                                    <li className="page-item">
                                        <button className="page-link">
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                    </li>
                                    <li className="page-item active">
                                        <button className="page-link">1</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link">
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalespersonDashboard;