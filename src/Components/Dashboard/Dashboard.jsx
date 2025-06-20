// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import * as echarts from 'echarts';
const Dashboard = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(false);
    // Add styles for loading state
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
.loading {
position: relative;
overflow: hidden;
}
.loading::after {
content: '';
position: absolute;
top: 0;
left: -100%;
width: 100%;
height: 100%;
background: linear-gradient(
90deg,
transparent,
rgba(255, 255, 255, 0.2),
transparent
);
animation: loading-shine 1s ease infinite;
}
@keyframes loading-shine {
to {
left: 100%;
}
}
`;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    const [notifications, setNotifications] = useState(3);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    // Chart initialization
    React.useEffect(() => {
        const salesChart = echarts.init(document.getElementById('sales-chart'));
        const orderChart = echarts.init(document.getElementById('order-chart'));
        const inventoryChart = echarts.init(document.getElementById('inventory-chart'));
        const salesOption = {
            animation: false,
            title: {
                text: 'Monthly Sales',
                left: 'center',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 132, 101, 134, 90, 230],
                    type: 'line',
                    smooth: true,
                    color: '#4F46E5'
                }
            ]
        };
        const orderOption = {
            animation: false,
            title: {
                text: 'Order Status',
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
                textStyle: {
                    fontSize: 12
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '70%',
                    data: [
                        { value: 1048, name: 'Completed' },
                        { value: 735, name: 'Processing' },
                        { value: 580, name: 'Pending' },
                        { value: 300, name: 'Cancelled' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: ['#10B981', '#6366F1', '#F59E0B', '#EF4444']
                }
            ]
        };
        const inventoryOption = {
            animation: false,
            title: {
                text: 'Inventory Levels',
                left: 'center',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: ['Sedans', 'SUVs', 'Trucks', 'Vans', 'Luxury']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70],
                    type: 'bar',
                    color: '#8B5CF6'
                }
            ]
        };
        salesChart.setOption(salesOption);
        orderChart.setOption(orderOption);
        inventoryChart.setOption(inventoryOption);
        const handleResize = () => {
            salesChart.resize();
            orderChart.resize();
            inventoryChart.resize();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            salesChart.dispose();
            orderChart.dispose();
            inventoryChart.dispose();
        };
    }, []);
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };
    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };
    return (
        <div>
            <main className="p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome back, John!</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your dealerships today.</p>
                </div>
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                <i className="fas fa-store text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-600">Total Dealerships</h2>
                                <p className="text-2xl font-bold text-gray-800">24</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-500 flex items-center">
                                <i className="fas fa-arrow-up mr-1"></i> 12%
                            </span>
                            <span className="text-gray-500 ml-2">from last month</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <i className="fas fa-users text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-600">Active Users</h2>
                                <p className="text-2xl font-bold text-gray-800">142</p>
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
                            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                                <i className="fas fa-shopping-cart text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-600">Pending Orders</h2>
                                <p className="text-2xl font-bold text-gray-800">64</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-red-500 flex items-center">
                                <i className="fas fa-arrow-up mr-1"></i> 5%
                            </span>
                            <span className="text-gray-500 ml-2">from last month</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                                <i className="fas fa-warehouse text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-600">Total Inventory</h2>
                                <p className="text-2xl font-bold text-gray-800">1,893</p>
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
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <button
                            id="add-dealership-btn"
                            onClick={() => {
                                const modal = document.getElementById('dealership-modal');
                                if (modal) modal.style.display = 'block';
                            }}
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer !rounded-button whitespace-nowrap"
                        >
                            <i className="fas fa-plus mr-2"></i> Add Dealership
                        </button>
                        {/* Modal Dialog */}
                        <div id="dealership-modal" className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                            <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-lg bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">Add New Dealership</h3>
                                    <button
                                        id="close-modal"
                                        onClick={() => {
                                            const modal = document.getElementById('dealership-modal');
                                            if (modal) modal.style.display = 'none';
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <form
                                    id="dealership-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const form = document.getElementById('dealership-form');
                                        const formData = new FormData(form);
                                        const isValid = Array.from(formData.entries()).every(([key, value]) => {
                                            const input = document.getElementById(key);
                                            const errorSpan = document.getElementById(`${key}-error`);
                                            if (!value && input.required) {
                                                if (errorSpan) errorSpan.textContent = 'This field is required';
                                                return false;
                                            }
                                            if (errorSpan) errorSpan.textContent = '';
                                            return true;
                                        });
                                        if (isValid) {
                                            // Here you would typically send the data to your backend
                                            const modal = document.getElementById('dealership-modal');
                                            if (modal) modal.style.display = 'none';
                                            form.reset();
                                        }
                                    }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label htmlFor="dealershipName" className="block text-sm font-medium text-gray-700">Dealership Name *</label>
                                        <input
                                            type="text"
                                            id="dealershipName"
                                            name="dealershipName"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                        />
                                        <span id="dealershipName-error" className="text-xs text-red-500"></span>
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                        />
                                        <span id="address-error" className="text-xs text-red-500"></span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            />
                                            <span id="phone-error" className="text-xs text-red-500"></span>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            />
                                            <span id="email-error" className="text-xs text-red-500"></span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="managerName" className="block text-sm font-medium text-gray-700">Manager Name *</label>
                                            <input
                                                type="text"
                                                id="managerName"
                                                name="managerName"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            />
                                            <span id="managerName-error" className="text-xs text-red-500"></span>
                                        </div>
                                        <div>
                                            <label htmlFor="dealershipType" className="block text-sm font-medium text-gray-700">Dealership Type *</label>
                                            <select
                                                id="dealershipType"
                                                name="dealershipType"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            >
                                                <option value="">Select type</option>
                                                <option value="new">New Vehicles</option>
                                                <option value="used">Used Vehicles</option>
                                                <option value="both">Both New & Used</option>
                                                <option value="luxury">Luxury Vehicles</option>
                                            </select>
                                            <span id="dealershipType-error" className="text-xs text-red-500"></span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const modal = document.getElementById('dealership-modal');
                                                if (modal) modal.style.display = 'none';
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition !rounded-button whitespace-nowrap"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition !rounded-button whitespace-nowrap"
                                        >
                                            Save Dealership
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <button
                            id="add-user-btn"
                            onClick={() => {
                                const modal = document.getElementById('user-modal');
                                if (modal) modal.style.display = 'block';
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer !rounded-button whitespace-nowrap"
                        >
                            <i className="fas fa-user-plus mr-2"></i> Add User
                        </button>
                        {/* User Modal Dialog */}
                        <div id="user-modal" className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                            <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-lg bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">Add New User</h3>
                                    <button
                                        id="close-user-modal"
                                        onClick={() => {
                                            const modal = document.getElementById('user-modal');
                                            if (modal) modal.style.display = 'none';
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <form
                                    id="user-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const form = document.getElementById('user-form');
                                        const formData = new FormData(form);
                                        const isValid = Array.from(formData.entries()).every(([key, value]) => {
                                            const input = document.getElementById(key);
                                            const errorSpan = document.getElementById(`${key}-error`);
                                            if (!value && input.required) {
                                                if (errorSpan) errorSpan.textContent = 'This field is required';
                                                return false;
                                            }
                                            if (errorSpan) errorSpan.textContent = '';
                                            return true;
                                        });
                                        if (isValid) {
                                            const modal = document.getElementById('user-modal');
                                            if (modal) modal.style.display = 'none';
                                            form.reset();
                                        }
                                    }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            />
                                            <span id="firstName-error" className="text-xs text-red-500"></span>
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            />
                                            <span id="lastName-error" className="text-xs text-red-500"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                                        <input
                                            type="email"
                                            id="userEmail"
                                            name="userEmail"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                        />
                                        <span id="userEmail-error" className="text-xs text-red-500"></span>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                        />
                                        <span id="password-error" className="text-xs text-red-500"></span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role *</label>
                                            <select
                                                id="role"
                                                name="role"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            >
                                                <option value="">Select role</option>
                                                <option value="admin">Admin</option>
                                                <option value="manager">Manager</option>
                                                <option value="staff">Staff</option>
                                            </select>
                                            <span id="role-error" className="text-xs text-red-500"></span>
                                        </div>
                                        <div>
                                            <label htmlFor="dealership" className="block text-sm font-medium text-gray-700">Dealership *</label>
                                            <select
                                                id="dealership"
                                                name="dealership"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            >
                                                <option value="">Select dealership</option>
                                                <option value="1">City Motors</option>
                                                <option value="2">Highway Auto</option>
                                                <option value="3">Luxury Cars Inc</option>
                                                <option value="4">Downtown Autos</option>
                                            </select>
                                            <span id="dealership-error" className="text-xs text-red-500"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="userPhone"
                                            name="userPhone"
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                        />
                                        <span id="userPhone-error" className="text-xs text-red-500"></span>
                                    </div>

                                    <div>
                                        <label className="form-label text-sm fw-semibold text-secondary mb-2">Permissions</label>

                                        <div className="mb-2 form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input p-1"
                                                type="checkbox"
                                                name="permissions"
                                                value="manage_users"
                                                id="manageUsers"
                                                style={{ width: "16px", color: "#032D45", height: "16px" }}
                                            />
                                            <label className="form-check-label small fw-semibold text-dark" htmlFor="manageUsers">
                                                Manage Users
                                            </label>
                                        </div>

                                        <div className="mb-2 form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input p-1"
                                                type="checkbox"
                                                name="permissions"
                                                value="manage_inventory"
                                                id="manageInventory"
                                                style={{ width: "16px", color: "#032D45", height: "16px" }}
                                            />
                                            <label className="form-check-label small fw-semibold text-dark" htmlFor="manageInventory">
                                                Manage Inventory
                                            </label>
                                        </div>

                                        <div className="mb-2 form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input p-1"
                                                type="checkbox"
                                                name="permissions"
                                                value="view_reports"
                                                id="viewReports"
                                                style={{ width: "16px", color: "#032D45", height: "16px" }}
                                            />
                                            <label className="form-check-label small fw-semibold text-dark" htmlFor="viewReports">
                                                View Reports
                                            </label>
                                        </div>

                                        <div className="mb-2 form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input p-1"
                                                type="checkbox"
                                                name="permissions"
                                                value="manage_orders"
                                                id="manageOrders"
                                                style={{ width: "16px", color: "#032D45", height: "16px" }}
                                            />
                                            <label className="form-check-label small fw-semibold text-dark" htmlFor="manageOrders">
                                                Manage Orders
                                            </label>
                                        </div>
                                    </div>


                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const modal = document.getElementById('user-modal');
                                                if (modal) modal.style.display = 'none';
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition !rounded-button whitespace-nowrap"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition !rounded-button whitespace-nowrap"
                                        >
                                            Save User
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div id="sales-chart" style={{ height: '300px' }}></div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div id="order-chart" style={{ height: '300px' }}></div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div id="inventory-chart" style={{ height: '300px' }}></div>
                    </div>
                </div>
                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">View All</a>
                        </div>
                        <div className="p-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dealership</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">#ORD-5293</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">City Motors</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Jun 19, 2025</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">#ORD-5292</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Highway Auto</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Jun 18, 2025</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Processing</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">#ORD-5291</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Luxury Cars Inc</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Jun 18, 2025</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">#ORD-5290</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Downtown Autos</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">Jun 17, 2025</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelled</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-800">Recent Activities</h2>
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">View All</a>
                        </div>
                        <div className="p-4">
                            <ul className="divide-y divide-gray-200">
                                <li className="py-3">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                                <i className="fas fa-user-plus"></i>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-800">New user <span className="font-medium">Sarah Johnson</span> was added to <span className="font-medium">City Motors</span></p>
                                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                                                <i className="fas fa-check-circle"></i>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-800">Order <span className="font-medium">#ORD-5293</span> was marked as completed</p>
                                            <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                                                <i className="fas fa-store"></i>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-800">Dealership <span className="font-medium">Luxury Cars Inc</span> updated their inventory</p>
                                            <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                                                <i className="fas fa-sync"></i>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-gray-800">System update <span className="font-medium">v2.3.0</span> was successfully installed</p>
                                            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Dashboard