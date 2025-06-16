// src/components/InventoryManagement.js
import React, { useState, useEffect } from 'react';
import { Modal, Toast, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const InventoryManagement = () => {
  // Sample inventory data
  const inventoryData = [
    { id: 1, name: "Premium Leather Steering Wheel Cover", category: "Accessories", quantity: 45, status: "In Stock", updated: "2025-06-10" },
    { id: 2, name: "Advanced Navigation System", category: "Electronics", quantity: 12, status: "Low Stock", updated: "2025-06-11" },
    { id: 3, name: "Brake Pads - Performance Series", category: "Parts", quantity: 78, status: "In Stock", updated: "2025-06-09" },
    { id: 4, name: "Windshield Wiper Blades - All Weather", category: "Accessories", quantity: 0, status: "Out of Stock", updated: "2025-06-08" },
    { id: 5, name: "Engine Oil Filter - Premium", category: "Parts", quantity: 120, status: "In Stock", updated: "2025-06-12" },
    { id: 6, name: "Bluetooth Car Audio Adapter", category: "Electronics", quantity: 8, status: "Low Stock", updated: "2025-06-07" },
    { id: 7, name: "Transmission Fluid - Synthetic", category: "Fluids", quantity: 35, status: "In Stock", updated: "2025-06-06" },
    { id: 8, name: "LED Headlight Conversion Kit", category: "Electronics", quantity: 0, status: "Out of Stock", updated: "2025-06-05" },
    { id: 9, name: "Diagnostic Scanner Tool", category: "Tools", quantity: 5, status: "Low Stock", updated: "2025-06-04" },
    { id: 10, name: "Premium Floor Mats - All Weather", category: "Accessories", quantity: 42, status: "In Stock", updated: "2025-06-03" },
    { id: 11, name: "Cabin Air Filter - HEPA", category: "Parts", quantity: 67, status: "In Stock", updated: "2025-06-02" },
    { id: 12, name: "Tire Pressure Monitoring System", category: "Electronics", quantity: 15, status: "In Stock", updated: "2025-06-01" },
    { id: 13, name: "Brake Fluid - DOT 4", category: "Fluids", quantity: 7, status: "Low Stock", updated: "2025-05-31" },
    { id: 14, name: "Spark Plugs - Platinum", category: "Parts", quantity: 0, status: "Out of Stock", updated: "2025-05-30" },
    { id: 15, name: "Car Battery - High Performance", category: "Parts", quantity: 23, status: "In Stock", updated: "2025-05-29" },
    { id: 16, name: "Wheel Alignment Tool Kit", category: "Tools", quantity: 3, status: "Low Stock", updated: "2025-05-28" },
    { id: 17, name: "Ceramic Coating Protection", category: "Accessories", quantity: 18, status: "In Stock", updated: "2025-05-27" },
    { id: 18, name: "Rear View Camera System", category: "Electronics", quantity: 0, status: "Out of Stock", updated: "2025-05-26" },
    { id: 19, name: "Power Steering Fluid", category: "Fluids", quantity: 52, status: "In Stock", updated: "2025-05-25" },
    { id: 20, name: "Torque Wrench Set", category: "Tools", quantity: 9, status: "Low Stock", updated: "2025-05-24" },
    { id: 21, name: "Radiator Coolant - Extended Life", category: "Fluids", quantity: 38, status: "In Stock", updated: "2025-05-23" },
    { id: 22, name: "Car Seat Covers - Premium", category: "Accessories", quantity: 27, status: "In Stock", updated: "2025-05-22" },
    { id: 23, name: "Fuel Injector Cleaner", category: "Fluids", quantity: 0, status: "Out of Stock", updated: "2025-05-21" },
    { id: 24, name: "Air Compressor - Portable", category: "Tools", quantity: 6, status: "Low Stock", updated: "2025-05-20" },
    { id: 25, name: "Alternator - High Output", category: "Parts", quantity: 14, status: "In Stock", updated: "2025-05-19" },
    { id: 26, name: "Dashboard Camera - 4K", category: "Electronics", quantity: 11, status: "Low Stock", updated: "2025-05-18" },
    { id: 27, name: "Hydraulic Jack - 3 Ton", category: "Tools", quantity: 19, status: "In Stock", updated: "2025-05-17" },
    { id: 28, name: "Window Tint Film - Premium", category: "Accessories", quantity: 0, status: "Out of Stock", updated: "2025-05-16" },
    { id: 29, name: "Serpentine Belt - Heavy Duty", category: "Parts", quantity: 31, status: "In Stock", updated: "2025-05-15" },
    { id: 30, name: "Wheel Bearing Kit - Front", category: "Parts", quantity: 4, status: "Low Stock", updated: "2025-05-14" }
  ];

  // State variables
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentSortColumn, setCurrentSortColumn] = useState('name');
  const [currentSortDirection, setCurrentSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  // Initialize table
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      applyFilters();
    }, 800);
  }, []);

  // Apply filters whenever search or filters change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, categoryFilter, statusFilter]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Apply filters to data
  const applyFilters = () => {
    let result = [...inventoryData];
    
    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.category.toLowerCase().includes(term)
      );
    }
    
    // Sort data
    result = sortData(result);
    
    setFilteredData(result);
    setCurrentPage(1);
  };

  // Sort data based on current column and direction
  const sortData = (data) => {
    return [...data].sort((a, b) => {
      let valueA, valueB;
      
      // Determine values based on column
      switch (currentSortColumn) {
        case 'name':
          valueA = a.name;
          valueB = b.name;
          break;
        case 'category':
          valueA = a.category;
          valueB = b.category;
          break;
        case 'quantity':
          valueA = a.quantity;
          valueB = b.quantity;
          break;
        case 'status':
          valueA = a.status;
          valueB = b.status;
          break;
        case 'updated':
          valueA = new Date(a.updated);
          valueB = new Date(b.updated);
          break;
        default:
          valueA = a.name;
          valueB = b.name;
      }
      
      // Compare values
      if (valueA < valueB) {
        return currentSortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return currentSortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle sort column click
  const handleSort = (column) => {
    if (column === currentSortColumn) {
      setCurrentSortDirection(currentSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setCurrentSortColumn(column);
      setCurrentSortDirection('asc');
    }
    
    // Apply sorting to filteredData
    setFilteredData(prevData => sortData(prevData));
  };

  // Get sort icon for column
  const getSortIcon = (column) => {
    if (column !== currentSortColumn) return null;
    return currentSortDirection === 'asc' ? 
      <i className="bi bi-arrow-up ms-1"></i> : 
      <i className="bi bi-arrow-down ms-1"></i>;
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Open edit modal
  const openEditModal = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  // Save edited item
  const saveEditedItem = () => {
    if (!selectedItem) return;
    
    const newQuantity = parseInt(document.getElementById('edit-item-quantity').value);
    
    if (isNaN(newQuantity)) {
      showToastMessage('Please enter a valid quantity', 'error');
      return;
    }
    
    // Update the item in the inventoryData
    const updatedData = inventoryData.map(item => {
      if (item.id === selectedItem.id) {
        const updatedItem = { ...item, quantity: newQuantity };
        
        // Update status based on quantity
        if (newQuantity === 0) {
          updatedItem.status = 'Out of Stock';
        } else if (newQuantity <= 10) {
          updatedItem.status = 'Low Stock';
        } else {
          updatedItem.status = 'In Stock';
        }
        
        // Update last updated date
        updatedItem.updated = new Date().toISOString().split('T')[0];
        
        return updatedItem;
      }
      return item;
    });
    
    // Update inventory data (in a real app, you would update your state)
    // For this demo, we'll just update the filteredData to reflect changes
    setFilteredData(prevData => 
      prevData.map(item => 
        item.id === selectedItem.id ? 
          {...item, quantity: newQuantity, status: newQuantity === 0 ? 'Out of Stock' : newQuantity <= 10 ? 'Low Stock' : 'In Stock', updated: new Date().toISOString().split('T')[0]} 
          : item
      )
    );
    
    showToastMessage('Inventory updated successfully');
    closeEditModal();
  };

  // Show toast message
  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Export to Excel (simulated)
  const exportToExcel = () => {
    showToastMessage('Inventory data exported to Excel');
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    
    return items;
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <h1 className="h3 mb-0">Inventory Management</h1>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={exportToExcel}
              >
                <i className="bi bi-file-earmark-excel me-2"></i>
                <span className="d-none d-md-inline">Export to Excel</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=" py-4">
        {/* Dealership Info & Filter Section */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div className="mb-3 mb-md-0">
                <h2 className="h6 mb-1">Dealership:</h2>
                <p className="mb-0 fw-bold">Riverside Automotive Group</p>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <div>
                  <select 
                    className="form-select form-select-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Parts">Parts</option>
                    <option value="Tools">Tools</option>
                    <option value="Fluids">Fluids</option>
                  </select>
                </div>
                <div>
                  <select 
                    className="form-select form-select-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <button 
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                  onClick={clearFilters}
                >
                  <i className="bi bi-arrow-repeat me-1"></i>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th 
                      className="cursor-pointer" 
                      onClick={() => handleSort('name')}
                    >
                      Item Name {getSortIcon('name')}
                    </th>
                    <th 
                      className="text-center cursor-pointer" 
                      onClick={() => handleSort('category')}
                    >
                      Category {getSortIcon('category')}
                    </th>
                    <th 
                      className="text-end cursor-pointer" 
                      onClick={() => handleSort('quantity')}
                    >
                      Quantity {getSortIcon('quantity')}
                    </th>
                    <th 
                      className="text-center cursor-pointer" 
                      onClick={() => handleSort('status')}
                    >
                      Status {getSortIcon('status')}
                    </th>
                    <th 
                      className="cursor-pointer" 
                      onClick={() => handleSort('updated')}
                    >
                      Last Updated {getSortIcon('updated')}
                    </th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 mb-0">Loading inventory data...</p>
                      </td>
                    </tr>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <tr key={item.id} className="cursor-pointer" onClick={() => openEditModal(item)}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.category}</td>
                        <td className="text-end">{item.quantity}</td>
                        <td className="text-center">
                          <span className={`badge rounded-pill d-inline-flex align-items-center ${
                            item.status === 'In Stock' ? 'bg-success-light text-success' :
                            item.status === 'Low Stock' ? 'bg-warning-light text-warning' :
                            'bg-danger-light text-danger'
                          }`}>
                            <i className={`bi me-1 ${
                              item.status === 'In Stock' ? 'bi-check-circle' :
                              item.status === 'Low Stock' ? 'bi-exclamation-triangle' :
                              'bi-x-circle'
                            }`}></i>
                            {item.status}
                          </span>
                        </td>
                        <td>{formatDate(item.updated)}</td>
                        <td className="text-end">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(item);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="mb-3">
                          <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                        </div>
                        <h3 className="h5">No items found</h3>
                        <p className="text-muted mb-3">Try adjusting your search or filters to find what you're looking for.</p>
                        <button 
                          className="btn btn-primary"
                          onClick={clearFilters}
                        >
                          Reset Search
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && !loading && (
              <div className="card-footer bg-white d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="mb-2 mb-md-0">
                  <p className="mb-0 text-muted">
                    Showing <span className="fw-medium">{startIndex + 1}</span> to <span className="fw-medium">{endIndex}</span> of 
                    <span className="fw-medium"> {filteredData.length}</span> results
                  </p>
                </div>
                <div>
                  <nav>
                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="bi bi-chevron-left"></i>
                        </button>
                      </li>
                      {renderPaginationItems()}
                      <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages || totalPages === 0}
                        >
                          <i className="bi bi-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={selectedItem.name}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={selectedItem.category}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input 
                  type="number" 
                  id="edit-item-quantity"
                  className="form-control" 
                  defaultValue={selectedItem.quantity}
                  min="0"
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEditedItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        className={`position-fixed bottom-0 end-0 m-3 ${toastType === 'success' ? 'bg-success' : 'bg-danger'}`}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton={false} className={toastType === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          <i className={`bi me-2 ${toastType === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`}></i>
          {toastMessage}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default InventoryManagement;