import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaDownload, FaPlus } from "react-icons/fa";

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
  },
  {
    id: "ORD-2025-003",
    customer: "Michael Rodriguez",
    dealership: "Luxury Cars Inc",
    product: "2025 Luxury Model L\nTechnology Package\nExtended Warranty",
    quantity: 1,
    status: "Shipped",
    orderDate: "Jun 5, 2025",
    delivery: "Jun 25, 2025",
    total: "$72,000",
  },
  {
    id: "ORD-2025-004",
    customer: "David Wilson",
    dealership: "Downtown Autos",
    product: "2025 Compact Model C",
    quantity: 2,
    status: "Delivered",
    orderDate: "May 20, 2025",
    delivery: "Jun 10, 2025",
    total: "$52,000",
  },
  {
    id: "ORD-2025-005",
    customer: "Jessica Brown",
    dealership: "Valley Vehicles",
    product: "2025 Electric Model E\nHome Charging Station",
    quantity: 1,
    status: "Cancelled",
    orderDate: "Jun 1, 2025",
    delivery: "Jul 1, 2025",
    total: "$58,000",
  },
  {
    id: "ORD-2025-006",
    customer: "Robert Lee",
    dealership: "Metro Motors",
    product: "2025 Hybrid Model H\nPremium Sound System",
    quantity: 1,
    status: "Processing",
    orderDate: "Jun 10, 2025",
    delivery: "Jul 5, 2025",
    total: "$42,500",
  },
];

const OrderManagement = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("view");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (type, order = null) => {
    setModalType(type);
    setSelectedOrder(order);
    setModalShow(true);
  };

  const filteredOrders = ordersData.filter((order) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(lowerTerm) ||
      order.customer.toLowerCase().includes(lowerTerm) ||
      order.dealership.toLowerCase().includes(lowerTerm) ||
      order.product.toLowerCase().includes(lowerTerm) ||
      order.status.toLowerCase().includes(lowerTerm)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-gray-500">Manage all vehicle orders in one place</p>
        </div>
        <div className="space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded inline-flex items-center">
            <FaDownload className="mr-2" /> Download CSV
          </button>
          <button
            onClick={() => handleOpenModal("add")}
            className="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Create New Order
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by order ID, customer, dealership, product, or status"
          className="border px-3 py-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Choose File</label>
          <input
            type="file"
            className="block text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && <span className="text-sm text-gray-500">{file.name}</span>}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow overflow-auto">
        <h4 className="font-semibold mb-4">Order List</h4>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">ORDER ID</th>
              <th className="px-4 py-2">CUSTOMER</th>
              <th className="px-4 py-2">DEALERSHIP</th>
              <th className="px-4 py-2">PRODUCTS</th>
              <th className="px-4 py-2">QUANTITY</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">ORDER DATE</th>
              <th className="px-4 py-2">EST. DELIVERY</th>
              <th className="px-4 py-2">TOTAL</th>
              <th className="px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2 text-blue-600 underline">{order.id}</td>
                <td className="px-4 py-2 font-medium">{order.customer}</td>
                <td className="px-4 py-2">{order.dealership}</td>
                <td className="px-4 py-2 whitespace-pre-line">{order.product}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-xs bg-gray-100 border rounded text-gray-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{order.orderDate}</td>
                <td className="px-4 py-2">{order.delivery}</td>
                <td className="px-4 py-2 font-semibold">{order.total}</td>
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

        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
        </div>
      </div>

      {modalShow && (
        <div className="fixed inset-0  bg-opacity-100 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">
                {modalType === "view"
                  ? "View Order"
                  : modalType === "edit"
                  ? "Edit Order"
                  : "Create New Order"}
              </h3>
              <button onClick={() => setModalShow(false)} className="text-gray-500">×</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Customer Name</label>
                <input
                  type="text"
                  defaultValue={selectedOrder?.customer || ""}
                  placeholder="Enter customer name"
                  className="w-full mt-1 border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Product</label>
                <input
                  type="text"
                  defaultValue={selectedOrder?.product || ""}
                  placeholder="Enter product details"
                  className="w-full mt-1 border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  defaultValue={selectedOrder?.quantity || 1}
                  className="w-full mt-1 border px-3 py-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end p-4 border-t space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                onClick={() => setModalShow(false)}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;