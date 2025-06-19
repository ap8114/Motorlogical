// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Link } from 'react-router-dom';
const UserManagement = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('users');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const [activeTab, setActiveTab] = useState('usersList');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showAssignDealershipModal, setShowAssignDealershipModal] = useState(false);
    // Form state for add/edit user
    const [isEditing, setIsEditing] = useState(false);
    const [userForm, setUserForm] = useState({
        id: '',
        fullName: '',
        email: '',
        role: 'Salesperson',
        assignedDealership: '',
        status: true,
        lastLogin: '',
        createdDate: ''
    });
    // Sample user data
    const [users, setUsers] = useState([
        {
            id: '1',
            fullName: 'John Smith',
            email: 'john.smith@example.com',
            role: 'Manager',
            assignedDealership: 'City Motors',
            status: true,
            lastLogin: '2025-06-18 14:30',
            createdDate: '2024-12-15',
            avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20business%20man%20with%20short%20brown%20hair%20wearing%20a%20blue%20suit%20with%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20professional%20looking%2C%20business%20attire&width=40&height=40&seq=1&orientation=squarish'
        },
        {
            id: '2',
            fullName: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            role: 'Salesperson',
            assignedDealership: 'Highway Auto',
            status: true,
            lastLogin: '2025-06-19 09:15',
            createdDate: '2025-01-22',
            avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20business%20woman%20with%20blonde%20hair%20wearing%20a%20black%20blazer%20with%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20professional%20looking%2C%20business%20attire&width=40&height=40&seq=2&orientation=squarish'
        },
        {
            id: '3',
            fullName: 'Michael Rodriguez',
            email: 'michael.rodriguez@example.com',
            role: 'Manager',
            assignedDealership: 'Luxury Cars Inc',
            status: true,
            lastLogin: '2025-06-17 16:45',
            createdDate: '2025-02-10',
            avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20hispanic%20business%20man%20with%20dark%20hair%20wearing%20a%20gray%20suit%20with%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20professional%20looking%2C%20business%20attire&width=40&height=40&seq=3&orientation=squarish'
        },
        {
            id: '4',
            fullName: 'David Wilson',
            email: 'david.wilson@example.com',
            role: 'Salesperson',
            assignedDealership: 'Downtown Autos',
            status: false,
            lastLogin: '2025-06-01 10:20',
            createdDate: '2025-03-05',
            avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20business%20man%20with%20glasses%20wearing%20a%20navy%20suit%20with%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20professional%20looking%2C%20business%20attire&width=40&height=40&seq=4&orientation=squarish'
        },
        {
            id: '5',
            fullName: 'Jessica Brown',
            email: 'jessica.brown@example.com',
            role: 'Salesperson',
            assignedDealership: 'Valley Vehicles',
            status: true,
            lastLogin: '2025-06-18 11:30',
            createdDate: '2025-04-18',
            avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20business%20woman%20with%20brown%20hair%20wearing%20a%20white%20blouse%20with%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20professional%20looking%2C%20business%20attire&width=40&height=40&seq=5&orientation=squarish'
        },
        {
            id: '6',
            fullName: 'Robert Lee',
            email: 'robert.lee@example.com',
            role: 'Manager',
            assignedDealership: 'Metro Motors',
            status: false,
            lastLogin: '2025-06-10 09:45',
            createdDate: '2025-05-01',
            avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20business%20man%20wearing%20a%20black%20suit%20with%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20professional%20looking%2C%20business%20attire&width=40&height=40&seq=6&orientation=squarish'
        }
    ]);
    // Sample activity log data
    const activityLog = [
        { id: 1, timestamp: '2025-06-19 14:30', user: 'John Smith', action: 'Login', details: 'User logged in successfully', ipAddress: '192.168.1.1', device: 'Chrome / Windows' },
        { id: 2, timestamp: '2025-06-19 12:15', user: 'Sarah Johnson', action: 'Profile Update', details: 'Updated contact information', ipAddress: '192.168.1.2', device: 'Safari / MacOS' },
        { id: 3, timestamp: '2025-06-19 10:45', user: 'Michael Rodriguez', action: 'Dealership Assignment', details: 'Assigned to Luxury Cars Inc', ipAddress: '192.168.1.3', device: 'Firefox / Linux' },
        { id: 4, timestamp: '2025-06-18 16:20', user: 'David Wilson', action: 'Status Change', details: 'Account deactivated', ipAddress: '192.168.1.4', device: 'Edge / Windows' },
        { id: 5, timestamp: '2025-06-18 14:10', user: 'Jessica Brown', action: 'Role Change', details: 'Changed from Manager to Salesperson', ipAddress: '192.168.1.5', device: 'Chrome / Android' },
        { id: 6, timestamp: '2025-06-18 11:30', user: 'Robert Lee', action: 'Password Reset', details: 'Requested password reset', ipAddress: '192.168.1.6', device: 'Safari / iOS' }
    ];
    // Sample dealership data for dropdown
    const dealerships = [
        { id: '1', name: 'City Motors' },
        { id: '2', name: 'Highway Auto' },
        { id: '3', name: 'Luxury Cars Inc' },
        { id: '4', name: 'Downtown Autos' },
        { id: '5', name: 'Valley Vehicles' },
        { id: '6', name: 'Metro Motors' }
    ];
    // Initialize charts
    useEffect(() => {
        const userStatsChart = echarts.init(document.getElementById('user-stats-chart'));
        const statsOption = {
            animation: false,
            title: {
                text: 'User Activity Overview',
                left: 'center',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Logins', 'Actions'],
                bottom: 0
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                    interval: 0
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Logins',
                    type: 'bar',
                    data: [12, 15, 10, 14, 9, 3, 5],
                    color: '#4F46E5'
                },
                {
                    name: 'Actions',
                    type: 'line',
                    data: [30, 35, 25, 28, 20, 8, 12],
                    color: '#10B981'
                }
            ]
        };
        userStatsChart.setOption(statsOption);
        const roleDistributionChart = echarts.init(document.getElementById('role-distribution-chart'));
        const roleOption = {
            animation: false,
            title: {
                text: 'Role Distribution',
                left: 'center',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                bottom: 0
            },
            series: [
                {
                    name: 'Role Distribution',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 3, name: 'Manager', itemStyle: { color: '#4F46E5' } },
                        { value: 3, name: 'Salesperson', itemStyle: { color: '#10B981' } }
                    ]
                }
            ]
        };
        roleDistributionChart.setOption(roleOption);
        const handleResize = () => {
            userStatsChart.resize();
            roleDistributionChart.resize();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            userStatsChart.dispose();
            roleDistributionChart.dispose();
        };
    }, [users]);
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
            id: '',
            fullName: '',
            email: '',
            role: 'Salesperson',
            assignedDealership: '',
            status: true,
            lastLogin: '',
            createdDate: new Date().toISOString().split('T')[0]
        });
        setIsEditing(false);
        setActiveTab('addEditUser');
    };
    // Handle edit user
    const handleEditUser = () => {
        setUserForm({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            assignedDealership: user.assignedDealership,
            status: user.status,
            lastLogin: user.lastLogin,
            createdDate: user.createdDate
        });
        setIsEditing(true);
        setActiveTab('addEditUser');
    };
    // Handle save user
    const handleSaveUser = () => {
        if (isEditing) {
            setUsers(users.map(u =>
                u.id === userForm.id ? {
                    ...u,
                    fullName: userForm.fullName,
                    email: userForm.email,
                    role: userForm.role,
                    assignedDealership: userForm.assignedDealership,
                    status: userForm.status
                } : u
            ));
        } else {
            const newUser = {
                id: (users.length + 1).toString(),
                ...userForm,
                avatar: `https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20business%20person%20with%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20professional%20looking%2C%20business%20attire&width=40&height=40&seq=${users.length + 1}&orientation=squarish`
            };
            setUsers([...users, newUser]);
        }
        setActiveTab('usersList');
    };
    // Handle delete confirmation
    const handleDeleteConfirmation = () => {
        setUserToDelete(id);
        setShowDeleteConfirmation(true);
    };
    // Handle delete user
    const handleDeleteUser = () => {
        if (userToDelete) {
            setUsers(users.filter(u => u.id !== userToDelete));
            setShowDeleteConfirmation(false);
            setUserToDelete(null);
        }
    };
    // Filter users based on search and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.assignedDealership.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole =
            roleFilter === 'all' ||
            (roleFilter === 'manager' && user.role === 'Manager') ||
            (roleFilter === 'salesperson' && user.role === 'Salesperson');
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && user.status) ||
            (statusFilter === 'inactive' && !user.status);
        return matchesSearch && matchesRole && matchesStatus;
    });
    // Calculate statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status).length;
    const managerUsers = users.filter(u => u.role === 'Manager').length;
    return (
        <div>
            {/* Main Content */}
            <main className="p-6">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        User Management
                        </h1>
                        <p className="text-gray-600 mt-1">Manage all your system users in one place</p>
                    </div>
                    <div className="flex mt-4 md:mt-0 space-x-3">
                        <Link
                            to="/dashboard"
                            data-readdy="true"
                            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer !rounded-button whitespace-nowrap"
                        >
                            <i className="fas fa-arrow-left mr-2"></i> Back to Dealership
                        </Link>
                        <button
                            onClick={handleAddUser}
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer !rounded-button whitespace-nowrap"
                        >
                            <i className="fas fa-plus mr-2"></i> Add New User
                        </button>
                    </div>
                </div>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                <i className="fas fa-users text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-600">Total Users</h2>
                                <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-500 flex items-center">
                                <i className="fas fa-arrow-up mr-1"></i> 8%
                            </span>
                            <span className="text-gray-500 ml-2">from last month</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <i className="fas fa-check-circle text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-600">Active Users</h2>
                                <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-500 flex items-center">
                                <i className="fas fa-arrow-up mr-1"></i> 5%
                            </span>
                            <span className="text-gray-500 ml-2">from last month</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <i className="fas fa-user-tie text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-600">Manager Users</h2>
                                <p className="text-2xl font-bold text-gray-800">{managerUsers}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-500 flex items-center">
                                <i className="fas fa-arrow-up mr-1"></i> 3%
                            </span>
                            <span className="text-gray-500 ml-2">from last month</span>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer ${activeTab === 'usersList'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab('usersList')}
                            >
                                <i className="fas fa-list mr-2"></i> Users List
                            </button>
                            <button
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer ${activeTab === 'addEditUser'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab('addEditUser')}
                            >
                                <i className="fas fa-user-edit mr-2"></i> {isEditing ? 'Edit User' : 'Add User'}
                            </button>
                            <button
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer ${activeTab === 'dealershipAssignment'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab('dealershipAssignment')}
                            >
                                <i className="fas fa-building mr-2"></i> Dealership Assignment
                            </button>
                            <button
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer ${activeTab === 'activityLog'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                onClick={() => setActiveTab('activityLog')}
                            >
                                <i className="fas fa-history mr-2"></i> Activity Log
                            </button>
                        </nav>
                    </div>
                    {/* Users List Tab */}
                    {activeTab === 'usersList' && (
                        <div>
                            {/* Filters and Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                                <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
                                    <h2 className="text-lg font-medium text-gray-800 mb-4">Filters</h2>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                        <div className="relative">
                                            <select
                                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                value={roleFilter}
                                                onChange={(e) => setRoleFilter(e.target.value)}
                                            >
                                                <option value="all">All Roles</option>
                                                <option value="manager">Manager Only</option>
                                                <option value="salesperson">Salesperson Only</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <i className="fas fa-chevron-down text-xs"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <div className="relative">
                                            <select
                                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                            >
                                                <option value="all">All Users</option>
                                                <option value="active">Active Only</option>
                                                <option value="inactive">Inactive Only</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <i className="fas fa-chevron-down text-xs"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                            className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                                        >
                                            <i className={`fas ${showAdvancedFilters ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
                                            Advanced Filters
                                        </button>
                                    </div>
                                    {showAdvancedFilters && (
                                        <div className="space-y-4 mt-4 border-t pt-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Created</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-xs text-gray-500">From</label>
                                                        <input
                                                            type="date"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            value={dateRange.start}
                                                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-500">To</label>
                                                        <input
                                                            type="date"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            value={dateRange.end}
                                                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Dealership</label>
                                                <div className="relative">
                                                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                        <option>All Dealerships</option>
                                                        {dealerships.map(dealership => (
                                                            <option key={dealership.id}>{dealership.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 pt-2">
                                                <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                                                    Apply Filters
                                                </button>
                                                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-6 pt-6 border-t">
                                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                                            <i className="fas fa-file-export mr-2"></i> Export Data
                                        </button>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <div id="user-stats-chart" style={{ height: '250px' }}></div>
                                    </div>
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <div id="role-distribution-chart" style={{ height: '250px' }}></div>
                                    </div>
                                </div>
                            </div>
                            {/* User Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Assigned Dealership
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Login
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                                            <img className="h-10 w-10 rounded-full object-cover object-top" src={user.avatar} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Manager' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.assignedDealership}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <button
                                                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${user.status ? 'bg-green-500' : 'bg-gray-300'} !rounded-button whitespace-nowrap`}
                                                            onClick={() => {
                                                                setUsers(users.map(u =>
                                                                    u.id === user.id ? { ...u, status: !u.status } : u
                                                                ));
                                                            }}
                                                        >
                                                            <span
                                                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${user.status ? 'translate-x-5' : 'translate-x-0'}`}
                                                            ></span>
                                                        </button>
                                                        <span className={`ml-2 text-sm ${user.status ? 'text-green-600' : 'text-gray-500'}`}>
                                                            {user.status ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.lastLogin}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(user.createdDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
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
                                                            onClick={() => handleDeleteConfirmation(user.id)}
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
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                                            <span className="font-medium">{filteredUsers.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
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
                    {activeTab === 'addEditUser' && (
                        <div className="p-6">
                            <div className="max-w-3xl mx-auto">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                                        <i className={`fas ${isEditing ? 'fa-user-edit' : 'fa-user-plus'} text-indigo-600 mr-2`}></i>
                                        {isEditing ? 'Edit User' : 'Add New User'}
                                    </h2>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Personal Information</h4>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                                                Full Name *
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    id="full-name"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={userForm.fullName}
                                                    onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address *
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={userForm.email}
                                                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <h4 className="text-sm font-medium text-gray-700 border-b pb-2 mt-4">Role Settings</h4>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                Role *
                                            </label>
                                            <div className="mt-1 relative">
                                                <select
                                                    id="role"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={userForm.role}
                                                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                                                >
                                                    <option value="Manager">Manager</option>
                                                    <option value="Salesperson">Salesperson</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                                Status
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <button
                                                    type="button"
                                                    className={`${userForm.status ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none !rounded-button whitespace-nowrap`}
                                                    onClick={() => setUserForm({ ...userForm, status: !userForm.status })}
                                                >
                                                    <span
                                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${userForm.status ? 'translate-x-5' : 'translate-x-0'}`}
                                                    ></span>
                                                </button>
                                                <span className="ml-2 text-sm text-gray-700">
                                                    {userForm.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <h4 className="text-sm font-medium text-gray-700 border-b pb-2 mt-4">Dealership Assignment</h4>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="assigned-dealership" className="block text-sm font-medium text-gray-700">
                                                Assigned Dealership
                                            </label>
                                            <div className="mt-1 relative">
                                                <select
                                                    id="assigned-dealership"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={userForm.assignedDealership}
                                                    onChange={(e) => setUserForm({ ...userForm, assignedDealership: e.target.value })}
                                                >
                                                    <option value="">-- Select Dealership --</option>
                                                    {dealerships.map(dealership => (
                                                        <option key={dealership.id} value={dealership.name}>{dealership.name}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                        </div>
                                        {isEditing && (
                                            <>
                                                <div className="sm:col-span-6">
                                                    <h4 className="text-sm font-medium text-gray-700 border-b pb-2 mt-4">System Fields</h4>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="last-login" className="block text-sm font-medium text-gray-700">
                                                        Last Login
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            id="last-login"
                                                            className="shadow-sm bg-gray-50 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            value={userForm.lastLogin}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="created-date" className="block text-sm font-medium text-gray-700">
                                                        Created Date
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            id="created-date"
                                                            className="shadow-sm bg-gray-50 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            value={new Date(userForm.createdDate).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="mt-8 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('usersList')}
                                            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer !rounded-button whitespace-nowrap"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveUser}
                                            className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer !rounded-button whitespace-nowrap"
                                        >
                                            {isEditing ? 'Update User' : 'Create User'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Dealership Assignment Tab */}
                    {activeTab === 'dealershipAssignment' && (
                        <div className="p-6">
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                                        <i className="fas fa-building text-indigo-600 mr-2"></i>
                                        Assign Users to Dealerships
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
                                            <div className="relative">
                                                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                    <option value="">-- Select User --</option>
                                                    {users.map(user => (
                                                        <option key={user.id} value={user.id}>{user.fullName}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Dealership</label>
                                            <div className="relative">
                                                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                    <option value="">-- Select Dealership --</option>
                                                    {dealerships.map(dealership => (
                                                        <option key={dealership.id} value={dealership.id}>{dealership.name}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mb-6">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer !rounded-button whitespace-nowrap"
                                        >
                                            <i className="fas fa-plus mr-2"></i> Assign
                                        </button>
                                    </div>
                                    <div className="border-t border-gray-200 pt-6">
                                        <h3 className="text-md font-medium text-gray-700 mb-4">Current Assignments</h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            User
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Role
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Assigned Dealership
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Assigned Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {users.filter(u => u.assignedDealership).map((user) => (
                                                        <tr key={user.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img className="h-10 w-10 rounded-full object-cover object-top" src={user.avatar} alt="" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Manager' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {user.assignedDealership}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(user.createdDate).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">
                                                                    <i className="fas fa-unlink mr-1"></i> Remove
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 mt-6 pt-6">
                                        <h3 className="text-md font-medium text-gray-700 mb-4">Bulk Assignment</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-4">
                                                Use bulk assignment to quickly assign multiple users to a dealership or vice versa.
                                            </p>
                                            <div className="flex space-x-3">
                                                <button className="flex-1 bg-white border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-users mr-2"></i> Assign Multiple Users
                                                </button>
                                                <button className="flex-1 bg-white border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-building mr-2"></i> Assign Multiple Dealerships
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Activity Log Tab */}
                    {activeTab === 'activityLog' && (
                        <div className="p-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                                    <i className="fas fa-history text-indigo-600 mr-2"></i>
                                    User Activity Log
                                </h2>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-3 md:space-y-0">
                                    <div className="relative w-full md:w-64">
                                        <input
                                            type="text"
                                            placeholder="Search activities..."
                                            className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                        />
                                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="relative">
                                            <select className="pl-3 pr-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                                <option>All Users</option>
                                                {users.map(user => (
                                                    <option key={user.id}>{user.fullName}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <i className="fas fa-chevron-down text-xs"></i>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <select className="pl-3 pr-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                                <option>All Actions</option>
                                                <option>Login</option>
                                                <option>Profile Update</option>
                                                <option>Dealership Assignment</option>
                                                <option>Status Change</option>
                                                <option>Role Change</option>
                                                <option>Password Reset</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <i className="fas fa-chevron-down text-xs"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Timestamp
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    User
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Action
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Details
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    IP Address
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Device
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {activityLog.map((log) => (
                                                <tr key={log.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {log.timestamp}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {log.user}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.action === 'Login' ? 'bg-green-100 text-green-800' :
                                                            log.action === 'Profile Update' ? 'bg-blue-100 text-blue-800' :
                                                                log.action === 'Dealership Assignment' ? 'bg-indigo-100 text-indigo-800' :
                                                                    log.action === 'Status Change' ? 'bg-yellow-100 text-yellow-800' :
                                                                        log.action === 'Role Change' ? 'bg-purple-100 text-purple-800' :
                                                                            'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {log.action}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {log.details}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {log.ipAddress}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {log.device}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">{activityLog.length}</span> of{' '}
                                        <span className="font-medium">{activityLog.length}</span> activities
                                    </div>
                                    <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                                        <i className="fas fa-file-export mr-2"></i> Export Log
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

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
                                            Delete User
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this user? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                                    onClick={handleDeleteUser}
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
            {/* Assign Dealership Modal */}
            {showAssignDealershipModal && (
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
                                        <i className="fas fa-building text-indigo-600"></i>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Assign User to Dealership
                                        </h3>
                                        <div className="mt-4">
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
                                                <div className="relative">
                                                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                        <option value="">-- Select User --</option>
                                                        {users.map(user => (
                                                            <option key={user.id} value={user.id}>{user.fullName}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Dealership</label>
                                                <div className="relative">
                                                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                        <option value="">-- Select Dealership --</option>
                                                        {dealerships.map(dealership => (
                                                            <option key={dealership.id} value={dealership.id}>{dealership.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
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
export default UserManagement