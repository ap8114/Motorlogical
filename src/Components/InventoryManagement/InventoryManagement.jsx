// src/components/InventoryManagement.js
import React, { useState, useEffect } from 'react';
import { Modal, Toast, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryManagement = () => {
  // Sample inventory data with shipping indication
  const inventoryData = [
    {
      stock: "GA0561",
      vin: "LMGBB1L87T3144264",
      engine: "K500535",
      bl: "EUKOSHBM2011613 BB2A-CW7-00",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPOW",
      country: "INF",
      vinYear: "2026",
      extColor: "ELEGANT BLACK",
      intColor: "BLACK",
      orderMonth: "12/12/2024",
      productionEstimate: "1/21/2025",
      shippingDate: "3/3/2025",
      arrivalDate: "4/19/2025",
      shippingIndication: "DELIVERED"
    },
    {
      stock: "GA0562",
      vin: "LMGBB1L85T3144263",
      engine: "K500537",
      bl: "EUKOSHBM2011613 BB2A-CW7-00",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPOW",
      country: "INF",
      vinYear: "2026",
      extColor: "ELEGANT BLACK",
      intColor: "BLACK",
      orderMonth: "12/12/2024",
      productionEstimate: "1/21/2025",
      shippingDate: "3/3/2025",
      arrivalDate: "4/19/2025",
      shippingIndication: "SHIPPED"
    },
    {
      stock: "GA0563",
      vin: "LMGBB1L82T3144267",
      engine: "K500610",
      bl: "EUKOSHBM2011613 BB2A-CW7-00",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPOW",
      country: "INF",
      vinYear: "2026",
      extColor: "IVORY WHITE",
      intColor: "BLACK",
      orderMonth: "12/12/2024",
      productionEstimate: "1/21/2025",
      shippingDate: "3/3/2025",
      arrivalDate: "4/19/2025",
      shippingIndication: "DELIVERED"
    },
    {
      stock: "GA0564",
      vin: "LMGBB1L86T3144272",
      engine: "K500617",
      bl: "EUKOSHBM2011613 BB2A-CW7-00",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPOW",
      country: "INF",
      vinYear: "2026",
      extColor: "MOONLIGHT GRAY",
      intColor: "BLACK",
      orderMonth: "12/12/2024",
      productionEstimate: "1/21/2025",
      shippingDate: "3/3/2025",
      arrivalDate: "4/19/2025",
      shippingIndication: "SHIPPED"
    },
    {
      stock: "GA0565",
      vin: "LMGBB1L84T3144271",
      engine: "500616",
      bl: "EUKOSHBM2011613 BB2A-CW7-00",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPOW",
      country: "INF",
      vinYear: "2026",
      extColor: "MOONLIGHT GRAY",
      intColor: "BLACK",
      orderMonth: "12/12/2024",
      productionEstimate: "1/21/2025",
      shippingDate: "3/3/2025",
      arrivalDate: "4/19/2025",
      shippingIndication: "DELIVERED"
    },
    {
      stock: "GA0566",
      vin: "LMGBB1L82T3144270",
      engine: "K500615",
      bl: "EUKOSHBM2011613 BB2A-CW7-00",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPOW",
      country: "INF",
      vinYear: "2026",
      extColor: "MOONLIGHT GRAY",
      intColor: "BLACK",
      orderMonth: "12/12/2024",
      productionEstimate: "1/21/2025",
      shippingDate: "3/3/2025",
      arrivalDate: "4/19/2025",
      shippingIndication: "SHIPPED"
    },
    {
      stock: "GA0567",
      vin: "LMGBB1L86T3144269",
      engine: "500614",
      bl: "EUKOSHBM2011613 BB2A-CW7-00",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPOW",
      country: "INF",
      vinYear: "2026",
      extColor: "SUPERSTAR SILVEI",
      intColor: "BLACK",
      orderMonth: "12/12/2024",
      productionEstimate: "1/21/2025",
      shippingDate: "3/3/2025",
      arrivalDate: "4/19/2025",
      shippingIndication: "SHIPPED"
    }
  ];

  // State variables
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [currentSortColumn, setCurrentSortColumn] = useState('name');
  const [currentSortDirection, setCurrentSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [shippingFilter, setShippingFilter] = useState('all');
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
  }, [searchTerm, categoryFilter, statusFilter, shippingFilter, currentSortColumn, currentSortDirection]);

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

    // Shipping filter
    if (shippingFilter !== 'all') {
      result = result.filter(item => item.shippingIndication === shippingFilter);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(
          val => typeof val === 'string' && val.toLowerCase().includes(term)
        )
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
        case 'stock':
          valueA = a.stock;
          valueB = b.stock;
          break;
        case 'vin':
          valueA = a.vin;
          valueB = b.vin;
          break;
        case 'engine':
          valueA = a.engine;
          valueB = b.engine;
          break;
        case 'bl':
          valueA = a.bl;
          valueB = b.bl;
          break;
        case 'ocnSpec':
          valueA = a.ocnSpec;
          valueB = b.ocnSpec;
          break;
        case 'model':
          valueA = a.model;
          valueB = b.model;
          break;
        case 'country':
          valueA = a.country;
          valueB = b.country;
          break;
        case 'vinYear':
          valueA = a.vinYear;
          valueB = b.vinYear;
          break;
        case 'extColor':
          valueA = a.extColor;
          valueB = b.extColor;
          break;
        case 'intColor':
          valueA = a.intColor;
          valueB = b.intColor;
          break;
        case 'orderMonth':
          valueA = new Date(a.orderMonth);
          valueB = new Date(b.orderMonth);
          break;
        case 'productionEstimate':
          valueA = new Date(a.productionEstimate);
          valueB = new Date(b.productionEstimate);
          break;
        case 'shippingDate':
          valueA = new Date(a.shippingDate);
          valueB = new Date(b.shippingDate);
          break;
        case 'arrivalDate':
          valueA = new Date(a.arrivalDate);
          valueB = new Date(b.arrivalDate);
          break;
        case 'shippingIndication':
          valueA = a.shippingIndication;
          valueB = b.shippingIndication;
          break;
        default:
          valueA = a.stock;
          valueB = b.stock;
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
  };

  // Get sort icon for column
  const getSortIcon = (column) => {
    if (column !== currentSortColumn) return null;
    return currentSortDirection === 'asc' ?
      <i className="bi bi-arrow-up ms-1"></i> :
      <i className="bi bi-arrow-down ms-1"></i>;
  };

  const getShippingChartData = () => {
    const shippingCounts = filteredData.reduce((acc, item) => {
      const status = item.shippingIndication;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(shippingCounts);
    const data = Object.values(shippingCounts);
    const backgroundColors = labels.map(label => {
      switch (label) {
        case 'DELIVERED': return '#28a745'; // green
        case 'SHIPPED': return '#ffc107';   // yellow
        default: return '#6c757d';          // gray
      }
    });

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1
      }]
    };
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
    const newShipping = document.getElementById('edit-item-shipping').value;

    if (isNaN(newQuantity)) {
      showToastMessage('Please enter a valid quantity', 'error');
      return;
    }

    // Update the item in the inventoryData
    const updatedData = inventoryData.map(item => {
      if (item.id === selectedItem.id) {
        const updatedItem = { ...item, quantity: newQuantity, shipping: newShipping };

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
    setShippingFilter('all');
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
      <header className="bg-white shadow-sm py-3 mt-3">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <h1 className="h3 mb-0">Inventory Management</h1>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={exportToExcel}
              >
                <i className="bi bi-file-earmark-excel me-2"></i>
                <span className="d-none d-md-inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-4">
        {/* Dealership Info & Filter Section */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div className="mb-3 mb-md-0">
                <h2 className="h6 mb-1">Dealership:</h2>
                <p className="mb-0 fw-bold">Riverside Automotive Group</p>
              </div>

              <div className="d-flex flex-wrap gap-2">
                {/* Search Field */}
                <div>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="fas fa-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Shipping Filter */}
                <div>
                  <select
                    className="form-select form-select-sm"
                    value={shippingFilter}
                    onChange={(e) => setShippingFilter(e.target.value)}
                  >
                    <option value="all">All Shipping</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="SHIPPED">Shipped</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
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

        {/* Shipping Chart */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Shipping Distribution</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="chart-container" style={{ height: '300px' }}>
                  <Pie
                    data={getShippingChartData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'right',
                          labels: {
                            color: '#000',
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-column h-100 justify-content-center">
                  <div className="mb-3">
                    <span className="badge bg-success me-2">DELIVERED</span>
                    <span>Vehicles that have arrived at dealership</span>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-warning me-2">SHIPPED</span>
                    <span>Vehicles currently in transit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.875rem' }}>
                <thead className="table-light">
                  <tr>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('stock')}>STOCK {getSortIcon('stock')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('vin')}>VIN {getSortIcon('vin')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('engine')}>ENGINE {getSortIcon('engine')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('bl')}>BL {getSortIcon('bl')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('ocnSpec')}>OCN SPEC {getSortIcon('ocnSpec')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('model')}>MODEL {getSortIcon('model')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('country')}>COUNTRY {getSortIcon('country')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('vinYear')}>VIN YEAR {getSortIcon('vinYear')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('extColor')}>EXT. COLOR {getSortIcon('extColor')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('intColor')}>INT. COLOR {getSortIcon('intColor')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('orderMonth')}>ORDER MONTH {getSortIcon('orderMonth')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('productionEstimate')}>PRODUCTION ESTIMATE {getSortIcon('productionEstimate')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('shippingDate')}>SHIPPING DATE {getSortIcon('shippingDate')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('arrivalDate')}>ARRIVAL DATE {getSortIcon('arrivalDate')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap" onClick={() => handleSort('shippingIndication')}>SHIPPING INDICATION {getSortIcon('shippingIndication')}</th>
                    <th className="cursor-pointer py-3 px-2 text-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="16" className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 mb-0">Loading inventory data...</p>
                      </td>
                    </tr>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <tr key={index} className="cursor-pointer">
                        <td className="py-2">{item.stock}</td>
                        <td className="py-2">{item.vin}</td>
                        <td className="py-2">{item.engine}</td>
                        <td className="py-2">{item.bl}</td>
                        <td className="py-2">{item.ocnSpec}</td>
                        <td className="py-2">{item.model}</td>
                        <td className="py-2">{item.country}</td>
                        <td className="py-2">{item.vinYear}</td>
                        <td className="py-2">{item.extColor}</td>
                        <td className="py-2">{item.intColor}</td>
                        <td className="py-2">{item.orderMonth}</td>
                        <td className="py-2">{item.productionEstimate}</td>
                        <td className="py-2">{item.shippingDate}</td>
                        <td className="py-2">{item.arrivalDate}</td>
                        <td className="py-2">
                          <span className={`badge ${item.shippingIndication === 'DELIVERED' ? 'bg-success' : 'bg-warning'}`}>
                            {item.shippingIndication}
                          </span>
                        </td>
                        <td className="text-end py-2">
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
                      <td colSpan="16" className="text-center py-4">
                        <div className="mb-3">
                          <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                        </div>
                        <h3 className="h5">No items found</h3>
                        <p className="text-muted mb-3">Try adjusting your search or filters to find what you're looking for.</p>
                        <button className="btn btn-primary" onClick={clearFilters}>Reset Search</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && !loading && (
              <div className="card-footer bg-white d-flex flex-column flex-md-row justify-content-between align-items-center py-2">
                <div className="mb-2 mb-md-0">
                  <p className="mb-0 text-muted small">
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
    <Modal show={showEditModal} onHide={closeEditModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Update Inventory Item</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedItem && (
      <>
        {/* Read-only Fields */}
        {[
          { label: "Stock Number", key: "stock" },
          { label: "VIN", key: "vin" },
          { label: "Engine", key: "engine" },
          { label: "BL", key: "bl" },
          { label: "OCN SPEC", key: "ocnSpec" },
          { label: "Model", key: "model" },
          { label: "Country", key: "country" },
          { label: "VIN Year", key: "vinYear" },
          { label: "Ext. Color", key: "extColor" },
          { label: "Int. Color", key: "intColor" },
          { label: "Order Month", key: "orderMonth" },
          { label: "Production Estimate", key: "productionEstimate" },
          { label: "Shipping Date", key: "shippingDate" },
        ].map((field, idx) => (
          <div className="mb-3" key={idx}>
            <label className="form-label">{field.label}</label>
            <input
              type="text"
              className="form-control"
              value={selectedItem[field.key] || ""}
              disabled
            />
          </div>
        ))}

        {/* Editable Fields */}
        <div className="mb-3">
          <label className="form-label">Arrival Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedItem.arrivalDate || ""}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, arrivalDate: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Shipping Indication</label>
          <select
            className="form-select"
            value={selectedItem.shippingIndication || ""}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, shippingIndication: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="DELIVERED">Delivered</option>
            <option value="SHIPPED">Shipped</option>
          </select>
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