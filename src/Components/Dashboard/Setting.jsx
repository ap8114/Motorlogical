// The exported code uses Bootstrap CSS. Make sure to include Bootstrap in your project.
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
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="container-fluid p-0">
            <main className="p-3 p-md-4 p-lg-6">
                <div className="mb-4 mb-md-5 mb-lg-6 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
                    <div className="mb-3 mb-md-0">
                        <h1 className="h4 h3-md h2-lg fw-bold text-dark">
                            Settings
                        </h1>
                        <p className="text-muted mb-0">Configure system preferences and integrations</p>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-primary btn-sm btn-md-normal">
                            <i className="fas fa-save me-1 me-md-2"></i> Save All Changes
                        </button>
                    </div>
                </div>

                {/* Settings Tabs */}
                <div className="bg-white rounded shadow mb-4 mb-md-5 mb-lg-6">
                    <div className="border-bottom">
                        <nav className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${activeTab === 'general'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <i className="fas fa-sliders-h mr-2"></i> General Settings
                            </button>

                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${activeTab === 'notifications'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <i className="fas fa-bell mr-2"></i> Notification Preferences
                            </button>

                            <button
                                onClick={() => setActiveTab('inventory')}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${activeTab === 'inventory'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <i className="fas fa-warehouse mr-2"></i> Inventory Settings
                            </button>
                        </nav>

                    </div>

                    {/* Tab Content */}
                    <div className="p-3 p-md-4">
                        {/* General Settings Tab */}
                        {activeTab === 'general' && (
                            <div>
                                <h2 className="h5 h4-md font-medium text-dark mb-3 mb-md-4">System Preferences</h2>
                                <div className="row g-3 g-md-4">
                                    <div className="col-12 col-md-6 col-lg-5">
                                        <label className="form-label text-muted mb-1">Language</label>
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="english">English</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="french">French</option>
                                            <option value="german">German</option>
                                            <option value="japanese">Japanese</option>
                                            <option value="chinese">Chinese (Simplified)</option>
                                        </select>
                                        <p className="mt-1 small text-muted">Set your preferred language for the interface</p>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-5">
                                        <label className="form-label text-muted mb-1">Time Zone</label>
                                        <select
                                            value={timezone}
                                            onChange={(e) => setTimezone(e.target.value)}
                                            className="form-select"
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
                                        <p className="mt-1 small text-muted">All dates and times will be displayed in this time zone</p>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-5">
                                        <label className="form-label text-muted mb-1">Currency Format</label>
                                        <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                            <option value="JPY">JPY (¥)</option>
                                            <option value="CAD">CAD (C$)</option>
                                            <option value="AUD">AUD (A$)</option>
                                            <option value="CNY">CNY (¥)</option>
                                        </select>
                                        <p className="mt-1 small text-muted">Currency used for all financial data</p>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-5">
                                        <label className="form-label text-muted mb-1">Date Format</label>
                                        <select className="form-select">
                                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                            <option value="MMM DD, YYYY">MMM DD, YYYY</option>
                                        </select>
                                        <p className="mt-1 small text-muted">Format for displaying dates throughout the system</p>
                                    </div>
                                </div>

                                <div className="mt-4 mt-md-5">
                                    <h3 className="h6 h5-md font-medium text-dark mb-3">Company Information</h3>
                                    <div className="row g-3 g-md-4">
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Company Name"
                                                value="AutoDealerPro Inc."
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Business ID/Tax Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Business ID"
                                                value="TAX-123456789"
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Contact Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="contact@example.com"
                                                value="contact@autodealerpro.com"
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="+1 (555) 123-4567"
                                                value="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 mt-md-5 d-flex justify-content-end">
                                    <button className="btn btn-primary btn-sm btn-md-normal">
                                        <i className="fas fa-save me-1 me-md-2"></i> Save General Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notification Preferences Tab */}
                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="h5 h4-md font-medium text-dark mb-3 mb-md-4">Notification Preferences</h2>

                                <div className="bg-white border rounded p-3 p-md-4 mb-3 mb-md-4">
                                    <h3 className="h6 h5-md font-medium text-dark mb-3 mb-md-4">Email Notifications</h3>
                                    <div className="row g-3">
                                        {[
                                            {
                                                id: "toggle-email-low-stock",
                                                label: "Low Stock Alerts",
                                                description: "Receive notifications when inventory items fall below threshold",
                                                checked: emailNotifications,
                                                onChange: () => setEmailNotifications(!emailNotifications)
                                            },
                                            {
                                                id: "toggle-email-orders",
                                                label: "Order Status Updates",
                                                description: "Receive notifications when order statuses change",
                                                checked: true
                                            },
                                            {
                                                id: "toggle-email-system",
                                                label: "System Alerts",
                                                description: "Receive notifications about system updates and maintenance",
                                                checked: true
                                            },
                                            {
                                                id: "toggle-email-user",
                                                label: "User Activity",
                                                description: "Receive notifications about user logins and actions",
                                                checked: false
                                            }
                                        ].map((item, idx) => (
                                            <div key={idx} className="col-12">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="me-3">
                                                        <h6 className="mb-1 text-dark">{item.label}</h6>
                                                        <p className="small text-muted mb-0">{item.description}</p>
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={item.id}
                                                            checked={item.checked}
                                                            onChange={item.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 mt-md-4">
                                        <label className="form-label text-muted mb-1">Email Recipients</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="email@example.com, another@example.com"
                                            value="admin@autodealerpro.com, inventory@autodealerpro.com"
                                        />
                                        <p className="mt-1 small text-muted">Separate multiple email addresses with commas</p>
                                    </div>
                                </div>

                                <div className="bg-white border rounded p-3 p-md-4 mb-3 mb-md-4">
                                    <h3 className="h6 h5-md font-medium text-dark mb-3 mb-md-4">In-App Notifications</h3>
                                    <div className="row g-3">
                                        {[
                                            {
                                                id: "toggle-app-low-stock",
                                                label: "Low Stock Alerts",
                                                description: "Show notifications when inventory items fall below threshold",
                                                checked: pushNotifications,
                                                onChange: () => setPushNotifications(!pushNotifications)
                                            },
                                            {
                                                id: "toggle-app-orders",
                                                label: "Order Status Updates",
                                                description: "Show notifications when order statuses change",
                                                checked: true
                                            },
                                            {
                                                id: "toggle-app-system",
                                                label: "System Alerts",
                                                description: "Show notifications about system updates and maintenance",
                                                checked: true
                                            },
                                            {
                                                id: "toggle-app-user",
                                                label: "User Activity",
                                                description: "Show notifications about user logins and actions",
                                                checked: false
                                            }
                                        ].map((item, idx) => (
                                            <div key={idx} className="col-12">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="me-3">
                                                        <h6 className="mb-1 text-dark">{item.label}</h6>
                                                        <p className="small text-muted mb-0">{item.description}</p>
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={item.id}
                                                            checked={item.checked}
                                                            onChange={item.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border rounded p-3 p-md-4">
                                    <h3 className="h6 h5-md font-medium text-dark mb-3 mb-md-4">Notification Schedule</h3>
                                    <div className="row g-3 g-md-4">
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Daily Digest</label>
                                            <select className="form-select">
                                                <option value="disabled">Disabled</option>
                                                <option value="morning" selected>Morning (8:00 AM)</option>
                                                <option value="afternoon">Afternoon (1:00 PM)</option>
                                                <option value="evening">Evening (6:00 PM)</option>
                                            </select>
                                            <p className="mt-1 small text-muted">Receive a daily summary of all notifications</p>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Weekly Report</label>
                                            <select className="form-select">
                                                <option value="disabled">Disabled</option>
                                                <option value="monday">Monday</option>
                                                <option value="friday" selected>Friday</option>
                                                <option value="sunday">Sunday</option>
                                            </select>
                                            <p className="mt-1 small text-muted">Receive a weekly summary report</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 mt-md-5 d-flex justify-content-end">
                                    <button className="btn btn-primary btn-sm btn-md-normal">
                                        <i className="fas fa-save me-1 me-md-2"></i> Save Notification Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Inventory Settings Tab */}
                        {activeTab === 'inventory' && (
                            <div>
                                <h2 className="h5 h4-md font-medium text-dark mb-3 mb-md-4">Inventory Settings</h2>

                                <div className="bg-white border rounded p-3 p-md-4 mb-3 mb-md-4">
                                    <h3 className="h6 h5-md font-medium text-dark mb-3 mb-md-4">Stock Level Thresholds</h3>
                                    <div className="row g-3 g-md-4">
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted">Low Stock Threshold</label>
                                            <div className="input-group" style={{ maxWidth: '160px' }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setLowStockThreshold(Math.max(1, lowStockThreshold - 1))}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input
                                                    type="number"
                                                    className="form-control text-center"
                                                    value={lowStockThreshold}
                                                    min="1"
                                                    onChange={(e) => setLowStockThreshold(Math.max(1, parseInt(e.target.value) || 1))}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setLowStockThreshold(lowStockThreshold + 1)}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            <p className="mt-1 small text-muted">Items with stock below this number will be marked as low stock</p>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Critical Stock Threshold</label>
                                            <div className="input-group" style={{ maxWidth: '160px' }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="form-control text-center"
                                                    value="2"
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            <p className="mt-1 small text-muted">Items with stock below this number will be marked as critical</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border rounded p-3 p-md-4 mb-3 mb-md-4">
                                    <h3 className="h6 h5-md font-medium text-dark mb-3 mb-md-4">Auto-Reorder Rules</h3>
                                    <div className="mb-3 mb-md-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="me-3">
                                                <h6 className="mb-1 text-dark">Enable Auto-Reorder</h6>
                                                <p className="small text-muted mb-0">Automatically create purchase orders for low stock items</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="toggle-auto-reorder"
                                                    checked={autoReorder}
                                                    onChange={() => setAutoReorder(!autoReorder)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`row g-3 g-md-4 ${autoReorder ? '' : 'opacity-50 pe-none'}`}>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Reorder Point</label>
                                            <select className="form-select">
                                                <option value="low">At Low Stock Threshold</option>
                                                <option value="critical" selected>At Critical Stock Threshold</option>
                                                <option value="custom">Custom Threshold</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Reorder Quantity</label>
                                            <select className="form-select">
                                                <option value="min">Minimum (5 units)</option>
                                                <option value="standard" selected>Standard (10 units)</option>
                                                <option value="max">Maximum (20 units)</option>
                                                <option value="custom">Custom Quantity</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-muted mb-1">Approval Required</label>
                                            <select className="form-select">
                                                <option value="none">No Approval Required</option>
                                                <option value="manager" selected>Manager Approval</option>
                                                <option value="admin">Admin Approval</option>
                                            </select>
                                            <p className="mt-1 small text-muted">Who needs to approve auto-generated purchase orders</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border rounded p-3 p-md-4">
                                    <h3 className="h6 h5-md font-medium text-dark mb-3 mb-md-4">Inventory Display Settings</h3>
                                    <div className="row g-3 g-md-4">
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Default View</label>
                                            <select className="form-select">
                                                <option value="list" selected>List View</option>
                                                <option value="grid">Grid View</option>
                                                <option value="table">Table View</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Items Per Page</label>
                                            <select className="form-select">
                                                <option value="10">10 items</option>
                                                <option value="25" selected>25 items</option>
                                                <option value="50">50 items</option>
                                                <option value="100">100 items</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Default Sort</label>
                                            <select className="form-select">
                                                <option value="name">Name</option>
                                                <option value="id" selected>ID</option>
                                                <option value="category">Category</option>
                                                <option value="quantity">Quantity</option>
                                                <option value="price">Price</option>
                                                <option value="updated">Last Updated</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-5">
                                            <label className="form-label text-muted mb-1">Sort Direction</label>
                                            <select className="form-select">
                                                <option value="asc" selected>Ascending</option>
                                                <option value="desc">Descending</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 mt-md-5 d-flex justify-content-end">
                                    <button className="btn btn-primary btn-sm btn-md-normal">
                                        <i className="fas fa-save me-1 me-md-2"></i> Save Inventory Settings
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Setting;