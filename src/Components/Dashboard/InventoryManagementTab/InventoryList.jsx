
import React, { useState, useRef, useEffect } from "react";
import * as echarts from "echarts";
import api from "../../../../utils/axiosInterceptor";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';
function InventoryList() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState(false);

  // State for modal
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [itemForm, setItemForm] = useState({
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
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Inventory data state
  const [data, setData] = useState([]);

  // Chart ref
  const timelineChartRef = useRef(null);

  // Fetch inventory data
  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/inventory");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      Swal.fire(
        'Error!',
        'Failed to fetch inventory data.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

useEffect(() => {
  if (timelineChartRef.current && data.length > 0) {
    const chart = echarts.init(timelineChartRef.current);

    // 1. PROPER DATA PROCESSING
    const shippingData = data
      .filter(item => {
        // Ensure required fields exist
        const hasStock = item.stockNumber || item.stock;
        const hasShipDate = item.shippingDate || item.shipDate;
        const hasArrivalDate = item.arrivalDate || item.arrDate;
        return hasStock && hasShipDate && hasArrivalDate;
      })
      .map(item => {
        // Handle all possible field name variations
        const stock = item.stockNumber || item.stock || 'N/A';
        const model = item.model || 'N/A';
        const shipDate = item.shippingDate || item.shipDate;
        const arrivalDate = item.arrivalDate || item.arrDate;
        const status = item.shippingIndication || 'PENDING';

        // Parse dates with validation
        const parseDate = (dateStr) => {
          if (!dateStr) return new Date('2025-01-01');
          const date = new Date(dateStr);
          return isNaN(date.getTime()) ? new Date('2025-01-01') : date;
        };

        return {
          stock,
          model,
          shippingDate: parseDate(shipDate),
          arrivalDate: parseDate(arrivalDate),
          status: status.toUpperCase()
        };
      });

    console.log('Processed Shipping Data:', shippingData); // Debug log

    if (shippingData.length === 0) {
      console.warn('No valid shipping data available');
      return;
    }

    // 2. CHART OPTIONS WITH PROPER DATA MAPPING
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params) => {
          const data = params[0].data;
          const statusColor = 
            data.status === 'DELIVERED' ? '#4CAF50' :
            data.status === 'SHIPPED' ? '#2196F3' : '#FFC107';
          
          return `
            <div style="padding: 10px; border-left: 3px solid ${statusColor}">
              <div style="font-weight: bold;">${data.stock}</div>
              <div>Model: ${data.model}</div>
              <div>Shipping: ${data.shippingDate.toLocaleDateString()}</div>
              <div>Arrival: ${data.arrivalDate.toLocaleDateString()}</div>
              <div>Status: <strong style="color: ${statusColor}">${data.status}</strong></div>
            </div>
          `;
        }
      },
      legend: {
        data: ['Delivered', 'Shipped', 'Pending', 'Transit'],
        textStyle: { color: '#333' }
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
          interval: 0 // Show all labels
        }
      },
      yAxis: {
        type: 'value',
        name: 'Timeline',
        min: 1,
        max: 6,
        interval: 1,
        axisLabel: {
          formatter: (value) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            return months[value - 1] || '';
          }
        }
      },
      series: [
        {
          name: 'Shipping Period',
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            color: (params) => {
              const status = shippingData[params.dataIndex].status;
              return status === 'DELIVERED' ? '#4CAF50' :
                     status === 'SHIPPED' ? '#2196F3' : '#FFC107';
            },
            borderRadius: [4, 4, 0, 0]
          },
          data: shippingData.map(item => ({
            value: item.shippingDate.getMonth() + 1,
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
          barWidth: 20,
          stack: 'timeline',
          itemStyle: {
            color: '#9C27B0',
            borderRadius: [0, 0, 4, 4]
          },
          data: shippingData.map(item => {
            const shipMonth = item.shippingDate.getMonth() + 1;
            const arrivalMonth = item.arrivalDate.getMonth() + 1;
            return {
              value: arrivalMonth - shipMonth,
              stock: item.stock,
              model: item.model,
              shippingDate: item.shippingDate,
              arrivalDate: item.arrivalDate,
              status: item.status
            };
          })
        }
      ]
    };

    chart.setOption(option);

    // 3. RESPONSIVE HANDLING
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }
}, [data]);

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
    setEditingId(null);
    setShowInventoryModal(true);
  };

  const handleEditInventory = (item, index) => {
    setItemForm({
      sourceName: item.sourceName || "",
      stockNumber: item.stockNumber || "",
      manuNumber: item.manuNumber || "",
      manuNumber2: item.manuNumber2 || "",
      invoiceNumber: item.invoiceNumber || "",
      payment: item.payment || "",
      paymentStatus: item.paymentStatus || "",
      paymentTerms: item.paymentTerms || "",
      vin: item.vin || "",
      engine: item.engine || "",
      keyNumber: item.keyNumber || "",
      bl: item.bl || "",
      shipDate: item.shipDate || "",
      brand: item.brand || "",
      ocnSpec: item.ocnSpec || "",
      model: item.model || "",
      country: item.country || "",
      vinYear: item.vinYear || "",
      extColor: item.extColor || "",
      intColor: item.intColor || "",
      tbd3: item.tbd3 || "",
      orderMonth: item.orderMonth || "",
      productionEstimate: item.productionEstimate || "",
      shipEstimate: item.shipEstimate || "",
      estArrival: item.estArrival || "",
      shippingDate: item.shippingDate || "",
      arrivalEstimate: item.arrivalEstimate || "",
      arrivalDate: item.arrivalDate || "",
      shippingIndication: item.shippingIndication || ""
    });
    setEditingIndex(index);
    setEditingId(item.id); // Assuming your API uses _id as identifier
    setShowInventoryModal(true);
  };

  const handleDeleteInventory = async (index) => {
    // Get the item from current data
    const itemToDelete = filteredData[index]; // Use filteredData if you have filtering

    // Debug the item structure
    console.log("Item being deleted:", itemToDelete);

    if (!itemToDelete?.id) {
      await Swal.fire({
        title: 'Error!',
        text: 'Cannot delete item - missing ID field',
        icon: 'error',
        customClass: { container: 'z-[99999]' }
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: { container: 'z-[99999]' }
    });

    if (result.isConfirmed) {
      try {
        // Call DELETE endpoint with the ID
        await api.delete(`/inventory/${itemToDelete.id}`);

        // Update state by filtering out the deleted item
        setData(prevData => prevData.filter(item => item.id !== itemToDelete.id));

        await Swal.fire({
          title: 'Deleted!',
          text: 'Your item has been deleted.',
          icon: 'success',
          customClass: { container: 'z-[99999]' }
        });
      } catch (error) {
        console.error("Delete error:", error);
        await Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to delete item',
          icon: 'error',
          customClass: { container: 'z-[99999]' }
        });
      }
    }
  };

  const handleSaveInventory = async () => {
    try {
      // Validate required fields
      if (!itemForm.stockNumber || !itemForm.vin || !itemForm.model) {
        await Swal.fire({
          title: 'Validation Error',
          text: 'Please fill in all required fields (Stock Number, VIN, and Model)',
          icon: 'warning',
          customClass: {
            container: 'z-[99999]' // Very high z-index to ensure it's on top
          }
        });
        return;
      }

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: editingId !== null
          ? 'Do you want to update this inventory item?'
          : 'Do you want to add this new inventory item?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
        customClass: {
          container: 'z-[99999]' // Very high z-index to ensure it's on top
        }
      });

      if (result.isConfirmed) {
        setLoading(true); // Show loading state

        if (editingId !== null) {
          await api.put(`/inventory/${editingId}`, itemForm);
        } else {
          await api.post("/inventory", itemForm);
        }

        await Swal.fire({
          title: 'Saved!',
          text: editingId !== null
            ? 'Inventory item has been updated.'
            : 'New inventory item has been added.',
          icon: 'success',
          customClass: {
            container: 'z-[99999]' // Very high z-index to ensure it's on top
          }
        });

        setShowInventoryModal(false); // Close the modal
        fetchInventoryData(); // Refresh data
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'There was a problem saving the inventory item.',
        icon: 'error',
        customClass: {
          container: 'z-[99999]' // Very high z-index to ensure it's on top
        }
      });
      console.error("Error saving inventory:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleDownloadCSV = () => {
    if (data.length === 0) {
      Swal.fire(
        'No Data',
        'There is no inventory data to export.',
        'warning'
      );
      return;
    }

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

  // Filter data based on search and filters
  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(
      val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus = !selectedStatus ||
      (item.shippingIndication && item.shippingIndication.toUpperCase() === selectedStatus.toUpperCase());

    const matchesCountry = !selectedCountry ||
      (item.country && item.country.toUpperCase() === selectedCountry.toUpperCase());

    const matchesBrand = !selectedBrand ||
      (item.brand && item.brand.toUpperCase() === selectedBrand.toUpperCase());

    return matchesSearch && matchesStatus && matchesCountry && matchesBrand;
  });


 const [selectedFile, setSelectedFile] = useState(null);

  const handleSheetUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

