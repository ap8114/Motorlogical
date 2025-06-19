// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
const DealershipManagement = () => {

  const [showAddDealershipModal, setShowAddDealershipModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
 
  // Form state for add/edit dealership
  const [isEditing, setIsEditing] = useState(false);
  const [dealershipForm, setDealershipForm] = useState({
    id: '',
    name: '',
    code: 'DLR-' + Math.floor(1000 + Math.random() * 9000),
    location: '',
    address: '',
    city: '',
    state: '',
    contactPerson: '',
    email: '',
    phone: '',
    status: true
  });
  // Sample dealership data
  const [dealerships, setDealerships] = useState([
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
    },
    {
      id: '4',
      name: 'Downtown Autos',
      code: 'DLR-3456',
      location: 'Chicago, IL',
      address: '321 Michigan Ave',
      city: 'Chicago',
      state: 'IL',
      contactPerson: 'David Wilson',
      email: 'david@downtownautos.com',
      phone: '(312) 555-3456',
      status: false,
      sales: 765000,
      orders: 87,
      inventory: 53,
      dateCreated: '2025-03-05'
    },
    {
      id: '5',
      name: 'Valley Vehicles',
      code: 'DLR-7890',
      location: 'Phoenix, AZ',
      address: '654 Desert Rd',
      city: 'Phoenix',
      state: 'AZ',
      contactPerson: 'Jessica Brown',
      email: 'jessica@valleyvehicles.com',
      phone: '(602) 555-7890',
      status: true,
      sales: 1120000,
      orders: 132,
      inventory: 67,
      dateCreated: '2025-04-18'
    },
    {
      id: '6',
      name: 'Metro Motors',
      code: 'DLR-2345',
      location: 'Boston, MA',
      address: '987 Commonwealth Ave',
      city: 'Boston',
      state: 'MA',
      contactPerson: 'Robert Lee',
      email: 'robert@metromotors.com',
      phone: '(617) 555-2345',
      status: false,
      sales: 895000,
      orders: 104,
      inventory: 42,
      dateCreated: '2025-05-01'
    }
  ]);
  // Initialize charts


  // Handle add dealership
  const handleAddDealership = () => {
    setDealershipForm({
      name: '',
      code: 'DLR-' + Math.floor(1000 + Math.random() * 9000),
      location: '',
      address: '',
      city: '',
      state: '',
      contactPerson: '',
      email: '',
      phone: '',
      status: true
    });
    setShowAddDealershipModal(true);
  };
  // Handle save dealership
  const handleSaveDealership = () => {
    if (isEditing) {
      setDealerships(dealerships.map(d =>
        d.id === dealershipForm.id ? {
          ...d,
          name: dealershipForm.name,
          location: dealershipForm.location,
          address: dealershipForm.address,
          city: dealershipForm.city,
          state: dealershipForm.state,
          contactPerson: dealershipForm.contactPerson,
          email: dealershipForm.email,
          phone: dealershipForm.phone,
          status: dealershipForm.status
        } : d
      ));
    } else {
      const newDealership = {
        id: (dealerships.length + 1).toString(),
        ...dealershipForm,
        sales: Math.floor(Math.random() * 1000000) + 500000,
        orders: Math.floor(Math.random() * 100) + 50,
        inventory: Math.floor(Math.random() * 50) + 30,
        dateCreated: new Date().toISOString().split('T')[0]
      };
      setDealerships([...dealerships, newDealership]);
    }
    setShowAddDealershipModal(false);
    setIsEditing(false);
    setDealershipForm({
      id: '',
      name: '',
      code: 'DLR-' + Math.floor(1000 + Math.random() * 9000),
      location: '',
      address: '',
      city: '',
      state: '',
      contactPerson: '',
      email: '',
      phone: '',
      status: true
    });
  };
  // Handle delete confirmation

  // Handle delete dealership
  const handleDeleteDealership = () => {
    if (dealershipToDelete) {
      setDealerships(dealerships.filter(d => d.id !== dealershipToDelete));
      setShowDeleteConfirmation(false);
      setDealershipToDelete(null);
    }
  };
  // Filter dealerships based on search and filters
  const filteredDealerships = dealerships.filter(dealership => {
    const matchesSearch =
      dealership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealership.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealership.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealership.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && dealership.status) ||
      (statusFilter === 'inactive' && !dealership.status);
    return matchesSearch && matchesStatus;
  });

  return (
   <div>
       <main className="p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                Dealership Management
              </h1>
              <p className="text-gray-600 mt-1">Manage all your dealerships in one place</p>
            </div>
            <button
              onClick={handleAddDealership}
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-plus mr-2"></i> Add New Dealership
            </button>
          </div>
     
      
          {/* Dealership Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Dealership List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dealership Name & Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Details
                    </th>
                
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDealerships.map((dealership) => (
                    <tr key={dealership.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                            <i className="fas fa-store"></i>
                          </div>
                          <div className="ml-4">
                            <a
                              href="https://readdy.ai/home/c8a6bcde-470a-4a15-8148-ac3671c15e32/f1a0a25b-4eff-44bb-8633-94b68d66f227"
                              data-readdy="true"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                            >
                              {dealership.name}
                            </a>
                            <div className="text-sm text-gray-500">{dealership.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{dealership.location}</div>
                        <div className="text-sm text-gray-500">{dealership.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{dealership.contactPerson}</div>
                        <div className="text-sm text-gray-500">{dealership.email}</div>
                        <div className="text-sm text-gray-500">{dealership.phone}</div>
                      </td>
                    
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${dealership.status ? 'bg-green-500' : 'bg-gray-300'} !rounded-button whitespace-nowrap`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${dealership.status ? 'translate-x-5' : 'translate-x-0'}`}
                            ></span>
                          </button>
                          <span className={`ml-2 text-sm ${dealership.status ? 'text-green-600' : 'text-gray-500'}`}>
                            {dealership.status ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(dealership.dateCreated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setDealershipForm({
                                id: dealership.id,
                                name: dealership.name,
                                code: dealership.code,
                                location: dealership.location,
                                address: dealership.address,
                                city: dealership.city,
                                state: dealership.state,
                                contactPerson: dealership.contactPerson,
                                email: dealership.email,
                                phone: dealership.phone,
                                status: dealership.status
                              });
                              setShowAddDealershipModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteConfirmation(dealership.id)}
                            className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDealerships.length}</span> of{' '}
                    <span className="font-medium">{filteredDealerships.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      <span className="sr-only">Previous</span>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      3
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      8
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      9
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      10
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                      <span className="sr-only">Next</span>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Add Dealership Modal */}
      <div>
          {showAddDealershipModal && (
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <i className="fas fa-store text-indigo-600"></i>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {isEditing ? 'Edit Dealership' : 'Add New Dealership'}
                      </h3>
                      <div className="mt-4">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <label htmlFor="dealership-name" className="block text-sm font-medium text-gray-700">
                              Dealership Name *
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="dealership-name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={dealershipForm.name}
                                onChange={(e) => setDealershipForm({ ...dealershipForm, name: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="dealership-code" className="block text-sm font-medium text-gray-700">
                              Dealership Code
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="dealership-code"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                                value={dealershipForm.code}
                                disabled
                              />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Auto-generated code</p>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="dealership-status" className="block text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <div className="mt-1 flex items-center">
                              <button
                                type="button"
                                className={`${dealershipForm.status ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none !rounded-button whitespace-nowrap`}
                                onClick={() => setDealershipForm({ ...dealershipForm, status: !dealershipForm.status })}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${dealershipForm.status ? 'translate-x-5' : 'translate-x-0'}`}
                                ></span>
                              </button>
                              <span className="ml-2 text-sm text-gray-700">
                                {dealershipForm.status ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Location Details</h4>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="dealership-address" className="block text-sm font-medium text-gray-700">
                              Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="dealership-address"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={dealershipForm.address}
                                onChange={(e) => setDealershipForm({ ...dealershipForm, address: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="dealership-city" className="block text-sm font-medium text-gray-700">
                              City
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="dealership-city"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={dealershipForm.city}
                                onChange={(e) => setDealershipForm({ ...dealershipForm, city: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="dealership-state" className="block text-sm font-medium text-gray-700">
                              State/Region
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="dealership-state"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={dealershipForm.state}
                                onChange={(e) => setDealershipForm({ ...dealershipForm, state: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Contact Information</h4>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="contact-person" className="block text-sm font-medium text-gray-700">
                              Contact Person
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="contact-person"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={dealershipForm.contactPerson}
                                onChange={(e) => setDealershipForm({ ...dealershipForm, contactPerson: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                id="contact-email"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={dealershipForm.email}
                                onChange={(e) => setDealershipForm({ ...dealershipForm, email: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
                              Phone
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="contact-phone"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={dealershipForm.phone}
                                onChange={(e) => setDealershipForm({ ...dealershipForm, phone: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                    onClick={handleSaveDealership}
                  >
                    {isEditing ? 'Update Dealership' : 'Save Dealership'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                    onClick={() => setShowAddDealershipModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <i className="fas fa-exclamation-triangle text-red-600"></i>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Delete Dealership
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this dealership? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                    onClick={handleDeleteDealership}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
   </div>
  );
};
export default DealershipManagement