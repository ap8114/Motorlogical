
// import React, { useState, useRef, useEffect } from "react";
// import * as echarts from "echarts";
// import api from "../../../../utils/axiosInterceptor";
// import Swal from "sweetalert2";
// import * as XLSX from 'xlsx';
// import { utils, writeFile } from 'xlsx';
// function InventoryList() {
//   // State for search and filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedCOUNTRY, setSelectedCOUNTRY] = useState("");
//   const [selectedBRAND, setSelectedBRAND] = useState("");
//   const [loading, setLoading] = useState(false);

//   // State for modal
//   const [showInventoryModal, setShowInventoryModal] = useState(false);
//   const [itemForm, setItemForm] = useState({
//     SourceName: "",
//     STOCK: "",
//     MANU1: "",
//     MANU2: "",
//     INVOICE: "",
//     PAYMENT: "",
//     PMTSTATUS: "",
//     PAYTERMS: "",
//     VIN: "",
//     ENGINE: "",
//     KEY: "",
//     BL: "",
//     SHIPDATE: "",
//     BRAND: "",
//     OCNSPEC: "",
//     MODEL: "",
//     COUNTRY: "",
//     MYYEAR: "",
//     EXTCOLOR: "",
//     INTCOLOR: "",
//     TBD3: "",
//     ORDERMONTH: "",
//     PRODEST: "",
//     SHIPEST: "",
//     ESTARR: "",
//     SHPDTE: "",
//     ARREST: "",
//     ARRDATE: "",
//     SHIPINDICATION: ""
//   });
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   // Inventory data state
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);

//   // Chart ref
//   const timelineChartRef = useRef(null);

//   // Fetch inventory data
//   const fetchInventoryData = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/inventory");
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//       Swal.fire(
//         'Error!',
//         'Failed to fetch inventory data.',
//         'error'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Fetch inventory data
//   const fetchGoogleshet = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/sync-google-sheet");
//       setData2(response.data2);
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//       Swal.fire(
//         'Error!',
//         'Failed to fetch inventory data.',
//         'error'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchGoogleshet()
//     fetchInventoryData();
//   }, []);

//   useEffect(() => {
//     if (timelineChartRef.current && data.length > 0) {
//       const chart = echarts.init(timelineChartRef.current);

//       // 1. PROPER DATA PROCESSING
//       const shippingData = data
//         .filter(item => {
//           // Ensure required fields exist
//           const hasStock = item.STOCK || item.stock;
//           const hasSHIPDATE = item.SHPDTE || item.SHIPDATE;
//           const hasARRDATE = item.ARRDATE || item.arrDate;
//           return hasStock && hasSHIPDATE && hasARRDATE;
//         })
//         .map(item => {
//           // Handle all possible field name variations
//           const stock = item.STOCK || item.stock || 'N/A';
//           const MODEL = item.MODEL || 'N/A';
//           const SHIPDATE = item.SHPDTE || item.SHIPDATE;
//           const ARRDATE = item.ARRDATE || item.arrDate;
//           const status = item.SHIPINDICATION || 'PENDING';

//           // Parse dates with validation
//           const parseDate = (dateStr) => {
//             if (!dateStr) return new Date('2025-01-01');
//             const date = new Date(dateStr);
//             return isNaN(date.getTime()) ? new Date('2025-01-01') : date;
//           };

//           return {
//             stock,
//             MODEL,
//             SHPDTE: parseDate(SHIPDATE),
//             ARRDATE: parseDate(ARRDATE),
//             status: status.toUpperCase()
//           };
//         });



//       if (shippingData.length === 0) {
//         console.warn('No valid shipping data available');
//         return;
//       }

//       // 2. CHART OPTIONS WITH PROPER DATA MAPPING
//       const option = {
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: { type: 'shadow' },
//           formatter: (params) => {
//             const data = params[0].data;
//             const statusColor =
//               data.status === 'DELIVERED' ? '#4CAF50' :
//                 data.status === 'SHIPPED' ? '#2196F3' : '#FFC107';

//             return `
//             <div style="padding: 10px; border-left: 3px solid ${statusColor}">
//               <div style="font-weight: bold;">${data.stock}</div>
//               <div>MODEL: ${data.MODEL}</div>
//               <div>Shipping: ${data.SHPDTE.toLocaleDateString()}</div>
//               <div>Arrival: ${data.ARRDATE.toLocaleDateString()}</div>
//               <div>Status: <strong style="color: ${statusColor}">${data.status}</strong></div>
//             </div>
//           `;
//           }
//         },
//         legend: {
//           data: ['Delivered', 'Shipped', 'Pending', 'Transit'],
//           textStyle: { color: '#333' }
//         },
//         grid: {
//           left: '3%',
//           right: '4%',
//           bottom: '3%',
//           containLabel: true
//         },
//         xAxis: {
//           type: 'category',
//           data: shippingData.map(item => item.stock),
//           axisLabel: {
//             rotate: 45,
//             interval: 0 // Show all labels
//           }
//         },
//         yAxis: {
//           type: 'value',
//           name: 'Timeline',
//           min: 1,
//           max: 6,
//           interval: 1,
//           axisLabel: {
//             formatter: (value) => {
//               const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
//               return months[value - 1] || '';
//             }
//           }
//         },
//         series: [
//           {
//             name: 'Shipping Period',
//             type: 'bar',
//             barWidth: 20,
//             itemStyle: {
//               color: (params) => {
//                 const status = shippingData[params.dataIndex].status;
//                 return status === 'DELIVERED' ? '#4CAF50' :
//                   status === 'SHIPPED' ? '#2196F3' : '#FFC107';
//               },
//               borderRadius: [4, 4, 0, 0]
//             },
//             data: shippingData.map(item => ({
//               value: item.SHPDTE.getMonth() + 1,
//               stock: item.stock,
//               MODEL: item.MODEL,
//               SHPDTE: item.SHPDTE,
//               ARRDATE: item.ARRDATE,
//               status: item.status
//             }))
//           },
//           {
//             name: 'Transit Time',
//             type: 'bar',
//             barWidth: 20,
//             stack: 'timeline',
//             itemStyle: {
//               color: '#9C27B0',
//               borderRadius: [0, 0, 4, 4]
//             },
//             data: shippingData.map(item => {
//               const shipMonth = item.SHPDTE.getMonth() + 1;
//               const arrivalMonth = item.ARRDATE.getMonth() + 1;
//               return {
//                 value: arrivalMonth - shipMonth,
//                 stock: item.stock,
//                 MODEL: item.MODEL,
//                 SHPDTE: item.SHPDTE,
//                 ARRDATE: item.ARRDATE,
//                 status: item.status
//               };
//             })
//           }
//         ]
//       };

