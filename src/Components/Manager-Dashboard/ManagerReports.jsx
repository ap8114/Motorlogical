// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';


const ManagerReports= () => {
  const [reportType, setReportType] = useState('sales');
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [period, setPeriod] = useState('June 2025');
  const [isExporting, setIsExporting] = useState(false);
  
  const months = [
    'January 2025', 'February 2025', 'March 2025', 
    'April 2025', 'May 2025', 'June 2025'
  ];
  
  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: 'fa-chart-line' },
    { id: 'inventory', name: 'Inventory Report', icon: 'fa-warehouse' },
    { id: 'financial', name: 'Financial Report', icon: 'fa-dollar-sign' },
    { id: 'customer', name: 'Customer Report', icon: 'fa-users' }
  ];
  
  const timeFrames = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'yearly', name: 'Yearly' }
  ];
  
  const reportData= [
    { month: 'January', sales: 42, revenue: 1250000, profit: 187500, customers: 38 },
    { month: 'February', sales: 38, revenue: 1140000, profit: 171000, customers: 35 },
    { month: 'March', sales: 45, revenue: 1350000, profit: 202500, customers: 41 },
    { month: 'April', sales: 52, revenue: 1560000, profit: 234000, customers: 48 },
    { month: 'May', sales: 48, revenue: 1440000, profit: 216000, customers: 44 },
    { month: 'June', sales: 56, revenue: 1680000, profit: 252000, customers: 51 }
  ];
  
  const currentMonthData = reportData.find(data => data.month === period.split(' ')[0]) || reportData[5];
  
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
    }, 1500);
  };
  
  useEffect(() => {
    // Initialize sales trend chart
    const salesTrendElement = document.getElementById('sales-trend-chart');
    if (salesTrendElement) {
      const salesChart = echarts.init(salesTrendElement);
      const option = {
        animation: false,
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
          data: reportData.map(data => data.month),
          axisLabel: {
            rotate: 0
          }
        },
        yAxis: {
          type: 'value',
          name: 'Amount',
          nameLocation: 'middle',
          nameGap: 40
        },
        series: [
          {
            name: 'Sales',
            type: 'bar',
            data: reportData.map(data => data.sales),
            color: '#4F46E5'
          },
          {
            name: 'Revenue ($)',
            type: 'line',
            yAxisIndex: 0,
            data: reportData.map(data => data.revenue / 10000), // Scaled for visibility
            color: '#10B981'
          }
        ]
      };
      
      salesChart.setOption(option);
      
      // Handle resize
      const handleResize = () => {
        salesChart.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        salesChart.dispose();
      };
    }
  }, [reportType, timeFrame, period]);
  
  useEffect(() => {
    // Initialize vehicle distribution chart
    const vehicleDistElement = document.getElementById('vehicle-distribution-chart');
    if (vehicleDistElement) {
      const vehicleChart = echarts.init(vehicleDistElement);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Vehicle Distribution',
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
              { value: 35, name: 'Sedan', itemStyle: { color: '#4F46E5' } },
              { value: 30, name: 'SUV', itemStyle: { color: '#10B981' } },
              { value: 15, name: 'Truck', itemStyle: { color: '#F59E0B' } },
              { value: 20, name: 'Luxury', itemStyle: { color: '#EC4899' } }
            ]
          }
        ]
      };
      
      vehicleChart.setOption(option);
      
      // Handle resize
      const handleResize = () => {
        vehicleChart.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        vehicleChart.dispose();
      };
    }
  }, [reportType, timeFrame, period]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dealership Reports</h1>
          <p className="text-gray-600 mt-2">Comprehensive analytics and insights for your dealership</p>
     
        </div>
        
        {/* Report Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Report Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <div className="relative">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md cursor-pointer"
                >
                  {reportTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
               
              </div>
            </div>
            
            {/* Time Frame Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Frame
              </label>
              <div className="relative">
                <select
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md cursor-pointer"
                >
                  {timeFrames.map((frame) => (
                    <option key={frame.id} value={frame.id}>
                      {frame.name}
                    </option>
                  ))}
                </select>
               
              </div>
            </div>
            
            {/* Period Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md cursor-pointer"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
               
              </div>
            </div>
          </div>
        </div>
        
        {/* Report Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <i className="fas fa-car text-indigo-600 text-xl"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{currentMonthData.sales}</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500"><i className="fas fa-arrow-up mr-1"></i>8%</span> from previous period
            </p>
          </div>
          
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">${(currentMonthData.revenue / 1000000).toFixed(2)}M</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500"><i className="fas fa-arrow-up mr-1"></i>5%</span> from previous period
            </p>
          </div>
          
          {/* Profit Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Profit</h3>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="fas fa-chart-line text-blue-600 text-xl"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">${(currentMonthData.profit / 1000).toFixed(1)}K</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500"><i className="fas fa-arrow-up mr-1"></i>7%</span> from previous period
            </p>
          </div>
          
          {/* Customers Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Customers</h3>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <i className="fas fa-users text-purple-600 text-xl"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{currentMonthData.customers}</p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500"><i className="fas fa-arrow-up mr-1"></i>12%</span> from previous period
            </p>
          </div>
        </div>
        
        {/* Main Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Sales Trend</h3>
              <div className="text-sm text-gray-500">
                Last 6 months
              </div>
            </div>
            <div id="sales-trend-chart" className="w-full h-80"></div>
          </div>
          
          {/* Vehicle Distribution Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Vehicle Distribution</h3>
            <div id="vehicle-distribution-chart" className="w-full h-64 mb-6"></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
                  <span className="text-gray-700">Sedan</span>
                </div>
                <span className="font-semibold">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-700">SUV</span>
                </div>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-gray-700">Truck</span>
                </div>
                <span className="font-semibold">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                  <span className="text-gray-700">Luxury</span>
                </div>
                <span className="font-semibold">20%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Report Table */}
       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
  <div>
    <p className="text-sm text-gray-700">
      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">50</span> results
    </p>
  </div>
  <div>
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm text-gray-500 hover:bg-gray-50">
        <span className="sr-only">Previous</span>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
        1
      </button>
      <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
        2
      </button>
      <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
        3
      </button>
      <span className="relative inline-flex items-center px-4 py-2 text-sm text-gray-700">...</span>
      <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
        10
      </button>
      <button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm text-gray-500 hover:bg-gray-50">
        <span className="sr-only">Next</span>
        <i className="fas fa-chevron-right"></i>
      </button>
    </nav>
  </div>
</div>

        
        {/* Report Notes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Report Notes</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-info-circle text-yellow-400"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This report includes all sales transactions for {period}. The data is refreshed daily at midnight. For custom reports or additional metrics, please contact the IT department.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <p className="text-sm text-gray-500">Last updated: June 19, 2025 - 10:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;
