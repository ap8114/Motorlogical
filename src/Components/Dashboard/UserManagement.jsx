// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { Link } from "react-router-dom";
import api from "../../../utils/axiosInterceptor";
import axios from "axios";
import Swal from "sweetalert2";
const UserManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("users");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState("usersList");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAssignDealershipModal, setShowAssignDealershipModal] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDealership, setSelectedDealership] = useState('');
  const [Assignedusers, setAssignedUser] = useState([]);
  // Form state for add/edit user
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState({

    name: "",
    email: "",
    password: "",
    role: "",
    country: "",
    dealership_id: "",
    status: true,

  });
  // Sample user data
  const [users, setUsers] = useState([]);
  // Sample activity log data
  const activityLog = [
    {
      id: 1,
      timestamp: "2025-06-19 14:30",
      user: "John Smith",
      action: "Login",
      details: "User logged in successfully",
      ipAddress: "192.168.1.1",
      device: "Chrome / Windows",
    },
    {
      id: 2,
      timestamp: "2025-06-19 12:15",
      user: "Sarah Johnson",
      action: "Profile Update",
      details: "Updated contact information",
      ipAddress: "192.168.1.2",
      device: "Safari / MacOS",
    },
    {
      id: 3,
      timestamp: "2025-06-19 10:45",
      user: "Michael Rodriguez",
      action: "Dealership Assignment",
      details: "Assigned to Luxury Cars Inc",
      ipAddress: "192.168.1.3",
      device: "Firefox / Linux",
    },
    {
      id: 4,
      timestamp: "2025-06-18 16:20",
      user: "David Wilson",
      action: "Status Change",
      details: "Account deactivated",
      ipAddress: "192.168.1.4",
      device: "Edge / Windows",
    },
    {
      id: 5,
      timestamp: "2025-06-18 14:10",
      user: "Jessica Brown",
      action: "Role Change",
      details: "Changed from Manager to Salesperson",
      ipAddress: "192.168.1.5",
      device: "Chrome / Android",
    },
    {
      id: 6,
      timestamp: "2025-06-18 11:30",
      user: "Robert Lee",
      action: "Password Reset",
      details: "Requested password reset",
      ipAddress: "192.168.1.6",
      device: "Safari / iOS",
    },
  ];
  const [dealerships, setDealerships] = useState([]);


  const fetchDealership = async () => {
    try {
      const response = await api.get("/dealership");

      setDealerships(response.data); // assuming response.data is an array of dealerships
    } catch (error) {
      console.log("Error fetching dealerships:", error);
    }
  };

  const fetchAssignedUser = async () => {
    try {
      const response = await api.get("/getAssignedUsers");
      setAssignedUser(response.data.users);
    } catch (error) {
      console.log("Error fetching AssignedUser:", error);
    }
  }


  const fatchUser = async () => {
    try {
      const responce = await api.get('user')
      setUsers(responce.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fatchUser();
    fetchDealership();
    fetchAssignedUser();
  }, []);
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };




  // Handle add user
  const handleAddUser = () => {
    setUserForm({

      name: "",
      email: "",
      password: "",
      role: "",
      dealership_id: "",
      country: "",
      status: true,


    });
    setIsEditing(false);
    setActiveTab("addEditUser");
  };
  // Handle edit user
  const handleEditUser = (user) => {
    if (!user || typeof user !== "object") {
      console.warn("Invalid user passed to handleEditUser:", user);
      return;
    }

    setUserForm({
      name: user.name || "",
      email: user.email || "",
      country: user.country || "",

      password: user.password || "",
      role: user.role || "",
      dealership_id: user.dealership_id || "",
      status: user.status === 1 ? true : false, // convert 1 to true
    });

    setIsEditing(user.id); // track which user is being edited
    setActiveTab("addEditUser");
  };

  // Handle save user
  const handleSaveUser = async () => {
    if (isEditing) {
      await api.put(`/user/${isEditing}`, userForm);

    } else {
      await api.post("/createUser", userForm)
      setUsers([...users, newUser]);
    }
    await Swal.fire({
      title: 'Saved!',
      text: isEditing
        ? 'User item has been updated.'
        : 'New User item has been added.',
      icon: 'success',
      customClass: {
        container: 'z-[99999]'
      }
    });
    fatchUser();
    setActiveTab("usersList");

  };
  // State
  const [userToDeleteId, setUserToDeleteId] = useState(null);

  // Confirmation function


  // Delete function
  // Modified delete function that accepts ID directly
  const handleDeleteUser = async (id) => {
    if (!id) {
      await Swal.fire({
        title: 'Error!',
        text: 'Cannot delete user - missing ID',
        icon: 'error',
        customClass: { container: 'z-[99999]' }
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: { container: 'z-[99999]' }
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/user/${id}`);
        setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
        await Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          customClass: { container: 'z-[99999]' }
        });
      } catch (error) {
        console.error("Delete error:", error);
        await Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to delete user',
          icon: 'error',
          customClass: { container: 'z-[99999]' }
        });
      } finally {
        setShowDeleteConfirmation(false);
      }
    }
  };


  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.dealership_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "manager" && user.role === "Manager") ||
      (roleFilter === "salesperson" && user.role === "Salesperson");
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.status) ||
      (statusFilter === "inactive" && !user.status);
    return matchesSearch && matchesRole && matchesStatus;
  });
  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status).length;
  const managerUsers = users.filter((u) => u.role === "Manager").length;


  const handleAssignDelarship = async () => {
    if (!selectedUser || !selectedDealership) {
      alert("Please select both user and dealership.");
      return;
    }

    try {
      const response = await api.patch(
        `/assign-dealership/${selectedUser}`,
        { dealership_id: parseInt(selectedDealership) }
      );
      // const response = await axios.patch(
      //   `https://ssknf82q-8000.inc1.devtunnels.ms/api/d1/assign-dealership/${selectedUser}`,
      //   { dealership_id: parseInt(selectedDealership) }
      // );

      // alert('Dealership assigned successfully!');
      // console.log(response.data);
      await Swal.fire({
        title: 'Success!',
        text: 'Dealership assigned successfully!',
        icon: 'success',
        customClass: {
          container: 'z-[99999]'
        }
      });
      fetchAssignedUser();
      setSelectedUser('');
      setSelectedDealership('');
    } catch (error) {
      console.error('Error assigning dealership:', error);
      alert('Failed to assign dealership.');
    }
  };

  return (
    <div>
      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-600 mt-1">
              Manage all your system users in one place
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
            <Link
              to="/dashboard"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition whitespace-nowrap w-full sm:w-auto"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Dealership
            </Link>

            <button
              onClick={handleAddUser}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition whitespace-nowrap w-full sm:w-auto"
            >
              <i className="fas fa-plus mr-2"></i> Add New User
            </button>
          </div>
        </div>


        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex flex-wrap md:flex-nowrap -mb-px text-sm font-medium text-center whitespace-nowrap">
              <button
                className={`py-3 px-4 md:px-6 border-b-2 cursor-pointer flex items-center ${activeTab === "usersList"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                onClick={() => setActiveTab("usersList")}
              >
                <i className="fas fa-list mr-2"></i> Users List
              </button>

              <button
                className={`py-3 px-4 md:px-6 border-b-2 cursor-pointer flex items-center ${activeTab === "addEditUser"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                onClick={() => setActiveTab("addEditUser")}
              >
                <i className="fas fa-user-edit mr-2"></i>
                {isEditing ? "Edit User" : "Add User"}
              </button>

              <button
                className={`py-3 px-4 md:px-6 border-b-2 cursor-pointer flex items-center ${activeTab === "dealershipAssignment"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                onClick={() => setActiveTab("dealershipAssignment")}
              >
                <i className="fas fa-building mr-2"></i> Dealership Assignment
              </button>

             
            </nav>
          </div>

          {/* Users List Tab */}
          {activeTab === "usersList" && (
            <div>
              {/* User Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Assigned Dealership
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover object-top"
                                src="https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === "Manager"
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-green-100 text-green-800"
                              }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.dealership_name ? (
                            <span>{user.dealership_name}</span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "#dc3545", // Bootstrap red
                                color: "#fff",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                display: "flex",
                                fontWeight: "500",
                                width: "100px"
                              }}
                            >
                              Not Assigned
                            </span>
                          )}

                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.country}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button
                              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${user.status ? "bg-green-500" : "bg-gray-300"
                                } !rounded-button whitespace-nowrap`}
                              onClick={() => {
                                setUsers(
                                  users.map((u) =>
                                    u.id === user.id
                                      ? { ...u, status: !u.status }
                                      : u
                                  )
                                );
                              }}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${user.status
                                  ? "translate-x-5"
                                  : "translate-x-0"
                                  }`}
                              ></span>
                            </button>
                            <span
                              className={`ml-2 text-sm ${user.status ? "text-green-600" : "text-gray-500"
                                }`}
                            >
                              {user.status ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap"
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
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">
                        {filteredUsers.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredUsers.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        <span className="sr-only">Previous</span>
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        2
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
          )}
          {/* Add/Edit User Tab */}
          {activeTab === "addEditUser" && (
            <div className="container py-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center mb-4">
                    <i
                      className={`fas ${isEditing ? "fa-user-edit" : "fa-user-plus"
                        } text-primary me-2`}
                    ></i>
                    {isEditing ? "Edit User" : "Add New User"}
                  </h5>

                  <form>
                    <h6 className="mb-3 border-bottom pb-2 text-muted">
                      Personal Information
                    </h6>

                    <div className="mb-3">
                      <label htmlFor="full-name" className="form-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="full-name"
                        value={userForm.name}
                        onChange={(e) =>
                          setUserForm({ ...userForm, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={userForm.email}
                        onChange={(e) =>
                          setUserForm({ ...userForm, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={userForm.password}
                        onChange={(e) =>
                          setUserForm({ ...userForm, password: e.target.value })
                        }
                      />
                    </div>

                    <h6 className="mt-4 mb-3 border-bottom pb-2 text-muted">
                      Role Settings
                    </h6>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="role" className="form-label">
                          Role *
                        </label>
                        <select
                          className="form-select"
                          id="role"
                          value={userForm.role}
                          onChange={(e) =>
                            setUserForm({ ...userForm, role: e.target.value })
                          }
                        >
                          <option value="">-- Select Dealership --</option>
                          <option value="Manager">Manager</option>
                          <option value="Salesperson">Salesperson</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label d-block">Status</label>
                        <div className="d-flex align-items-center">
                          <input
                            className="form-check-input mt-3 custom-switch-size"
                            type="checkbox"
                            id="user-status"
                            checked={userForm.status}
                            onChange={() =>
                              setUserForm({
                                ...userForm,
                                status: !userForm.status,
                              })
                            }
                          />
                          <label
                            className="ms-2 mt-1 fw-semibold text-success"
                            htmlFor="user-status"
                          >
                            {userForm.status ? "Active" : "Inactive"}
                          </label>
                        </div>
                      </div>
                    </div>

                    <h6 className="mt-4 mb-3 border-bottom pb-2 text-muted">
                      Dealership Assignment
                    </h6>
                    <div className="mb-3">
                      <label htmlFor="assigned-dealership" className="form-label">
                        Assigned Dealership
                      </label>
                      <select
                        className="form-select"
                        id="assigned-dealership"
                        value={userForm.dealership_id}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            dealership_id: e.target.value,
                          })
                        }
                      >
                        <option value="">-- Select Dealership --</option>
                        {dealerships.map((dealer) => (
                          <option key={dealer.id} value={dealer.id}>
                            {dealer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        value={userForm.country}
                        onChange={(e) =>
                          setUserForm({ ...userForm, country: e.target.value })
                        }
                      />
                    </div>

                    {/* {isEditing && (
                      <>
                        <h6 className="mt-4 mb-3 border-bottom pb-2 text-muted">
                          System Fields
                        </h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="last-login" className="form-label">
                              Last Login
                            </label>
                            <input
                              type="text"
                              className="form-control bg-light"
                              id="last-login"
                              value={userForm.lastLogin}
                              disabled
                            />
                          </div>

                          <div className="col-md-6">
                            <label
                              htmlFor="created-date"
                              className="form-label"
                            >
                              Created Date
                            </label>
                            <input
                              type="text"
                              className="form-control bg-light"
                              id="created-date"
                              value={new Date(
                                userForm.createdDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                              disabled
                            />
                          </div>
                        </div>
                      </>
                    )} */}

                    <div className="d-flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setActiveTab("usersList")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveUser}
                      >
                        {isEditing ? "Update User" : "Create User"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Dealership Assignment Tab */}
          {activeTab === "dealershipAssignment" && (
            <div className="p-6">
              <div className="mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                    <i className="fas fa-building text-indigo-600 mr-2"></i>
                    Assign Users to Dealerships
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select User
                      </label>
                      <div className="relative">
                        <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          value={selectedUser}
                          onChange={(e) => setSelectedUser(e.target.value)}
                        >
                          <option value="">-- Select User --</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Dealership
                      </label>
                      <div className="relative">
                        <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          value={selectedDealership}
                          onChange={(e) => setSelectedDealership(e.target.value)}
                        >
                          <option value="">-- Select Dealership --</option>
                          {dealerships.map((dealership) => (
                            <option key={dealership.id} value={dealership.id}>
                              {dealership.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mb-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={handleAssignDelarship}
                    >
                      <i className="fas fa-plus mr-2"></i> Assign
                    </button>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-md font-medium text-gray-700 mb-4">
                      Current Assignments
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              User
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Assigned Dealership
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Assigned Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* {users */}
                          {Assignedusers
                            .filter((u) => u.dealership_id)
                            .map((user) => (
                              <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img
                                        className="h-10 w-10 rounded-full object-cover object-top"
                                        src={user.avatar}
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {user.name}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {user.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === "Manager"
                                      ? "bg-indigo-100 text-indigo-800"
                                      : "bg-green-100 text-green-800"
                                      }`}
                                  >
                                    {user.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.dealership_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(
                                    // user.createdDate
                                    user.assigned_date
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">
                                    <i className="fas fa-unlink mr-1"></i>{" "}
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <h3 className="text-md font-medium text-gray-700 mb-4">
                      Bulk Assignment
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        Use bulk assignment to quickly assign multiple users to
                        a dealership or vice versa.
                      </p>
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-white border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-users mr-2"></i> Assign Multiple
                          Users
                        </button>
                        <button className="flex-1 bg-white border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-building mr-2"></i> Assign
                          Multiple Dealerships
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Activity Log Tab */}
       
        </div>
      </main>


      {/* Assign Dealership Modal */}
      {showAssignDealershipModal && (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-building text-indigo-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Assign User to Dealership
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select User
                        </label>
                        <div className="relative">
                          <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="">-- Select User --</option>
                            {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Dealership
                        </label>
                        <div className="relative">
                          <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="">-- Select Dealership --</option>
                            {dealerships.map((dealership) => (
                              <option key={dealership.id} value={dealership.id}>
                                {dealership.name}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
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
                  onClick={() => setShowAssignDealershipModal(false)}
                >
                  Assign
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowAssignDealershipModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserManagement;
