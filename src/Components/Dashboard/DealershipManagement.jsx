// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';
import api from '../../../utils/axiosInterceptor';
import Swal from 'sweetalert2';
import { data } from 'react-router-dom';
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
  const [dealerships, setDealerships] = useState([]);
  // Initialize charts

  const handelFatch = async () => {
    try {
      const responce = await api.get("/dealership")
      setDealerships(responce.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handelFatch()
  }, []);

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
  const handleSaveDealership = async () => {
    try {
      if (isEditing) {
        await api.put(`/dealership/${dealershipForm.id}`, dealershipForm);
      } else {
        await api.post("/dealership", dealershipForm);
      }

      await Swal.fire({
        title: 'Success!',
        text: isEditing
          ? 'Dealership item has been updated.'
          : 'New dealership item has been added.',
        icon: 'success',
        customClass: {
          container: 'z-[99999]' // Ensure it's on top
        }
      });

      setShowAddDealershipModal(false);
      handelFatch();
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
    } catch (error) {
      console.error("Save failed:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error'
      });
    }
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
  const handleSheetUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const sheetData = XLSX.utils.sheet_to_json(ws);

      // Update the existing dealership data
      const updatedDealerships = dealerships.map(existing => {
        const updated = sheetData.find(row => row.Code === existing.code);
        return updated
          ? { // If dealership exists, update it
            ...existing,
            ...updated, // Merge updated data
            status: updated.Status?.toLowerCase() === "active" // Update status if provided
          }
          : existing;
      });

      // Add new dealerships from the sheet data that do not already exist in the current list
      const newDealers = sheetData.filter(row =>
        !dealerships.find(d => d.code === row.Code)
      ).map((item, index) => ({
        id: (dealerships.length + index + 1).toString(),
        ...item,
        status: item.Status?.toLowerCase() === "active",
        dateCreated: new Date().toISOString().split("T")[0]
      }));

      // Update the state with both the updated existing dealerships and new dealerships
      setDealerships([...updatedDealerships, ...newDealers]);
    };

    reader.readAsBinaryString(file);
  };

  const handleDownloadCSV = () => {
    const ws = utils.json_to_sheet(dealerships);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Dealerships");
    writeFile(wb, "Dealerships_Export.csv");
  };
  return (
    <div>
      <main className="p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Title & Description */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              Dealership Management
            </h1>
            <p className="text-gray-600 mt-1">Manage all your dealerships in one place</p>
          </div>

          {/* Actions: Add, Upload, Download */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <button
              onClick={handleDownloadCSV}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition whitespace-nowrap"
            >
              <i className="fas fa-download mr-2"></i> Download CSV
            </button>
            <button
              onClick={handleAddDealership}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition whitespace-nowrap"
            >
              <i className="fas fa-plus mr-2"></i> Add New Dealership
            </button>




          </div>
        </div>



        {/* Dealership Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header Section */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Dealership List</h2>
            {/* <input
              type="file"
              accept=".csv, .xlsx"
              onChange={handleSheetUpload}
              className="w-full sm:w-auto px-4 py-2 border rounded-lg text-sm cursor-pointer text-gray-700 bg-white hover:bg-gray-100"
              title="Upload Dealership Sheet"
            /> */}
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[900px] w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    'Dealership Name & Code',
                    'Location',
                    'Contact Details',
                    'Status',
                    'Date Created',
                    'Actions'
                  ].map((title) => (
                    <th
                      key={title}
                      scope="col"
                      className={`px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${title === 'Actions' ? 'text-right' : ''}`}
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDealerships.map((dealership) => (
                  <tr key={dealership.id} className="hover:bg-gray-50">
                    {/* Name & Code */}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                          <i className="fas fa-store"></i>
                        </div>
                        <div className="ml-4">
                          <a
                            href="#"
                            data-readdy="true"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                          >
                            {dealership.name}
                          </a>
                          <div className="text-sm text-gray-500">{dealership.code}</div>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dealership.state}</div>
                      <div className="text-sm text-gray-500">{dealership.address}</div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dealership.contactPerson}</div>
                      <div className="text-sm text-gray-500">{dealership.email}</div>
                      <div className="text-sm text-gray-500">{dealership.phone}</div>
                    </td>

                    {/* Status */}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          className={`relative inline-flex h-6 w-11 border-2 border-transparent rounded-full transition-colors duration-200 focus:outline-none ${dealership.status ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${dealership.status ? 'translate-x-5' : 'translate-x-0'}`}
                          />
                        </button>
                        <span className={`ml-2 text-sm ${dealership.status ? 'text-green-600' : 'text-gray-500'}`}>
                          {dealership.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(dealership.dateCreated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setDealershipForm({ ...dealership });
                            setShowAddDealershipModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteConfirmation(dealership.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

        </div>

      </main>
      {/* Add Dealership Modal */}
      <div>
        {showAddDealershipModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="fas fa-store me-2 text-primary"></i>
                    {isEditing ? 'Edit Dealership' : 'Add New Dealership'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddDealershipModal(false)}></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row g-3">

                      {/* Dealership Name */}
                      <div className="col-12">
                        <label className="form-label">Dealership Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dealershipForm.name}
                          onChange={(e) => setDealershipForm({ ...dealershipForm, name: e.target.value })}
                        />
                      </div>

                      {/* Dealership Code */}
                      <div className="col-md-6">
                        <label className="form-label">Dealership Code</label>
                        <input
                          type="text"
                          className="form-control bg-light"
                          value={dealershipForm.code}
                          disabled
                        />
                        <small className="text-muted">Auto-generated code</small>
                      </div>

                      {/* Status Toggle */}
                      <div className="col-md-6">
                        <label className="form-label d-block">Status</label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="dealershipStatus"
                            checked={dealershipForm.status}
                            onChange={() =>
                              setDealershipForm({ ...dealershipForm, status: !dealershipForm.status })
                            }
                          />
                          <label className="form-check-label" htmlFor="dealershipStatus">
                            {dealershipForm.status ? 'Active' : 'Inactive'}
                          </label>
                        </div>
                      </div>

                      {/* Section Heading */}
                      <div className="col-12 mt-3">
                        <h6 className="border-bottom pb-1 text-secondary">Location Details</h6>
                      </div>

                      {/* Address */}
                      <div className="col-12">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dealershipForm.address}
                          onChange={(e) => setDealershipForm({ ...dealershipForm, address: e.target.value })}
                        />
                      </div>

                      {/* City */}
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dealershipForm.city}
                          onChange={(e) => setDealershipForm({ ...dealershipForm, city: e.target.value })}
                        />
                      </div>

                      {/* State */}
                      <div className="col-md-6">
                        <label className="form-label">State/Region</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dealershipForm.state}
                          onChange={(e) => setDealershipForm({ ...dealershipForm, state: e.target.value })}
                        />
                      </div>

                      {/* Contact Info Section */}
                      <div className="col-12 mt-3">
                        <h6 className="border-bottom pb-1 text-secondary">Contact Information</h6>
                      </div>

                      {/* Contact Person */}
                      <div className="col-12">
                        <label className="form-label">Contact Person</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dealershipForm.contactPerson}
                          onChange={(e) => setDealershipForm({ ...dealershipForm, contactPerson: e.target.value })}
                        />
                      </div>

                      {/* Email */}
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={dealershipForm.email}
                          onChange={(e) => setDealershipForm({ ...dealershipForm, email: e.target.value })}
                        />
                      </div>

                      {/* Phone */}
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dealershipForm.phone}
                          onChange={(e) => setDealershipForm({ ...dealershipForm, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveDealership}
                  >
                    {isEditing ? 'Update Dealership' : 'Save Dealership'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
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