//       chart.setOption(option);

//       // 3. RESPONSIVE HANDLING
//       const handleResize = () => chart.resize();
//       window.addEventListener('resize', handleResize);

//       return () => {
//         window.removeEventListener('resize', handleResize);
//         chart.dispose();
//       };
//     }
//   }, [data]);

//   const handleAddInventory = () => {
//     setItemForm({
//       SourceName: "",
//       STOCK: "",
//       MANU1: "",
//       MANU2: "",
//       INVOICE: "",
//       PAYMENT: "",
//       PMTSTATUS: "",
//       PAYTERMS: "",
//       VIN: "",
//       ENGINE: "",
//       KEY: "",
//       BL: "",
//       SHIPDATE: "",
//       BRAND: "",
//       OCNSPEC: "",
//       MODEL: "",
//       COUNTRY: "",
//       MYYEAR: "",
//       EXTCOLOR: "",
//       INTCOLOR: "",
//       TBD3: "",
//       ORDERMONTH: "",
//       PRODEST: "",
//       SHIPEST: "",
//       ESTARR: "",
//       SHPDTE: "",
//       ARREST: "",
//       ARRDATE: "",
//       SHIPINDICATION: ""
//     });
//     setEditingIndex(null);
//     setEditingId(null);
//     setShowInventoryModal(true);
//   };

//   const handleEditInventory = (item, index) => {
//     setItemForm({
//       SourceName: item.SourceName || "",
//       STOCK: item.STOCK || "",
//       MANU1: item.MANU1 || "",
//       MANU2: item.MANU2 || "",
//       INVOICE: item.INVOICE || "",
//       PAYMENT: item.PAYMENT || "",
//       PMTSTATUS: item.PMTSTATUS || "",
//       PAYTERMS: item.PAYTERMS || "",
//       VIN: item.VIN || "",
//       ENGINE: item.ENGINE || "",
//       KEY: item.KEY || "",
//       BL: item.BL || "",
//       SHIPDATE: item.SHIPDATE || "",
//       BRAND: item.BRAND || "",
//       OCNSPEC: item.OCNSPEC || "",
//       MODEL: item.MODEL || "",
//       COUNTRY: item.COUNTRY || "",
//       MYYEAR: item.MYYEAR || "",
//       EXTCOLOR: item.EXTCOLOR || "",
//       INTCOLOR: item.INTCOLOR || "",
//       TBD3: item.TBD3 || "",
//       ORDERMONTH: item.ORDERMONTH || "",
//       PRODEST: item.PRODEST || "",
//       SHIPEST: item.SHIPEST || "",
//       ESTARR: item.ESTARR || "",
//       SHPDTE: item.SHPDTE || "",
//       ARREST: item.ARREST || "",
//       ARRDATE: item.ARRDATE || "",
//       SHIPINDICATION: item.SHIPINDICATION || ""
//     });
//     setEditingIndex(index);
//     setEditingId(item.id); // Assuming your API uses _id as identifier
//     setShowInventoryModal(true);
//   };

//   const handleDeleteInventory = async (index) => {
//     // Get the item from current data
//     const itemToDelete = filteredData[index]; // Use filteredData if you have filtering

//     // Debug the item structure
//     console.log("Item being deleted:", itemToDelete);

//     if (!itemToDelete?.id) {
//       await Swal.fire({
//         title: 'Error!',
//         text: 'Cannot delete item - missing ID field',
//         icon: 'error',
//         customClass: { container: 'z-[99999]' }
//       });
//       return;
//     }

//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//       customClass: { container: 'z-[99999]' }
//     });

//     if (result.isConfirmed) {
//       try {
//         // Call DELETE endpoint with the ID
//         await api.delete(`/inventory/${itemToDelete.id}`);

//         // Update state by filtering out the deleted item
//         setData(prevData => prevData.filter(item => item.id !== itemToDelete.id));

//         await Swal.fire({
//           title: 'Deleted!',
//           text: 'Your item has been deleted.',
//           icon: 'success',
//           customClass: { container: 'z-[99999]' }
//         });
//       } catch (error) {
//         console.error("Delete error:", error);
//         await Swal.fire({
//           title: 'Error!',
//           text: error.response?.data?.message || 'Failed to delete item',
//           icon: 'error',
//           customClass: { container: 'z-[99999]' }
//         });
//       }
//     }
//   };

//   const handleSaveInventory = async () => {
//     try {
//       // Validate required fields
//       if (!itemForm.STOCK || !itemForm.VIN || !itemForm.MODEL) {
//         await Swal.fire({
//           title: 'Validation Error',
//           text: 'Please fill in all required fields (Stock Number, VIN, and MODEL)',
//           icon: 'warning',
//           customClass: {
//             container: 'z-[99999]' // Very high z-index to ensure it's on top
//           }
//         });
//         return;
//       }

//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: editingId !== null
//           ? 'Do you want to update this inventory item?'
//           : 'Do you want to add this new inventory item?',
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, save it!',
//         customClass: {
//           container: 'z-[99999]' // Very high z-index to ensure it's on top
//         }
//       });

//       if (result.isConfirmed) {
//         setLoading(true); // Show loading state

//         if (editingId !== null) {
//           await api.put(`/inventory/${editingId}`, itemForm);
//         } else {
//           await api.post("/inventory", itemForm);
//         }

//         await Swal.fire({
//           title: 'Saved!',
//           text: editingId !== null
//             ? 'Inventory item has been updated.'
//             : 'New inventory item has been added.',
//           icon: 'success',
//           customClass: {
//             container: 'z-[99999]' // Very high z-index to ensure it's on top
//           }
//         });

//         setShowInventoryModal(false); // Close the modal
//         fetchInventoryData(); // Refresh data
//       }
//     } catch (error) {
//       await Swal.fire({
//         title: 'Error!',
//         text: 'There was a problem saVINg the inventory item.',
//         icon: 'error',
//         customClass: {
//           container: 'z-[99999]' // Very high z-index to ensure it's on top
//         }
//       });
//       console.error("Error saVINg inventory:", error);
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   const handleDownloadCSV = () => {
//     if (data.length === 0) {
//       Swal.fire(
//         'No Data',
//         'There is no inventory data to export.',
//         'warning'
//       );
//       return;
//     }

//     const headers = Object.keys(data[0]).join(",");
//     const rows = data.map(item => Object.values(item).join(","));
//     const csvContent = [headers, ...rows].join("\n");

//     const blob = new blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "inventory.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredData = Array.isArray(data)
//     ? data.filter(item => {
//       const matchesSearch = Object.values(item).some(
//         val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       const matchesStatus = !selectedStatus ||
//         (item.SHIPINDICATION && item.SHIPINDICATION.toUpperCase() === selectedStatus.toUpperCase());

//       const matchesCOUNTRY = !selectedCOUNTRY ||
//         (item.COUNTRY && item.COUNTRY.toUpperCase() === selectedCOUNTRY.toUpperCase());

//       const matchesBRAND = !selectedBRAND ||
//         (item.BRAND && item.BRAND.toUpperCase() === selectedBRAND.toUpperCase());

//       return matchesSearch && matchesStatus && matchesCOUNTRY && matchesBRAND;
//     })
//     : [];



//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleSheetUpload = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSave = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await api.post("/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const result = response.data;
//       fetchInventoryData()
//       alert(result.message || "File uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       // alert("Error uploading file.");
//       alert(result.message || "File uploaded successfully!");
//     }
//   };


//   return (
//     <div>
//       {loading && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded shadow-lg">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//             <p className="mt-2 text-center">Loading inventory...</p>
//           </div>
//         </div>
//       )}

//       <div>
//         {/* Shipping Timeline Chart */}
//         <div className="bg-white rounded-lg shadow p-6 mt-6">
//           <h3 className="text-lg font-medium text-gray-800 mb-4">
//             Shipping & Delivery Timeline
//           </h3>
//           <div className="h-80">
//             <div ref={timelineChartRef} className="w-full h-full"></div>
//           </div>
//         </div>
//         {/* <div className="p-4">
//           <input
//             type="file"
//             accept=".csv, .xlsx"
//             onChange={handleSheetUpload}
//             className="w-full sm:w-auto px-4 py-2 border rounded-lg text-sm cursor-pointer text-gray-700 bg-white hover:bg-gray-100"
//             title="Upload Inventory Sheet"
//           />

//           <button
//             onClick={handleSave}
//             className="ms-3 p-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 mt-2"
//           >
//             Save
//           </button>
//         </div> */}
//         {/* Inventory Table */}
//         <div className="bg-white rounded-lg shadow mt-3 overflow-hidden">
//           <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//               <h3 className="text-base sm:text-lg font-medium text-gray-800">
//                 Shipping Distribution
//               </h3>

//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="px-4 py-2 mt-3 border border-gray-300 rounded text-sm text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//                 <div className="relative w-full sm:w-auto">
//                   <button
//                     className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
//                     onClick={() => setShowFilter(!showFilter)}
//                   >
//                     <i className="fas fa-filter mr-2"></i> Filter
//                   </button>

//                   {showFilter && (
//                     <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow-md w-64 p-4">
//                       <div className="mb-3">
//                         <label className="block text-sm font-medium text-gray-700">
//                           Status
//                         </label>
//                         <select
//                           value={selectedStatus}
//                           onChange={(e) => setSelectedStatus(e.target.value)}
//                           className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
//                         >
//                           <option value="">All</option>
//                           <option value="DELIVERED">Delivered</option>
//                           <option value="SHIPPED">Shipped</option>
//                           <option value="PENDING">Pending</option>
//                         </select>
//                       </div>

//                       <div className="mb-3">
//                         <label className="block text-sm font-medium text-gray-700">
//                           COUNTRY
//                         </label>
//                         <select
//                           value={selectedCOUNTRY}
//                           onChange={(e) => setSelectedCOUNTRY(e.target.value)}
//                           className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
//                         >
//                           <option value="">All</option>
//                           <option value="USA">USA</option>
//                           <option value="Japan">Japan</option>
//                           <option value="Germany">Germany</option>
//                         </select>
//                       </div>

//                       <div className="mb-2">
//                         <label className="block text-sm font-medium text-gray-700">
//                           BRAND
//                         </label>
//                         <select
//                           value={selectedBRAND}
//                           onChange={(e) => setSelectedBRAND(e.target.value)}
//                           className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
//                         >
//                           <option value="">All</option>
//                           <option value="Toyota">Toyota</option>
//                           <option value="BMW">BMW</option>
//                           <option value="Ford">Ford</option>
//                         </select>
//                       </div>

//                       <button
//                         className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 mt-2"
//                         onClick={() => setShowFilter(false)}
//                       >
//                         Apply Filters
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
//                   onClick={handleDownloadCSV}
//                 >
//                   <i className="fas fa-file-export mr-2"></i> Export
//                 </button>

//                 <button
//                   className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition w-full sm:w-auto"
//                   onClick={handleAddInventory}
//                 >
//                   <i className="fas fa-plus mr-2"></i> Add Inventory
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     sr.
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     Source.Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     STOCK #
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     MANU#
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     MANU#2
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     INVOICE#
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     PAYMENT
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     PMT STATUS
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     PAY. TERMS
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     VIN#
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     ENGINE#
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     KEY#
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     BL#
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     SHIP DATE
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     BRAND
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     OCN SPEC
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     MODEL
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     COUNTRY
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     MY YEAR
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     EXT. COLOR
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     INT. COLOR
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     TBD3
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     ORDER MONTH
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     PROD. EST
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     SHIP. EST
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     EST ARR
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     SHP DTE
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     ARR EST
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     ARR. DATE
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     SHIP INDICATION
//                   </th>
//                   <th className="px-6 py-3 text-right text-sm font-bold text-gray-700 uppercase tracking-wide">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredData.length > 0 ? (
//                   filteredData.map((item, idx) => (
//                     <tr key={item.id || idx} className="hover:bg-gray-50">

//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {idx + 1}.
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {item?.SourceName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.STOCK}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.MANU1}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.MANU2}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.INVOICE}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.PAYMENT}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.PMTSTATUS}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.PAYTERMS}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.VIN}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.ENGINE}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.KEY}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.BL}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.SHIPDATE}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.BRAND}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.OCNSPEC}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.MODEL}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.COUNTRY}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.MYYEAR}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.EXTCOLOR}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.INTCOLOR}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.TBD3}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.ORDERMONTH}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.PRODEST}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.SHIPEST}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.ESTARR}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.SHPDTE}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.ARREST}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {item.ARRDATE}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
//                             ${item.SHIPINDICATION === "DELIVERED"
//                               ? "bg-green-100 text-green-800"
//                               : item.SHIPINDICATION === "SHIPPED"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : item.SHIPINDICATION === "CANCELLED"
//                                   ? "bg-red-100 text-red-800"
//                                   : item.SHIPINDICATION === "ORDERED"
//                                     ? "bg-gray-200 text-gray-800"
//                                     : "bg-slate-100 text-slate-800"
//                             }`}
//                         >
//                           {item.SHIPINDICATION}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
//                         <button
//                           className="text-indigo-600 hover:text-indigo-900 me-3"
//                           onClick={() => handleEditInventory(item, idx)}
//                           title="Edit"
//                         >
//                           <i className="fas fa-edit"></i>
//                         </button>

