// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import * as echarts from 'echarts';

const Setting = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('settings');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNewRoleModal, setShowNewRoleModal] = useState(false);
    const [showEditRoleModal, setShowEditRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [newRole, setNewRole] = useState({
        name: '',
        description: '',
        permissions: {
            dashboard: false,
            inventoryView: false,
            inventoryEdit: false,
            inventoryDelete: false,
            userManagement: false,
            reports: false,
            settings: false
        }
    });
    const [editRole, setEditRole] = useState({
        name: '',
        description: '',
        permissions: {
            dashboard: false,
            inventoryView: false,
            inventoryEdit: false,
            inventoryDelete: false,
            userManagement: false,
            reports: false,
            settings: false
        }
    });
    const [notifications, setNotifications] = useState(3);
    const [showPassword, setShowPassword] = useState(false


    );
    const [apiConnected, setApiConnected] = useState(true);
    // Form states
    const [language, setLanguage] = useState('english');
    const [timezone, setTimezone] = useState('UTC-8');
    const [currency, setCurrency] = useState('USD');
    const [apiKey, setApiKey] = useState('sk_test_51LkGcnCj5VZ9CjZQIajkj3J2dnskwqws');
    const [lowStockThreshold, setLowStockThreshold] = useState(5);
    const [autoReorder, setAutoReorder] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [backupFrequency, setBackupFrequency] = useState('daily');
    // Sheet mapping data
    const [sheetMappings, setSheetMappings] = useState([
        { id: 1, sheetColumn: 'Product ID', systemField: 'Item ID', active: true },
        { id: 2, sheetColumn: 'Product Name', systemField: 'Name', active: true },
        { id: 3, sheetColumn: 'Category', systemField: 'Category', active: true },
        { id: 4, sheetColumn: 'Quantity', systemField: 'Quantity', active: true },
        { id: 5, sheetColumn: 'Price', systemField: 'Price', active: true }
    ]);
    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };
    // Toggle user dropdown
    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };
    // Toggle API key visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // Toggle API connection
    const toggleApiConnection = () => {
        setApiConnected(!apiConnected);
    };
    // Delete mapping
    const deleteMapping = (id) => {
        setSheetMappings(sheetMappings.filter(mapping => mapping.id !== id));
    };
    // Add new mapping
    const addNewMapping = () => {
        const newId = Math.max(...sheetMappings.map(m => m.id), 0) + 1;
        setSheetMappings([...sheetMappings, {
            id: newId,
            sheetColumn: '',
            systemField: '',
            active: true
        }]);
    };
    return (
        <div className="flex h-screen bg-gray-50">

            <main className="p-6 min-h-[calc(100vh-64px)]">
                    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center">

                                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                    <i className="fas fa-cog text-indigo-600 mr-2"></i> Settings
                                </h1>
                            </div>
                            <p className="text-gray-600 mt-1">Configure system preferences and integrations</p>
                        </div>
                        <div className="flex mt-4 md:mt-0 space-x-3">
                            <button
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                <i className="fas fa-save mr-2"></i> Save All Changes
                            </button>
                        </div>
                    </div>
                    {/* Settings Tabs */}
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'general'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-sliders-h mr-2"></i> General Settings
                                </button>
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'users'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-users-cog mr-2"></i> User Permissions
                                </button>
                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'notifications'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-bell mr-2"></i> Notification Preferences
                                </button>
                                <button
                                    onClick={() => setActiveTab('inventory')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'inventory'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-warehouse mr-2"></i> Inventory Settings
                                </button>
                                <button
                                    onClick={() => setActiveTab('integration')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'integration'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-plug mr-2"></i> System Integration
                                </button>
                                <button
                                    onClick={() => setActiveTab('backup')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === 'backup'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-database mr-2"></i> Backup & Data
                                </button>
                            </nav>
                        </div>
                        {/* Tab Content */}
                        <div className="p-6">
                            {/* General Settings Tab */}
                            {activeTab === 'general' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-800 mb-4">System Preferences</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                            <div className="relative">
                                                <select
                                                    value={language}
                                                    onChange={(e) => setLanguage(e.target.value)}
                                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="english">English</option>
                                                    <option value="spanish">Spanish</option>
                                                    <option value="french">French</option>
                                                    <option value="german">German</option>
                                                    <option value="japanese">Japanese</option>
                                                    <option value="chinese">Chinese (Simplified)</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Set your preferred language for the interface</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                                            <div className="relative">
                                                <select
                                                    value={timezone}
                                                    onChange={(e) => setTimezone(e.target.value)}
                                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="UTC-12">UTC-12:00</option>
                                                    <option value="UTC-11">UTC-11:00</option>
                                                    <option value="UTC-10">UTC-10:00</option>
                                                    <option value="UTC-9">UTC-09:00</option>
                                                    <option value="UTC-8">UTC-08:00 (Pacific Time)</option>
                                                    <option value="UTC-7">UTC-07:00 (Mountain Time)</option>
                                                    <option value="UTC-6">UTC-06:00 (Central Time)</option>
                                                    <option value="UTC-5">UTC-05:00 (Eastern Time)</option>
                                                    <option value="UTC-4">UTC-04:00</option>
                                                    <option value="UTC-3">UTC-03:00</option>
                                                    <option value="UTC-2">UTC-02:00</option>
                                                    <option value="UTC-1">UTC-01:00</option>
                                                    <option value="UTC+0">UTC+00:00</option>
                                                    <option value="UTC+1">UTC+01:00</option>
                                                    <option value="UTC+2">UTC+02:00</option>
                                                    <option value="UTC+3">UTC+03:00</option>
                                                    <option value="UTC+4">UTC+04:00</option>
                                                    <option value="UTC+5">UTC+05:00</option>
                                                    <option value="UTC+6">UTC+06:00</option>
                                                    <option value="UTC+7">UTC+07:00</option>
                                                    <option value="UTC+8">UTC+08:00</option>
                                                    <option value="UTC+9">UTC+09:00</option>
                                                    <option value="UTC+10">UTC+10:00</option>
                                                    <option value="UTC+11">UTC+11:00</option>
                                                    <option value="UTC+12">UTC+12:00</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">All dates and times will be displayed in this time zone</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency Format</label>
                                            <div className="relative">
                                                <select
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="USD">USD ($)</option>
                                                    <option value="EUR">EUR (€)</option>
                                                    <option value="GBP">GBP (£)</option>
                                                    <option value="JPY">JPY (¥)</option>
                                                    <option value="CAD">CAD (C$)</option>
                                                    <option value="AUD">AUD (A$)</option>
                                                    <option value="CNY">CNY (¥)</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Currency used for all financial data</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                                            <div className="relative">
                                                <select
                                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                                    <option value="MMM DD, YYYY">MMM DD, YYYY</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Format for displaying dates throughout the system</p>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-md font-medium text-gray-800 mb-3">Company Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Your Company Name"
                                                    value="AutoDealerPro Inc."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Business ID/Tax Number</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Business ID"
                                                    value="TAX-123456789"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                                <input
                                                    type="email"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="contact@example.com"
                                                    value="contact@autodealerpro.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="+1 (555) 123-4567"
                                                    value="+1 (555) 123-4567"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                            <i className="fas fa-save mr-2"></i> Save General Settings
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* User Permissions Tab */}
                            {activeTab === 'users' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-800 mb-4">User Permissions</h2>
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-md font-medium text-gray-800">Role Management</h3>
                                            <button
                                                id="addNewRoleButton"
                                                onClick={() => setShowNewRoleModal(true)}
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                            >
                                                <i className="fas fa-plus mr-1"></i> Add New Role
                                            </button>
                                            {/* New Role Modal */}
                                            {/* Edit Role Modal */}
                                            {showEditRoleModal && selectedRole && (
                                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                                                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                                                        <div className="px-6 py-4 border-b border-gray-200">
                                                            <h3 className="text-lg font-medium text-gray-900">Edit Role: {selectedRole.name}</h3>
                                                        </div>
                                                        <div className="px-6 py-4">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label htmlFor="editRoleName" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Role Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="editRoleName"
                                                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                                        value={editRole.name}
                                                                        onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
                                                                        placeholder="Enter role name"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="editRoleDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Description
                                                                    </label>
                                                                    <textarea
                                                                        id="editRoleDescription"
                                                                        rows={3}
                                                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                                        value={editRole.description}
                                                                        onChange={(e) => setEditRole({ ...editRole, description: e.target.value })}
                                                                        placeholder="Enter role description"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Permissions
                                                                    </label>
                                                                    <div className="space-y-2 border border-gray-200 rounded-md p-4">
                                                                        {Object.entries(editRole.permissions).map(([key, value]) => (
                                                                            <div key={key} className="flex items-center">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`edit-permission-${key}`}
                                                                                    checked={value}
                                                                                    onChange={(e) => setEditRole({
                                                                                        ...editRole,
                                                                                        permissions: {
                                                                                            ...editRole.permissions,
                                                                                            [key]: e.target.checked
                                                                                        }
                                                                                    })}
                                                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                                                />
                                                                                <label htmlFor={`edit-permission-${key}`} className="ml-2 text-sm text-gray-700">
                                                                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                                                </label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                                                            <button
                                                                onClick={() => {
                                                                    setShowEditRoleModal(false);
                                                                    setSelectedRole(null);
                                                                }}
                                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    // Here you would typically handle saving the edited role
                                                                    // For now, we'll just close the modal
                                                                    setShowEditRoleModal(false);
                                                                    setSelectedRole(null);
                                                                }}
                                                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {showNewRoleModal && (
                                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                                                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                                                        <div className="px-6 py-4 border-b border-gray-200">
                                                            <h3 className="text-lg font-medium text-gray-900">Create New Role</h3>
                                                        </div>
                                                        <div className="px-6 py-4">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Role Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="roleName"
                                                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                                        value={newRole.name}
                                                                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                                                                        placeholder="Enter role name"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Description
                                                                    </label>
                                                                    <textarea
                                                                        id="roleDescription"
                                                                        rows={3}
                                                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                                        value={newRole.description}
                                                                        onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                                                                        placeholder="Enter role description"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Permissions
                                                                    </label>
                                                                    <div className="space-y-2 border border-gray-200 rounded-md p-4">
                                                                        {Object.entries(newRole.permissions).map(([key, value]) => (
                                                                            <div key={key} className="flex items-center">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`permission-${key}`}
                                                                                    checked={value}
                                                                                    onChange={(e) => setNewRole({
                                                                                        ...newRole,
                                                                                        permissions: {
                                                                                            ...newRole.permissions,
                                                                                            [key]: e.target.checked
                                                                                        }
                                                                                    })}
                                                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                                                />
                                                                                <label htmlFor={`permission-${key}`} className="ml-2 text-sm text-gray-700">
                                                                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                                                </label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                                                            <button
                                                                onClick={() => {
                                                                    setShowNewRoleModal(false);
                                                                    setNewRole({
                                                                        name: '',
                                                                        description: '',
                                                                        permissions: {
                                                                            dashboard: false,
                                                                            inventoryView: false,
                                                                            inventoryEdit: false,
                                                                            inventoryDelete: false,
                                                                            userManagement: false,
                                                                            reports: false,
                                                                            settings: false
                                                                        }
                                                                    });
                                                                }}
                                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    // Here you would typically handle the role creation
                                                                    // For now, we'll just close the modal
                                                                    setShowNewRoleModal(false);
                                                                    setNewRole({
                                                                        name: '',
                                                                        description: '',
                                                                        permissions: {
                                                                            dashboard: false,
                                                                            inventoryView: false,
                                                                            inventoryEdit: false,
                                                                            inventoryDelete: false,
                                                                            userManagement: false,
                                                                            reports: false,
                                                                            settings: false
                                                                        }
                                                                    });
                                                                }}
                                                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Create Role
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Administrator</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Full system access and control</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRole({
                                                                        id: 'manager',
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setEditRole({
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setShowEditRoleModal(true);
                                                                }}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="text-gray-400 cursor-not-allowed !rounded-button whitespace-nowrap" disabled>Delete</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Manager</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Can manage inventory and users</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRole({
                                                                        id: 'manager',
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setEditRole({
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setShowEditRoleModal(true);
                                                                }}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sales</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">View inventory and create orders</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRole({
                                                                        id: 'manager',
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setEditRole({
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setShowEditRoleModal(true);
                                                                }}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inventory Clerk</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Manage inventory only</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRole({
                                                                        id: 'manager',
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setEditRole({
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setShowEditRoleModal(true);
                                                                }}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Viewer</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Read-only access to all data</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRole({
                                                                        id: 'manager',
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setEditRole({
                                                                        name: 'Manager',
                                                                        description: 'Can manage inventory and users',
                                                                        permissions: {
                                                                            dashboard: true,
                                                                            inventoryView: true,
                                                                            inventoryEdit: true,
                                                                            inventoryDelete: true,
                                                                            userManagement: true,
                                                                            reports: true,
                                                                            settings: true
                                                                        }
                                                                    });
                                                                    setShowEditRoleModal(true);
                                                                }}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-md font-medium text-gray-800">Permission Matrix</h3>
                                            <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                <i className="fas fa-download mr-1"></i> Export Permissions
                                            </button>
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature/Module</th>
                                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Administrator</th>
                                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory Clerk</th>
                                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Viewer</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dashboard</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inventory - View</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inventory - Add/Edit</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inventory - Delete</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">User Management</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Reports</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Settings</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-check-circle text-green-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"><i className="fas fa-times-circle text-red-500"></i></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                            <i className="fas fa-save mr-2"></i> Save Permission Changes
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Notification Preferences Tab */}
                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h2>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Email Notifications</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">Low Stock Alerts</h4>
                                                    <p className="text-xs text-gray-500">Receive notifications when inventory items fall below threshold</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-email-low-stock"
                                                        checked={emailNotifications}
                                                        onChange={() => setEmailNotifications(!emailNotifications)}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-email-low-stock"
                                                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${emailNotifications ? 'bg-indigo-500' : 'bg-gray-300'}`}
                                                    ></label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">Order Status Updates</h4>
                                                    <p className="text-xs text-gray-500">Receive notifications when order statuses change</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-email-orders"
                                                        checked={true}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-email-orders"
                                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">System Alerts</h4>
                                                    <p className="text-xs text-gray-500">Receive notifications about system updates and maintenance</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-email-system"
                                                        checked={true}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-email-system"
                                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">User Activity</h4>
                                                    <p className="text-xs text-gray-500">Receive notifications about user logins and actions</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-email-user"
                                                        checked={false}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-email-user"
                                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Recipients</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="email@example.com, another@example.com"
                                                value="admin@autodealerpro.com, inventory@autodealerpro.com"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Separate multiple email addresses with commas</p>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">In-App Notifications</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">Low Stock Alerts</h4>
                                                    <p className="text-xs text-gray-500">Show notifications when inventory items fall below threshold</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-app-low-stock"
                                                        checked={pushNotifications}
                                                        onChange={() => setPushNotifications(!pushNotifications)}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-app-low-stock"
                                                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${pushNotifications ? 'bg-indigo-500' : 'bg-gray-300'}`}
                                                    ></label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">Order Status Updates</h4>
                                                    <p className="text-xs text-gray-500">Show notifications when order statuses change</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-app-orders"
                                                        checked={true}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-app-orders"
                                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">System Alerts</h4>
                                                    <p className="text-xs text-gray-500">Show notifications about system updates and maintenance</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-app-system"
                                                        checked={true}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-app-system"
                                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">User Activity</h4>
                                                    <p className="text-xs text-gray-500">Show notifications about user logins and actions</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-app-user"
                                                        checked={false}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-app-user"
                                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Notification Schedule</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Digest</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="disabled">Disabled</option>
                                                        <option value="morning" selected>Morning (8:00 AM)</option>
                                                        <option value="afternoon">Afternoon (1:00 PM)</option>
                                                        <option value="evening">Evening (6:00 PM)</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">Receive a daily summary of all notifications</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Report</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="disabled">Disabled</option>
                                                        <option value="monday">Monday</option>
                                                        <option value="friday" selected>Friday</option>
                                                        <option value="sunday">Sunday</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">Receive a weekly summary report</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                            <i className="fas fa-save mr-2"></i> Save Notification Settings
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Inventory Settings Tab */}
                            {activeTab === 'inventory' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-800 mb-4">Inventory Settings</h2>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Stock Level Thresholds</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-l-md cursor-pointer !rounded-button whitespace-nowrap"
                                                        onClick={() => setLowStockThreshold(Math.max(1, lowStockThreshold - 1))}
                                                    >
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-none"
                                                        value={lowStockThreshold}
                                                        onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 1)}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-r-md cursor-pointer !rounded-button whitespace-nowrap"
                                                        onClick={() => setLowStockThreshold(lowStockThreshold + 1)}
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">Items with stock below this number will be marked as low stock</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Critical Stock Threshold</label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-l-md cursor-pointer !rounded-button whitespace-nowrap"
                                                    >
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-none"
                                                        value="2"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-r-md cursor-pointer !rounded-button whitespace-nowrap"
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">Items with stock below this number will be marked as critical</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Auto-Reorder Rules</h3>
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">Enable Auto-Reorder</h4>
                                                    <p className="text-xs text-gray-500">Automatically create purchase orders for low stock items</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-auto-reorder"
                                                        checked={autoReorder}
                                                        onChange={() => setAutoReorder(!autoReorder)}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-auto-reorder"
                                                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${autoReorder ? 'bg-indigo-500' : 'bg-gray-300'}`}
                                                    ></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`space-y-4 ${autoReorder ? '' : 'opacity-50 pointer-events-none'}`}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                                                    <div className="relative">
                                                        <select
                                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                        >
                                                            <option value="low">At Low Stock Threshold</option>
                                                            <option value="critical" selected>At Critical Stock Threshold</option>
                                                            <option value="custom">Custom Threshold</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                            <i className="fas fa-chevron-down text-xs"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Quantity</label>
                                                    <div className="relative">
                                                        <select
                                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                        >
                                                            <option value="min">Minimum (5 units)</option>
                                                            <option value="standard" selected>Standard (10 units)</option>
                                                            <option value="max">Maximum (20 units)</option>
                                                            <option value="custom">Custom Quantity</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                            <i className="fas fa-chevron-down text-xs"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Required</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="none">No Approval Required</option>
                                                        <option value="manager" selected>Manager Approval</option>
                                                        <option value="admin">Admin Approval</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">Who needs to approve auto-generated purchase orders</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Inventory Display Settings</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="list" selected>List View</option>
                                                        <option value="grid">Grid View</option>
                                                        <option value="table">Table View</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Items Per Page</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="10">10 items</option>
                                                        <option value="25" selected>25 items</option>
                                                        <option value="50">50 items</option>
                                                        <option value="100">100 items</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Default Sort</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="name">Name</option>
                                                        <option value="id" selected>ID</option>
                                                        <option value="category">Category</option>
                                                        <option value="quantity">Quantity</option>
                                                        <option value="price">Price</option>
                                                        <option value="updated">Last Updated</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Direction</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="asc" selected>Ascending</option>
                                                        <option value="desc">Descending</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                            <i className="fas fa-save mr-2"></i> Save Inventory Settings
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* System Integration Tab */}
                            {activeTab === 'integration' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-800 mb-4">System Integration</h2>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-800">Google Sheets Integration</h3>
                                                <p className="text-sm text-gray-500 mt-1">Connect your inventory with Google Sheets for import/export</p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apiConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    <span className={`w-2 h-2 rounded-full mr-1 ${apiConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                    {apiConnected ? 'Connected' : 'Disconnected'}
                                                </span>
                                                <button
                                                    onClick={toggleApiConnection}
                                                    className="ml-2 inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                                >
                                                    {apiConnected ? 'Disconnect' : 'Connect'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Google Sheets API Key</label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        placeholder="Enter your API key"
                                                        value={apiKey}
                                                        onChange={(e) => setApiKey(e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap"
                                                    >
                                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </button>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">Your Google Sheets API key for authentication</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Spreadsheet ID</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Enter your spreadsheet ID"
                                                    value="1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">ID of the Google Sheet to connect with</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Sheet Name</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Enter sheet name"
                                                    value="Inventory"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">Name of the specific sheet tab to use</p>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Sheet Mapping Configuration</h4>
                                            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sheet Column</th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System Field</th>
                                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {sheetMappings.map((mapping) => (
                                                            <tr key={mapping.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <input
                                                                        type="text"
                                                                        className="block w-full border-0 bg-transparent focus:ring-0 sm:text-sm"
                                                                        value={mapping.sheetColumn}
                                                                        onChange={(e) => {
                                                                            const updatedMappings = sheetMappings.map(m =>
                                                                                m.id === mapping.id ? { ...m, sheetColumn: e.target.value } : m
                                                                            );
                                                                            setSheetMappings(updatedMappings);
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="relative">
                                                                        <select
                                                                            className="block w-full border-0 bg-transparent focus:ring-0 sm:text-sm"
                                                                            value={mapping.systemField}
                                                                            onChange={(e) => {
                                                                                const updatedMappings = sheetMappings.map(m =>
                                                                                    m.id === mapping.id ? { ...m, systemField: e.target.value } : m
                                                                                );
                                                                                setSheetMappings(updatedMappings);
                                                                            }}
                                                                        >
                                                                            <option value="">-- Select Field --</option>
                                                                            <option value="Item ID">Item ID</option>
                                                                            <option value="Name">Name</option>
                                                                            <option value="Category">Category</option>
                                                                            <option value="Quantity">Quantity</option>
                                                                            <option value="Price">Price</option>
                                                                            <option value="Status">Status</option>
                                                                            <option value="Last Updated">Last Updated</option>
                                                                            <option value="Notes">Notes</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`toggle-mapping-${mapping.id}`}
                                                                            checked={mapping.active}
                                                                            onChange={() => {
                                                                                const updatedMappings = sheetMappings.map(m =>
                                                                                    m.id === mapping.id ? { ...m, active: !m.active } : m
                                                                                );
                                                                                setSheetMappings(updatedMappings);
                                                                            }}
                                                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                                        />
                                                                        <label
                                                                            htmlFor={`toggle-mapping-${mapping.id}`}
                                                                            className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${mapping.active ? 'bg-indigo-500' : 'bg-gray-300'}`}
                                                                        ></label>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button
                                                                        onClick={() => deleteMapping(mapping.id)}
                                                                        className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap"
                                                                    >
                                                                        <i className="fas fa-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-3 flex justify-end">
                                                <button
                                                    onClick={addNewMapping}
                                                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                                >
                                                    <i className="fas fa-plus mr-1"></i> Add Mapping
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                                            <div className="flex space-x-3">
                                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-file-import mr-1"></i> Import Now
                                                </button>
                                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-file-export mr-1"></i> Export Now
                                                </button>
                                            </div>
                                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                <i className="fas fa-sync-alt mr-1"></i> Test Connection
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-800">Other Integrations</h3>
                                                <p className="text-sm text-gray-500 mt-1">Connect with other systems and services</p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-md">
                                                        <i className="fab fa-paypal text-blue-600 text-lg"></i>
                                                    </div>
                                                    <div className="ml-4">
                                                        <h4 className="text-sm font-medium text-gray-900">PayPal Integration</h4>
                                                        <p className="text-xs text-gray-500">Connect your PayPal account for payments</p>
                                                    </div>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    Connect
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-green-100 rounded-md">
                                                        <i className="fab fa-shopify text-green-600 text-lg"></i>
                                                    </div>
                                                    <div className="ml-4">
                                                        <h4 className="text-sm font-medium text-gray-900">Shopify Integration</h4>
                                                        <p className="text-xs text-gray-500">Sync inventory with your Shopify store</p>
                                                    </div>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    Connect
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-purple-100 rounded-md">
                                                        <i className="fab fa-slack text-purple-600 text-lg"></i>
                                                    </div>
                                                    <div className="ml-4">
                                                        <h4 className="text-sm font-medium text-gray-900">Slack Integration</h4>
                                                        <p className="text-xs text-gray-500">Receive notifications in your Slack channels</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                                        <span className="w-2 h-2 rounded-full mr-1 bg-green-500"></span>
                                                        Connected
                                                    </span>
                                                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                        Configure
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-yellow-100 rounded-md">
                                                        <i className="fab fa-mailchimp text-yellow-600 text-lg"></i>
                                                    </div>
                                                    <div className="ml-4">
                                                        <h4 className="text-sm font-medium text-gray-900">Mailchimp Integration</h4>
                                                        <p className="text-xs text-gray-500">Connect for email marketing campaigns</p>
                                                    </div>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    Connect
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                            <i className="fas fa-save mr-2"></i> Save Integration Settings
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Backup & Data Tab */}
                            {activeTab === 'backup' && (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-800 mb-4">Backup & Data Management</h2>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Automatic Backups</h3>
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700">Enable Automatic Backups</h4>
                                                    <p className="text-xs text-gray-500">Schedule regular backups of your system data</p>
                                                </div>
                                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id="toggle-auto-backup"
                                                        checked={true}
                                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor="toggle-auto-backup"
                                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                                                <div className="relative">
                                                    <select
                                                        value={backupFrequency}
                                                        onChange={(e) => setBackupFrequency(e.target.value)}
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="hourly">Hourly</option>
                                                        <option value="daily">Daily</option>
                                                        <option value="weekly">Weekly</option>
                                                        <option value="monthly">Monthly</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Retention Period</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="7">7 days</option>
                                                        <option value="14">14 days</option>
                                                        <option value="30" selected>30 days</option>
                                                        <option value="90">90 days</option>
                                                        <option value="365">1 year</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">How long to keep backup files</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Storage</label>
                                                <div className="relative">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    >
                                                        <option value="local">Local Storage</option>
                                                        <option value="cloud" selected>Cloud Storage</option>
                                                        <option value="both">Both Local & Cloud</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Time</label>
                                                <input
                                                    type="time"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    value="02:00"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">Time to run daily backups (server time)</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                <i className="fas fa-database mr-2"></i> Create Backup Now
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Recent Backups</h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Backup Date</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jun 19, 2025 02:00 AM</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42.3 MB</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Automatic</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Download</button>
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Restore</button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jun 18, 2025 02:00 AM</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42.1 MB</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Automatic</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Download</button>
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Restore</button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jun 17, 2025 02:00 AM</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">41.8 MB</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Automatic</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Download</button>
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Restore</button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jun 15, 2025 11:42 AM</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">41.5 MB</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Manual</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Download</button>
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">Restore</button>
                                                            <button className="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap">Delete</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">Data Management</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">Import Data</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Import data from CSV, Excel, or JSON files</p>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-file-import mr-2"></i> Import Data
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">Export Data</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Export data to CSV, Excel, or JSON files</p>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-file-export mr-2"></i> Export Data
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">Data Cleanup</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Remove old or unused data to optimize system performance</p>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-broom mr-2"></i> Cleanup Data
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-red-50">
                                                <div>
                                                    <h4 className="text-sm font-medium text-red-900">Reset System</h4>
                                                    <p className="text-xs text-red-500 mt-1">Reset the system to factory defaults. This action cannot be undone.</p>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-exclamation-triangle mr-2"></i> Reset System
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                            <i className="fas fa-save mr-2"></i> Save Backup Settings
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>


            <style jsx>{`
.toggle-checkbox:checked {
right: 0;
border-color: #4F46E5;
}
.toggle-checkbox:checked + .toggle-label {
background-color: #4F46E5;
}
.toggle-checkbox {
right: 0;
z-index: 1;
border-color: #D1D5DB;
transition: all 0.3s;
}
.toggle-label {
transition: background-color 0.3s;
}
`}</style>
        </div>
    );
};
export default Setting



// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

// import React, { useState, useEffect } from 'react';

// const Setting= () => {
//   const [activeTab, setActiveTab] = useState<string>('systemPreferences');
//   const [timeZone, setTimeZone] = useState<string>('UTC');
//   const [language, setLanguage] = useState<string>('English');
//   const [apiKey, setApiKey] = useState<string>('');
//   const [showDropdown, setShowDropdown] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
//   const [sheetMappings, setSheetMappings] = useState<Array<{id: string, sheetName: string, localField: string, remoteField: string}>>([
//     { id: '1', sheetName: 'Customers', localField: 'customer_id', remoteField: 'id' },
//     { id: '2', sheetName: 'Customers', localField: 'customer_name', remoteField: 'name' },
//     { id: '3', sheetName: 'Orders', localField: 'order_id', remoteField: 'order_number' },
//     { id: '4', sheetName: 'Orders', localField: 'order_date', remoteField: 'date' }
//   ]);

//   const timeZones = [
//     'UTC', 'UTC+1:00', 'UTC+2:00', 'UTC+3:00', 'UTC+4:00', 'UTC+5:00', 
//     'UTC+6:00', 'UTC+7:00', 'UTC+8:00', 'UTC+9:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00',
//     'UTC-1:00', 'UTC-2:00', 'UTC-3:00', 'UTC-4:00', 'UTC-5:00', 'UTC-6:00', 
//     'UTC-7:00', 'UTC-8:00', 'UTC-9:00', 'UTC-10:00', 'UTC-11:00', 'UTC-12:00'
//   ];

//   const languages = [
//     'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
//     'Russian', 'Japanese', 'Chinese', 'Korean', 'Arabic'
//   ];

//   const handleSaveChanges = () => {
//     setIsSaving(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsSaving(false);
//       setSaveSuccess(true);
      
//       // Hide success message after 3 seconds
//       setTimeout(() => {
//         setSaveSuccess(false);
//       }, 3000);
//     }, 1500);
//   };

//   const addNewMapping = () => {
//     const newId = (sheetMappings.length + 1).toString();
//     setSheetMappings([...sheetMappings, { 
//       id: newId, 
//       sheetName: '', 
//       localField: '', 
//       remoteField: '' 
//     }]);
//   };

//   const updateMapping = (id, field, value) => {
//     setSheetMappings(sheetMappings.map(mapping => 
//       mapping.id === id ? { ...mapping, [field]: value } : mapping
//     ));
//   };

//   const removeMapping = (id) => {
//     setSheetMappings(sheetMappings.filter(mapping => mapping.id !== id));
//   };

//   useEffect(() => {
//     // Close dropdowns when clicking outside
//     const handleClickOutside = (event) => {
//       const target = event.target;
//       if (!target.closest('.dropdown-container')) {
//         setShowDropdown(null);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
//           <p className="text-gray-600 mt-2">Configure your system preferences and integrations</p>
//         </header>
        
//         {/* Tabs */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="flex border-b border-gray-200">
//             <button
//               className={`px-6 py-4 text-sm font-medium ${activeTab === 'systemPreferences' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} cursor-pointer whitespace-nowrap`}
//               onClick={() => setActiveTab('systemPreferences')}
//             >
//               <i className="fas fa-cog mr-2"></i>
//               System Preferences
//             </button>
//             <button
//               className={`px-6 py-4 text-sm font-medium ${activeTab === 'integrations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} cursor-pointer whitespace-nowrap`}
//               onClick={() => setActiveTab('integrations')}
//             >
//               <i className="fas fa-plug mr-2"></i>
//               Integrations
//             </button>
//           </div>
          
//           <div className="p-6">
//             {activeTab === 'systemPreferences' && (
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">System Preferences</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   {/* Time Zone Dropdown */}
//                   <div className="dropdown-container relative">
//                     <label htmlFor="time-zone" className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
//                     <button
//                       id="time-zone"
//                       type="button"
//                       className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !rounded-button cursor-pointer whitespace-nowrap"
//                       onClick={() => setShowDropdown(showDropdown === 'timeZone' ? null : 'timeZone')}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span>{timeZone}</span>
//                         <i className="fas fa-chevron-down text-gray-400"></i>
//                       </div>
//                     </button>
//                     {showDropdown === 'timeZone' && (
//                       <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-y-auto">
//                         {timeZones.map((tz) => (
//                           <div
//                             key={tz}
//                             className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                             onClick={() => {
//                               setTimeZone(tz);
//                               setShowDropdown(null);
//                             }}
//                           >
//                             {tz}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Language Dropdown */}
//                   <div className="dropdown-container relative">
//                     <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
//                     <button
//                       id="language"
//                       type="button"
//                       className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !rounded-button cursor-pointer whitespace-nowrap"
//                       onClick={() => setShowDropdown(showDropdown === 'language' ? null : 'language')}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span>{language}</span>
//                         <i className="fas fa-chevron-down text-gray-400"></i>
//                       </div>
//                     </button>
//                     {showDropdown === 'language' && (
//                       <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-y-auto">
//                         {languages.map((lang) => (
//                           <div
//                             key={lang}
//                             className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                             onClick={() => {
//                               setLanguage(lang);
//                               setShowDropdown(null);
//                             }}
//                           >
//                             {lang}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'integrations' && (
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">Google Sheets Integration</h2>
                
//                 <div className="mb-6">
//                   <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">Google Sheets API Key</label>
//                   <div className="flex">
//                     <input
//                       type="text"
//                       id="api-key"
//                       className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-r-0"
//                       value={apiKey}
//                       onChange={(e) => setApiKey(e.target.value)}
//                       placeholder="Enter your Google Sheets API key"
//                     />
//                     <button
//                       type="button"
//                       className="bg-gray-100 border border-gray-300 rounded-r-lg px-4 hover:bg-gray-200 !rounded-button cursor-pointer whitespace-nowrap"
//                       onClick={() => window.open('https://console.cloud.google.com/apis/credentials', '_blank')}
//                     >
//                       <i className="fas fa-external-link-alt"></i>
//                     </button>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Get your API key from the Google Cloud Console
//                   </p>
//                 </div>
                
//                 <div className="mb-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-lg font-medium text-gray-800">Sheet Mapping Configuration</h3>
//                     <button
//                       type="button"
//                       className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center !rounded-button cursor-pointer whitespace-nowrap"
//                       onClick={addNewMapping}
//                     >
//                       <i className="fas fa-plus mr-1"></i>
//                       Add Mapping
//                     </button>
//                   </div>
                  
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Sheet Name
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Local Field
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Remote Field
//                           </th>
//                           <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {sheetMappings.map((mapping) => (
//                           <tr key={mapping.id}>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <input
//                                 type="text"
//                                 className="border border-gray-300 rounded-lg py-1 px-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 value={mapping.sheetName}
//                                 onChange={(e) => updateMapping(mapping.id, 'sheetName', e.target.value)}
//                                 placeholder="Sheet name"
//                               />
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <input
//                                 type="text"
//                                 className="border border-gray-300 rounded-lg py-1 px-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 value={mapping.localField}
//                                 onChange={(e) => updateMapping(mapping.id, 'localField', e.target.value)}
//                                 placeholder="Local field"
//                               />
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <input
//                                 type="text"
//                                 className="border border-gray-300 rounded-lg py-1 px-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 value={mapping.remoteField}
//                                 onChange={(e) => updateMapping(mapping.id, 'remoteField', e.target.value)}
//                                 placeholder="Remote field"
//                               />
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-right">
//                               <button
//                                 type="button"
//                                 className="text-red-600 hover:text-red-900 !rounded-button cursor-pointer whitespace-nowrap"
//                                 onClick={() => removeMapping(mapping.id)}
//                               >
//                                 <i className="fas fa-trash"></i>
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
                  
//                   {sheetMappings.length === 0 && (
//                     <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                       <i className="fas fa-table text-gray-400 text-3xl mb-2"></i>
//                       <p className="text-gray-500">No mappings configured yet</p>
//                       <button
//                         type="button"
//                         className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium !rounded-button cursor-pointer whitespace-nowrap"
//                         onClick={addNewMapping}
//                       >
//                         <i className="fas fa-plus mr-1"></i>
//                         Add your first mapping
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Save Button - Always visible */}
//             <div className="mt-8 flex items-center">
//               <button
//                 type="button"
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition-colors duration-200 flex items-center !rounded-button cursor-pointer whitespace-nowrap"
//                 onClick={handleSaveChanges}
//                 disabled={isSaving}
//               >
//                 {isSaving ? (
//                   <>
//                     <i className="fas fa-spinner fa-spin mr-2"></i>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-save mr-2"></i>
//                     Save Changes
//                   </>
//                 )}
//               </button>
              
//               {saveSuccess && (
//                 <div className="ml-4 text-green-600 flex items-center">
//                   <i className="fas fa-check-circle mr-1"></i>
//                   Changes saved successfully!
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setting;
