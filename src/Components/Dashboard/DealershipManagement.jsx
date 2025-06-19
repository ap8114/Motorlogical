import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Tab, Nav } from 'react-bootstrap';

const DealershipManagement = () => {
  const [showAddDealershipModal, setShowAddDealershipModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('dealerships');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Sample dealership data
  const dealerships = [
    {
      id: '1',
      name: 'City Motors',
      code: 'DLR-1234',
      location: 'New York, NY',
      address: '123 Broadway',
      city: 'New York',
      state: 'NY',
      contactPerson: 'John Smith',
      email: 'john@citymotors.com',
      phone: '(212) 555-1234',
      status: true,
      sales: 1245000,
      orders: 156,
      inventory: 78,
      dateCreated: '2024-12-15'
    },
    {
      id: '2',
      name: 'Highway Auto',
      code: 'DLR-5678',
      location: 'Los Angeles, CA',
      address: '456 Sunset Blvd',
      city: 'Los Angeles',
      state: 'CA',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@highwayauto.com',
      phone: '(310) 555-5678',
      status: true,
      sales: 985000,
      orders: 124,
      inventory: 62,
      dateCreated: '2025-01-22'
    },
    {
      id: '3',
      name: 'Luxury Cars Inc',
      code: 'DLR-9012',
      location: 'Miami, FL',
      address: '789 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      contactPerson: 'Michael Rodriguez',
      email: 'michael@luxurycars.com',
      phone: '(305) 555-9012',
      status: true,
      sales: 2350000,
      orders: 98,
      inventory: 45,
      dateCreated: '2025-02-10'
    }
  ];

  // Calculate statistics
  const totalDealerships = dealerships.length;
  const activeDealerships = dealerships.filter(d => d.status).length;
  const totalSales = dealerships.reduce((sum, d) => sum + d.sales, 0);
  const totalInventory = dealerships.reduce((sum, d) => sum + d.inventory, 0);

  return (
    <div className="container-fluid p-0">
      {/* Main Content */}
      <main className="p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="mb-3 mb-md-0">
            <h1 className="h3 mb-1">
              <i className="fas fa-store text-primary me-2"></i> Dealership Management
            </h1>
            <p className="text-muted mb-0">Manage all your dealerships in one place</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowAddDealershipModal(true)}
          >
            <i className="fas fa-plus me-2"></i> Add New Dealership
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="p-3 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                    <i className="fas fa-store fs-4"></i>
                  </div>
                  <div>
                    <h6 className="text-muted mb-1">Total Dealerships</h6>
                    <h4 className="mb-0">{totalDealerships}</h4>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-success">
                    <i className="fas fa-arrow-up me-1"></i> 12%
                  </span>
                  <span className="text-muted ms-2">from last month</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="p-3 rounded-circle bg-success bg-opacity-10 text-success me-3">
                    <i className="fas fa-check-circle fs-4"></i>
                  </div>
                  <div>
                    <h6 className="text-muted mb-1">Active Dealerships</h6>
                    <h4 className="mb-0">{activeDealerships}</h4>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-success">
                    <i className="fas fa-arrow-up me-1"></i> 8%
                  </span>
                  <span className="text-muted ms-2">from last month</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="p-3 rounded-circle bg-info bg-opacity-10 text-info me-3">
                    <i className="fas fa-dollar-sign fs-4"></i>
                  </div>
                  <div>
                    <h6 className="text-muted mb-1">Total Sales</h6>
                    <h4 className="mb-0">${(totalSales / 1000000).toFixed(2)}M</h4>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-success">
                    <i className="fas fa-arrow-up me-1"></i> 15%
                  </span>
                  <span className="text-muted ms-2">from last month</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="p-3 rounded-circle bg-warning bg-opacity-10 text-warning me-3">
                    <i className="fas fa-warehouse fs-4"></i>
                  </div>
                  <div>
                    <h6 className="text-muted mb-1">Total Inventory</h6>
                    <h4 className="mb-0">{totalInventory}</h4>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-danger">
                    <i className="fas fa-arrow-down me-1"></i> 3%
                  </span>
                  <span className="text-muted ms-2">from last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Content */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Dealership List</h5>
            <div className="d-flex">
              <div className="input-group me-2" style={{ width: '200px' }}>
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search..." 
                />
              </div>
              <select className="form-select me-2" style={{ width: '150px' }}>
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <i className={`fas fa-${showAdvancedFilters ? 'chevron-up' : 'chevron-down'} me-1`}></i>
                Filters
              </Button>
            </div>
          </div>
          
          {showAdvancedFilters && (
            <div className="card-body border-bottom">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date Created</label>
                  <div className="row g-2">
                    <div className="col">
                      <input type="date" className="form-control" placeholder="From" />
                    </div>
                    <div className="col">
                      <input type="date" className="form-control" placeholder="To" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <select className="form-select">
                    <option>All Locations</option>
                    <option>New York, NY</option>
                    <option>Los Angeles, CA</option>
                    <option>Miami, FL</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="light" className="me-2">Reset</Button>
                <Button variant="primary">Apply Filters</Button>
              </div>
            </div>
          )}
          
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Dealership Name & Code</th>
                    <th>Location</th>
                    <th>Contact Details</th>
                    <th>Performance</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dealerships.map((dealership) => (
                    <tr key={dealership.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                            <i className="fas fa-store text-primary"></i>
                          </div>
                          <div>
                            <div className="fw-semibold">{dealership.name}</div>
                            <div className="text-muted small">{dealership.code}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{dealership.location}</div>
                        <div className="text-muted small">{dealership.address}</div>
                      </td>
                      <td>
                        <div>{dealership.contactPerson}</div>
                        <div className="text-muted small">{dealership.email}</div>
                        <div className="text-muted small">{dealership.phone}</div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div className="d-flex justify-content-between">
                            <span className="text-muted small">Sales:</span>
                            <span className="fw-semibold">${(dealership.sales / 1000).toFixed(1)}K</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted small">Orders:</span>
                            <span className="fw-semibold">{dealership.orders}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted small">Inventory:</span>
                            <span className="fw-semibold">{dealership.inventory}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={dealership.status}
                            readOnly
                          />
                          <label className="form-check-label">
                            {dealership.status ? 'Active' : 'Inactive'}
                          </label>
                        </div>
                      </td>
                      <td>
                        {new Date(dealership.dateCreated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td>
                        <div className="d-flex">
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => setShowAddDealershipModal(true)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => setShowDeleteConfirmation(true)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="text-muted">
              Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">{dealerships.length}</span> of{' '}
              <span className="fw-semibold">{dealerships.length}</span> entries
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>

      {/* Add Dealership Modal */}
      <Modal show={showAddDealershipModal} onHide={() => setShowAddDealershipModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-store text-primary me-2"></i> Add New Dealership
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row mb-3">
              <div className="col-md-8">
                <label className="form-label">Dealership Name *</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Dealership Code</label>
                <input type="text" className="form-control" value="DLR-1234" disabled />
                <small className="text-muted">Auto-generated code</small>
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-8">
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="statusSwitch" 
                    checked
                  />
                  <label className="form-check-label" htmlFor="statusSwitch">Active</label>
                </div>
              </div>
            </div>
            
            <h6 className="mb-3 border-bottom pb-2">Location Details</h6>
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">State/Region</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            
            <h6 className="mb-3 border-bottom pb-2">Contact Information</h6>
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Contact Person</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddDealershipModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Save Dealership
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle text-danger me-2"></i> Delete Dealership
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this dealership? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DealershipManagement;