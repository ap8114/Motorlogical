import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../utils/axiosInterceptor';

const Financedashboard = () => {
    // Sample data for orders
    const [orders, setOrders] = useState([]);
    const [Data, setData] = useState([]);



    // Sample data for customers
    const [customers, setCustomers] = useState([
        { name: 'John Smith', phone: '(555) 123-4567', email: 'john.smith@example.com', totalOrders: 5, lastOrderDate: '2025-06-15' },
        { name: 'Emma Wilson', phone: '(555) 987-6543', email: 'emma.w@example.com', totalOrders: 3, lastOrderDate: '2025-06-17' },
        { name: 'Michael Brown', phone: '(555) 456-7890', email: 'michael.b@example.com', totalOrders: 8, lastOrderDate: '2025-06-18' },
        { name: 'Sarah Davis', phone: '(555) 789-0123', email: 'sarah.d@example.com', totalOrders: 1, lastOrderDate: '2025-06-19' },
    ]);


    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("recentOrder");

                setOrders(response.data.data);
            } catch (error) {
                console.error("Error fetching recent orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);
    const fetchdata = async () => {
        try {
            const response = await api.get("dashboard/getfinaceDashboard");
            setDashboardData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setDashboardData({
                total_orders: 0,
                finance_order_status_yes: 0,
                finance_order_status_no: 0,
                latest_orders: []
            });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchdata();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.dealership.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadgeColor = (status) => {
        switch (status.toLowerCase()) {
            case "confirmed": return "bg-success text-white";
            case "approved": return "bg-primary text-white";
            case "pending": return "bg-warning text-dark";
            case "processing": return "bg-info text-white";
            default: return "bg-secondary text-white";
        }
    };




    // Form state for new order
    const [newOrder, setNewOrder] = useState({
        product: '',
        quantity: 1,
        customerName: '',
        customerPhone: '',
        orderNotes: '',
    });

    // State for expanded customer
    const [expandedCustomer, setExpandedCustomer] = useState(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({
            ...newOrder,
            [name]: value,
        });
    };

    // Handle quantity change with buttons
    const handleQuantityChange = (amount) => {
        setNewOrder({
            ...newOrder,
            quantity: Math.max(1, newOrder.quantity + amount),
        });
    };

    // Handle form submission
    const handleSubmitOrder = (e) => {
        e.preventDefault();
        // Here you would typically send the order to an API
        const newOrderEntry = {
            id: `ORD-${Math.floor(Math.random() * 1000)}`,
            customer: newOrder.customerName,
            product: newOrder.product,
            quantity: newOrder.quantity,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
        };
        setOrders([newOrderEntry, ...orders]);
        // Reset form
        setNewOrder({
            product: '',
            quantity: 1,
            customerName: '',
            customerPhone: '',
            orderNotes: '',
        });
    };

    // Toggle customer expansion
    const toggleCustomerExpansion = (customerName) => {
        if (expandedCustomer === customerName) {
            setExpandedCustomer(null);
        } else {
            setExpandedCustomer(customerName);
        }
    };

    // Get status color class
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-success text-white';
            case 'Shipped':
                return 'bg-primary text-white';
            case 'Processing':
                return 'bg-warning text-dark';
            case 'Pending':
                return 'bg-secondary text-white';
            default:
                return 'bg-light text-dark';
        }
    };

    // Get inventory status color class
    const getInventoryStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'bg-success text-white';
            case 'Low Stock':
                return 'bg-warning text-dark';
            case 'Out of Stock':
                return 'bg-danger text-white';
            default:
                return 'bg-light text-dark';
        }
    };

    const userData = JSON.parse(localStorage.getItem("login_detail"));
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };


    return (
        <div className="container-fluid p-0">
            <div className="container py-4">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {getGreeting()}, {userData?.name}!
                    </h1>
                </div>

                {/* Stats Cards */}
                <div className="row mb-4">
                    {Array.isArray(Data) && Data.map((item) => {
                        <>
                          <div className="row mb-4">
  <div className="col-md-6 col-lg-4 mb-3">
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="p-3 rounded-circle bg-primary bg-opacity-10 text-primary">
            <i className="fas fa-shopping-cart fs-4"></i>
          </div>
          <div className="ms-3">
            <p className="text-muted mb-1">Total Orders</p>
            <h3 className="mb-0">{dashboardData.total_orders}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-6 col-lg-4 mb-3">
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="p-3 rounded-circle bg-success bg-opacity-10 text-success">
            <i className="fas fa-truck fs-4"></i>
          </div>
          <div className="ms-3">
            <p className="text-muted mb-1">Total Yes Order</p>
            <h3 className="mb-0">{dashboardData.finance_order_status_yes}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-6 col-lg-4 mb-3">
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="p-3 rounded-circle bg-warning bg-opacity-10 text-warning">
            <i className="fas fa-box fs-4"></i>
          </div>
          <div className="ms-3">
            <p className="text-muted mb-1">Total No Order</p>
            <h3 className="mb-0">{dashboardData.finance_order_status_no}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
                        </>
                    })}

                </div>




                <div className="card mb-4">
                    <div className="card-header bg-white">
                        <h2 className="h5 mb-0">
                            <i className="fas fa-boxes me-2"></i>
                            Recent Orders
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                            <div className="mb-3 mb-md-0 position-relative">
                                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                <input
                                    type="text"
                                    className="form-control ps-5"
                                    placeholder="Search by product, customer or dealership..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Dealership</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.customer}</td>
                                                <td>{order.dealership}</td>
                                                <td>{order.product}</td>
                                                <td>{order.qty}</td>
                                                <td>
                                                    <span className={`badge ${getStatusBadgeColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div>
                                        Showing <b>{filteredOrders.length}</b> of <b>{orders.length}</b> orders
                                    </div>
                                    {/* Pagination can go here if needed */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Customer Information Section */}

            </div>
        </div>
    );
};

export default Financedashboard;