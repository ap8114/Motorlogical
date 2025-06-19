// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const Reporting = () => {
  const [reportType, setReportType] = useState('Orders');
  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-06-19');
  const [dealership, setDealership] = useState('All Dealerships');
  const [exportType, setExportType] = useState('Excel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null);

  const reportTypes = ['Orders', 'Sales', 'Inventory', 'Financial'];
  const dealerships = ['All Dealerships', 'Downtown Motors', 'Westside Auto', 'Eastside Vehicles', 'Northpoint Cars'];
  const exportTypes = ['Excel', 'PDF'];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setDownloadProgress(0);
    setIsDownloadReady(false);
    
    // Simulate report generation
    const timer = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsGenerating(false);
          setIsDownloadReady(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  useEffect(() => {
    if (isDownloadReady) {
      const chartDom = document.getElementById('main-chart');
      const chartDom2 = document.getElementById('secondary-chart');
      const chartDom3 = document.getElementById('tertiary-chart');
      
      if (chartDom && chartDom2 && chartDom3) {
        const myChart = echarts.init(chartDom);
        const myChart2 = echarts.init(chartDom2);
        const myChart3 = echarts.init(chartDom3);
        
        // Different chart options based on report type
        if (reportType === 'Orders') {
          const option = {
            animation: false,
            title: {
              text: 'Order Volume by Month',
              left: 'center'
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
                name: 'Orders',
                type: 'bar',
                data: [120, 200, 150, 80, 70, 110],
                itemStyle: {
                  color: '#3b82f6'
                }
              }
            ]
          };
          myChart.setOption(option);
          
          const option2 = {
            animation: false,
            title: {
              text: 'Order Status Distribution',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Status',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 735, name: 'Completed' },
                  { value: 310, name: 'Processing' },
                  { value: 234, name: 'Pending' },
                  { value: 135, name: 'Cancelled' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart2.setOption(option2);
          
          const option3 = {
            animation: false,
            title: {
              text: 'Orders by Dealership',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Orders'],
              bottom: 0
            },
            xAxis: {
              type: 'category',
              data: ['Downtown', 'Westside', 'Eastside', 'Northpoint']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Orders',
                type: 'bar',
                data: [320, 240, 301, 174],
                itemStyle: {
                  color: '#10b981'
                }
              }
            ]
          };
          myChart3.setOption(option3);
        } else if (reportType === 'Sales') {
          const option = {
            animation: false,
            title: {
              text: 'Sales Revenue Trends',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['2024', '2025'],
              bottom: 0
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
                name: '2024',
                type: 'line',
                data: [820, 932, 901, 934, 1290, 1330],
                smooth: true
              },
              {
                name: '2025',
                type: 'line',
                data: [920, 1032, 1201, 1154, 1490, 1630],
                smooth: true
              }
            ]
          };
          myChart.setOption(option);
          
          const option2 = {
            animation: false,
            title: {
              text: 'Sales by Product Category',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Sales',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'Sedans' },
                  { value: 735, name: 'SUVs' },
                  { value: 580, name: 'Trucks' },
                  { value: 484, name: 'Luxury' },
                  { value: 300, name: 'Electric' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart2.setOption(option2);
          
          const option3 = {
            animation: false,
            title: {
              text: 'Monthly Sales by Dealership',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['Downtown', 'Westside', 'Eastside', 'Northpoint'],
              bottom: 0
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
                name: 'Downtown',
                type: 'bar',
                stack: 'total',
                data: [320, 302, 301, 334, 390, 330]
              },
              {
                name: 'Westside',
                type: 'bar',
                stack: 'total',
                data: [120, 132, 101, 134, 90, 230]
              },
              {
                name: 'Eastside',
                type: 'bar',
                stack: 'total',
                data: [220, 182, 191, 234, 290, 330]
              },
              {
                name: 'Northpoint',
                type: 'bar',
                stack: 'total',
                data: [150, 212, 201, 154, 190, 330]
              }
            ]
          };
          myChart3.setOption(option3);
        } else if (reportType === 'Inventory') {
          const option = {
            animation: false,
            title: {
              text: 'Inventory Levels by Category',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            xAxis: {
              type: 'category',
              data: ['Sedans', 'SUVs', 'Trucks', 'Luxury', 'Electric']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Inventory',
                type: 'bar',
                data: [120, 200, 150, 80, 70],
                itemStyle: {
                  color: '#8b5cf6'
                }
              }
            ]
          };
          myChart.setOption(option);
          
          const option2 = {
            animation: false,
            title: {
              text: 'Inventory Status',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Status',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'In Stock' },
                  { value: 735, name: 'Low Stock' },
                  { value: 580, name: 'Out of Stock' },
                  { value: 484, name: 'On Order' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart2.setOption(option2);
          
          const option3 = {
            animation: false,
            title: {
              text: 'Inventory Turnover Rate',
              left: 'center'
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
                name: 'Turnover Rate',
                type: 'line',
                data: [3.2, 3.5, 3.1, 3.4, 3.8, 4.1],
                smooth: true,
                lineStyle: {
                  color: '#ec4899'
                },
                itemStyle: {
                  color: '#ec4899'
                }
              }
            ]
          };
          myChart3.setOption(option3);
        } else if (reportType === 'Financial') {
          const option = {
            animation: false,
            title: {
              text: 'Revenue vs Expenses',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Revenue', 'Expenses'],
              bottom: 0
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
                name: 'Revenue',
                type: 'bar',
                data: [2500, 2800, 3200, 3100, 3600, 3800]
              },
              {
                name: 'Expenses',
                type: 'bar',
                data: [1500, 1800, 1700, 1900, 2200, 2100]
              }
            ]
          };
          myChart.setOption(option);
          
          const option2 = {
            animation: false,
            title: {
              text: 'Profit Margin',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}%'
              }
            },
            series: [
              {
                name: 'Profit Margin',
                type: 'line',
                data: [28, 30, 32, 35, 38, 42],
                smooth: true,
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                  ]
                }
              }
            ]
          };
          myChart2.setOption(option2);
          
          const option3 = {
            animation: false,
            title: {
              text: 'Expense Breakdown',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Expenses',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'Inventory' },
                  { value: 735, name: 'Salaries' },
                  { value: 580, name: 'Marketing' },
                  { value: 484, name: 'Operations' },
                  { value: 300, name: 'Other' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart3.setOption(option3);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
          myChart.resize();
          myChart2.resize();
          myChart3.resize();
        });
      }
    }
    
   
    
  
    

  }, [isDownloadReady, reportType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
          <p className="text-gray-600 mt-2">Generate and analyze detailed reports for your business</p>
        </header>
        
        {/* Report Filter Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Report Type Dropdown */}
            <div className="dropdown-container relative">
              <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <button
                id="report-type"
                type="button"
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => setShowDropdown(showDropdown === 'reportType' ? null : 'reportType')}
              >
                <div className="flex items-center justify-between">
                  <span>{reportType}</span>
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </button>
              {showDropdown === 'reportType' && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1">
                  {reportTypes.map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setReportType(type);
                        setShowDropdown(null);
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Date Range Picker */}
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="date"
                id="start-date"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !rounded-button"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="date"
                id="end-date"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !rounded-button"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            {/* Dealership Filter */}
            <div className="dropdown-container relative">
              <label htmlFor="dealership" className="block text-sm font-medium text-gray-700 mb-1">Dealership</label>
              <button
                id="dealership"
                type="button"
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => setShowDropdown(showDropdown === 'dealership' ? null : 'dealership')}
              >
                <div className="flex items-center justify-between">
                  <span>{dealership}</span>
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </button>
              {showDropdown === 'dealership' && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-y-auto">
                  {dealerships.map((dealer) => (
                    <div
                      key={dealer}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setDealership(dealer);
                        setShowDropdown(null);
                      }}
                    >
                      {dealer}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Export Type */}
            <div className="dropdown-container relative">
              <label htmlFor="export-type" className="block text-sm font-medium text-gray-700 mb-1">Export Type</label>
              <button
                id="export-type"
                type="button"
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => setShowDropdown(showDropdown === 'exportType' ? null : 'exportType')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className={`fas ${exportType === 'Excel' ? 'fa-file-excel' : 'fa-file-pdf'} mr-2 ${exportType === 'Excel' ? 'text-green-600' : 'text-red-600'}`}></i>
                    <span>{exportType}</span>
                  </div>
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </button>
              {showDropdown === 'exportType' && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1">
                  <div
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                    onClick={() => {
                      setExportType('Excel');
                      setShowDropdown(null);
                    }}
                  >
                    <i className="fas fa-file-excel mr-2 text-green-600"></i>
                    Excel
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                    onClick={() => {
                      setExportType('PDF');
                      setShowDropdown(null);
                    }}
                  >
                    <i className="fas fa-file-pdf mr-2 text-red-600"></i>
                    PDF
                  </div>
                </div>
              )}
            </div>
            
            {/* Generate Button - Full width on mobile, auto on larger screens */}
            <div className="md:col-span-2 lg:col-span-4 flex justify-center mt-4">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center !rounded-button cursor-pointer whitespace-nowrap"
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <i className="fas fa-chart-bar mr-2"></i>
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Download Section - Only show when report is ready */}
        {isDownloadReady && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Download Report</h2>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <i className={`fas ${exportType === 'Excel' ? 'fa-file-excel text-green-600' : 'fa-file-pdf text-red-600'} text-xl`}></i>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{reportType} Report - {new Date().toLocaleDateString()}.{exportType.toLowerCase()}</h3>
                  <p className="text-sm text-gray-500">Generated on {new Date().toLocaleString()} • 2.4 MB</p>
                </div>
              </div>
              
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 !rounded-button cursor-pointer whitespace-nowrap"
              >
                <i className="fas fa-download mr-2"></i>
                Download
              </button>
            </div>
          </div>
        )}
        
        {/* Graphical Overview - Only show when report is ready */}
        {isDownloadReady && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {reportType} Report Overview
              <span className="text-sm font-normal text-gray-500 ml-2">
                {startDate} to {endDate}
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 h-80" id="main-chart"></div>
              <div className="bg-gray-50 rounded-lg p-4 h-80" id="secondary-chart"></div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 h-80" id="tertiary-chart"></div>
          </div>
        )}
        
        {/* Loading Indicator when generating but not yet ready */}
        {isGenerating && !isDownloadReady && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mb-4">
              <i className="fas fa-chart-line text-blue-500 text-5xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Generating Your Report</h2>
            <p className="text-gray-600 mb-6">Please wait while we compile your data...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 max-w-md mx-auto">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{downloadProgress}% Complete</p>
          </div>
        )}
        
        {/* Initial State - No report generated yet */}
        {!isGenerating && !isDownloadReady && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4">
              <i className="fas fa-chart-pie text-blue-500 text-5xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Reports Generated Yet</h2>
            <p className="text-gray-600 mb-4">Use the filters above to generate a new report</p>
            <p className="text-sm text-gray-500">Reports will appear here after generation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reporting;