//                         <button
//                           className="text-red-600 hover:text-red-800"
//                           onClick={() => handleDeleteInventory(idx)}
//                           title="Delete"
//                         >
//                           <i className="fas fa-trash-alt"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="29" className="px-6 py-4 text-center text-sm text-gray-500">
//                       No inventory items found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Inventory Modal */}
//       {showInventoryModal && (
//         <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: "9999" }}>
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>
//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900">
//                       {editingId !== null ? "Edit Inventory Item" : "Add Inventory Item"}
//                     </h3>
//                     <div className="mt-2">
//                       <form className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           {/* First Column */}
//                           <div className="space-y-4">
//                             <div>
//                               <label htmlFor="source-name" className="block text-sm font-medium text-gray-700">Source Name</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="source-name"
//                                 value={itemForm.SourceName}
//                                 onChange={(e) => setItemForm({ ...itemForm, SourceName: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="stock-number" className="block text-sm font-medium text-gray-700">Stock Number</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="stock-number"
//                                 value={itemForm.STOCK}
//                                 onChange={(e) => setItemForm({ ...itemForm, STOCK: e.target.value })}
//                                 required
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="manu-number" className="block text-sm font-medium text-gray-700">MANU#</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="manu-number"
//                                 value={itemForm.MANU1}
//                                 onChange={(e) => setItemForm({ ...itemForm, MANU1: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="manu-number2" className="block text-sm font-medium text-gray-700">MANU#2</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="manu-number2"
//                                 value={itemForm.MANU2}
//                                 onChange={(e) => setItemForm({ ...itemForm, MANU2: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-700">INVOICE#</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="invoice-number"
//                                 value={itemForm.INVOICE}
//                                 onChange={(e) => setItemForm({ ...itemForm, INVOICE: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="PAYMENT" className="block text-sm font-medium text-gray-700">PAYMENT</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="PAYMENT"
//                                 value={itemForm.PAYMENT}
//                                 onChange={(e) => setItemForm({ ...itemForm, PAYMENT: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="PAYMENT-status" className="block text-sm font-medium text-gray-700">PMT STATUS</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="PAYMENT-status"
//                                 value={itemForm.PMTSTATUS}
//                                 onChange={(e) => setItemForm({ ...itemForm, PMTSTATUS: e.target.value })}
//                               />
//                             </div>
//                           </div>

//                           {/* Second Column */}
//                           <div className="space-y-4">
//                             <div>
//                               <label htmlFor="PAYMENT-terms" className="block text-sm font-medium text-gray-700">PAY. TERMS</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="PAYMENT-terms"
//                                 value={itemForm.PAYTERMS}
//                                 onChange={(e) => setItemForm({ ...itemForm, PAYTERMS: e.target.value })}
//                               />
//                             </div>


//                             <div>
//                               <label htmlFor="VIN" className="block text-sm font-medium text-gray-700">VIN#</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="VIN"
//                                 value={itemForm.VIN}
//                                 onChange={(e) => setItemForm({ ...itemForm, VIN: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="ENGINE" className="block text-sm font-medium text-gray-700">ENGINE#</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="ENGINE"
//                                 value={itemForm.ENGINE}
//                                 onChange={(e) => setItemForm({ ...itemForm, ENGINE: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="key-number" className="block text-sm font-medium text-gray-700">KEY#</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="key-number"
//                                 value={itemForm.KEY}
//                                 onChange={(e) => setItemForm({ ...itemForm, KEY: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="bl" className="block text-sm font-medium text-gray-700">BL#</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="BL"
//                                 value={itemForm.BL}
//                                 onChange={(e) => setItemForm({ ...itemForm, BL: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="ship-date" className="block text-sm font-medium text-gray-700">SHIP DATE</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="ship-date"
//                                 value={itemForm.SHIPDATE}
//                                 onChange={(e) => setItemForm({ ...itemForm, SHIPDATE: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="BRAND" className="block text-sm font-medium text-gray-700">BRAND</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="BRAND"
//                                 value={itemForm.BRAND}
//                                 onChange={(e) => setItemForm({ ...itemForm, BRAND: e.target.value })}
//                               />
//                             </div>
//                           </div>

//                           {/* Third Column */}
//                           <div className="space-y-4">
//                             <div>
//                               <label htmlFor="ocn-spec" className="block text-sm font-medium text-gray-700">OCN SPEC</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="ocn-spec"
//                                 value={itemForm.OCNSPEC}
//                                 onChange={(e) => setItemForm({ ...itemForm, OCNSPEC: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="MODEL" className="block text-sm font-medium text-gray-700">MODEL</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="MODEL"
//                                 value={itemForm.MODEL}
//                                 onChange={(e) => setItemForm({ ...itemForm, MODEL: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="COUNTRY" className="block text-sm font-medium text-gray-700">COUNTRY</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="COUNTRY"
//                                 value={itemForm.COUNTRY}
//                                 onChange={(e) => setItemForm({ ...itemForm, COUNTRY: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="VIN-year" className="block text-sm font-medium text-gray-700">MY YEAR</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="VIN-year"
//                                 value={itemForm.MYYEAR}
//                                 onChange={(e) => setItemForm({ ...itemForm, MYYEAR: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="ext-color" className="block text-sm font-medium text-gray-700">EXT. COLOR</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="ext-color"
//                                 value={itemForm.EXTCOLOR}
//                                 onChange={(e) => setItemForm({ ...itemForm, EXTCOLOR: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="int-color" className="block text-sm font-medium text-gray-700">INT. COLOR</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="int-color"
//                                 value={itemForm.INTCOLOR}
//                                 onChange={(e) => setItemForm({ ...itemForm, INTCOLOR: e.target.value })}
//                               />
//                             </div>

