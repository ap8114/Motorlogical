// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';


const ManagerStaff = () => {
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      fullName: 'Michael Johnson',
      email: 'michael.johnson@dealership.com',
      phone: '(555) 123-4567',
      status: true,
      lastActivity: '2025-06-19T09:45:00',
      role: 'Sales Manager',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20confident%20male%20sales%20manager%20with%20short%20dark%20hair%20wearing%20a%20business%20suit%20with%20blue%20tie%20against%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=1&orientation=squarish'
    },
    {
      id: 2,
      fullName: 'Sarah Parker',
      email: 'sarah.parker@dealership.com',
      phone: '(555) 234-5678',
      status: true,
      lastActivity: '2025-06-19T10:15:00',
      role: 'Senior Sales Rep',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20confident%20female%20sales%20representative%20with%20shoulder%20length%20blonde%20hair%20wearing%20business%20attire%20against%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=2&orientation=squarish'
    },
    {
      id: 3,
      fullName: 'David Lee',
      email: 'david.lee@dealership.com',
      phone: '(555) 345-6789',
      status: true,
      lastActivity: '2025-06-19T08:30:00',
      role: 'Sales Rep',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20male%20sales%20representative%20with%20glasses%20wearing%20business%20casual%20attire%20against%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=3&orientation=squarish'
    },
    {
      id: 4,
      fullName: 'Jennifer Adams',
      email: 'jennifer.adams@dealership.com',
      phone: '(555) 456-7890',
      status: false,
      lastActivity: '2025-06-18T16:45:00',
      role: 'Sales Rep',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20female%20sales%20representative%20with%20dark%20hair%20wearing%20business%20attire%20against%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=4&orientation=squarish'
    },
    {
      id: 5,
      fullName: 'Robert Brown',
      email: 'robert.brown@dealership.com',
      phone: '(555) 567-8901',
      status: true,
      lastActivity: '2025-06-19T11:00:00',
      role: 'Sales Rep',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20african%20american%20male%20sales%20representative%20wearing%20business%20attire%20against%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=5&orientation=squarish'
    }
  ]);

  const [staffMember] = useState([]); // ✅ must be an array

  const [showModal, setShowModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const initialFormState= {
    id: 0,
    fullName: '',
    email: '',
    phone: '',
    status: true,
    lastActivity: new Date().toISOString(),
    role: 'Sales Rep',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20silhouette%20placeholder%20against%20neutral%20background%2C%20minimalist%20design%2C%20high%20quality&width=100&height=100&seq=6&orientation=squarish'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const handleAddStaff = () => {
    setCurrentStaff(null);
    setFormData(initialFormState);
    setFormErrors({});
    setShowModal(true);
  };

  const handleEditStaff = (staff) => {
    setCurrentStaff(staff);
    setFormData(staff);
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = ()=> {
    const errors= {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (currentStaff) {
      // Update existing staff
      setStaffMembers(
        staffMembers.map(staff => 
          staff.id === currentStaff.id ? { ...formData, lastActivity: new Date().toISOString() } : staff
        )
      );
    } else {
      // Add new staff
      const newStaff = {
        ...formData,
        id: Math.max(0, ...staffMembers.map(s => s.id)) + 1,
        lastActivity: new Date().toISOString()
      };
      setStaffMembers([...staffMembers, newStaff]);
    }
    
    setShowModal(false);
  };

  const handleToggleStatus = (id) => {
    setStaffMembers(
      staffMembers.map(staff => 
        staff.id === id ? { ...staff, status: !staff.status } : staff
      )
    );
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffMembers(staffMembers.filter(staff => staff.id !== id));
    }
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        staff.phone.includes(searchTerm);
    
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'active') return matchesSearch && staff.status;
    if (statusFilter === 'inactive') return matchesSearch && !staff.status;
    
    return matchesSearch;
  });

  const formatDate = (dateString)=> {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage your dealership's sales team</p>
          <div className="h-1 w-24 bg-indigo-600 mt-4"></div>
        </div>
        
        {/* Staff List Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Salesperson List</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search staff..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
              
              <button
                onClick={handleAddStaff}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Staff
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <tr key={staff.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={staff.avatar} alt={staff.fullName} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{staff.fullName}</div>
                            <div className="text-xs text-gray-500">{staff.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{staff.email}</div>
                        <div className="text-sm text-gray-500">{staff.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleToggleStatus(staff.id)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              staff.status ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                staff.status ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            {staff.status ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(staff.lastActivity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditStaff(staff)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(staff.id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No staff members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {filteredStaff.length > 0 && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredStaff.length}</span> of{' '}
                  <span className="font-medium">{staffMembers.length}</span> staff members
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-file-export mr-1"></i> Export
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-print mr-1"></i> Print
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Staff Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
              <i className="fas fa-users text-indigo-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold text-gray-800">{staffMembers.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <i className="fas fa-user-check text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Staff</p>
              <p className="text-2xl font-bold text-gray-800">
                {staffMembers.filter(staff => staff.status).length}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
              <i className="fas fa-user-clock text-amber-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Today</p>
              <p className="text-2xl font-bold text-gray-800">
                {staffMembers.filter(staff => {
                  const today = new Date().toISOString().split('T')[0];
                  const activityDate = new Date(staff.lastActivity).toISOString().split('T')[0];
                  return staff.status && activityDate === today;
                }).length}
              </p>
            </div>
          </div>
        </div>
        
        {/* Notes Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Staff Management Notes</h3>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-info-circle text-blue-400"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Staff status updates are automatically logged. Inactive staff members will not appear in customer-facing applications. Please ensure all contact information is kept up to date.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <p className="text-sm text-gray-500">Last updated: June 19, 2025 - 11:45 AM</p>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Staff Modal */}
     {showModal && (
  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(75, 85, 99, 0.5)' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content shadow">
        <div className="modal-header">
          <h5 className="modal-title">
            {currentStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h5>
          <button type="button" className="btn-close" onClick={handleCloseModal}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`}
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {formErrors.fullName && (
                <div className="invalid-feedback">{formErrors.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <div className="invalid-feedback">{formErrors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {formErrors.phone && (
                <div className="invalid-feedback">{formErrors.phone}</div>
              )}
            </div>

            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
              >
                <option value="Sales Rep">Sales Rep</option>
                <option value="Senior Sales Rep">Senior Sales Rep</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Finance Manager">Finance Manager</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input me-1"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="status">
                Active Status
              </label>
              <div className="form-text">
                Inactive staff will not appear in customer-facing applications.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {currentStaff ? 'Update Staff' : 'Add Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ManagerStaff;