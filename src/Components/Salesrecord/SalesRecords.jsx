import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button, Pagination, Badge, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiSearch, FiCalendar, FiDollarSign, FiUser, FiEye, FiEdit, FiX, FiCheck, FiArrowUp, FiArrowDown, FiFileText, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaCar, FaFileExcel, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const SalesRecords = () => {
  // Sample data
  const salesData = [
    {
      id: 'SL-2025-8742',
      product: 'Mercedes-Benz S-Class',
      price: 89500.00,
      date: '06/12/2025',
      customer: 'Jonathan Harrington',
      note: 'Customer requested premium sound system upgrade and extended warranty package. Delivery scheduled for next week. Follow-up for customer satisfaction survey in 30 days.',
      color: 'blue',
      status: 'Processing'
    },
    {
      id: 'SL-2025-8741',
      product: 'Porsche 911 Carrera',
      price: 112300.00,
      date: '06/11/2025',
      customer: 'Elizabeth Chambers',
      note: 'Repeat customer, traded in previous 2022 model. Purchased additional performance package and ceramic brakes. Financing through Porsche Financial Services.',
      color: 'red',
      status: 'Ready'
    },
    {
      id: 'SL-2025-8740',
      product: 'Tesla Model S Plaid',
      price: 129990.00,
      date: '06/10/2025',
      customer: 'Michael Richardson',
      note: 'Customer specifically requested white interior with carbon fiber trim. Included home charging station installation. Referred by existing Tesla owner.',
      color: 'green',
      status: 'Delivered'
    },
    {
      id: 'SL-2025-8739',
      product: 'Lamborghini Urus',
      price: 235000.00,
      date: '06/09/2025',
      customer: 'Alexandra Whitfield',
      note: 'Custom order with exclusive paint color. Customer requested expedited delivery. Full payment made upfront. VIP client, ensure special handling.',
      color: 'yellow',
      status: 'Cancelled'
    },
    {
      id: 'SL-2025-8738',
      product: 'Audi e-tron GT',
      price: 104900.00,
      date: '06/08/2025',
      customer: 'Daniel Westbrook',
      note: 'First-time Audi buyer, previously owned BMW. Interested in EV tax incentives. Scheduled for delivery next month. Requested follow-up on charging network information.',
      color: 'purple',
      status: 'Processing'
    },
    {
      id: 'SL-2025-8737',
      product: 'BMW X7',
      price: 78900.00,
      date: '06/07/2025',
      customer: 'Sophia Martinez',
      note: 'Family purchase, traded in previous SUV. Added third-row seating package and entertainment system. Financing through BMW Financial Services with extended warranty.',
      color: 'indigo',
      status: 'Ready'
    },
    {
      id: 'SL-2025-8736',
      product: 'Maserati Levante',
      price: 83400.00,
      date: '06/06/2025',
      customer: 'Robert Thornton',
      note: 'Business purchase for executive. Custom interior options selected. Delivery scheduled for end of month. Client requested personalized plates arrangement.',
      color: 'pink',
      status: 'Processing'
    },
    {
      id: 'SL-2025-8735',
      product: 'Range Rover Sport',
      price: 97500.00,
      date: '06/05/2025',
      customer: 'Victoria Blackwood',
      note: 'Returning Land Rover customer. Selected off-road package and premium audio system. Financing approved with special promotional rate. Scheduled for delivery next week.',
      color: 'orange',
      status: 'Delivered'
    },
    {
      id: 'SL-2025-8734',
      product: 'Lexus LS 500',
      price: 77250.00,
      date: '06/04/2025',
      customer: 'James Henderson',
      note: 'First Lexus purchase, previously owned Mercedes. Selected luxury package with massage seats. Cash purchase with additional maintenance package for 5 years.',
      color: 'teal',
      status: 'Processing'
    },
    {
      id: 'SL-2025-8733',
      product: 'Jaguar F-Pace',
      price: 69200.00,
      date: '06/03/2025',
      customer: 'Olivia Pemberton',
      note: 'Customer referred by existing Jaguar owner. Selected sport package with upgraded wheels. Financing through dealership with special interest rate. Delivery scheduled for next month.',
      color: 'blue',
      status: 'Ready'
    }
  ];

  // State variables
  const [filteredData, setFilteredData] = useState(salesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    modelYear: '',
    color: '',
    vin: '',
    stock: '',
    customerName: '',
    email: '',
    phone: '',
    address: '',
    saleId: '',
    date: '',
    price: '',
    payment: 'Financing',
    status: 'Processing',
    deliveryDate: '',
    notes: ''
  });

  // Set default dates on component mount
  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    setDateFrom(firstDay.toISOString().split('T')[0]);
    setDateTo(lastDay.toISOString().split('T')[0]);
  }, []);

  // Filter and sort data whenever dependencies change
  useEffect(() => {
    let result = [...salesData];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(sale => 
        sale.customer.toLowerCase().includes(term) || 
        sale.date.includes(term) ||
        sale.id.toLowerCase().includes(term)
  )}
    
    // Apply date filter
    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      
      result = result.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= fromDate && saleDate <= toDate;
      });
    }
    
    // Apply price filter
    if (priceMin) {
      result = result.filter(sale => sale.price >= parseFloat(priceMin));
    }
    
    if (priceMax) {
      result = result.filter(sale => sale.price <= parseFloat(priceMax));
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'price') {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortField === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'product') {
        return sortDirection === 'asc' 
          ? a.product.localeCompare(b.product)
          : b.product.localeCompare(a.product);
      } else if (sortField === 'customer') {
        return sortDirection === 'asc' 
          ? a.customer.localeCompare(b.customer)
          : b.customer.localeCompare(a.customer);
      } else {
        return sortDirection === 'asc' 
          ? a.id.localeCompare(b.id)
          : b.id.localeCompare(a.id);
      }
    });
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, dateFrom, dateTo, priceMin, priceMax, sortField, sortDirection]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Show note modal
  const handleShowNote = (note) => {
    setCurrentNote(note);
    setShowNoteModal(true);
  };

  // Show edit modal
  const handleShowEdit = (sale) => {
    setCurrentSale(sale);
    setFormData({
      productName: sale.product,
      modelYear: '2025',
      color: 'Metallic Silver',
      vin: 'WBA' + sale.id.substring(3),
      stock: sale.id,
      customerName: sale.customer,
      email: sale.customer.toLowerCase().replace(' ', '.') + '@email.com',
      phone: '+1 (310) 555-' + Math.floor(1000 + Math.random() * 9000),
      address: '123 Beverly Hills Blvd, Beverly Hills, CA 90210',
      saleId: sale.id,
      date: '2025-06-13',
      price: sale.price,
      payment: 'Financing',
      status: sale.status,
      deliveryDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
      notes: sale.note
    });
    setShowEditModal(true);
  };

  // Show detail modal
  const handleShowDetail = (sale) => {
    setCurrentSale(sale);
    setShowDetailModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSaveEdit = () => {
    setShowEditModal(false);
    setShowSuccessModal(true);
  };

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing':
        return 'warning';
      case 'Ready':
        return 'primary';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Get icon color based on product
  const getIconColor = (color) => {
    return {
      blue: { bg: 'bg-primary', text: 'text-white' },
      red: { bg: 'bg-danger', text: 'text-white' },
      green: { bg: 'bg-success', text: 'text-white' },
      yellow: { bg: 'bg-warning', text: 'text-white' },
      purple: { bg: 'bg-secondary', text: 'text-white' },
      indigo: { bg: 'bg-info', text: 'text-white' },
      pink: { bg: 'bg-success', text: 'text-white' },
      orange: { bg: 'bg-danger', text: 'text-white' },
      teal: { bg: 'bg-warning', text: 'text-white' }
    }[color] || { bg: 'bg-secondary', text: 'text-white' };
  };

  // Export to Excel
  const handleExport = () => {
    alert('Exporting data to Excel... In a real application, this would download an Excel file.');
  };

  // Apply filters
  const handleApplyFilters = () => {
    // The filtering is already handled by the useEffect
    alert('Filters applied!');
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0 text-dark">Sales Records</h1>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">
                Dealership: <span className="fw-semibold">Luxury Motors Beverly Hills</span>
              </span>
              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <FiUser className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-4">
        <div className="container">
          {/* Search and Filters */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FiSearch className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search by customer name or date"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <button 
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleExport}
                  >
                    <FaFileExcel />
                    Export to Excel
                  </button>
                </div>
              </div>

              <div className="row mt-3 g-3">
                <div className="col-md-6">
                  <div className="row g-2">
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Date From</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FiCalendar className="text-muted" />
                        </span>
                        <input
                          type="date"
                          className="form-control border-start-0"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Date To</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FiCalendar className="text-muted" />
                        </span>
                        <input
                          type="date"
                          className="form-control border-start-0"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Min Price</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FiDollarSign className="text-muted" />
                        </span>
                        <input
                          type="number"
                          className="form-control border-start-0"
                          placeholder="0"
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Max Price</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FiDollarSign className="text-muted" />
                        </span>
                        <input
                          type="number"
                          className="form-control border-start-0"
                          placeholder="Any"
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button 
                    className="btn btn-dark w-100"
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Records Table */}
          <div className="card mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom">
              <h2 className="h5 mb-0">All Sales</h2>
              <div className="text-muted small">
                Last updated: June 13, 2025 at 10:45 AM
              </div>
            </div>
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th 
                      className="cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      <div className="d-flex align-items-center">
                        Sale ID
                        {sortField === 'id' && (
                          sortDirection === 'asc' ? <FiArrowUp className="ms-1" /> : <FiArrowDown className="ms-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer"
                      onClick={() => handleSort('product')}
                    >
                      <div className="d-flex align-items-center">
                        Product
                        {sortField === 'product' && (
                          sortDirection === 'asc' ? <FiArrowUp className="ms-1" /> : <FiArrowDown className="ms-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer text-end"
                      onClick={() => handleSort('price')}
                    >
                      <div className="d-flex align-items-center justify-content-end">
                        Price
                        {sortField === 'price' && (
                          sortDirection === 'asc' ? <FiArrowUp className="ms-1" /> : <FiArrowDown className="ms-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="d-flex align-items-center">
                        Date
                        {sortField === 'date' && (
                          sortDirection === 'asc' ? <FiArrowUp className="ms-1" /> : <FiArrowDown className="ms-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer"
                      onClick={() => handleSort('customer')}
                    >
                      <div className="d-flex align-items-center">
                        Customer
                        {sortField === 'customer' && (
                          sortDirection === 'asc' ? <FiArrowUp className="ms-1" /> : <FiArrowDown className="ms-1" />
                        )}
                      </div>
                    </th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((sale, index) => (
                    <tr key={index}>
                      <td className="font-monospace small">{sale.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className={`rounded-circle ${getIconColor(sale.color).bg} d-flex align-items-center justify-content-center me-2`} style={{ width: '32px', height: '32px' }}>
                            <FaCar className={getIconColor(sale.color).text} />
                          </div>
                          <span>{sale.product}</span>
                        </div>
                      </td>
                      <td className="text-end fw-semibold">${sale.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td>{sale.date}</td>
                      <td>{sale.customer}</td>
                      <td>
                        <div 
                          className="text-truncate" 
                          style={{ maxWidth: '200px', cursor: 'pointer' }}
                          onClick={() => handleShowNote(sale.note)}
                        >
                          {sale.note}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleShowDetail(sale)}
                          >
                            <FiEye />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleShowEdit(sale)}
                          >
                            <FiEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="card-footer bg-white border-top">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="d-flex align-items-center mb-3 mb-md-0">
                  <span className="text-muted small me-3">
                    Showing <span className="fw-semibold">{indexOfFirstItem + 1}</span> to <span className="fw-semibold">{Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="fw-semibold">{filteredData.length}</span> results
                  </span>
                  <select 
                    className="form-select form-select-sm w-auto"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                  </select>
                </div>
                <Pagination className="mb-0">
                  <Pagination.Prev 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <FiChevronLeft />
                  </Pagination.Prev>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    );
                  })}
                  <Pagination.Next 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <FiChevronRight />
                  </Pagination.Next>
                </Pagination>
              </div>
            </div>
          </div>

          {/* Sales Summary */}
          <div className="card">
            <div className="card-body">
              <h2 className="h5 mb-4">Sales Summary</h2>
              <Row>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted small mb-1">Total Sales (This Month)</p>
                          <h3 className="mb-0">$1,078,940.00</h3>
                        </div>
                        <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          <FaMoneyBillWave className="text-success" size={20} />
                        </div>
                      </div>
                      <div className="mt-2 d-flex align-items-center small">
                        <span className="text-success fw-semibold d-flex align-items-center me-1">
                          <FiArrowUp className="me-1" />
                          12.5%
                        </span>
                        <span className="text-muted">vs last month</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted small mb-1">Total Units Sold (This Month)</p>
                          <h3 className="mb-0">42</h3>
                        </div>
                        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          <FaCar className="text-primary" size={20} />
                        </div>
                      </div>
                      <div className="mt-2 d-flex align-items-center small">
                        <span className="text-success fw-semibold d-flex align-items-center me-1">
                          <FiArrowUp className="me-1" />
                          8.3%
                        </span>
                        <span className="text-muted">vs last month</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted small mb-1">Average Sale Value</p>
                          <h3 className="mb-0">$86,315.20</h3>
                        </div>
                        <div className="rounded-circle bg-purple bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          <FaChartLine className="text-purple" size={20} />
                        </div>
                      </div>
                      <div className="mt-2 d-flex align-items-center small">
                        <span className="text-danger fw-semibold d-flex align-items-center me-1">
                          <FiArrowDown className="me-1" />
                          3.8%
                        </span>
                        <span className="text-muted">vs last month</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </main>

      {/* Note Modal */}
      <Modal show={showNoteModal} onHide={() => setShowNoteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Note Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{currentNote}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoteModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Sale Record</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto" style={{ maxHeight: '60vh' }}>
          <Form>
            <Row>
              <Col md={6}>
                <h5 className="text-muted small mb-3">Vehicle Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Model Year</Form.Label>
                      <Form.Control
                        type="text"
                        name="modelYear"
                        value={formData.modelYear}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>VIN</Form.Label>
                      <Form.Control
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Stock #</Form.Label>
                      <Form.Control
                        type="text"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <h5 className="text-muted small mb-3 mt-4">Customer Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <h5 className="text-muted small mb-3">Sale Information</h5>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Sale ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="saleId"
                        value={formData.saleId}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Sale Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Payment Method</Form.Label>
                      <Form.Select
                        name="payment"
                        value={formData.payment}
                        onChange={handleInputChange}
                      >
                        <option value="Financing">Financing</option>
                        <option value="Cash">Cash</option>
                        <option value="Lease">Lease</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <h5 className="text-muted small mb-3 mt-4">Delivery Status</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Ready">Ready for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Estimated Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <h5 className="text-muted small mb-2 mt-3">Notes</h5>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sale Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto" style={{ maxHeight: '60vh' }}>
          {currentSale && (
            <Row>
              <Col md={6}>
                <h5 className="text-muted small mb-2">Vehicle Information</h5>
                <Card className="mb-4">
                  <Card.Body>
                    <h6 className="mb-3">{currentSale.product}</h6>
                    <div className="row small">
                      <div className="col-6 mb-2">
                        <span className="text-muted">Model Year:</span>
                        <span className="ms-1">2025</span>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Color:</span>
                        <span className="ms-1">Metallic Silver</span>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">VIN:</span>
                        <span className="ms-1">WBA{currentSale.id.substring(3)}</span>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Stock #:</span>
                        <span className="ms-1">{currentSale.id}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                
                <h5 className="text-muted small mb-2">Customer Information</h5>
                <Card className="mb-4">
                  <Card.Body>
                    <h6 className="mb-3">{currentSale.customer}</h6>
                    <div className="small">
                      <div className="mb-2">
                        <span className="text-muted">Email:</span>
                        <span className="ms-1">{currentSale.customer.toLowerCase().replace(' ', '.')}@email.com</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-muted">Phone:</span>
                        <span className="ms-1">+1 (310) 555-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-muted">Address:</span>
                        <span className="ms-1">123 Beverly Hills Blvd, Beverly Hills, CA 90210</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <h5 className="text-muted small mb-2">Sale Information</h5>
                <Card className="mb-4">
                  <Card.Body>
                    <div className="row small">
                      <div className="col-6 mb-2">
                        <span className="text-muted">Sale ID:</span>
                        <span className="ms-1">{currentSale.id}</span>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Sale Date:</span>
                        <span className="ms-1">{currentSale.date}</span>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Price:</span>
                        <span className="ms-1">${currentSale.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Payment Method:</span>
                        <span className="ms-1">Financing</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                
                <h5 className="text-muted small mb-2">Delivery Status</h5>
                <Card className="mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg={getStatusBadge(currentSale.status)} className="me-2">
                        {currentSale.status}
                      </Badge>
                    </div>
                    <div className="small">
                      <span className="text-muted">Estimated Delivery:</span>
                      <span className="ms-1">
                        {new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          
          <h5 className="text-muted small mb-2">Notes</h5>
          <Card>
            <Card.Body>
              <p className="small mb-0">{currentSale?.note}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Body className="text-center p-4">
          <div className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '48px', height: '48px' }}>
            <FiCheck size={24} />
          </div>
          <h5 className="mb-3">Changes Saved Successfully</h5>
          <p className="text-muted mb-4">The sale record has been updated.</p>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SalesRecords;