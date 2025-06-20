import React, { useState } from 'react';

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
        key: '', 
        direction: 'ascending'
    });
    
    const itemsPerPage = 5;
    
    // Get unique categories for filter dropdown
    const categories = ['All', ...new Set(inventoryItems.map(item => item.category))];
    
    // Filter inventory items based on search term, status, and category
    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });
    
    // Sort items if sort config is set
    const sortedItems = React.useMemo(() => {
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
    
    // Paginate items
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
            case 'In Stock': return 'bg-success text-white';
            case 'Low': return 'bg-warning text-dark';
            case 'Out of Stock': return 'bg-danger text-white';
            default: return 'bg-secondary text-white';
        }
    };
    
    return (
        <div className="min-vh-100 bg-light py-4">
            <div className="container-fluid">
                {/* Inventory Header */}
                <div className="mb-4">
                    <h1 className="display-5 fw-bold">Inventory Management</h1>
                    <p className="lead">
                        View and manage your product inventory
                    </p>
                </div>
                {/* Inventory Stats */}
                <div className="row mb-4">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card   shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-circle bg-primary bg-opacity-10 me-3">
                                        <i className="bi bi-box text-primary fs-4"></i>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-0">Total Items</p>
                                        <h2 className="mb-0">{inventoryItems.length}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-circle bg-success bg-opacity-10 me-3">
                                        <i className="bi bi-check-circle text-success fs-4"></i>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-0">In Stock</p>
                                        <h2 className="mb-0">
                                            {inventoryItems.filter(item => item.status === 'In Stock').length}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-circle bg-danger bg-opacity-10 me-3">
                                        <i className="bi bi-exclamation-circle text-danger fs-4"></i>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-0">Low/Out of Stock</p>
                                        <h2 className="mb-0">
                                            {inventoryItems.filter(item => item.status === 'Low' || item.status === 'Out of Stock').length}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Inventory List */}
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="h5 mb-0">Inventory List</h2>
                            <span className="badge bg-light text-dark">
                                {filteredItems.length} items
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6 mb-2 mb-md-0">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name or SKU..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2 mb-md-0">
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
                        
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" onClick={() => requestSort('name')} className="cursor-pointer">
                                            <div className="d-flex align-items-center">
                                                Item Name
                                                {sortConfig.key === 'name' && (
                                                    <i className={`bi bi-caret-${sortConfig.direction === 'ascending' ? 'up' : 'down'}-fill ms-1`}></i>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col" onClick={() => requestSort('sku')} className="cursor-pointer">
                                            <div className="d-flex align-items-center">
                                                SKU
                                                {sortConfig.key === 'sku' && (
                                                    <i className={`bi bi-caret-${sortConfig.direction === 'ascending' ? 'up' : 'down'}-fill ms-1`}></i>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col" onClick={() => requestSort('category')} className="cursor-pointer">
                                            <div className="d-flex align-items-center">
                                                Category
                                                {sortConfig.key === 'category' && (
                                                    <i className={`bi bi-caret-${sortConfig.direction === 'ascending' ? 'up' : 'down'}-fill ms-1`}></i>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col" onClick={() => requestSort('quantity')} className="cursor-pointer">
                                            <div className="d-flex align-items-center">
                                                Quantity
                                                {sortConfig.key === 'quantity' && (
                                                    <i className={`bi bi-caret-${sortConfig.direction === 'ascending' ? 'up' : 'down'}-fill ms-1`}></i>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col" onClick={() => requestSort('status')} className="cursor-pointer">
                                            <div className="d-flex align-items-center">
                                                Status
                                                {sortConfig.key === 'status' && (
                                                    <i className={`bi bi-caret-${sortConfig.direction === 'ascending' ? 'up' : 'down'}-fill ms-1`}></i>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col" onClick={() => requestSort('lastUpdated')} className="cursor-pointer">
                                            <div className="d-flex align-items-center">
                                                Last Updated
                                                {sortConfig.key === 'lastUpdated' && (
                                                    <i className={`bi bi-caret-${sortConfig.direction === 'ascending' ? 'up' : 'down'}-fill ms-1`}></i>
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
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                                                                <i className="bi bi-box text-muted"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="fw-medium">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.sku}</td>
                                                <td>{item.category}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    <span className={`badge ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td>{formatDate(item.lastUpdated)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4 text-muted">
                                                No inventory items found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        {filteredItems.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <p className="small text-muted mb-0">
                                        Showing <span className="fw-bold">{indexOfFirstItem + 1}</span> to{' '}
                                        <span className="fw-bold">
                                            {Math.min(indexOfLastItem, filteredItems.length)}
                                        </span>{' '}
                                        of <span className="fw-bold">{filteredItems.length}</span> results
                                    </p>
                                </div>
                                <nav aria-label="Page navigation">
                                    <ul className="pagination mb-0">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                            >
                                                <i className="bi bi-chevron-left"></i>
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
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
                                                <i className="bi bi-chevron-right"></i>
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
    );
};

export default SalespersonInventory;