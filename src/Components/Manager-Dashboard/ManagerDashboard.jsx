// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import * as echarts from 'echarts';

const ManagerDashboard = () => {

    //   const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
    const [timeRange] = useState("last7days");

    const dealershipName = "Luxury Motors Group";

    // Initialize chart after component mounts
    React.useEffect(() => {
        const salesChartElement = document.getElementById('sales-chart');
        const inventoryChartElement = document.getElementById('inventory-chart');

        if (salesChartElement) {
            const salesChart = echarts.init(salesChartElement);

            const salesOption = {
                animation: false,
                title: {
                    text: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: timeRange === 'daily'
                        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        : timeRange === 'weekly'
                            ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                },
                yAxis: {
                    type: 'value',
                    name: 'Sales ($)',
                    nameLocation: 'middle',
                    nameGap: 40
                },
                series: [
                    {
                        name: 'New Vehicles',
                        type: 'bar',
                        stack: 'total',
                        barWidth: '60%',
                        data: timeRange === 'daily'
                            ? [320, 302, 301, 334, 390, 330, 320]
                            : timeRange === 'weekly'
                                ? [1200, 1350, 1100, 1420]
                                : [2200, 1820, 1910, 2340, 2900, 3300],
                        color: '#4F46E5'
                    },
                    {
                        name: 'Used Vehicles',
                        type: 'bar',
                        stack: 'total',
                        data: timeRange === 'daily'
                            ? [120, 132, 101, 134, 90, 230, 210]
                            : timeRange === 'weekly'
                                ? [520, 630, 540, 720]
                                : [1200, 1400, 1350, 1450, 1700, 1950],
                        color: '#10B981'
                    }
                ]
            };

            salesChart.setOption(salesOption);

            // Handle resize
            window.addEventListener('resize', () => {
                salesChart.resize();
            });

            return () => {
                window.removeEventListener('resize', () => {
                    salesChart.resize();
                });
                salesChart.dispose();
            };
        }

        if (inventoryChartElement) {
            const inventoryChart = echarts.init(inventoryChartElement);

            const inventoryOption = {
                animation: false,
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '0%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Inventory Status',
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
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 148, name: 'Available', itemStyle: { color: '#10B981' } },
                            { value: 42, name: 'Reserved', itemStyle: { color: '#F59E0B' } },
                            { value: 35, name: 'In Transit', itemStyle: { color: '#3B82F6' } }
                        ]
                    }
                ]
            };

            inventoryChart.setOption(inventoryOption);

            // Handle resize
            window.addEventListener('resize', () => {
                inventoryChart.resize();
            });

            return () => {
                window.removeEventListener('resize', () => {
                    inventoryChart.resize();
                });
                inventoryChart.dispose();
            };
        }
    }, [timeRange]);

    //   const handleTimeRangeChange = (range: 'daily' | 'weekly' | 'monthly') => {
    //     setTimeRange(range);
    //   };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dealership Overview</h1>
                    <h2 className="text-xl text-gray-600 mt-1">{dealershipName}</h2>
                  
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Current Sales Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Current Sales</h3>
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                <i className="fas fa-dollar-sign text-indigo-600 text-xl"></i>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">$1.2M</p>
                        <p className="text-sm text-gray-500 mt-2">
                            <span className="text-green-500"><i className="fas fa-arrow-up mr-1"></i>12%</span> from last month
                        </p>
                    </div>

                    {/* Inventory Count Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Inventory Count</h3>
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <i className="fas fa-car text-green-600 text-xl"></i>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">225</p>
                        <p className="text-sm text-gray-500 mt-2">
                            <span className="text-red-500"><i className="fas fa-arrow-down mr-1"></i>5%</span> from last month
                        </p>
                    </div>

                    {/* Orders in Progress Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Orders in Progress</h3>
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                <i className="fas fa-clipboard-list text-amber-600 text-xl"></i>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">42</p>
                        <p className="text-sm text-gray-500 mt-2">
                            <span className="text-green-500"><i className="fas fa-arrow-up mr-1"></i>8%</span> from last month
                        </p>
                    </div>

                    {/* Customer Satisfaction Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Customer Satisfaction</h3>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <i className="fas fa-smile text-blue-600 text-xl"></i>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">4.8/5</p>
                        <p className="text-sm text-gray-500 mt-2">
                            <span className="text-green-500"><i className="fas fa-arrow-up mr-1"></i>0.2</span> from last month
                        </p>
                    </div>
                </div>

                {/* Sales Graph Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
    Sales Performance
  </h3>

  <div className="flex flex-wrap gap-2">
    {['daily', 'weekly', 'monthly'].map((range) => (
      <button
        key={range}
        onClick={() => handleTimeRangeChange(range)}
        className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap cursor-pointer ${
          timeRange === range
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {range.charAt(0).toUpperCase() + range.slice(1)}
      </button>
    ))}
  </div>
</div>

                    <div id="sales-chart" className="w-full h-80"></div>
                    <div className="flex justify-end mt-4">
                        <p className="text-sm text-gray-500">Last updated: June 19, 2025 - 10:30 AM</p>
                    </div>
                </div>

                {/* Inventory Status Widget */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Inventory Status</h3>
                        <div id="inventory-chart" className="w-full h-64 mb-6"></div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-gray-700">Available</span>
                                </div>
                                <span className="font-semibold">148 vehicles</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                                    <span className="text-gray-700">Reserved</span>
                                </div>
                                <span className="font-semibold">42 vehicles</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                    <span className="text-gray-700">In Transit</span>
                                </div>
                                <span className="font-semibold">35 vehicles</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Inventory Categories</h3>
                            <div className="relative">
                                <button className="flex items-center px-4 py-2 bg-gray-100 rounded-md !rounded-button whitespace-nowrap cursor-pointer hover:bg-gray-200 text-sm font-medium text-gray-700">
                                    <span>Filter</span>
                                    <i className="fas fa-chevron-down ml-2 text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Count
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Avg. Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-car-side text-indigo-600"></i>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Sedan</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            78
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            $32,450
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Optimal
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-truck-monster text-blue-600"></i>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">SUV</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            64
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            $45,780
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Optimal
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-truck-pickup text-red-600"></i>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Truck</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            32
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            $52,300
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Low Stock
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-car text-purple-600"></i>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Luxury</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            51
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            $78,900
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Optimal
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
