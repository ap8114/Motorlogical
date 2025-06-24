import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaDownload, FaPlus, FaFilter } from "react-icons/fa";

const ordersData = [
  {
    id: "ORD-2025-001",
    customer: "John Smith",
    dealership: "City Motors",
    product: "2025 SUV Model X\nExtended Warranty",
    quantity: 1,
    status: "Pending",
    orderDate: "Jun 15, 2025",
    delivery: "Jul 15, 2025",
    total: "$45,000",
    sourceName: "Supplier A",
    stockNumber: "STK-001",
    manuNumber: "MN-001",
    manuNumber2: "MN-001-A",
    invoiceNumber: "INV-2025-001",
    payment: "Down Payment Paid",
    paymentStatus: "Partial",
    paymentTerms: "30 days",
    vin: "1HGCM82633A123456",
    engineNumber: "ENG-001",
    keyNumber: "KEY-001",
    blNumber: "BL-2025-001",
    shipDate: "2025-06-20",
    brand: "Toyota",
    ocnSpec: "OCN-SPEC-001",
    model: "Camry",
    country: "Japan",
    myYear: "2025",
    exteriorColor: "Red",
    interiorColor: "Black",
    tbd3: "N/A",
    orderMonth: "June",
    prodEst: "2025-06-10",
    shipEst: "2025-06-20",
    estArr: "2025-07-15",
    shpDte: "2025-06-20",
    arrEst: "2025-07-15",
    arrDate: "2025-07-15",
    shipIndication: "On Time"
  },
  {
    id: "ORD-2025-002",
    customer: "Sarah Johnson",
    dealership: "Highway Auto",
    product: "2025 Sedan Model S\nPremium Package",
    quantity: 1,
    status: "Processing",
    orderDate: "Jun 12, 2025",
    delivery: "Jul 10, 2025",
    total: "$38,500",
    sourceName: "Supplier B",
    stockNumber: "STK-002",
    manuNumber: "MN-002",
    manuNumber2: "MN-002-A",
    invoiceNumber: "INV-2025-002",
    payment: "Full Payment Pending",
    paymentStatus: "Pending",
    paymentTerms: "45 days",
    vin: "2HGCM82633A654321",
    engineNumber: "ENG-002",
    keyNumber: "KEY-002",
    blNumber: "BL-2025-002",
    shipDate: "2025-06-18",
    brand: "Honda",
    ocnSpec: "OCN-SPEC-002",
    model: "Accord",
    country: "Japan",
    myYear: "2025",
    exteriorColor: "Blue",
    interiorColor: "Beige",
    tbd3: "N/A",
    orderMonth: "June",
    prodEst: "2025-06-08",
    shipEst: "2025-06-18",
    estArr: "2025-07-10",
    shpDte: "2025-06-18",
    arrEst: "2025-07-10",
    arrDate: "2025-07-10",
    shipIndication: "Delayed"
  },
  {
    id: "ORD-2025-003",
    customer: "Michael Brown",
    dealership: "Global Motors",
    product: "2025 Chang'an CS75 Plus\nPremium Edition",
    quantity: 1,
    status: "Completed",
    orderDate: "May 20, 2025",
    delivery: "Jun 25, 2025",
    total: "$32,000",
    sourceName: "Supplier C",
    stockNumber: "STK-003",
    manuNumber: "MN-003",
    manuNumber2: "MN-003-A",
    invoiceNumber: "INV-2025-003",
    payment: "Full Payment Paid",
    paymentStatus: "Paid",
    paymentTerms: "15 days",
    vin: "3HGCM82633A789012",
    engineNumber: "ENG-003",
    keyNumber: "KEY-003",
    blNumber: "BL-2025-003",
    shipDate: "2025-06-05",
    brand: "Chang'an",
    ocnSpec: "OCN-SPEC-003",
    model: "CS75 Plus",
    country: "China",
    myYear: "2025",
    exteriorColor: "White",
    interiorColor: "Brown",
    tbd3: "N/A",
    orderMonth: "May",
    prodEst: "2025-05-25",
    shipEst: "2025-06-05",
    estArr: "2025-06-25",
    shpDte: "2025-06-05",
    arrEst: "2025-06-25",
    arrDate: "2025-06-25",
    shipIndication: "On Time"
  }
];