//                             <div>
//                               <label htmlFor="TBD3" className="block text-sm font-medium text-gray-700">TBD3</label>
//                               <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 id="TBD3"
//                                 value={itemForm.TBD3}
//                                 onChange={(e) => setItemForm({ ...itemForm, TBD3: e.target.value })}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         {/* Second Row */}
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                           <div>
//                             <label htmlFor="order-month" className="block text-sm font-medium text-gray-700">ORDER MONTH</label>
//                             <input
//                               type="text"
//                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                               id="order-month"
//                               value={itemForm.ORDERMONTH}
//                               onChange={(e) => setItemForm({ ...itemForm, ORDERMONTH: e.target.value })}
//                             />
//                           </div>

//                           <div>
//                             <label htmlFor="production-estimate" className="block text-sm font-medium text-gray-700">PROD. EST</label>
//                             <input
//                               type="text"
//                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                               id="production-estimate"
//                               value={itemForm.PRODEST}
//                               onChange={(e) => setItemForm({ ...itemForm, PRODEST: e.target.value })}
//                             />
//                           </div>

//                           <div>
//                             <label htmlFor="ship-estimate" className="block text-sm font-medium text-gray-700">SHIP. EST</label>
//                             <input
//                               type="text"
//                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                               id="ship-estimate"
//                               value={itemForm.SHIPEST}
//                               onChange={(e) => setItemForm({ ...itemForm, SHIPEST: e.target.value })}
//                             />
//                           </div>

//                           <div>
//                             <label htmlFor="est-arrival" className="block text-sm font-medium text-gray-700">EST ARR</label>
//                             <input
//                               type="text"
//                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                               id="est-arrival"
//                               value={itemForm.ESTARR}
//                               onChange={(e) => setItemForm({ ...itemForm, ESTARR: e.target.value })}
//                             />
//                           </div>
//                         </div>

//                         {/* Third Row */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <div>
//                             <label htmlFor="shipping-date" className="block text-sm font-medium text-gray-700">SHP DTE</label>
//                             <input
//                               type="text"
//                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                               id="shipping-date"
//                               value={itemForm.SHPDTE}
//                               onChange={(e) => setItemForm({ ...itemForm, SHPDTE: e.target.value })}
//                             />
//                           </div>

//                           <div>
//                             <label htmlFor="arrival-estimate" className="block text-sm font-medium text-gray-700">ARR EST</label>
//                             <input
//                               type="text"
//                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                               id="arrival-estimate"
//                               value={itemForm.ARREST}
//                               onChange={(e) => setItemForm({ ...itemForm, ARREST: e.target.value })}
//                             />
//                           </div>

//                           <div>
//                             <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700">ARR. DATE</label>
//                             <input
//                               type="text"
//                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                               id="arrival-date"
//                               value={itemForm.ARRDATE}
//                               onChange={(e) => setItemForm({ ...itemForm, ARRDATE: e.target.value })}
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <label htmlFor="shipping-indication" className="block text-sm font-medium text-gray-700">SHIP INDICATION</label>
//                           <select
//                             id="shipping-indication"
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={itemForm.SHIPINDICATION}
//                             onChange={(e) => setItemForm({ ...itemForm, SHIPINDICATION: e.target.value })}
//                           >
//                             <option value="Delivered">Delivered</option>
//                             <option value="Shipped">Shipped</option>
//                             <option value="Pending">Pending</option>
//                           </select>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                   onClick={handleSaveInventory}
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                   onClick={() => setShowInventoryModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InventoryList;

import React, { useState, useRef, useEffect } from "react";
import * as echarts from "echarts";
import api from "../../../../utils/axiosInterceptor";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';
import { FixedSizeList as List } from "react-window";
import axios from "axios";

function InventoryList() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCOUNTRY, setSelectedCOUNTRY] = useState("");
  const [selectedBRAND, setSelectedBRAND] = useState("");
  const [loading, setLoading] = useState(false);

  // State for modal
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [itemForm, setItemForm] = useState({
    SourceName: "",
    STOCK: "",
    MANU1: "",
    MANU2: "",
    INVOICE: "",
    PAYMENT: "",
    PMTSTATUS: "",
    PAYTERMS: "",
    VIN: "",
    ENGINE: "",
    KEY: "",
    BL: "",
    SHIPDATE: "",
    BRAND: "",
    OCNSPEC: "",
    MODEL: "",
    COUNTRY: "",
    MYYEAR: "",
    EXTCOLOR: "",
    INTCOLOR: "",
    TBD3: "",
    ORDERMONTH: "",
    PRODEST: "",
    SHIPEST: "",
    ESTARR: "",
    SHPDTE: "",
    ARREST: "",
    ARRDATE: "",
    SHIPINDICATION: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Inventory data state
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(50); // Start with 50 items

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

  const fetchInventoryDataByCounrty = async () => {
    try {
      setLoading(true);
      const loginDetails = JSON.parse(localStorage.getItem("login_detail"));
      const country = loginDetails?.country || "India";
      // const response = await api.get(`/inventory-by-country/${country}`);
      const response = await api.get(`/inventory-by-country/${country}`);
      // const response = await axios.get(`https://ssknf82q-8000.inc1.devtunnels.ms/api/d1/inventory-by-country/${country}`);
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



  // Fetch Google Sheet data
  const fetchGoogleshet = async () => {
    try {
      setLoading(true);
      const response = await api.get("/sync-google-sheet");
      setData2(response.data2);
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
    fetchGoogleshet();
    // fetchInventoryData();
    fetchInventoryDataByCounrty();
  }, []);

  useEffect(() => {
    if (timelineChartRef.current && data.length > 0) {
      const chart = echarts.init(timelineChartRef.current);

      // 1. PROPER DATA PROCESSING
      const shippingData = data
        .filter(item => {
          const hasStock = item.STOCK || item.stock;
          const hasSHIPDATE = item.SHPDTE || item.SHIPDATE;
          const hasARRDATE = item.ARRDATE || item.arrDate;
          return hasStock && hasSHIPDATE && hasARRDATE;
        })
        .map(item => {
          const stock = item.STOCK || item.stock || 'N/A';
          const MODEL = item.MODEL || 'N/A';
          const SHIPDATE = item.SHPDTE || item.SHIPDATE;
          const ARRDATE = item.ARRDATE || item.arrDate;
          const status = item.SHIPINDICATION || 'PENDING';

          const parseDate = (dateStr) => {
            if (!dateStr) return new Date('2025-01-01');
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? new Date('2025-01-01') : date;
          };

          return {
            stock,
            MODEL,
            SHPDTE: parseDate(SHIPDATE),
            ARRDATE: parseDate(ARRDATE),
            status: status.toUpperCase()
          };
        });

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
              <div>MODEL: ${data.MODEL}</div>
              <div>Shipping: ${data.SHPDTE.toLocaleDateString()}</div>
              <div>Arrival: ${data.ARRDATE.toLocaleDateString()}</div>
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
              value: item.SHPDTE.getMonth() + 1,
              stock: item.stock,
              MODEL: item.MODEL,
              SHPDTE: item.SHPDTE,
              ARRDATE: item.ARRDATE,
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
              const shipMonth = item.SHPDTE.getMonth() + 1;
              const arrivalMonth = item.ARRDATE.getMonth() + 1;
              return {
                value: arrivalMonth - shipMonth,
                stock: item.stock,
                MODEL: item.MODEL,
                SHPDTE: item.SHPDTE,
                ARRDATE: item.ARRDATE,
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
      SourceName: "",
      STOCK: "",
      MANU1: "",
      MANU2: "",
      INVOICE: "",
      PAYMENT: "",
      PMTSTATUS: "",
      PAYTERMS: "",
      VIN: "",
      ENGINE: "",
      KEY: "",
      BL: "",
      SHIPDATE: "",
      BRAND: "",
      OCNSPEC: "",
      MODEL: "",
      COUNTRY: "",
      MYYEAR: "",
      EXTCOLOR: "",
      INTCOLOR: "",
      TBD3: "",
      ORDERMONTH: "",
      PRODEST: "",
      SHIPEST: "",
      ESTARR: "",
      SHPDTE: "",
      ARREST: "",
      ARRDATE: "",
      SHIPINDICATION: ""
    });
    setEditingIndex(null);
    setEditingId(null);
    setShowInventoryModal(true);
  };

  const handleEditInventory = (item, index) => {
    setItemForm({
      SourceName: item.SourceName || "",
      STOCK: item.STOCK || "",
      MANU1: item.MANU1 || "",
      MANU2: item.MANU2 || "",
      INVOICE: item.INVOICE || "",
      PAYMENT: item.PAYMENT || "",
      PMTSTATUS: item.PMTSTATUS || "",
      PAYTERMS: item.PAYTERMS || "",
      VIN: item.VIN || "",
      ENGINE: item.ENGINE || "",
      KEY: item.KEY || "",
      BL: item.BL || "",
      SHIPDATE: item.SHIPDATE || "",
      BRAND: item.BRAND || "",
      OCNSPEC: item.OCNSPEC || "",
      MODEL: item.MODEL || "",
      COUNTRY: item.COUNTRY || "",
      MYYEAR: item.MYYEAR || "",
      EXTCOLOR: item.EXTCOLOR || "",
      INTCOLOR: item.INTCOLOR || "",
      TBD3: item.TBD3 || "",
      ORDERMONTH: item.ORDERMONTH || "",
      PRODEST: item.PRODEST || "",
      SHIPEST: item.SHIPEST || "",
      ESTARR: item.ESTARR || "",
      SHPDTE: item.SHPDTE || "",
      ARREST: item.ARREST || "",
      ARRDATE: item.ARRDATE || "",
      SHIPINDICATION: item.SHIPINDICATION || ""
    });
    setEditingIndex(index);
    setEditingId(item.id); // Assuming your API uses _id as identifier
    setShowInventoryModal(true);
  };

  const handleDeleteInventory = async (index) => {
    const itemToDelete = filteredData[index]; // Use filteredData if you have filtering

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
        await api.delete(`/inventory/${itemToDelete.id}`);
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
      if (!itemForm.STOCK || !itemForm.VIN || !itemForm.MODEL) {
        await Swal.fire({
          title: 'Validation Error',
          text: 'Please fill in all required fields (Stock Number, VIN, and MODEL)',
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

  const filteredData = Array.isArray(data)
    ? data.filter(item => {
      const matchesSearch = Object.values(item).some(
        val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus = !selectedStatus ||
        (item.SHIPINDICATION && item.SHIPINDICATION.toUpperCase() === selectedStatus.toUpperCase());

      const matchesCOUNTRY = !selectedCOUNTRY ||
        (item.COUNTRY && item.COUNTRY.toUpperCase() === selectedCOUNTRY.toUpperCase());

      const matchesBRAND = !selectedBRAND ||
        (item.BRAND && item.BRAND.toUpperCase() === selectedBRAND.toUpperCase());

      return matchesSearch && matchesStatus && matchesCOUNTRY && matchesBRAND;
    })
    : [];


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
      fetchInventoryData();
      alert(result.message || "File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(result.message || "File uploaded successfully!");
    }
  };

  const columnWidths = {
    sr: 60,
    sourceName: 200,
    stock: 150,
    manu1: 150,
    manu2: 150,
    invoice: 150,
    payment: 150,
    pmtStatus: 150,
    payTerms: 150,
    vin: 200,
    engine: 150,
    key: 120,
    bl: 150,
    shipDate: 150,
    brand: 150,
    ocnSpec: 150,
    model: 150,
    country: 150,
    myYear: 120,
    extColor: 150,
    intColor: 150,
    tbd3: 150,
    orderMonth: 150,
    prodEst: 150,
    shipEst: 150,
    estArr: 150,
    shpDte: 150,
    arrEst: 150,
    arrDate: 150,
    shipIndication: 200,
    actions: 120,
  };

  const columnKeys = [
    { key: "sr", label: "Sr." },
    { key: "sourceName", label: "Source Name", dataKey: "SourceName" },
    { key: "stock", label: "STOCK", dataKey: "STOCK" },
    { key: "manu1", label: "MANU#", dataKey: "MANU1" },
    { key: "manu2", label: "MANU#2", dataKey: "MANU2" },
    { key: "invoice", label: "INVOICE#", dataKey: "INVOICE" },
    { key: "payment", label: "PAYMENT", dataKey: "PAYMENT" },
    { key: "pmtStatus", label: "PMT STATUS", dataKey: "PMTSTATUS" },
    { key: "payTerms", label: "PAY TERMS", dataKey: "PAYTERMS" },
    { key: "vin", label: "VIN", dataKey: "VIN" },
    { key: "engine", label: "ENGINE", dataKey: "ENGINE" },
    { key: "key", label: "KEY", dataKey: "KEY" },
    { key: "bl", label: "BL", dataKey: "BL" },
    { key: "shipDate", label: "SHIP DATE", dataKey: "SHIPDATE" },
    { key: "brand", label: "BRAND", dataKey: "BRAND" },
    { key: "ocnSpec", label: "OCN SPEC", dataKey: "OCNSPEC" },
    { key: "model", label: "MODEL", dataKey: "MODEL" },
    { key: "country", label: "COUNTRY", dataKey: "COUNTRY" },
    { key: "myYear", label: "MY YEAR", dataKey: "MYYEAR" },
    { key: "extColor", label: "EXT. COLOR", dataKey: "EXTCOLOR" },
    { key: "intColor", label: "INT. COLOR", dataKey: "INTCOLOR" },
    { key: "tbd3", label: "TBD3", dataKey: "TBD3" },
    { key: "orderMonth", label: "ORDER MONTH", dataKey: "ORDERMONTH" },
    { key: "prodEst", label: "PROD. EST", dataKey: "PRODEST" },
    { key: "shipEst", label: "SHIP. EST", dataKey: "SHIPEST" },
    { key: "estArr", label: "EST ARR", dataKey: "ESTARR" },
    { key: "shpDte", label: "SHP DTE", dataKey: "SHPDTE" },
    { key: "arrEst", label: "ARR EST", dataKey: "ARREST" },
    { key: "arrDate", label: "ARR. DATE", dataKey: "ARRDATE" },
    { key: "shipIndication", label: "SHIP INDICATION", dataKey: "SHIPINDICATION" },
    { key: "actions", label: "Actions" },
  ];

  const totalTableWidth = Object.values(columnWidths).reduce((sum, w) => sum + w, 0);
  const dateFields = [
    "SHIPDATE",
    "PRODEST",
    "SHIPEST",
    "ESTARR",
    "SHPDTE",
    "ARREST",
    "ARRDATE",
  ];

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
                          COUNTRY
                        </label>
                        <select
                          value={selectedCOUNTRY}
                          onChange={(e) => setSelectedCOUNTRY(e.target.value)}
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
                          BRAND
                        </label>
                        <select
                          value={selectedBRAND}
                          onChange={(e) => setSelectedBRAND(e.target.value)}
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

          <div className="table-responsive border rounded" style={{ overflowX: "auto" }}>
            <div className="d-flex bg-light fw-bold border-bottom" style={{ width: totalTableWidth }}>
              {columnKeys.map((col, idx) => (
                <div
                  key={idx}
                  className="p-2"
                  style={{
                    width: columnWidths[col.key],
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {col.label}
                </div>
              ))}
            </div>

            <div style={{ width: totalTableWidth }}>
              <List height={Math.min(filteredData.length * 60, 600)} itemCount={filteredData.length} itemSize={60} width={totalTableWidth}>
                {({ index, style }) => {
                  const item = filteredData[index];
                  if (!item) return null;

                  return (
                    <div
                      className="d-flex border-bottom bg-white"
                      style={{ ...style, alignItems: "center" }}
                    >
                      {columnKeys.map((col, idx) => {
                        if (col.key === "sr") {
                          return (
                            <div
                              key={idx}
                              className="p-2"
                              style={{
                                width: columnWidths[col.key],
                                whiteSpace: "normal",
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                              }}
                            >
                              {index + 1}
                            </div>
                          );
                        }

                        if (col.key === "shipIndication") {
                          const status = item[col.dataKey];
                          const badgeClass =
                            status === "DELIVERED"
                              ? "bg-success"
                              : status === "SHIPPED"
                                ? "bg-warning text-dark"
                                : status === "CANCELLED"
                                  ? "bg-danger"
                                  : status === "ORDERED"
                                    ? "bg-secondary"
                                    : "bg-light text-dark";

                          return (
                            <div
                              key={idx}
                              className="p-2"
                              style={{
                                width: columnWidths[col.key],
                                whiteSpace: "normal",
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                              }}
                            >
                              <span className={`badge ${badgeClass}`}>{status}</span>
                            </div>
                          );
                        }

                        if (col.key === "actions") {
                          return (
                            <div
                              key={idx}
                              className="p-2 d-flex gap-2"
                              style={{ width: columnWidths[col.key] }}
                            >
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditInventory(item, index)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteInventory(index)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          );
                        }
                        const isValidDate = (val) => {
                          const d = new Date(val);
                          return val && !isNaN(d);
                        };


                        const rawValue = item[col.dataKey];
                        const value =
                          dateFields.includes(col.dataKey) && isValidDate(rawValue)
                            ? new Date(rawValue).toLocaleDateString("en-GB")
                            : rawValue || "";

                        return (
                          <div
                            key={idx}
                            className="p-2"
                            style={{
                              width: columnWidths[col.key],
                              whiteSpace: "normal",
                              overflowWrap: "break-word",
                              wordBreak: "break-word",
                            }}
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </List>
            </div>
          </div>



          {/* <div className="flex justify-center py-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setItemsToShow((prev) => prev + 50)}
            >
              Load More
            </button>
          </div> */}
          {/* <div className="flex justify-center py-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center min-w-[120px]"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Load More"
              )}
            </button>
          </div> */}
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
                                value={itemForm.SourceName}
                                onChange={(e) => setItemForm({ ...itemForm, SourceName: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="stock-number" className="block text-sm font-medium text-gray-700">Stock Number</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="stock-number"
                                value={itemForm.STOCK}
                                onChange={(e) => setItemForm({ ...itemForm, STOCK: e.target.value })}
                                required
                              />
                            </div>

                            <div>
                              <label htmlFor="manu-number" className="block text-sm font-medium text-gray-700">MANU#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm id='manu-number'"
                                value={itemForm.MANU1}
                                onChange={(e) => setItemForm({ ...itemForm, MANU1: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="manu-number2" className="block text-sm font-medium text-gray-700">MANU#2</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="manu-number2"
                                value={itemForm.MANU2}
                                onChange={(e) => setItemForm({ ...itemForm, MANU2: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-700">INVOICE#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="invoice-number"
                                value={itemForm.INVOICE}
                                onChange={(e) => setItemForm({ ...itemForm, INVOICE: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="PAYMENT" className="block text-sm font-medium text-gray-700">PAYMENT</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="PAYMENT"
                                value={itemForm.PAYMENT}
                                onChange={(e) => setItemForm({ ...itemForm, PAYMENT: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="PAYMENT-status" className="block text-sm font-medium text-gray-700">PMT STATUS</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="PAYMENT-status"
                                value={itemForm.PMTSTATUS}
                                onChange={(e) => setItemForm({ ...itemForm, PMTSTATUS: e.target.value })}
                              />
                            </div>
                          </div>

                          {/* Second Column */}
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="PAYMENT-terms" className="block text-sm font-medium text-gray-700">PAY. TERMS</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="PAYMENT-terms"
                                value={itemForm.PAYTERMS}
                                onChange={(e) => setItemForm({ ...itemForm, PAYTERMS: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="VIN" className="block text-sm font-medium text-gray-700">VIN#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="VIN"
                                value={itemForm.VIN}
                                onChange={(e) => setItemForm({ ...itemForm, VIN: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="ENGINE" className="block text-sm font-medium text-gray-700">ENGINE#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="ENGINE"
                                value={itemForm.ENGINE}
                                onChange={(e) => setItemForm({ ...itemForm, ENGINE: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="key-number" className="block text-sm font-medium text-gray-700">KEY#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="key-number"
                                value={itemForm.KEY}
                                onChange={(e) => setItemForm({ ...itemForm, KEY: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="bl" className="block text-sm font-medium text-gray-700">BL#</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="BL"
                                value={itemForm.BL}
                                onChange={(e) => setItemForm({ ...itemForm, BL: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="ship-date" className="block text-sm font-medium text-gray-700">SHIP DATE</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="ship-date"
                                value={itemForm.SHIPDATE}
                                onChange={(e) => setItemForm({ ...itemForm, SHIPDATE: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="BRAND" className="block text-sm font-medium text-gray-700">BRAND</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="BRAND"
                                value={itemForm.BRAND}
                                onChange={(e) => setItemForm({ ...itemForm, BRAND: e.target.value })}
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
                                value={itemForm.OCNSPEC}
                                onChange={(e) => setItemForm({ ...itemForm, OCNSPEC: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="MODEL" className="block text-sm font-medium text-gray-700">MODEL</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="MODEL"
                                value={itemForm.MODEL}
                                onChange={(e) => setItemForm({ ...itemForm, MODEL: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="COUNTRY" className="block text-sm font-medium text-gray-700">COUNTRY</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="COUNTRY"
                                value={itemForm.COUNTRY}
                                onChange={(e) => setItemForm({ ...itemForm, COUNTRY: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="VIN-year" className="block text-sm font-medium text-gray-700">MY YEAR</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="VIN-year"
                                value={itemForm.MYYEAR}
                                onChange={(e) => setItemForm({ ...itemForm, MYYEAR: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="ext-color" className="block text-sm font-medium text-gray-700">EXT. COLOR</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="ext-color"
                                value={itemForm.EXTCOLOR}
                                onChange={(e) => setItemForm({ ...itemForm, EXTCOLOR: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="int-color" className="block text-sm font-medium text-gray-700">INT. COLOR</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="int-color"
                                value={itemForm.INTCOLOR}
                                onChange={(e) => setItemForm({ ...itemForm, INTCOLOR: e.target.value })}
                              />
                            </div>

                            <div>
                              <label htmlFor="TBD3" className="block text-sm font-medium text-gray-700">TBD3</label>
                              <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="TBD3"
                                value={itemForm.TBD3}
                                onChange={(e) => setItemForm({ ...itemForm, TBD3: e.target.value })}
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
                              value={itemForm.ORDERMONTH}
                              onChange={(e) => setItemForm({ ...itemForm, ORDERMONTH: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="production-estimate" className="block text-sm font-medium text-gray-700">PROD. EST</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="production-estimate"
                              value={itemForm.PRODEST}
                              onChange={(e) => setItemForm({ ...itemForm, PRODEST: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="ship-estimate" className="block text-sm font-medium text-gray-700">SHIP. EST</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="ship-estimate"
                              value={itemForm.SHIPEST}
                              onChange={(e) => setItemForm({ ...itemForm, SHIPEST: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="est-arrival" className="block text-sm font-medium text-gray-700">EST ARR</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="est-arrival"
                              value={itemForm.ESTARR}
                              onChange={(e) => setItemForm({ ...itemForm, ESTARR: e.target.value })}
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
                              value={itemForm.SHPDTE}
                              onChange={(e) => setItemForm({ ...itemForm, SHPDTE: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="arrival-estimate" className="block text-sm font-medium text-gray-700">ARR EST</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="arrival-estimate"
                              value={itemForm.ARREST}
                              onChange={(e) => setItemForm({ ...itemForm, ARREST: e.target.value })}
                            />
                          </div>

                          <div>
                            <label htmlFor="arrival-date" className="block text-sm font-medium text-gray-700">ARR. DATE</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              id="arrival-date"
                              value={itemForm.ARRDATE}
                              onChange={(e) => setItemForm({ ...itemForm, ARRDATE: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="shipping-indication" className="block text-sm font-medium text-gray-700">SHIP INDICATION</label>
                          <select
                            id="shipping-indication"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={itemForm.SHIPINDICATION}
                            onChange={(e) => setItemForm({ ...itemForm, SHIPINDICATION: e.target.value })}
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
