// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import api from "../../../utils/axiosInterceptor";

const Reporting = () => {
  const [reportType, setReportType] = useState('Orders');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [dealership, setDealership] = useState('All Dealerships');
  const [dealershipId, setDealershipId] = useState('all');
  const [exportType, setExportType] = useState('Excel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null);
  const [dealerships, setDealerships] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  
  const reportTypes = ['Orders', 'Sales', 'Inventory', 'Financial'];
  const exportTypes = ['Excel', 'PDF'];

  // Refs for charts to prevent memory leaks
  const chartRefs = useRef({
    mainChart: null,
    secondaryChart: null,
    tertiaryChart: null
  });

  // Sample data for demonstration
  const sampleData = {
    Orders: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      order_volume: [120, 200, 150, 80, 70, 110],
      order_status: [
        { value: 735, name: 'Completed' },
        { value: 310, name: 'Processing' },
        { value: 234, name: 'Pending' },
        { value: 135, name: 'Cancelled' }
      ],
      dealership_names: ['Downtown', 'Westside', 'Eastside', 'Northpoint'],
      orders_by_dealership: [320, 240, 301, 174],
      file_size: '1.2 MB'
    },
    Sales: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      current_year_sales: [920, 1032, 1201, 1154, 1490, 1630],
      previous_year_sales: [820, 932, 901, 934, 1290, 1330],
      sales_by_category: [
        { value: 1048, name: 'Sedans' },
        { value: 735, name: 'SUVs' },
        { value: 580, name: 'Trucks' },
        { value: 484, name: 'Luxury' },
        { value: 300, name: 'Electric' }
      ],
      dealership_names: ['Downtown', 'Westside', 'Eastside', 'Northpoint'],
      monthly_sales_by_dealership: [
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
      ],
      file_size: '1.5 MB'
    },
    Inventory: {
      inventory_categories: ['Sedans', 'SUVs', 'Trucks', 'Luxury', 'Electric'],
      inventory_levels: [120, 200, 150, 80, 70],
      inventory_status: [
        { value: 1048, name: 'In Stock' },
        { value: 735, name: 'Low Stock' },
        { value: 580, name: 'Out of Stock' },
        { value: 484, name: 'On Order' }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      turnover_rates: [3.2, 3.5, 3.1, 3.4, 3.8, 4.1],
      file_size: '0.9 MB'
    },
    Financial: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      revenue: [2500, 2800, 3200, 3100, 3600, 3800],
      expenses: [1500, 1800, 1700, 1900, 2200, 2100],
      profit_margins: [28, 30, 32, 35, 38, 42],
      expense_breakdown: [
        { value: 1048, name: 'Inventory' },
        { value: 735, name: 'Salaries' },
        { value: 580, name: 'Marketing' },
        { value: 484, name: 'Operations' },
        { value: 300, name: 'Other' }
      ],
      file_size: '1.8 MB'
    }
  };

  // Fetch dealerships data
  const fetchDealerships = async () => {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data for dealerships
      const mockDealerships = [
        { id: 'd1', name: 'Downtown Auto' },
        { id: 'd2', name: 'Westside Motors' },
        { id: 'd3', name: 'Eastside Dealership' },
        { id: 'd4', name: 'Northpoint Cars' }
      ];
      
      // Add "All Dealerships" option at the beginning
      setDealerships([{ id: 'all', name: 'All Dealerships' }, ...mockDealerships]);
    } catch (error) {
      console.error("Error fetching dealerships:", error);
      setError("Failed to load dealerships. Please try again later.");
    }
  };

  // Generate report function
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setDownloadProgress(0);
    setIsDownloadReady(false);
    setError(null);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate progress
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Use sample data based on report type
      const data = sampleData[reportType];
      
      // Complete progress
      clearInterval(interval);
      setDownloadProgress(100);
      
      // Process response data
      setReportData(data);
      setIsGenerating(false);
      setIsDownloadReady(true);
      
    } catch (error) {
      console.error("Error generating report:", error);
      setIsGenerating(false);
      setError("Failed to generate report. Please try again.");
    }
  };

  // Initialize dealerships data
  useEffect(() => {
    fetchDealerships();
  }, []);

  // Initialize charts when report is ready
  useEffect(() => {
    if (isDownloadReady && reportData) {
      // Initialize or update charts
      const initCharts = () => {
        const mainChartDom = document.getElementById('main-chart');
        const secondaryChartDom = document.getElementById('secondary-chart');
        const tertiaryChartDom = document.getElementById('tertiary-chart');

        // Dispose previous charts if they exist
        if (chartRefs.current.mainChart) {
          chartRefs.current.mainChart.dispose();
        }
        if (chartRefs.current.secondaryChart) {
          chartRefs.current.secondaryChart.dispose();
        }
        if (chartRefs.current.tertiaryChart) {
          chartRefs.current.tertiaryChart.dispose();
        }

        // Create new charts
        chartRefs.current.mainChart = echarts.init(mainChartDom);
        chartRefs.current.secondaryChart = echarts.init(secondaryChartDom);
        chartRefs.current.tertiaryChart = echarts.init(tertiaryChartDom);

        // Chart options based on report type and data
        let mainOption, secondaryOption, tertiaryOption;

        if (reportType === 'Orders') {
          // Orders Volume Chart
          mainOption = {
            title: {
              text: 'Order Volume by Month',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              data: reportData.months
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Orders',
                type: 'bar',
                data: reportData.order_volume,
                itemStyle: {
                  color: '#3b82f6'
                }
              }
            ]
          };

          // Order Status Distribution
          secondaryOption = {
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
                data: reportData.order_status,
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

          // Orders by Dealership
          tertiaryOption = {
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
              data: reportData.dealership_names
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Orders',
                type: 'bar',
                data: reportData.orders_by_dealership,
                itemStyle: {
                  color: '#10b981'
                }
              }
            ]
          };
        } 
        else if (reportType === 'Sales') {
          // Sales Revenue Trends
          mainOption = {
            title: {
              text: 'Sales Revenue Trends',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Current Year', 'Previous Year'],
              bottom: 0
            },
            xAxis: {
              type: 'category',
              data: reportData.months
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Current Year',
                type: 'line',
                data: reportData.current_year_sales,
                smooth: true,
                lineStyle: {
                  color: '#3b82f6'
                },
                itemStyle: {
                  color: '#3b82f6'
                }
              },
              {
                name: 'Previous Year',
                type: 'line',
                data: reportData.previous_year_sales,
                smooth: true,
                lineStyle: {
                  color: '#10b981'
                },
                itemStyle: {
                  color: '#10b981'
                }
              }
            ]
          };

          // Sales by Product Category
          secondaryOption = {
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
                data: reportData.sales_by_category,
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

          // Monthly Sales by Dealership
          tertiaryOption = {
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
              data: reportData.dealership_names,
              bottom: 0
            },
            xAxis: {
              type: 'category',
              data: reportData.months
            },
            yAxis: {
              type: 'value'
            },
            series: reportData.monthly_sales_by_dealership
          };
        } 
        else if (reportType === 'Inventory') {
          // Inventory Levels by Category
          mainOption = {
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
              data: reportData.inventory_categories
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Inventory',
                type: 'bar',
                data: reportData.inventory_levels,
                itemStyle: {
                  color: '#8b5cf6'
                }
              }
            ]
          };

          // Inventory Status
          secondaryOption = {
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
                data: reportData.inventory_status,
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

          // Inventory Turnover Rate
          tertiaryOption = {
            title: {
              text: 'Inventory Turnover Rate',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              data: reportData.months
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Turnover Rate',
                type: 'line',
                data: reportData.turnover_rates,
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
        } 
        else if (reportType === 'Financial') {
          // Revenue vs Expenses
          mainOption = {
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
              data: reportData.months
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Revenue',
                type: 'bar',
                data: reportData.revenue,
                itemStyle: {
                  color: '#10b981'
                }
              },
              {
                name: 'Expenses',
                type: 'bar',
                data: reportData.expenses,
                itemStyle: {
                  color: '#ef4444'
                }
              }
            ]
          };

          // Profit Margin
          secondaryOption = {
            title: {
              text: 'Profit Margin',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              data: reportData.months
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
                data: reportData.profit_margins,
                smooth: true,
                lineStyle: {
                  color: '#3b82f6'
                },
                itemStyle: {
                  color: '#3b82f6'
                },
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                  ]
                }
              }
            ]
          };

          // Expense Breakdown
          tertiaryOption = {
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
                data: reportData.expense_breakdown,
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
        }

        // Set chart options
        chartRefs.current.mainChart.setOption(mainOption);
        chartRefs.current.secondaryChart.setOption(secondaryOption);
        chartRefs.current.tertiaryChart.setOption(tertiaryOption);

        // Handle window resize
        const handleResize = () => {
          chartRefs.current.mainChart.resize();
          chartRefs.current.secondaryChart.resize();
          chartRefs.current.tertiaryChart.resize();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      };

      initCharts();
    }
  }, [isDownloadReady, reportType, reportData]);

  // Clean up charts on unmount
  useEffect(() => {
    return () => {
      if (chartRefs.current.mainChart) {
        chartRefs.current.mainChart.dispose();
      }
      if (chartRefs.current.secondaryChart) {
        chartRefs.current.secondaryChart.dispose();
      }
      if (chartRefs.current.tertiaryChart) {
        chartRefs.current.tertiaryChart.dispose();
      }
    };
  }, []);

  // Handle download report
  const handleDownload = async () => {
    try {
      // Create mock file content based on export type
      let content, mimeType, extension;
      
      if (exportType === 'Excel') {
        // Create simple CSV content (in a real app, you'd use a library like exceljs)
        let csvContent = "Category,Value\n";
        if (reportType === 'Orders') {
          reportData.order_status.forEach(item => {
            csvContent += `${item.name},${item.value}\n`;
          });
        } else if (reportType === 'Sales') {
          reportData.sales_by_category.forEach(item => {
            csvContent += `${item.name},${item.value}\n`;
          });
        }
        
        content = csvContent;
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        extension = 'xlsx';
      } else {
        // For PDF, we'll just create a simple text representation
        let pdfContent = `${reportType} Report\n`;
        pdfContent += `Generated on: ${new Date().toLocaleString()}\n`;
        pdfContent += `Date Range: ${startDate} to ${endDate}\n`;
        pdfContent += `Dealership: ${dealership}\n\n`;
        
        if (reportType === 'Orders') {
          pdfContent += "Order Volume:\n";
          reportData.months.forEach((month, index) => {
            pdfContent += `${month}: ${reportData.order_volume[index]}\n`;
          });
        }
        
        content = pdfContent;
        mimeType = 'application/pdf';
        extension = 'pdf';
      }
      
      // Create blob
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}_Report_${new Date().toISOString().split('T')[0]}.${extension}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error downloading report:", error);
      setError("Failed to download report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
          <p className="text-gray-600 mt-2">Generate and analyze detailed reports for your business</p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

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
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer whitespace-nowrap"
                onClick={() => setShowDropdown(showDropdown === 'reportType' ? null : 'reportType')}
              >
                <div className="flex items-center justify-between">
                  <span>{reportType}</span>
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
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
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="date"
                id="end-date"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer whitespace-nowrap"
                onClick={() => setShowDropdown(showDropdown === 'dealership' ? null : 'dealership')}
              >
                <div className="flex items-center justify-between">
                  <span>{dealership}</span>
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              {showDropdown === 'dealership' && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-60 overflow-y-auto">
                  {dealerships.map((dealer) => (
                    <div
                      key={dealer.id}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setDealership(dealer.name);
                        setDealershipId(dealer.id);
                        setShowDropdown(null);
                      }}
                    >
                      {dealer.name}
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
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer whitespace-nowrap"
                onClick={() => setShowDropdown(showDropdown === 'exportType' ? null : 'exportType')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {exportType === 'Excel' ? (
                      <svg className="h-5 w-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    <span>{exportType}</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
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
                    <svg className="h-5 w-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Excel
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                    onClick={() => {
                      setExportType('PDF');
                      setShowDropdown(null);
                    }}
                  >
                    <svg className="h-5 w-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="md:col-span-2 lg:col-span-4 flex justify-center mt-4">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center cursor-pointer whitespace-nowrap"
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Download Section */}
        {isDownloadReady && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Download Report</h2>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  {exportType === 'Excel' ? (
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{reportType} Report - {new Date().toLocaleDateString()}.{exportType.toLowerCase()}</h3>
                  <p className="text-sm text-gray-500">Generated on {new Date().toLocaleString()} • {reportData.file_size}</p>
                </div>
              </div>

              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
                onClick={handleDownload}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
        )}

        {/* Graphical Overview */}
        {isDownloadReady && reportData && (
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

        {/* Loading Indicator */}
        {isGenerating && !isDownloadReady && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mb-4">
              <svg className="h-12 w-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
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

        {/* Initial State */}
        {!isGenerating && !isDownloadReady && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4">
              <svg className="h-12 w-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
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