const handleSave = async () => {
  if (!selectedFile) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const result = response.data;
    fetchInventoryData()
    alert(result.message || "File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    // alert("Error uploading file.");
    alert(result.message || "File uploaded successfully!");
  }
};


  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-center">Loading inventory...</p>
          </div>
        </div>
      )}

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
    <div className="p-4">
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleSheetUpload}
        className="w-full sm:w-auto px-4 py-2 border rounded-lg text-sm cursor-pointer text-gray-700 bg-white hover:bg-gray-100"
        title="Upload Inventory Sheet"
      />

      <button
        onClick={handleSave}
        className="ms-3 p-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 mt-2"
      >
        Save
      </button>
    </div>
        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow mt-3 overflow-hidden">
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">
                Shipping Distribution
              </h3>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 mt-3 border border-gray-300 rounded text-sm text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="relative w-full sm:w-auto">
                  <button
                    className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <i className="fas fa-filter mr-2"></i> Filter
                  </button>

                  {showFilter && (
                    <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow-md w-64 p-4">
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

                <button
                  className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
                  onClick={handleDownloadCSV}
                >
                  <i className="fas fa-file-export mr-2"></i> Export
                </button>

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
                    sr.
                  </th>
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
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-gray-50">

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {idx + 1}.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item?.sourceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.stockNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.manuNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.manuNumber2}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.payment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.paymentStatus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.paymentTerms}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.vin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.engine}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.keyNumber}
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
                        {item.vinYear}
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
                        {item.productionEstimate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.shipEstimate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.estArrival}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.shippingDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.arrivalEstimate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.arrivalDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${item.shippingIndication === "DELIVERED"
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
                        <button
                          className="text-indigo-600 hover:text-indigo-900 me-3"
                          onClick={() => handleEditInventory(item, idx)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>

                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteInventory(idx)}
                          title="Delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="29" className="px-6 py-4 text-center text-sm text-gray-500">
                      No inventory items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inventory Modal */}
      {showInventoryModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: "9999" }}>
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
                      {editingId !== null ? "Edit Inventory Item" : "Add Inventory Item"}
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
                                onChange={(e) => setItemForm({ ...itemForm, sourceName: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="stock-number" className="block text-sm font-medium text-gray-700">Stock Number</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="stock-number"
                                value={itemForm.stockNumber}
                                onChange={(e) => setItemForm({ ...itemForm, stockNumber: e.target.value })}
                                required
                              />
                            </div>

                            <div>
                              <label htmlFor="manu-number" className="block text-sm font-medium text-gray-700">MANU#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="manu-number"
                                value={itemForm.manuNumber}
                                onChange={(e) => setItemForm({ ...itemForm, manuNumber: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="manu-number2" className="block text-sm font-medium text-gray-700">MANU#2</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="manu-number2"
                                value={itemForm.manuNumber2}
                                onChange={(e) => setItemForm({ ...itemForm, manuNumber2: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-700">INVOICE#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="invoice-number"
                                value={itemForm.invoiceNumber}
                                onChange={(e) => setItemForm({ ...itemForm, invoiceNumber: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="payment" className="block text-sm font-medium text-gray-700">PAYMENT</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="payment"
                                value={itemForm.payment}
                                onChange={(e) => setItemForm({ ...itemForm, payment: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="payment-status" className="block text-sm font-medium text-gray-700">PMT STATUS</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="payment-status"
                                value={itemForm.paymentStatus}
                                onChange={(e) => setItemForm({ ...itemForm, paymentStatus: e.target.value })}
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
                                onChange={(e) => setItemForm({ ...itemForm, paymentTerms: e.target.value })}
                              />
                            </div>


                            <div>
                              <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="vin"
                                value={itemForm.vin}
                                onChange={(e) => setItemForm({ ...itemForm, vin: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="engine" className="block text-sm font-medium text-gray-700">ENGINE#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="engine"
                                value={itemForm.engine}
                                onChange={(e) => setItemForm({ ...itemForm, engine: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="key-number" className="block text-sm font-medium text-gray-700">KEY#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="key-number"
                                value={itemForm.keyNumber}
                                onChange={(e) => setItemForm({ ...itemForm, keyNumber: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="bl" className="block text-sm font-medium text-gray-700">BL#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="bl"
                                value={itemForm.bl}
                                onChange={(e) => setItemForm({ ...itemForm, bl: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="ship-date" className="block text-sm font-medium text-gray-700">SHIP DATE</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="ship-date"
                                value={itemForm.shipDate}
                                onChange={(e) => setItemForm({ ...itemForm, shipDate: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">BRAND</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="brand"
                                value={itemForm.brand}
                                onChange={(e) => setItemForm({ ...itemForm, brand: e.target.value })}
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
                                onChange={(e) => setItemForm({ ...itemForm, ocnSpec: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="model" className="block text-sm font-medium text-gray-700">MODEL</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="model"
                                value={itemForm.model}
                                onChange={(e) => setItemForm({ ...itemForm, model: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="country" className="block text-sm font-medium text-gray-700">COUNTRY</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="country"
                                value={itemForm.country}
                                onChange={(e) => setItemForm({ ...itemForm, country: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="vin-year" className="block text-sm font-medium text-gray-700">MY YEAR</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="vin-year"
                                value={itemForm.vinYear}
                                onChange={(e) => setItemForm({ ...itemForm, vinYear: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="ext-color" className="block text-sm font-medium text-gray-700">EXT. COLOR</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="ext-color"
                                value={itemForm.extColor}
                                onChange={(e) => setItemForm({ ...itemForm, extColor: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="int-color" className="block text-sm font-medium text-gray-700">INT. COLOR</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="int-color"
                                value={itemForm.intColor}
                                onChange={(e) => setItemForm({ ...itemForm, intColor: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="tbd3" className="block text-sm font-medium text-gray-700">TBD3</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="tbd3"
                                value={itemForm.tbd3}
                                onChange={(e) => setItemForm({ ...itemForm, tbd3: e.target.value })}
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
                              onChange={(e) => setItemForm({ ...itemForm, orderMonth: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="production-estimate" className="block text-sm font-medium text-gray-700">PROD. EST</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="production-estimate"
                              value={itemForm.productionEstimate}
                              onChange={(e) => setItemForm({ ...itemForm, productionEstimate: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="ship-estimate" className="block text-sm font-medium text-gray-700">SHIP. EST</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="ship-estimate"
                              value={itemForm.shipEstimate}
                              onChange={(e) => setItemForm({ ...itemForm, shipEstimate: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="est-arrival" className="block text-sm font-medium text-gray-700">EST ARR</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="est-arrival"
                              value={itemForm.estArrival}
                              onChange={(e) => setItemForm({ ...itemForm, estArrival: e.target.value })}
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
                              onChange={(e) => setItemForm({ ...itemForm, shippingDate: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="arrival-estimate" className="block text-sm font-medium text-gray-700">ARR EST</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="arrival-estimate"
                              value={itemForm.arrivalEstimate}
                              onChange={(e) => setItemForm({ ...itemForm, arrivalEstimate: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700">ARR. DATE</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="arrival-date"
                              value={itemForm.arrivalDate}
                              onChange={(e) => setItemForm({ ...itemForm, arrivalDate: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="shipping-indication" className="block text-sm font-medium text-gray-700">SHIP INDICATION</label>
                          <select
                            id="shipping-indication"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={itemForm.shippingIndication}
                            onChange={(e) => setItemForm({ ...itemForm, shippingIndication: e.target.value })}
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