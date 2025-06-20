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
        <div className="flex h-screen bg-gray-50 p-4">

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
