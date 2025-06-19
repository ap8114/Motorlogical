// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const SalespersonDashboard= () => {
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
    const [expandedCustomer, setExpandedCustomer] = useState  (null);
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
                return 'bg-green-100 text-green-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'Pending':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    // Get inventory status color class
    const getInventoryStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'bg-green-100 text-green-800';
            case 'Low Stock':
                return 'bg-yellow-100 text-yellow-800';
            case 'Out of Stock':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full px-6 py-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome back, Sales Manager</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your sales today.</p>
                </div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <i className="fas fa-shopping-cart text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <h3 className="text-xl font-bold text-gray-800">125</h3>
                                <p className="text-sm text-green-500 flex items-center mt-1">
                                    <i className="fas fa-arrow-up mr-1"></i>
                                    12% up
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <i className="fas fa-dollar-sign text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <h3 className="text-xl font-bold text-gray-800">$12,426</h3>
                                <p className="text-sm text-green-500 flex items-center mt-1">
                                    <i className="fas fa-arrow-up mr-1"></i>
                                    8% up
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <i className="fas fa-users text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Customers</p>
                                <h3 className="text-xl font-bold text-gray-800">1,205</h3>
                                <p className="text-sm text-green-500 flex items-center mt-1">
                                    <i className="fas fa-arrow-up mr-1"></i>
                                    5% up
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                                <i className="fas fa-box text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Products in Stock</p>
                                <h3 className="text-xl font-bold text-gray-800">85</h3>
                                <p className="text-sm text-red-500 flex items-center mt-1">
                                    <i className="fas fa-arrow-down mr-1"></i>
                                    3% down
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                    {/* Order Management Section */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <i className="fas fa-clipboard-list mr-2"></i>
                                Order Management
                            </h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmitOrder}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                                            Product
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="product"
                                                name="product"
                                                value={newOrder.product}
                                                onChange={handleInputChange}
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                required
                                            >
                                                <option value="">Select a product</option>
                                                {inventory.map((item) => (
                                                    <option key={item.sku} value={item.name} disabled={item.status === 'Out of Stock'}>
                                                        {item.name} {item.status === 'Out of Stock' ? '(Out of Stock)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <i className="fas fa-chevron-down text-gray-400"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                            Quantity
                                        </label>
                                        <div className="flex rounded-md">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(-1)}
                                                className="!rounded-button whitespace-nowrap relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100"
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
                                                className="border-none focus:ring-blue-500 focus:border-blue-500 block w-full text-center sm:text-sm border-gray-300"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(1)}
                                                className="!rounded-button whitespace-nowrap relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Customer Name
                                        </label>
                                        <input
                                            type="text"
                                            id="customerName"
                                            name="customerName"
                                            value={newOrder.customerName}
                                            onChange={handleInputChange}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Customer Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="customerPhone"
                                            name="customerPhone"
                                            value={newOrder.customerPhone}
                                            onChange={handleInputChange}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">
                                            Order Notes
                                        </label>
                                        <textarea
                                            id="orderNotes"
                                            name="orderNotes"
                                            rows={3}
                                            value={newOrder.orderNotes}
                                            onChange={handleInputChange}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="!rounded-button whitespace-nowrap inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition duration-150 ease-in-out"
                                    >
                                        <i className="fas fa-plus mr-2"></i>
                                        Place Order
                                    </button>
                                </div>
                            </form>
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">My Orders</h3>
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
                                                    Product
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Qty
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {orders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {order.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.customer}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.product}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.date}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6">
                                    <h4 className="text-md font-medium text-gray-700 mb-3">Order Status Tracker</h4>
                                    <div className="flex items-center justify-between w-full">
                                        {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status, index) => (
                                            <div key={status} className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                    {index === 0 && <i className="fas fa-clipboard-check"></i>}
                                                    {index === 1 && <i className="fas fa-cog"></i>}
                                                    {index === 2 && <i className="fas fa-shipping-fast"></i>}
                                                    {index === 3 && <i className="fas fa-check"></i>}
                                                </div>
                                                <span className="text-xs mt-1">{status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Inventory Section */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <i className="fas fa-boxes mr-2"></i>
                                Inventory
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 flex justify-between items-center">
                                <div className="relative w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-search text-gray-400"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md text-sm"
                                        placeholder="Search inventory..."
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <button className="!rounded-button whitespace-nowrap inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                                        In Stock
                                    </button>
                                    <button className="!rounded-button whitespace-nowrap inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></span>
                                        Low Stock
                                    </button>
                                    <button className="!rounded-button whitespace-nowrap inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                                        Out of Stock
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Item Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                SKU
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity Available
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {inventory.map((item) => (
                                            <tr key={item.sku} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                                                            <i className="fas fa-box text-gray-500"></i>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.sku}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getInventoryStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{inventory.length}</span> of <span className="font-medium">{inventory.length}</span> items
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button className="!rounded-button whitespace-nowrap relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                            <span className="sr-only">Previous</span>
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                        <button className="!rounded-button whitespace-nowrap relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100 cursor-pointer">
                                            1
                                        </button>
                                        <button className="!rounded-button whitespace-nowrap relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                            <span className="sr-only">Next</span>
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Customer Information Section */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <i className="fas fa-users mr-2"></i>
                                Customer Information
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 flex justify-between items-center">
                                <div className="relative w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-search text-gray-400"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md text-sm"
                                        placeholder="Search customers..."
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Orders
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Order Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {customers.map((customer) => (
                                            <React.Fragment key={customer.name}>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <span className="text-blue-600 font-medium">
                                                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                                                </span>
                                                            </div>
                                                            <div className="ml-3 font-medium text-gray-900">{customer.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer.phone}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer.totalOrders}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer.lastOrderDate}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => toggleCustomerExpansion(customer.name)}
                                                            className="!rounded-button whitespace-nowrap text-blue-600 hover:text-blue-900 cursor-pointer flex items-center"
                                                        >
                                                            View History
                                                            <i className={`fas fa-chevron-${expandedCustomer === customer.name ? 'up' : 'down'} ml-1`}></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                {expandedCustomer === customer.name && (
                                                    <tr>
                                                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                                                            <div className="text-sm">
                                                                <h4 className="font-medium text-gray-900 mb-2">Order History</h4>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <div className="bg-white p-3 rounded shadow-sm">
                                                                        <div className="flex justify-between items-center mb-2">
                                                                            <span className="text-gray-700 font-medium">ORD-2506</span>
                                                                            <span className="text-gray-500">2025-06-15</span>
                                                                        </div>
                                                                        <p className="text-gray-600">Premium Laptop (2)</p>
                                                                        <div className="mt-2 flex justify-between items-center">
                                                                            <span className="text-green-600 font-medium">$1,998.00</span>
                                                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span>
                                                                        </div>
                                                                    </div>
                                                                    {customer.name === "John Smith" && (
                                                                        <div className="bg-white p-3 rounded shadow-sm">
                                                                            <div className="flex justify-between items-center mb-2">
                                                                                <span className="text-gray-700 font-medium">ORD-2487</span>
                                                                                <span className="text-gray-500">2025-06-10</span>
                                                                            </div>
                                                                            <p className="text-gray-600">Wireless Headphones (1)</p>
                                                                            <div className="mt-2 flex justify-between items-center">
                                                                                <span className="text-green-600 font-medium">$129.99</span>
                                                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="mt-3 flex justify-end">
                                                                    <button className="!rounded-button whitespace-nowrap inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
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
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{customers.length}</span> of <span className="font-medium">{customers.length}</span> customers
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button className="!rounded-button whitespace-nowrap relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                            <span className="sr-only">Previous</span>
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                        <button className="!rounded-button whitespace-nowrap relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100 cursor-pointer">
                                            1
                                        </button>
                                        <button className="!rounded-button whitespace-nowrap relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                            <span className="sr-only">Next</span>
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SalespersonDashboard