const paymentOptions = [
  "Down Payment Paid",
  "Full Payment Pending",
  "Part Payment Paid",
  "Full Payment Paid"
];

const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];
const brandOptions = ["Toyota", "Honda", "Chang'an", "Other"];
const yearOptions = Array.from({ length: 7 }, (_, i) => 2024 + i);
const monthOptions = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const OrderManagement = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("view");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    brand: "",
    paymentStatus: "",
    orderMonth: ""
  });

  const handleOpenModal = (type, order = null) => {
    setModalType(type);
    setSelectedOrder(order);
    setModalShow(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      brand: "",
      paymentStatus: "",
      orderMonth: ""
    });
  };

  const filteredOrders = ordersData.filter((order) => {
    // Search term filtering
    const lowerTerm = searchTerm.toLowerCase();
    const matchesSearch = 
      order.id.toLowerCase().includes(lowerTerm) ||
      order.customer.toLowerCase().includes(lowerTerm) ||
      order.dealership.toLowerCase().includes(lowerTerm) ||
      order.product.toLowerCase().includes(lowerTerm) ||
      order.status.toLowerCase().includes(lowerTerm);
    
    // Additional filters
    const matchesStatus = !filters.status || order.status === filters.status;
    const matchesBrand = !filters.brand || order.brand === filters.brand;
    const matchesPaymentStatus = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus;
    const matchesOrderMonth = !filters.orderMonth || order.orderMonth === filters.orderMonth;
    
    return matchesSearch && matchesStatus && matchesBrand && matchesPaymentStatus && matchesOrderMonth;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Order Management</h2>
          <p className="text-sm sm:text-base text-gray-500">Manage all vehicle orders in one place</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded inline-flex items-center justify-center">
            <FaDownload className="mr-2" /> Download CSV
          </button>
          <button
            onClick={() => handleOpenModal("add")}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Create New Order
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full border px-4 py-2 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded inline-flex items-center justify-center"
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All Statuses</option>
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All Brands</option>
                {brandOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Status</label>
              <select
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All Payment Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Order Month</label>
              <select
                name="orderMonth"
                value={filters.orderMonth}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All Months</option>
                {monthOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-4">Order List</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">ORDER ID</th>
                <th className="px-4 py-2">CUSTOMER</th>
                <th className="px-4 py-2">DEALERSHIP</th>
                <th className="px-4 py-2">PRODUCT</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">STATUS</th>
                <th className="px-4 py-2">ORDER DATE</th>
                <th className="px-4 py-2">DELIVERY</th>
                <th className="px-4 py-2">TOTAL</th>
                <th className="px-4 py-2">SOURCE</th>
                <th className="px-4 py-2">STOCK #</th>
                <th className="px-4 py-2">MANU#</th>
                <th className="px-4 py-2">MANU#2</th>
                <th className="px-4 py-2">INVOICE #</th>
                <th className="px-4 py-2">PAYMENT</th>
                <th className="px-4 py-2">PAY STATUS</th>
                <th className="px-4 py-2">PAY TERMS</th>
                <th className="px-4 py-2">VIN#</th>
                <th className="px-4 py-2">ENGINE#</th>
                <th className="px-4 py-2">KEY#</th>
                <th className="px-4 py-2">BL#</th>
                <th className="px-4 py-2">SHIP DATE</th>
                <th className="px-4 py-2">BRAND</th>
                <th className="px-4 py-2">OCN SPEC</th>
                <th className="px-4 py-2">MODEL</th>
                <th className="px-4 py-2">COUNTRY</th>
                <th className="px-4 py-2">YEAR</th>
                <th className="px-4 py-2">EXT COLOR</th>
                <th className="px-4 py-2">INT COLOR</th>
                <th className="px-4 py-2">TBD3</th>
                <th className="px-4 py-2">ORDER MONTH</th>
                <th className="px-4 py-2">PROD EST</th>
                <th className="px-4 py-2">SHIP EST</th>
                <th className="px-4 py-2">EST ARR</th>
                <th className="px-4 py-2">SHP DTE</th>
                <th className="px-4 py-2">ARR EST</th>
                <th className="px-4 py-2">ARR DATE</th>
                <th className="px-4 py-2">SHIP IND</th>
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2 text-blue-600 underline">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.dealership}</td>
                  <td className="px-4 py-2 whitespace-pre-line">{order.product}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs border rounded ${
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                      order.status === "Processing" ? "bg-blue-100 text-blue-800 border-blue-200" :
                      order.status === "Completed" ? "bg-green-100 text-green-800 border-green-200" :
                      "bg-gray-100 text-gray-800 border-gray-200"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.orderDate}</td>
                  <td className="px-4 py-2">{order.delivery}</td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className="px-4 py-2">{order.sourceName}</td>
                  <td className="px-4 py-2">{order.stockNumber}</td>
                  <td className="px-4 py-2">{order.manuNumber}</td>
                  <td className="px-4 py-2">{order.manuNumber2}</td>
                  <td className="px-4 py-2">{order.invoiceNumber}</td>
                  <td className="px-4 py-2">{order.payment}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs border rounded ${
                      order.paymentStatus === "Paid" ? "bg-green-100 text-green-800 border-green-200" :
                      order.paymentStatus === "Partial" ? "bg-blue-100 text-blue-800 border-blue-200" :
                      "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.paymentTerms}</td>
                  <td className="px-4 py-2">{order.vin}</td>
                  <td className="px-4 py-2">{order.engineNumber}</td>
                  <td className="px-4 py-2">{order.keyNumber}</td>
                  <td className="px-4 py-2">{order.blNumber}</td>
                  <td className="px-4 py-2">{order.shipDate}</td>
                  <td className="px-4 py-2">{order.brand}</td>
                  <td className="px-4 py-2">{order.ocnSpec}</td>
                  <td className="px-4 py-2">{order.model}</td>
                  <td className="px-4 py-2">{order.country}</td>
                  <td className="px-4 py-2">{order.myYear}</td>
                  <td className="px-4 py-2">{order.exteriorColor}</td>
                  <td className="px-4 py-2">{order.interiorColor}</td>
                  <td className="px-4 py-2">{order.tbd3}</td>
                  <td className="px-4 py-2">{order.orderMonth}</td>
                  <td className="px-4 py-2">{order.prodEst}</td>
                  <td className="px-4 py-2">{order.shipEst}</td>
                  <td className="px-4 py-2">{order.estArr}</td>
                  <td className="px-4 py-2">{order.shpDte}</td>
                  <td className="px-4 py-2">{order.arrEst}</td>
                  <td className="px-4 py-2">{order.arrDate}</td>
                  <td className="px-4 py-2">{order.shipIndication}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600"
                      onClick={() => handleOpenModal("view", order)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-green-600"
                      onClick={() => handleOpenModal("edit", order)}
                    >
                      <FaEdit />
                    </button>
                    <button className="text-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
        </div>
      </div>

      {modalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold">
                {modalType === "view"
                  ? "View Order"
                  : modalType === "edit"
                  ? "Edit Order"
                  : "Create New Order"}
              </h3>
              <button onClick={() => setModalShow(false)} className="text-gray-500">×</button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Basic Information</h4>
                <div>
                  <label className="block text-sm font-medium">Order ID</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.id || ""}
                    placeholder="Enter order ID"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Customer Name</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.customer || ""}
                    placeholder="Enter customer name"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Dealership</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.dealership || ""}
                    placeholder="Enter dealership"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Product</label>
                  <textarea
                    defaultValue={selectedOrder?.product || ""}
                    placeholder="Enter product details"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    defaultValue={selectedOrder?.quantity || 1}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Total</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.total || ""}
                    placeholder="Enter total amount"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
              </div>

              {/* Source Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Source Information</h4>
                <div>
                  <label className="block text-sm font-medium">Source Name</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.sourceName || ""}
                    placeholder="Enter source name"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Stock #</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.stockNumber || ""}
                    placeholder="Enter stock number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">MANU#</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.manuNumber || ""}
                    placeholder="Enter manufacturer number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">MANU#2</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.manuNumber2 || ""}
                    placeholder="Enter secondary manufacturer number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Invoice #</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.invoiceNumber || ""}
                    placeholder="Enter invoice number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Payment Information</h4>
                <div>
                  <label className="block text-sm font-medium">Payment</label>
                  <select
                    defaultValue={selectedOrder?.payment || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    disabled={modalType === "view"}
                  >
                    {paymentOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Payment Status</label>
                  <select
                    defaultValue={selectedOrder?.paymentStatus || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    disabled={modalType === "view"}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Payment Terms</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.paymentTerms || ""}
                    placeholder="Enter payment terms"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Vehicle Information</h4>
                <div>
                  <label className="block text-sm font-medium">VIN#</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.vin || ""}
                    placeholder="Enter VIN number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Engine#</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.engineNumber || ""}
                    placeholder="Enter engine number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Key#</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.keyNumber || ""}
                    placeholder="Enter key number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">BL#</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.blNumber || ""}
                    placeholder="Enter BL number"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Brand</label>
                  <select
                    defaultValue={selectedOrder?.brand || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    disabled={modalType === "view"}
                  >
                    {brandOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">OCN SPEC</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.ocnSpec || ""}
                    placeholder="Enter OCN SPEC"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Model</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.model || ""}
                    placeholder="Enter model"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.country || ""}
                    placeholder="Enter country"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
              </div>

              {/* Year & Color Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Year & Color</h4>
                <div>
                  <label className="block text-sm font-medium">MY Year</label>
                  <select
                    defaultValue={selectedOrder?.myYear || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    disabled={modalType === "view"}
                  >
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Exterior Color</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.exteriorColor || ""}
                    placeholder="Enter exterior color"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Interior Color</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.interiorColor || ""}
                    placeholder="Enter interior color"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">TBD3</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.tbd3 || ""}
                    placeholder="Enter TBD3"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Order Month</label>
                  <select
                    defaultValue={selectedOrder?.orderMonth || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    disabled={modalType === "view"}
                  >
                    {monthOptions.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Date Information</h4>
                <div>
                  <label className="block text-sm font-medium">Order Date</label>
                  <input
                    type="date"
                    defaultValue={selectedOrder?.orderDate || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Prod. Est</label>
                  <input
                    type="date"
                    defaultValue={selectedOrder?.prodEst || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Ship. Est</label>
                  <input
                    type="date"
                    defaultValue={selectedOrder?.shipEst || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Est. Arr</label>
                  <input
                    type="date"
                    defaultValue={selectedOrder?.estArr || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">SHP DTE</label>
                  <input
                    type="date"
                    defaultValue={selectedOrder?.shpDte || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">ARR EST</label>
                  <input
                    type="date"
                    defaultValue={selectedOrder?.arrEst || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Arr. Date</label>
                  <input
                    type="date"
                    defaultValue={selectedOrder?.arrDate || ""}
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Ship Indication</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder?.shipIndication || ""}
                    placeholder="Enter ship indication"
                    className="w-full mt-1 border px-3 py-2 rounded"
                    readOnly={modalType === "view"}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t space-x-2 sticky bottom-0 bg-white">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                onClick={() => setModalShow(false)}
              >
                Close
              </button>
              {modalType !== "view" && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;