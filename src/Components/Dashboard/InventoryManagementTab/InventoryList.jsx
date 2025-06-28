import React, { useState, useRef, useEffect } from "react";
import * as echarts from "echarts";
function InventoryList() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // State for modal
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [itemForm, setItemForm] = useState({
    sourceName: "",
    stockNumber: "GA05E1",
    manuNumber: "",
    manuNumber2: "",
    invoiceNumber: "",
    payment: "",
    paymentStatus: "",
    paymentTerms: "",
    vin: "LMGBR11871144264",
    engine: "K500535",
    keyNumber: "",
    bl: "EUROSHBJXD11613 BB2A-CW7-00",
    shipDate: "",
    brand: "",
    ocnSpec: "BB2A-CW7-00",
    model: "EMPGW",
    country: "INF",
    vinYear: "",
    extColor: "",
    intColor: "BLACK",
    tbd3: "",
    orderMonth: "12/12/2024",
    productionEstimate: "1/21/2025",
    shipEstimate: "",
    estArrival: "",
    shippingDate: "3/3/2025",
    arrivalEstimate: "",
    arrivalDate: "mm/dd/yyyy",
    shippingIndication: "Delivered"
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Sample data
  const [data, setData] = useState([
    {
      sourceName: "Sample Source",
      stock: "GA05E1",
      manu: "12345",
      manu2: "67890",
      invoice: "INV001",
      payment: "$10,000",
      pmtStatus: "Paid",
      payTerms: "Net 30",
      vin: "LMGBR11871144264",
      engine: "K500535",
      key: "KEY001",
      bl: "EUROSHBJXD11613 BB2A-CW7-00",
      shipDate: "2024-05-15",
      brand: "Toyota",
      ocnSpec: "BB2A-CW7-00",
      model: "EMPGW",
      country: "Japan",
      myYear: "2024",
      extColor: "Red",
      intColor: "Black",
      tbd3: "",
      orderMonth: "December 2023",
      prodEst: "January 2024",
      shipEst: "February 2024",
      estArr: "March 2024",
      shpDte: "2024-02-15",
      arrEst: "2024-03-15",
      arrDate: "2024-03-10",
      shippingIndication: "DELIVERED"
    }
  ]);

  // Chart ref
  const timelineChartRef = useRef(null);

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

  // Handler functions
  const handleAddInventory = () => {
    setItemForm({
      sourceName: "",
      stockNumber: "",
      manuNumber: "",
      manuNumber2: "",
      invoiceNumber: "",
      payment: "",
      paymentStatus: "",
      paymentTerms: "",
      vin: "",
      engine: "",
      keyNumber: "",
      bl: "",
      shipDate: "",
      brand: "",
      ocnSpec: "",
      model: "",
      country: "",
      vinYear: "",
      extColor: "",
      intColor: "",
      tbd3: "",
      orderMonth: "",
      productionEstimate: "",
      shipEstimate: "",
      estArrival: "",
      shippingDate: "",
      arrivalEstimate: "",
      arrivalDate: "",
      shippingIndication: ""
    });
    setEditingIndex(null);
    setShowInventoryModal(true);
  };

  const handleEditInventory = (item, index) => {
    setItemForm({
      sourceName: item.sourceName,
      stockNumber: item.stock,
      manuNumber: item.manu,
      manuNumber2: item.manu2,
      invoiceNumber: item.invoice,
      payment: item.payment,
      paymentStatus: item.pmtStatus,
      paymentTerms: item.payTerms,
      vin: item.vin,
      engine: item.engine,
      keyNumber: item.key,
      bl: item.bl,
      shipDate: item.shipDate,
      brand: item.brand,
      ocnSpec: item.ocnSpec,
      model: item.model,
      country: item.country,
      vinYear: item.myYear,
      extColor: item.extColor,
      intColor: item.intColor,
      tbd3: item.tbd3,
      orderMonth: item.orderMonth,
      productionEstimate: item.prodEst,
      shipEstimate: item.shipEst,
      estArrival: item.estArr,
      shippingDate: item.shpDte,
      arrivalEstimate: item.arrEst,
      arrivalDate: item.arrDate,
      shippingIndication: item.shippingIndication
    });
    setEditingIndex(index);
    setShowInventoryModal(true);
  };

  const handleDeleteInventory = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const handleSaveInventory = () => {
    const newItem = {
      sourceName: itemForm.sourceName,
      stock: itemForm.stockNumber,
      manu: itemForm.manuNumber,
      manu2: itemForm.manuNumber2,
      invoice: itemForm.invoiceNumber,
      payment: itemForm.payment,
      pmtStatus: itemForm.paymentStatus,
      payTerms: itemForm.paymentTerms,
      vin: itemForm.vin,
      engine: itemForm.engine,
      key: itemForm.keyNumber,
      bl: itemForm.bl,
      shipDate: itemForm.shipDate,
      brand: itemForm.brand,
      ocnSpec: itemForm.ocnSpec,
      model: itemForm.model,
      country: itemForm.country,
      myYear: itemForm.vinYear,
      extColor: itemForm.extColor,
      intColor: itemForm.intColor,
      tbd3: itemForm.tbd3,
      orderMonth: itemForm.orderMonth,
      prodEst: itemForm.productionEstimate,
      shipEst: itemForm.shipEstimate,
      estArr: itemForm.estArrival,
      shpDte: itemForm.shippingDate,
      arrEst: itemForm.arrivalEstimate,
      arrDate: itemForm.arrivalDate,
      shippingIndication: itemForm.shippingIndication.toUpperCase()
    };

    if (editingIndex !== null) {
      // Update existing item
      const newData = [...data];
      newData[editingIndex] = newItem;
      setData(newData);
    } else {
      // Add new item
      setData([...data, newItem]);
    }

    setShowInventoryModal(false);
  };

  const handleDownloadCSV = () => {
    // Simple CSV export implementation
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(item => Object.values(item).join(","));
    const csvContent = [headers, ...rows].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div>
        {/* Shipping Timeline Chart */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Shipping & Delivery Timeline
          </h3>
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
                  className="px-4 py-2 mt-3 border border-gray-300 rounded text-sm text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* 🔽 Filter Dropdown */}
                <div className="relative w-full sm:w-auto">
                  <button
                    className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <i className="fas fa-filter mr-2"></i> Filter
                  </button>

                  {showFilter && (
                    <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow-md w-64 p-4">
                      {/* 📦 Status Filter */}
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
                        >
                          <option value="">All</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="PENDING">Pending</option>
                        </select>
                      </div>

                      {/* 🌍 Country Filter */}
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
                        >
                          <option value="">All</option>
                          <option value="USA">USA</option>
                          <option value="Japan">Japan</option>
                          <option value="Germany">Germany</option>
                        </select>
                      </div>

                      {/* 🚗 Brand Filter */}
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Brand
                        </label>
                        <select
                          value={selectedBrand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
                        >
                          <option value="">All</option>
                          <option value="Toyota">Toyota</option>
                          <option value="BMW">BMW</option>
                          <option value="Ford">Ford</option>
                        </select>
                      </div>

                      <button
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 mt-2"
                        onClick={() => setShowFilter(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* 📤 Export Button */}
                <button
                  className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
                  onClick={handleDownloadCSV}
                >
                  <i className="fas fa-file-export mr-2"></i> Export
                </button>

                {/* ➕ Add Inventory Button */}
                <button
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition w-full sm:w-auto"
                  onClick={handleAddInventory}
                >
                  <i className="fas fa-plus mr-2"></i> Add Inventory
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Source.Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    STOCK #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    MANU#
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    MANU#2
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    INVOICE#
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    PAYMENT
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    PMT STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    PAY. TERMS
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    VIN#
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    ENGINE#
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    KEY#
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    BL#
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    SHIP DATE
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    BRAND
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    OCN SPEC
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    MODEL
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    COUNTRY
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    MY YEAR
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    EXT. COLOR
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    INT. COLOR
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    TBD3
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    ORDER MONTH
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    PROD. EST
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    SHIP. EST
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    EST ARR
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    SHP DTE
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    ARR EST
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    ARR. DATE
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    SHIP INDICATION
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, idx) => (
                  <tr key={item.stock || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.sourceName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.manu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.manu2}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.invoice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.payment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.pmtStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.payTerms}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.vin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.engine}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.bl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.shipDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.ocnSpec}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.myYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.extColor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.intColor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.tbd3}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.orderMonth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.prodEst}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.shipEst}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.estArr}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.shpDte}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.arrEst}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.arrDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
      ${
        item.shippingIndication === "DELIVERED"
          ? "bg-green-100 text-green-800"
          : item.shippingIndication === "SHIPPED"
          ? "bg-yellow-100 text-yellow-800"
          : item.shippingIndication === "CANCELLED"
          ? "bg-red-100 text-red-800"
          : item.shippingIndication === "ORDERED"
          ? "bg-gray-200 text-gray-800"
          : "bg-slate-100 text-slate-800"
      }`}
                      >
                        {item.shippingIndication}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      {/* Edit Button */}
                      <button
                        className="text-indigo-600 hover:text-indigo-900 me-3"
                        onClick={() => handleEditInventory(item, idx)}
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>

                      {/* Delete Button */}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteInventory(idx)}
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

      {/* Inventory Modal */}
      {showInventoryModal && (
        <div className="fixed inset-0 overflow-y-auto " style={{zIndex:"9999"}}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingIndex !== null ? "Edit Inventory Item" : "Add Inventory Item"}
                    </h3>
                    <div className="mt-2">
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* First Column */}
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="source-name" className="block text-sm font-medium text-gray-700">Source Name</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="source-name" 
                                value={itemForm.sourceName} 
                                onChange={(e) => setItemForm({...itemForm, sourceName: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="stock-number" className="block text-sm font-medium text-gray-700">Stock Number</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="stock-number" 
                                value={itemForm.stockNumber} 
                                onChange={(e) => setItemForm({...itemForm, stockNumber: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="manu-number" className="block text-sm font-medium text-gray-700">MANU#</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="manu-number" 
                                value={itemForm.manuNumber} 
                                onChange={(e) => setItemForm({...itemForm, manuNumber: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="manu-number2" className="block text-sm font-medium text-gray-700">MANU#2</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="manu-number2" 
                                value={itemForm.manuNumber2} 
                                onChange={(e) => setItemForm({...itemForm, manuNumber2: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-700">INVOICE#</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="invoice-number" 
                                value={itemForm.invoiceNumber} 
                                onChange={(e) => setItemForm({...itemForm, invoiceNumber: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="payment" className="block text-sm font-medium text-gray-700">PAYMENT</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="payment" 
                                value={itemForm.payment} 
                                onChange={(e) => setItemForm({...itemForm, payment: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="payment-status" className="block text-sm font-medium text-gray-700">PMT STATUS</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="payment-status" 
                                value={itemForm.paymentStatus} 
                                onChange={(e) => setItemForm({...itemForm, paymentStatus: e.target.value})}
                              />
                            </div>
                          </div>

                          {/* Second Column */}
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="payment-terms" className="block text-sm font-medium text-gray-700">PAY. TERMS</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="payment-terms" 
                                value={itemForm.paymentTerms} 
                                onChange={(e) => setItemForm({...itemForm, paymentTerms: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN#</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="vin" 
                                value={itemForm.vin} 
                                onChange={(e) => setItemForm({...itemForm, vin: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="engine" className="block text-sm font-medium text-gray-700">ENGINE#</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="engine" 
                                value={itemForm.engine} 
                                onChange={(e) => setItemForm({...itemForm, engine: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="key-number" className="block text-sm font-medium text-gray-700">KEY#</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="key-number" 
                                value={itemForm.keyNumber} 
                                onChange={(e) => setItemForm({...itemForm, keyNumber: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="bl" className="block text-sm font-medium text-gray-700">BL#</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="bl" 
                                value={itemForm.bl} 
                                onChange={(e) => setItemForm({...itemForm, bl: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="ship-date" className="block text-sm font-medium text-gray-700">SHIP DATE</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="ship-date" 
                                value={itemForm.shipDate} 
                                onChange={(e) => setItemForm({...itemForm, shipDate: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">BRAND</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="brand" 
                                value={itemForm.brand} 
                                onChange={(e) => setItemForm({...itemForm, brand: e.target.value})}
                              />
                            </div>
                          </div>

                          {/* Third Column */}
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="ocn-spec" className="block text-sm font-medium text-gray-700">OCN SPEC</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="ocn-spec" 
                                value={itemForm.ocnSpec} 
                                onChange={(e) => setItemForm({...itemForm, ocnSpec: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="model" className="block text-sm font-medium text-gray-700">MODEL</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="model" 
                                value={itemForm.model} 
                                onChange={(e) => setItemForm({...itemForm, model: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="country" className="block text-sm font-medium text-gray-700">COUNTRY</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="country" 
                                value={itemForm.country} 
                                onChange={(e) => setItemForm({...itemForm, country: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="vin-year" className="block text-sm font-medium text-gray-700">MY YEAR</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="vin-year" 
                                value={itemForm.vinYear} 
                                onChange={(e) => setItemForm({...itemForm, vinYear: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="ext-color" className="block text-sm font-medium text-gray-700">EXT. COLOR</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="ext-color" 
                                value={itemForm.extColor} 
                                onChange={(e) => setItemForm({...itemForm, extColor: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="int-color" className="block text-sm font-medium text-gray-700">INT. COLOR</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="int-color" 
                                value={itemForm.intColor} 
                                onChange={(e) => setItemForm({...itemForm, intColor: e.target.value})}
                              />
                            </div>

                            <div>
                              <label htmlFor="tbd3" className="block text-sm font-medium text-gray-700">TBD3</label>
                              <input 
                                type="text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                id="tbd3" 
                                value={itemForm.tbd3} 
                                onChange={(e) => setItemForm({...itemForm, tbd3: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label htmlFor="order-month" className="block text-sm font-medium text-gray-700">ORDER MONTH</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                              id="order-month" 
                              value={itemForm.orderMonth} 
                              onChange={(e) => setItemForm({...itemForm, orderMonth: e.target.value})}
                            />
                          </div>

                          <div>
                            <label htmlFor="production-estimate" className="block text-sm font-medium text-gray-700">PROD. EST</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                              id="production-estimate" 
                              value={itemForm.productionEstimate} 
                              onChange={(e) => setItemForm({...itemForm, productionEstimate: e.target.value})}
                            />
                          </div>

                          <div>
                            <label htmlFor="ship-estimate" className="block text-sm font-medium text-gray-700">SHIP. EST</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                              id="ship-estimate" 
                              value={itemForm.shipEstimate} 
                              onChange={(e) => setItemForm({...itemForm, shipEstimate: e.target.value})}
                            />
                          </div>

                          <div>
                            <label htmlFor="est-arrival" className="block text-sm font-medium text-gray-700">EST ARR</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                              id="est-arrival" 
                              value={itemForm.estArrival} 
                              onChange={(e) => setItemForm({...itemForm, estArrival: e.target.value})}
                            />
                          </div>
                        </div>

                        {/* Third Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="shipping-date" className="block text-sm font-medium text-gray-700">SHP DTE</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                              id="shipping-date" 
                              value={itemForm.shippingDate} 
                              onChange={(e) => setItemForm({...itemForm, shippingDate: e.target.value})}
                            />
                          </div>

                          <div>
                            <label htmlFor="arrival-estimate" className="block text-sm font-medium text-gray-700">ARR EST</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                              id="arrival-estimate" 
                              value={itemForm.arrivalEstimate} 
                              onChange={(e) => setItemForm({...itemForm, arrivalEstimate: e.target.value})}
                            />
                          </div>

                          <div>
                            <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700">ARR. DATE</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                              id="arrival-date" 
                              value={itemForm.arrivalDate} 
                              onChange={(e) => setItemForm({...itemForm, arrivalDate: e.target.value})}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="shipping-indication" className="block text-sm font-medium text-gray-700">SHIP INDICATION</label>
                          <select 
                            id="shipping-indication" 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={itemForm.shippingIndication}
                            onChange={(e) => setItemForm({...itemForm, shippingIndication: e.target.value})}
                          >
                            <option value="Delivered">Delivered</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveInventory}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowInventoryModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryList;