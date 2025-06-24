// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
const InventoryManagement = () => {
  const timelineChartRef = useRef(null);
  const statusChartRef = useRef(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("inventory");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [showItemDetailsModal, setShowItemDetailsModal] = useState(false);
  const [demo, selectedItem] = useState();


  const [inventoryData, setInventoryData] = useState([
    {
      stock: 'GA0561',
      vin: 'LMGBB1L87T3144264',
      engine: 'K500535',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'ELEGANT BLACK',
      intColor: 'BLACK',
      orderMonth: '12/12/2024',
      productionEstimate: '1/21/2025',
      shippingDate: '3/3/2025',
      arrivalDate: '4/19/2025',
      shippingIndication: 'DELIVERED'
    },
    {
      stock: 'GA0562',
      vin: 'LMGBB1L85T3144263',
      engine: 'K500537',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'ELEGANT BLACK',
      intColor: 'BLACK',
      orderMonth: '12/12/2024',
      productionEstimate: '1/21/2025',
      shippingDate: '3/3/2025',
      arrivalDate: '4/19/2025',
      shippingIndication: 'SHIPPED'
    },
    {
      stock: 'GA0563',
      vin: 'LMGBB1L82T3144267',
      engine: 'K500610',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'IVORY WHITE',
      intColor: 'BLACK',
      orderMonth: '12/12/2024',
      productionEstimate: '1/21/2025',
      shippingDate: '3/3/2025',
      arrivalDate: '4/19/2025',
      shippingIndication: 'DELIVERED'
    },
    {
      stock: 'GA0564',
      vin: 'LMGBB1L86T3144272',
      engine: 'K500617',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'MOONLIGHT GRAY',
      intColor: 'BLACK',
      orderMonth: '12/12/2024',
      productionEstimate: '1/21/2025',
      shippingDate: '3/3/2025',
      arrivalDate: '4/19/2025',
      shippingIndication: 'SHIPPED'
    },
    {
      stock: 'GA0565',
      vin: 'LMGBB1L84T3144271',
      engine: '500616',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'MOONLIGHT GRAY',
      intColor: 'BLACK',
      orderMonth: '12/12/2024',
      productionEstimate: '1/21/2025',
      shippingDate: '3/3/2025',
      arrivalDate: '4/19/2025',
      shippingIndication: 'DELIVERED'
    },
    {
      stock: 'GA0566',
      vin: 'LMGBB1L82T3144270',
      engine: 'K500615',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'MOONLIGHT GRAY',
      intColor: 'BLACK',
      orderMonth: '12/12/2024',
      productionEstimate: '1/21/2025',
      shippingDate: '3/3/2025',
      arrivalDate: '4/19/2025',
      shippingIndication: 'SHIPPED'
    },
    {
      stock: 'GA0567',
      vin: 'LMGBB1L86T3144269',
      engine: '500614',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'SUPERSTAR SILVEI',
      intColor: 'BLACK',
      orderMonth: '12/12/2024',
      productionEstimate: '1/21/2025',
      shippingDate: '3/3/2025',
      arrivalDate: '4/19/2025',
      shippingIndication: 'SHIPPED'
    },
    // Additional entries
    {
      stock: 'GA0568',
      vin: 'LMGBB1L89T3144275',
      engine: 'K500618',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'METALLIC BLUE',
      intColor: 'BEIGE',
      orderMonth: '12/15/2024',
      productionEstimate: '1/25/2025',
      shippingDate: '3/5/2025',
      arrivalDate: '4/22/2025',
      shippingIndication: 'SHIPPED'
    },
    {
      stock: 'GA0569',
      vin: 'LMGBB1L81T3144276',
      engine: 'K500619',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'PEARL WHITE',
      intColor: 'BLACK',
      orderMonth: '12/18/2024',
      productionEstimate: '1/28/2025',
      shippingDate: '3/8/2025',
      arrivalDate: '4/25/2025',
      shippingIndication: 'DELIVERED'
    },
    {
      stock: 'GA0570',
      vin: 'LMGBB1L83T3144277',
      engine: 'K500620',
      bl: 'EUKOSHBM2011613 BB2A-CW7-00',
      ocnSpec: 'BB2A-CW7-00',
      model: 'EMPOW',
      country: 'INF',
      vinYear: '2026',
      extColor: 'RACING RED',
      intColor: 'BLACK/RED',
      orderMonth: '12/20/2024',
      productionEstimate: '1/30/2025',
      shippingDate: '3/10/2025',
      arrivalDate: '4/28/2025',
      shippingIndication: 'SHIPPED'
    }
    // Add other items in the same format
  ]);
  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: "INV-2025-001",
      name: "2025 SUV Model X",
      category: "SUV",
      quantity: 15,
      status: "Active",
      lastUpdated: "2025-06-15",
      notes: "Popular model, consider increasing stock",
      price: 45000,
    },
    {
      id: "INV-2025-002",
      name: "2025 Sedan Model S",
      category: "Sedan",
      quantity: 8,
      status: "Active",
      lastUpdated: "2025-06-12",
      notes: "New shipment expected next month",
      price: 38500,
    },
    {
      id: "INV-2025-003",
      name: "2025 Luxury Model L",
      category: "Luxury",
      quantity: 3,
      status: "Active",
      lastUpdated: "2025-06-05",
      notes: "Limited stock, high demand",
      price: 72000,
    },
    {
      id: "INV-2025-004",
      name: "2025 Compact Model C",
      category: "Compact",
      quantity: 22,
      status: "Active",
      lastUpdated: "2025-05-20",
      notes: "Sufficient stock available",
      price: 26000,
    },
    {
      id: "INV-2025-005",
      name: "2025 Electric Model E",
      category: "Electric",
      quantity: 0,
      status: "Inactive",
      lastUpdated: "2025-06-01",
      notes: "Out of stock, new shipment delayed",
      price: 58000,
    },
    {
      id: "INV-2025-006",
      name: "2025 Hybrid Model H",
      category: "Hybrid",
      quantity: 7,
      status: "Active",
      lastUpdated: "2025-06-10",
      notes: "Stock running low, reorder soon",
      price: 42500,
    },
  ]);

  // Sample categories for dropdown
  const categories = [
    { id: "1", name: "SUV" },
    { id: "2", name: "Sedan" },
    { id: "3", name: "Luxury" },
    { id: "4", name: "Compact" },
    { id: "5", name: "Electric" },
    { id: "6", name: "Hybrid" },
  ];

  // Form state for add/edit item
  const [itemForm, setItemForm] = useState({
    stockNumber: "",
    vin: "",
    engine: "",
    bl: "",
    ocnSpec: "",
    model: "",
    country: "",
    vinYear: "",
    extColor: "",
    intColor: "",
    orderMonth: "",
    productionEstimate: "",
    shippingDate: "",
    arrivalDate: "",
    shippingIndication: "Delivered"
  });

  // Initialize item details chart
  const itemDetailsChartRef = useRef < HTMLDivElement > null;

  useEffect(() => {
    if (showItemDetailsModal && selectedItem && itemDetailsChartRef.current) {
      const itemHistoryChart = echarts.init(itemDetailsChartRef.current);
      const historyOption = {
        animation: false,
        title: {
          text: "Stock History",
          left: "center",
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
          name: "Stock Level",
        },
        series: [
          {
            name: "Stock Level",
            type: "line",
            data: [5, 8, 12, 10, 7, selectedItem.quantity],
            color: "#4F46E5",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(79, 70, 229, 0.3)" },
                  { offset: 1, color: "rgba(79, 70, 229, 0.1)" },
                ],
              },
            },
            smooth: true,
          },
        ],
      };
      itemHistoryChart.setOption(historyOption);

      return () => {
        itemHistoryChart.dispose();
      };
    }
  }, [showItemDetailsModal, selectedItem]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };


  console.log(selectedItem.name); // for example

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const [data, setData] = useState(inventoryData);

  const handleEditItem = (item) => {
    setItemForm({
      stockNumber: item.stock,
      vin: item.vin,
      engine: item.engine,
      bl: item.bl,
      ocnSpec: item.ocnSpec,
      model: item.model,
      country: item.country,
      vinYear: item.vinYear,
      extColor: item.extColor,
      intColor: item.intColor,
      orderMonth: item.orderMonth,
      productionEstimate: item.productionEstimate,
      shippingDate: item.shippingDate,
      arrivalDate: item.arrivalDate,
      shippingIndication: item.shippingIndication
    });
    setShowAddItemModal(true);
  };

  // Handle save item
  const handleSaveItem = () => {
    if (itemForm.id) {
      // Update existing item
      setInventory(
        inventory.map((item) =>
          item.id === itemForm.id
            ? {
              ...item,
              name: itemForm.name,
              category: itemForm.category,
              quantity: itemForm.quantity,
              status: itemForm.status,
              lastUpdated: new Date().toISOString().split("T")[0],
              notes: itemForm.notes,
              price: itemForm.price,
            }
            : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        id: `INV-2025-${String(inventory.length + 1).padStart(3, "0")}`,
        name: itemForm.name,
        category: itemForm.category,
        quantity: itemForm.quantity,
        status: itemForm.status,
        lastUpdated: new Date().toISOString().split("T")[0],
        notes: itemForm.notes,
        price: itemForm.price,
      };
      setInventory([...inventory, newItem]);
    }
    setShowAddItemModal(false);
  };

  const handleDeleteItem = (itemToDelete) => {
  const updatedItems = items.filter((i) => i.id !== itemToDelete.id);
  setItems(updatedItems);
};

  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      item.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });


  const handleDownloadCSV = () => {
    // Transform your inventory data to match the expected format
    const exportData = inventoryData.map(item => ({
      "Stock Number": item.stock,
      "VIN": item.vin,
      "Engine": item.engine,
      "BL": item.bl,
      "OCN SPEC": item.ocnSpec,
      "Model": item.model,
    "Country": item.country,
      "VIN Year": item.vinYear,
      "Ext. Color": item.extColor,
      "Int. Color": item.intColor,
      "Order Month": item.orderMonth,
      "Production Estimate": item.productionEstimate,
      "Shipping Date": item.shippingDate,
      "Arrival Date": item.arrivalDate,
      "Shipping Indication": item.shippingIndication
    }));

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");

    // Export the file
    XLSX.writeFile(wb, "Inventory_Export.xlsx");
  };

  useEffect(() => {
    // Initialize chart only if the ref is available
    if (timelineChartRef.current) {
      const chart = echarts.init(timelineChartRef.current);

      // Sample shipping data (replace with your actual data)
      const shippingData = [
        {
          stock: 'GA0561',
          model: 'EMPOW',
          shippingDate: '2025-03-03',
          arrivalDate: '2025-04-19',
          status: 'DELIVERED',
          color: '#10B981' // green
        },
        {
          stock: 'GA0562',
          model: 'EMPOW',
          shippingDate: '2025-03-03',
          arrivalDate: '2025-04-19',
          status: 'SHIPPED',
          color: '#3B82F6' // blue
        },
        {
          stock: 'GA0563',
          model: 'EMPOW',
          shippingDate: '2025-03-03',
          arrivalDate: '2025-04-19',
          status: 'DELIVERED',
          color: '#10B981'
        },
        {
          stock: 'GA0564',
          model: 'EMPOW',
          shippingDate: '2025-03-03',
          arrivalDate: '2025-04-19',
          status: 'SHIPPED',
          color: '#3B82F6'
        },
        {
          stock: 'GA0565',
          model: 'EMPOW',
          shippingDate: '2025-03-03',
          arrivalDate: '2025-04-19',
          status: 'DELIVERED',
          color: '#10B981'
        },
        {
          stock: 'GA0566',
          model: 'EMPOW',
          shippingDate: '2025-03-03',
          arrivalDate: '2025-04-19',
          status: 'SHIPPED',
          color: '#3B82F6'
        },
        {
          stock: 'GA0567',
          model: 'EMPOW',
          shippingDate: '2025-03-03',
          arrivalDate: '2025-04-19',
          status: 'SHIPPED',
          color: '#3B82F6'
        }
      ];

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            const data = params[0].data;
            return `
              <div class="p-2">
                <div class="font-bold">${data.stock}</div>
                <div>Model: ${data.model}</div>
                <div>Shipping: ${new Date(data.shippingDate).toLocaleDateString()}</div>
                <div>Arrival: ${new Date(data.arrivalDate).toLocaleDateString()}</div>
                <div class="mt-1">
                  Status: <span class="font-semibold ${data.status === 'DELIVERED' ? 'text-green-600' : 'text-blue-600'}">${data.status}</span>
                </div>
              </div>
            `;
          }
        },
        legend: {
          data: ['DELIVERED', 'SHIPPED'],
          top: 0,
          textStyle: {
            color: '#6B7280'
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
          data: shippingData.map(item => item.stock),
          axisLabel: {
            rotate: 45,
            color: '#6B7280'
          },
          axisLine: {
            lineStyle: {
              color: '#E5E7EB'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: 'Timeline',
          nameTextStyle: {
            color: '#6B7280'
          },
          axisLabel: {
            color: '#6B7280',
            formatter: function (value) {
              // Convert numeric month to month names
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
              return months[value - 1] || '';
            }
          },
          min: 3, // March
          max: 5, // May
          interval: 1,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#E5E7EB'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#F3F4F6'
            }
          }
        },
        series: [
          {
            name: 'Shipping Date',
            type: 'bar',
            stack: 'timeline',
            barWidth: 15,
            itemStyle: {
              color: function (params) {
                return shippingData[params.dataIndex].color;
              },
              borderRadius: [4, 4, 0, 0]
            },
            data: shippingData.map(item => ({
              value: parseInt(item.shippingDate.split('-')[1]), // month
              stock: item.stock,
              model: item.model,
              shippingDate: item.shippingDate,
              arrivalDate: item.arrivalDate,
              status: item.status
            }))
          },
          {
            name: 'Transit Time',
            type: 'bar',
            stack: 'timeline',
            barWidth: 15,
            itemStyle: {
              color: '#E5E7EB', // gray for transit
              borderRadius: [0, 0, 4, 4]
            },
            data: shippingData.map(item => ({
              value: parseInt(item.arrivalDate.split('-')[1]) - parseInt(item.shippingDate.split('-')[1]),
              stock: item.stock,
              model: item.model,
              shippingDate: item.shippingDate,
              arrivalDate: item.arrivalDate,
              status: item.status
            }))
          }
        ]
      };

      chart.setOption(option);

      // Handle window resize
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);
    }
  }, []);



  return (
    <div>
      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left Section: Heading and Subheading */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
              Logistics Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage all vehicle inventory in one place
            </p>
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
            <button
              onClick={handleDownloadCSV}
              className="flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
            >
              <i className="fas fa-download mr-2"></i> Download CSV
            </button>
            <button
              onClick={handleCreateNewItem}
              className="flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto"
            >
              <i className="fas fa-plus mr-2"></i> Add New Item
            </button>
          </div> */}

        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("inventory")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === "inventory"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <i className="fas fa-warehouse mr-2"></i> Inventory List
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeTab === "reports"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <i className="fas fa-chart-bar mr-2"></i> Reports
            </button>
          
          </nav>
        </div>

        {activeTab === "inventory" && (
          <div>
            {/* Shipping Timeline Chart */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping & Delivery Timeline</h3>
              <div className="h-80">
                <div ref={timelineChartRef} className="w-full h-full"></div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg shadow mt-3 overflow-hidden">
              <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {/* Heading */}
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">
                    Shipping Distribution
                  </h3>


                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    {/* 🔍 Search Input */}
                    <input
                      type="text"
                      placeholder="Search..."
                      className="px-4 py-2  mt-3 border border-gray-300 rounded text-sm text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* 🧰 Filter Button */}
                    <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto">
                      <i className="fas fa-filter mr-2"></i> Filter
                    </button>

                    {/* 📤 Export Button */}
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
                      onClick={handleDownloadCSV}
                    >
                      <i className="fas fa-file-export mr-2"></i> Export
                    </button>
                  </div>

                </div>
              </div>

              <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STOCK</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ENGINE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OCN SPEC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MODEL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COUNTRY</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN YEAR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EXT. COLOR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INT. COLOR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER MONTH</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCTION ESTIMATE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SHIPPING DATE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ARRIVAL DATE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SHIPPING INDICATION</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                      <tr key={item.stock} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.vin}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.engine}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bl}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.ocnSpec}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.vinYear}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.extColor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.intColor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.orderMonth}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.productionEstimate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.shippingDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.arrivalDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.shippingIndication === 'DELIVERED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                            }`}>
                            {item.shippingIndication}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          {/* Edit Button */}
                          <button
                            className="text-indigo-600 hover:text-indigo-900 me-3"
                            onClick={() => handleEditItem(item)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>

                          {/* Delete Button */}
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteItem(item)}
                            title="Delete"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="min-h-[600px]">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Report Filters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Report Type
                  </label>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Inventory Summary</option>
                      <option>Stock Level Report</option>
                      <option>Category Analysis</option>
                      <option>Value Distribution</option>
                      <option>Inventory Movement</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Period
                  </label>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Last 30 Days</option>
                      <option>Last Quarter</option>
                      <option>Last 6 Months</option>
                      <option>Year to Date</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dealership
                  </label>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>All Dealerships</option>
                      <option>City Motors</option>
                      <option>Highway Auto</option>
                      <option>Luxury Cars Inc</option>
                      <option>Downtown Autos</option>
                      <option>Valley Vehicles</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-sync-alt mr-2"></i> Generate Report
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="mb-6 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                  {/* Title */}
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    Inventory Summary Report
                  </h2>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition w-full sm:w-auto">
                      <i className="fas fa-print mr-2"></i> Print
                    </button>

                    <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition w-full sm:w-auto">
                      <i className="fas fa-file-pdf mr-2"></i> PDF
                    </button>

                    <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition w-full sm:w-auto">
                      <i className="fas fa-file-excel mr-2"></i> Excel
                    </button>
                  </div>

                </div>
              </div>


              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Models
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Units
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Low Stock
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Out of Stock
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        SUV
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $675,000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Sedan
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        8
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $308,000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Luxury
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        3
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $216,000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Compact
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        22
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $572,000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Electric
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $0
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Hybrid
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        7
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $297,500
                      </td>
                    </tr>
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        TOTAL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        6
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        55
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        2
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        $2,068,500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>Report generated on: June 19, 2025 at 10:30 AM</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Recent Export History
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Report Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Format
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jun 18, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Inventory Summary
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PDF
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        John Doe
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jun 15, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Stock Level Report
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Excel
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        John Doe
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jun 10, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Category Analysis
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PDF
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Sarah Johnson
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap">
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

   
      </main>

      {/* Add/Edit Item Modal */}
      {showAddItemModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Inventory Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddItemModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="stock-number" className="form-label">
                        Stock Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="stock-number"
                        value={itemForm.stockNumber || "GA05E1"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="vin" className="form-label">
                        VIN
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vin"
                        value={itemForm.vin || "LMGBR11871144264"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="engine" className="form-label">
                        Engine
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="engine"
                        value={itemForm.engine || "K500535"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="bl" className="form-label">
                        BL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bl"
                        value={itemForm.bl || "EUROSHBJXD11613 BB2A-CW7-00"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="ocn-spec" className="form-label">
                        OCN SPEC
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ocn-spec"
                        value={itemForm.ocnSpec || "BB2A-CW7-00"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="model" className="form-label">
                        Model
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="model"
                        value={itemForm.model || "EMPGW"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        value={itemForm.country || "INF"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="vin-year" className="form-label">
                        VIN Year
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vin-year"
                        value={itemForm.vinYear || "2006"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="ext-color" className="form-label">
                        Ext. Color
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ext-color"
                        value={itemForm.extColor || "ELEGANT BLACK"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="int-color" className="form-label">
                        Int. Color
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="int-color"
                        value={itemForm.intColor || "BLACK"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="order-month" className="form-label">
                        Order Month
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="order-month"
                        value={itemForm.orderMonth || "12/12/2024"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="production-estimate" className="form-label">
                        Production Estimate
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="production-estimate"
                        value={itemForm.productionEstimate || "1/21/2025"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="shipping-date" className="form-label">
                        Shipping Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="shipping-date"
                        value={itemForm.shippingDate || "3/3/2025"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="arrival-date" className="form-label">
                        Arrival Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="arrival-date"
                        value={itemForm.arrivalDate || "mm/dd/yyyy"}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, arrivalDate: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="shipping-indication" className="form-label">
                      Shipping Indication
                    </label>
                    <select
                      id="shipping-indication"
                      className="form-select"
                      value={itemForm.shippingIndication || "Delivered"}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, shippingIndication: e.target.value })
                      }
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveItem}
                >
                  Update Item
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddItemModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
      <>

        <div
          className="modal fade"
          id="deleteConfirmationModal"
          tabIndex="-1"
          aria-labelledby="deleteConfirmationModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteConfirmationModalLabel">
                  Delete Item
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex">
                <div
                  className="me-3 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="fas fa-exclamation-triangle text-danger"></i>
                </div>
                <div>
                  <p className="mb-0">
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteItem}
                  data-bs-dismiss="modal"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default InventoryManagement;