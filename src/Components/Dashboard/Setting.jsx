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
        <div className="">

            <main className="p-6">
                <div className="mb-6 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
                    <div>
                        <div className="d-flex align-items-center">

                            <h1 className="h2  fw-bold text-dark d-flex align-items-center">
                                Settings
                            </h1>
                        </div>
                        <p className="text-muted mt-1">Configure system preferences and integrations</p>
                    </div>
                    <div className="d-flex mt-4 mt-md-0 gap-3">
                        <button
                            className="d-flex align-items-center px-4 py-2 bg-primary text-white rounded hover-bg-primary-dark transition cursor-pointer rounded-pill text-nowrap"
                        >
                            <i className="fas fa-save mr-2"></i> Save All Changes
                        </button>
                    </div>
                </div>
                {/* Settings Tabs */}
                <div className="bg-white rounded shadow mb-8">
                    <div className="border-bottom">
                     <nav className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4">
  <button
    onClick={() => setActiveTab('general')}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${
      activeTab === 'general'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <i className="fas fa-sliders-h mr-2"></i> General Settings
  </button>

  <button
    onClick={() => setActiveTab('notifications')}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${
      activeTab === 'notifications'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <i className="fas fa-bell mr-2"></i> Notification Preferences
  </button>

  <button
    onClick={() => setActiveTab('inventory')}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${
      activeTab === 'inventory'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <i className="fas fa-warehouse mr-2"></i> Inventory Settings
  </button>
</nav>

                    </div>
                    {/* Tab Content */}
                    <div className="p-6">
                        {/* General Settings Tab */}
                        {activeTab === 'general' && (
                            <div>
                                <h2 className="h5 font-medium text-dark mb-4">System Preferences</h2>
                                <div className="row gap-4">
                                    <div className="col-md-5">
                                        <label className="form-label text-muted mb-1">Language</label>
                                        <div className="input-group">
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

                                        </div>
                                        <p className="mt-1 small text-muted">Set your preferred language for the interface</p>
                                    </div>
                                    <div className="col-md-5">
                                        <label className="form-label text-muted mb-1">Time Zone</label>
                                        <div className="input-group">
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

                                        </div>
                                        <p className="mt-1 small text-muted">All dates and times will be displayed in this time zone</p>
                                    </div>
                                    <div className="col-md-5">
                                        <label className="form-label text-muted mb-1">Currency Format</label>
                                        <div className="input-group">
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

                                        </div>
                                        <p className="mt-1 small text-muted">Currency used for all financial data</p>
                                    </div>
                                    <div className="col-md-5">
                                        <label className="form-label text-muted mb-1">Date Format</label>
                                        <div className="input-group">
                                            <select
                                                className="form-select"
                                            >
                                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                                <option value="MMM DD, YYYY">MMM DD, YYYY</option>
                                            </select>

                                        </div>
                                        <p className="mt-1 small text-muted">Format for displaying dates throughout the system</p>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h3 className="h6 font-medium text-dark mb-3">Company Information</h3>
                                    <div className="row gap-4">
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Company Name"
                                                value="AutoDealerPro Inc."
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Business ID/Tax Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Business ID"
                                                value="TAX-123456789"
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Contact Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="contact@example.com"
                                                value="contact@autodealerpro.com"
                                            />
                                        </div>
                                        <div className="col-md-5">
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
                                <div className="mt-5 d-flex justify-content-end">
                                    <button className="btn btn-primary d-flex align-items-center">
                                        <i className="fas fa-save mr-2"></i> Save General Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notification Preferences Tab */}
                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="h5 font-medium text-dark mb-4">Notification Preferences</h2>
                                <div className="bg-white border rounded p-4 mb-4">
                                    <h3 className="h6 font-medium text-dark mb-4">Email Notifications</h3>
                                    <div className="gap-4">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">Low Stock Alerts</h4>
                                                <p className="small text-muted">Receive notifications when inventory items fall below threshold</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-email-low-stock"
                                                    checked={emailNotifications}
                                                    onChange={() => setEmailNotifications(!emailNotifications)}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">Order Status Updates</h4>
                                                <p className="small text-muted">Receive notifications when order statuses change</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-email-orders"
                                                    checked={true}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">System Alerts</h4>
                                                <p className="small text-muted">Receive notifications about system updates and maintenance</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-email-system"
                                                    checked={true}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">User Activity</h4>
                                                <p className="small text-muted">Receive notifications about user logins and actions</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-email-user"
                                                    checked={false}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
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
                                <div className="bg-white border rounded p-4 mb-4">
                                    <h3 className="h6 font-medium text-dark mb-4">In-App Notifications</h3>
                                    <div className="gap-4">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">Low Stock Alerts</h4>
                                                <p className="small text-muted">Show notifications when inventory items fall below threshold</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-app-low-stock"
                                                    checked={pushNotifications}
                                                    onChange={() => setPushNotifications(!pushNotifications)}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">Order Status Updates</h4>
                                                <p className="small text-muted">Show notifications when order statuses change</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-app-orders"
                                                    checked={true}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">System Alerts</h4>
                                                <p className="small text-muted">Show notifications about system updates and maintenance</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-app-system"
                                                    checked={true}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">User Activity</h4>
                                                <p className="small text-muted">Show notifications about user logins and actions</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-app-user"
                                                    checked={false}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white border rounded p-4">
                                    <h3 className="h6 font-medium text-dark mb-4">Notification Schedule</h3>
                                    <div className="row gap-4">
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Daily Digest</label>
                                            <div className="input-group">
                                                <select
                                                    className="form-select"
                                                >
                                                    <option value="disabled">Disabled</option>
                                                    <option value="morning" selected>Morning (8:00 AM)</option>
                                                    <option value="afternoon">Afternoon (1:00 PM)</option>
                                                    <option value="evening">Evening (6:00 PM)</option>
                                                </select>

                                            </div>
                                            <p className="mt-1 small text-muted">Receive a daily summary of all notifications</p>
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Weekly Report</label>
                                            <div className="input-group">
                                                <select
                                                    className="form-select"
                                                >
                                                    <option value="disabled">Disabled</option>
                                                    <option value="monday">Monday</option>
                                                    <option value="friday" selected>Friday</option>
                                                    <option value="sunday">Sunday</option>
                                                </select>

                                            </div>
                                            <p className="mt-1 small text-muted">Receive a weekly summary report</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 d-flex justify-content-end">
                                    <button className="btn btn-primary d-flex align-items-center">
                                        <i className="fas fa-save mr-2"></i> Save Notification Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Inventory Settings Tab */}
                        {activeTab === 'inventory' && (
                            <div>
                                <h2 className="h5 font-medium text-dark mb-4">Inventory Settings</h2>
                                <div className="bg-white border rounded p-4 mb-4">
                                    <h3 className="h6 font-medium text-dark mb-4">Stock Level Thresholds</h3>
                                    <div className="row gap-4">
                                        <div className="col-md-5">
                                            <label className="form-label text-muted">Low Stock Threshold</label>
                                            <div className="input-group" style={{ maxWidth: '160px', height: '38px' }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    style={{ height: '38px' }}
                                                    onClick={() => setValue(Math.max(1, value - 1))}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input
                                                    type="number"
                                                    className="form-control text-center"
                                                    value=""
                                                    min="1"
                                                    onChange={(e) =>
                                                        setValue(Math.max(1, parseInt(e.target.value) || 1))
                                                    }
                                                    style={{ top: "-8px", height: '38px' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    style={{ height: '38px' }}
                                                    onClick={() => setValue(value + 1)}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>

                                            <p className="mt-1 small text-muted">Items with stock below this number will be marked as low stock</p>
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Critical Stock Threshold</label>
                                            <div className="input-group" style={{ maxWidth: '160px', height: '38px' }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary px-3"
                                                    style={{ height: '38px' }}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="form-control text-center"
                                                    value="2"
                                                    style={{ top: "-8px", height: '38px' }}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary px-3"
                                                    style={{ height: '38px' }}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>

                                            <p className="mt-1 small text-muted">Items with stock below this number will be marked as critical</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white border rounded p-4 mb-4">
                                    <h3 className="h6 font-medium text-dark mb-4">Auto-Reorder Rules</h3>
                                    <div className="mb-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted">Enable Auto-Reorder</h4>
                                                <p className="small text-muted">Automatically create purchase orders for low stock items</p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    id="toggle-auto-reorder"
                                                    checked={autoReorder}
                                                    onChange={() => setAutoReorder(!autoReorder)}
                                                    className="form-check-input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`gap-4 ${autoReorder ? '' : 'opacity-50 pe-none'}`}>
                                        <div className="row gap-4">
                                            <div className="col-md-5">
                                                <label className="form-label text-muted mb-1">Reorder Point</label>
                                                <div className="input-group">
                                                    <select
                                                        className="form-select"
                                                    >
                                                        <option value="low">At Low Stock Threshold</option>
                                                        <option value="critical" selected>At Critical Stock Threshold</option>
                                                        <option value="custom">Custom Threshold</option>
                                                    </select>

                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label text-muted mb-1">Reorder Quantity</label>
                                                <div className="input-group">
                                                    <select
                                                        className="form-select"
                                                    >
                                                        <option value="min">Minimum (5 units)</option>
                                                        <option value="standard" selected>Standard (10 units)</option>
                                                        <option value="max">Maximum (20 units)</option>
                                                        <option value="custom">Custom Quantity</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label text-muted mb-1">Approval Required</label>
                                            <div className="input-group">
                                                <select
                                                    className="form-select"
                                                >
                                                    <option value="none">No Approval Required</option>
                                                    <option value="manager" selected>Manager Approval</option>
                                                    <option value="admin">Admin Approval</option>
                                                </select>

                                            </div>
                                            <p className="mt-1 small text-muted">Who needs to approve auto-generated purchase orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white border rounded p-4">
                                    <h3 className="h6 font-medium text-dark mb-4">Inventory Display Settings</h3>
                                    <div className="row gap-4">
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Default View</label>
                                            <div className="input-group">
                                                <select
                                                    className="form-select"
                                                >
                                                    <option value="list" selected>List View</option>
                                                    <option value="grid">Grid View</option>
                                                    <option value="table">Table View</option>
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Items Per Page</label>
                                            <div className="input-group">
                                                <select
                                                    className="form-select"
                                                >
                                                    <option value="10">10 items</option>
                                                    <option value="25" selected>25 items</option>
                                                    <option value="50">50 items</option>
                                                    <option value="100">100 items</option>
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Default Sort</label>
                                            <div className="input-group">
                                                <select
                                                    className="form-select"
                                                >
                                                    <option value="name">Name</option>
                                                    <option value="id" selected>ID</option>
                                                    <option value="category">Category</option>
                                                    <option value="quantity">Quantity</option>
                                                    <option value="price">Price</option>
                                                    <option value="updated">Last Updated</option>
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label text-muted mb-1">Sort Direction</label>
                                            <div className="input-group">
                                                <select
                                                    className="form-select"
                                                >
                                                    <option value="asc" selected>Ascending</option>
                                                    <option value="desc">Descending</option>
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 d-flex justify-content-end">
                                    <button className="btn btn-primary d-flex align-items-center">
                                        <i className="fas fa-save mr-2"></i> Save Inventory Settings
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
export default Setting