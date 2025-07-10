import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaDownload, FaPlus, FaFilter } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../../utils/axiosInterceptor";

const ManagerOrderManagement = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("view");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    brand: "",
    paymentStatus: "",
    orderMonth: ""
  });

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



  // Get user details from localStorage
  const getUserDetails = () => {
    const loginDetail = localStorage.getItem('login_detail');
    if (loginDetail) {
      return JSON.parse(loginDetail);
    }
    return null;
  };
  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("order");
      // Access the data array from the response
      const ordersArray = response.data.data || [];
      setOrdersData(ordersArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch orders. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setOrdersData([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenModal = (type, order = null) => {
    setModalType(type);
    setSelectedOrder(order || {
      customer: "",
      dealership: "",
      product: "",
      qty: 1,
      status: "Pending",
      order_date: new Date().toISOString().split('T')[0],
      delivery: "",
      total: 0,
      source: "",
      stock_no: "",
      manu_no: "",
      manu_no2: "",
      invoice_no: "",
      payment: "Down Payment Paid",
      pay_status: "Paid",
      pay_terms: "Net 30",
      vin_no: "",
      engine_no: "",
      key_no: "",
      bl_no: "",
      ship_date: "",
      brand: "Toyota",
      ocn_spec: "",
      model: "",
      country: "",
      year: new Date().getFullYear(),
      ext_color: "",
      int_color: "",
      tbd3: "",
      order_month: monthOptions[new Date().getMonth()],
      prod_est: "",
      ship_est: "",
      est_arr: "",
      shp_dte: "",
      arr_est: "",
      arr_date: "",
      ship_ind: "On Time"
    });
    setModalShow(true);
  };


  const [dealerships, setDealerships] = useState([]);
  useEffect(() => {
    const fetchDealerships = async () => {
      try {
        const response = await api.get("/dealership"); // your API endpoint
        setDealerships(response.data);
      } catch (error) {
        console.error("Error fetching dealerships", error);
      }
    };

    fetchDealerships();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = getUserDetails();
      
      // Prepare the order data with the appropriate user ID
      const orderData = {
        ...selectedOrder,
        ...(userDetails?.role === 'admin' ? { admin_id: userDetails.id } : { user_id: userDetails?.id })
      };

      if (modalType === "add") {
        const response = await api.post("order", orderData);
        setOrdersData([...ordersData, response.data.data]);
        Swal.fire({
          title: "Success!",
          text: "Order created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (modalType === "edit") {
        const response = await api.put(`order/${selectedOrder.id}`, orderData);
        setOrdersData(ordersData.map(order =>
          order.id === selectedOrder.id ? response.data.data : order
        ));
        Swal.fire({
          title: "Success!",
          text: "Order updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setModalShow(false);
    } catch (error) {
      console.error("Error saving order:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to save order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`orders/${id}`);
        setOrdersData(ordersData.filter(order => order.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Order has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting order:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredOrders = ordersData.filter((order) => {
    const lowerTerm = searchTerm.toLowerCase();

    // Convert all values to strings before calling toLowerCase()
    const matchesSearch =
      String(order.id).toLowerCase().includes(lowerTerm) ||
      (order.customer && order.customer.toLowerCase().includes(lowerTerm)) ||
      (order.dealership && order.dealership.toLowerCase().includes(lowerTerm)) ||
      (order.product && order.product.toLowerCase().includes(lowerTerm)) ||
      (order.status && order.status.toLowerCase().includes(lowerTerm));

    const matchesStatus = !filters.status || order.status === filters.status;
    const matchesBrand = !filters.brand || order.brand === filters.brand;
    const matchesPaymentStatus = !filters.paymentStatus || order.pay_status === filters.paymentStatus;
    const matchesOrderMonth = !filters.orderMonth || order.order_month === filters.orderMonth;

    return matchesSearch && matchesStatus && matchesBrand && matchesPaymentStatus && matchesOrderMonth;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 text-blue-600 underline">{order.id}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.dealership}</td>
                    <td className="px-4 py-2 whitespace-pre-line">{order.product}</td>
                    <td className="px-4 py-2">{order.qty}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs border rounded ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          order.status === "Processing" ? "bg-blue-100 text-blue-800 border-blue-200" :
                            order.status === "Completed" ? "bg-green-100 text-green-800 border-green-200" :
                              "bg-gray-100 text-gray-800 border-gray-200"
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{formatDate(order.order_date)}</td>
                    <td className="px-4 py-2">{formatDate(order.delivery)}</td>
                    <td className="px-4 py-2">${order.total?.toLocaleString()}</td>
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
                      {/* <button
                        className="text-red-600"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrash />
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-4 py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalShow && (
        <div className="fixed inset-0 z-[1050] flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto py-10">
          <div className="bg-white rounded-lg w-full max-w-6xl shadow-xl max-h-[90vh] overflow-y-auto">
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
            <form onSubmit={handleSubmit}>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Basic Information</h4>
                  <div>
                    <label className="block text-sm font-medium">Customer Name</label>
                    <input
                      type="text"
                      name="customer"
                      value={selectedOrder.customer || ""}
                      onChange={handleInputChange}
                      placeholder="Enter customer name"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Dealership</label>
                    <select
                      name="dealership"
                      value={selectedOrder.dealership || ""}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          dealership: e.target.value, // this will now store dealership_id
                        })
                      }
                      className="w-full mt-1 border px-3 py-2 rounded"
                      disabled={modalType === "view"}
                      required
                    >
                      <option value="">-- Select Dealership --</option>
                      {dealerships.map((dealer) => (
                        <option key={dealer.id} value={dealer.id}>
                          {dealer.name}
                        </option>
                      ))}
                    </select>
                  </div>




                  <div>
                    <label className="block text-sm font-medium">Product</label>
                    <textarea
                      name="product"
                      value={selectedOrder.product || ""}
                      onChange={handleInputChange}
                      placeholder="Enter product details"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Quantity</label>
                    <input
                      type="number"
                      name="qty"
                      value={selectedOrder.qty || 1}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                      name="status"
                      value={selectedOrder.status || "Pending"}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      disabled={modalType === "view"}
                      required
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates and Pricing */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Dates & Pricing</h4>
                  <div>
                    <label className="block text-sm font-medium">Order Date</label>
                    <input
                      type="date"
                      name="order_date"
                      value={selectedOrder.order_date || ""}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Delivery Date</label>
                    <input
                      type="date"
                      name="delivery"
                      value={selectedOrder.delivery || ""}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Total</label>
                    <input
                      type="number"
                      name="total"
                      value={selectedOrder.total || ""}
                      onChange={handleInputChange}
                      placeholder="Enter total amount"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Order Month</label>
                    <select
                      name="order_month"
                      value={selectedOrder.order_month || monthOptions[new Date().getMonth()]}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      disabled={modalType === "view"}
                      required
                    >
                      {monthOptions.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Payment Information</h4>
                  <div>
                    <label className="block text-sm font-medium">Payment Type</label>
                    <select
                      name="payment"
                      value={selectedOrder.payment || "Down Payment Paid"}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      disabled={modalType === "view"}
                      required
                    >
                      {paymentOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Payment Status</label>
                    <select
                      name="pay_status"
                      value={selectedOrder.pay_status || "Paid"}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      disabled={modalType === "view"}
                      required
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
                      name="pay_terms"
                      value={selectedOrder.pay_terms || ""}
                      onChange={handleInputChange}
                      placeholder="Enter payment terms"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Vehicle Information</h4>
                  <div>
                    <label className="block text-sm font-medium">Brand</label>
                    <select
                      name="brand"
                      value={selectedOrder.brand || "Toyota"}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      disabled={modalType === "view"}
                      required
                    >
                      {brandOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={selectedOrder.model || ""}
                      onChange={handleInputChange}
                      placeholder="Enter model"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Year</label>
                    <select
                      name="year"
                      value={selectedOrder.year || new Date().getFullYear()}
                      onChange={handleInputChange}
                      className="w-full mt-1 border px-3 py-2 rounded"
                      disabled={modalType === "view"}
                      required
                    >
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">VIN#</label>
                    <input
                      type="text"
                      name="vin_no"
                      value={selectedOrder.vin_no || ""}
                      onChange={handleInputChange}
                      placeholder="Enter VIN number"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                </div>

                {/* Colors and Specifications */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Colors & Specs</h4>
                  <div>
                    <label className="block text-sm font-medium">Exterior Color</label>
                    <input
                      type="text"
                      name="ext_color"
                      value={selectedOrder.ext_color || ""}
                      onChange={handleInputChange}
                      placeholder="Enter exterior color"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Interior Color</label>
                    <input
                      type="text"
                      name="int_color"
                      value={selectedOrder.int_color || ""}
                      onChange={handleInputChange}
                      placeholder="Enter interior color"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">OCN SPEC</label>
                    <input
                      type="text"
                      name="ocn_spec"
                      value={selectedOrder.ocn_spec || ""}
                      onChange={handleInputChange}
                      placeholder="Enter OCN SPEC"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={selectedOrder.country || ""}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                      required
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Additional Information</h4>
                  <div>
                    <label className="block text-sm font-medium">Source</label>
                    <input
                      type="text"
                      name="source"
                      value={selectedOrder.source || ""}
                      onChange={handleInputChange}
                      placeholder="Enter source"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Stock #</label>
                    <input
                      type="text"
                      name="stock_no"
                      value={selectedOrder.stock_no || ""}
                      onChange={handleInputChange}
                      placeholder="Enter stock number"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Engine#</label>
                    <input
                      type="text"
                      name="engine_no"
                      value={selectedOrder.engine_no || ""}
                      onChange={handleInputChange}
                      placeholder="Enter engine number"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Ship Indication</label>
                    <input
                      type="text"
                      name="ship_ind"
                      value={selectedOrder.ship_ind || ""}
                      onChange={handleInputChange}
                      placeholder="Enter ship indication"
                      className="w-full mt-1 border px-3 py-2 rounded"
                      readOnly={modalType === "view"}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-4 border-t space-x-2 sticky bottom-0 bg-white">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                  onClick={() => setModalShow(false)}
                >
                  Close
                </button>
                {modalType !== "view" && (
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    {modalType === "add" ? "Create Order" : "Save Changes"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerOrderManagement;