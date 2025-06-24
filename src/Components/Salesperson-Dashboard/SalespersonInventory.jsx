import React, { useState, useMemo } from 'react';

const SalespersonInventory = () => {
    const [inventoryItems, setInventoryItems] = useState([
        {
            id: 1,
            name: 'Premium Laptop',
            sku: 'TECH-LP-001',
            quantity: 24,
            status: 'In Stock',
            category: 'Electronics',
            lastUpdated: '2025-06-15T14:30:00'
        },
        {
            id: 2,
            name: 'Wireless Headphones',
            sku: 'TECH-WH-002',
            quantity: 8,
            status: 'Low',
            category: 'Audio',
            lastUpdated: '2025-06-16T09:45:00'
        },
        {
            id: 3,
            name: 'Smartphone',
            sku: 'TECH-SP-003',
            quantity: 15,
            status: 'In Stock',
            category: 'Electronics',
            lastUpdated: '2025-06-17T11:20:00'
        },
        {
            id: 4,
            name: 'Tablet',
            sku: 'TECH-TB-004',
            quantity: 0,
            status: 'Out of Stock',
            category: 'Electronics',
            lastUpdated: '2025-06-18T16:10:00'
        },
        {
            id: 5,
            name: 'Smart Watch',
            sku: 'TECH-SW-005',
            quantity: 12,
            status: 'In Stock',
            category: 'Wearables',
            lastUpdated: '2025-06-18T13:30:00'
        },
        {
            id: 6,
            name: 'Bluetooth Speaker',
            sku: 'TECH-BS-006',
            quantity: 5,
            status: 'Low',
            category: 'Audio',
            lastUpdated: '2025-06-19T10:15:00'
        },
        {
            id: 7,
            name: 'Wireless Mouse',
            sku: 'TECH-WM-007',
            quantity: 30,
            status: 'In Stock',
            category: 'Accessories',
            lastUpdated: '2025-06-19T09:00:00'
        },
        {
            id: 8,
            name: 'Mechanical Keyboard',
            sku: 'TECH-KB-008',
            quantity: 0,
            status: 'Out of Stock',
            category: 'Accessories',
            lastUpdated: '2025-06-17T14:45:00'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ 
        key: null, 
        direction: 'ascending' 
    });
    
    const itemsPerPage = 5;
    
    // Get unique categories for filter dropdown
    const categories = ['All', ...new Set(inventoryItems.map(item => item.category))];
    
    // Filter inventory items
    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });
    
    // Sort items
    const sortedItems = useMemo(() => {
        let sortableItems = [...filteredItems];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredItems, sortConfig]);
    
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    
    // Handle sorting
    const requestSort = (key) => {
        let direction = 'ascending';
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
            case 'In Stock': return 'bg-success';
            case 'Low': return 'bg-warning text-dark';
            case 'Out of Stock': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };
    
    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    {/* Inventory Header */}
                    <div className="mb-4">
                        <h1 className="h2">Inventory Management</h1>
                        <p className="lead text-muted mb-0">
                            View and manage your product inventory
                        </p>
                    </div>
                    
                    {/* Inventory Stats */}
                    <div className="row mb-4 g-3">
                        <div className="col-md-4">
                            <div className="card h-100 border-start">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3 bg-primary text-white rounded-circle p-3">
                                            <i className="fas fa-box"></i>
                                        </div>
                                        <div>
                                            <div className="text-muted small">Total Items</div>
                                            <div className="h4 mb-0">{inventoryItems.length}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="card h-100 border-start">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3 bg-success text-white rounded-circle p-3">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <div>
                                            <div className="text-muted small">In Stock</div>
                                            <div className="h4 mb-0">
                                                {inventoryItems.filter(item => item.status === 'In Stock').length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="card h-100 border-start">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3 bg-danger text-white rounded-circle p-3">
                                            <i className="fas fa-exclamation-circle"></i>
                                        </div>
                                        <div>
                                            <div className="text-muted small">Low/Out of Stock</div>
                                            <div className="h4 mb-0">
                                                {inventoryItems.filter(item => item.status === 'Low' || item.status === 'Out of Stock').length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Inventory List */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-white py-3">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                                <h2 className="h5 mb-2 mb-md-0">Inventory List</h2>
                                <span className="badge bg-light text-dark fs-6">
                                    {filteredItems.length} items
                                </span>
                            </div>
                        </div>
                        
                        <div className="card-body">
                            {/* Filters */}
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <div className="input-group">
                                        <div className="mt-3 me-2 bg-white">
                                            <i className="fas fa-search text-muted"></i>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by name or SKU..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-md-3">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Low">Low</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                                
                                <div className="col-md-3">
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="form-select"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            {/* Table */}
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th 
                                                onClick={() => requestSort('name')} 
                                                className="cursor-pointer"
                                            >
                                                <div className="d-flex align-items-center">
                                                    Item Name
                                                    {sortConfig.key === 'name' && (
                                                        <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ms-1`}></i>
                                                    )}
                                                </div>
                                            </th>
                                            <th 
                                                onClick={() => requestSort('sku')} 
                                                className="cursor-pointer d-none d-md-table-cell"
                                            >
                                                <div className="d-flex align-items-center">
                                                    SKU
                                                    {sortConfig.key === 'sku' && (
                                                        <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ms-1`}></i>
                                                    )}
                                                </div>
                                            </th>
                                            <th 
                                                onClick={() => requestSort('category')} 
                                                className="cursor-pointer d-none d-lg-table-cell"
                                            >
                                                <div className="d-flex align-items-center">
                                                    Category
                                                    {sortConfig.key === 'category' && (
                                                        <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ms-1`}></i>
                                                    )}
                                                </div>
                                            </th>
                                            <th 
                                                onClick={() => requestSort('quantity')} 
                                                className="cursor-pointer"
                                            >
                                                <div className="d-flex align-items-center">
                                                    Qty
                                                    {sortConfig.key === 'quantity' && (
                                                        <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ms-1`}></i>
                                                    )}
                                                </div>
                                            </th>
                                            <th 
                                                onClick={() => requestSort('status')} 
                                                className="cursor-pointer"
                                            >
                                                <div className="d-flex align-items-center">
                                                    Status
                                                    {sortConfig.key === 'status' && (
                                                        <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ms-1`}></i>
                                                    )}
                                                </div>
                                            </th>
                                            <th 
                                                onClick={() => requestSort('lastUpdated')} 
                                                className="cursor-pointer d-none d-xl-table-cell"
                                            >
                                                <div className="d-flex align-items-center">
                                                    Last Updated
                                                    {sortConfig.key === 'lastUpdated' && (
                                                        <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ms-1`}></i>
                                                    )}
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length > 0 ? (
                                            currentItems.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-light rounded-circle p-2 me-2">
                                                                <i className="fas fa-box text-muted"></i>
                                                            </div>
                                                            <div>
                                                                <div className="fw-medium">{item.name}</div>
                                                                <div className="small text-muted d-md-none">{item.sku}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="d-none d-md-table-cell">{item.sku}</td>
                                                    <td className="d-none d-lg-table-cell">{item.category}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>
                                                        <span className={`badge ${getStatusColor(item.status)}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="d-none d-xl-table-cell">
                                                        {formatDate(item.lastUpdated)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-4">
                                                    <i className="fas fa-inbox fa-2x text-muted mb-3"></i>
                                                    <p className="text-muted mb-0">No inventory items found</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {filteredItems.length > 0 && (
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                                    <div className="mb-2 mb-md-0">
                                        <small className="text-muted">
                                            Showing {indexOfFirstItem + 1} to{' '}
                                            {Math.min(indexOfLastItem, filteredItems.length)} of{' '}
                                            {filteredItems.length} items
                                        </small>
                                    </div>
                                    <nav>
                                        <ul className="pagination pagination-sm mb-0">
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalespersonInventory;