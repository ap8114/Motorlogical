import React, { useEffect } from 'react';
import './dashboard.css';
import * as echarts from 'echarts';

const Dashboard = () => {
    useEffect(() => {
        // Initialize charts after component mounts
        const initCharts = () => {
            // Sales Trend Chart
            const salesChart = echarts.init(document.getElementById('salesChart'));
            const salesOption = {
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: '#e5e7eb',
                    textStyle: {
                        color: '#1f2937'
                    }
                },
                grid: {
                    top: 10,
                    right: 10,
                    bottom: 20,
                    left: 40
                },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisLine: {
                        lineStyle: {
                            color: '#e5e7eb'
                        }
                    },
                    axisLabel: {
                        color: '#6b7280'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#f3f4f6'
                        }
                    },
                    axisLabel: {
                        color: '#6b7280'
                    }
                },
                series: [
                    {
                        name: 'Sales',
                        type: 'line',
                        smooth: true,
                        data: [42, 50, 65, 70, 78, 90, 105, 112, 120, 135, 142, 150],
                        lineStyle: {
                            width: 3,
                            color: 'rgba(87, 181, 231, 1)'
                        },
                        symbol: 'none',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(87, 181, 231, 0.2)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(87, 181, 231, 0.01)'
                                    }
                                ]
                            }
                        }
                    }
                ]
            };
            salesChart.setOption(salesOption);

            // Category Distribution Chart
            const categoryChart = echarts.init(document.getElementById('categoryChart'));
            const categoryOption = {
                animation: false,
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: '#e5e7eb',
                    textStyle: {
                        color: '#1f2937'
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    top: 'center',
                    textStyle: {
                        color: '#1f2937'
                    }
                },
                series: [
                    {
                        name: 'Vehicle Categories',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['40%', '50%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 8,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: false
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 42, name: 'Electric Sedans', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
                            { value: 28, name: 'Electric SUVs', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
                            { value: 18, name: 'Electric Trucks', itemStyle: { color: 'rgba(251, 191, 114, 1)' } },
                            { value: 12, name: 'Hybrid Vehicles', itemStyle: { color: 'rgba(252, 141, 98, 1)' } }
                        ]
                    }
                ]
            };
            categoryChart.setOption(categoryOption);

            // Handle window resize
            const handleResize = () => {
                salesChart.resize();
                categoryChart.resize();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                salesChart.dispose();
                categoryChart.dispose();
            };
        };

        // Initialize sidebar interactions
        const initSidebar = () => {
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        };

        // Initialize switch interactions
        const initSwitches = () => {
            const switchInputs = document.querySelectorAll('.form-check-input');
            switchInputs.forEach(input => {
                input.addEventListener('change', function () {
                    const isChecked = this.checked;
                    const switchId = this.id;
                    console.log(`Switch ${switchId} is now ${isChecked ? 'ON' : 'OFF'}`);
                });
            });
        };

        initCharts();
        initSidebar();
        initSwitches();
    }, []);

    return (
        <div className="container-fluid p-3 p-md-4">
            <div className="mb-4">
                <h1 className="h2 mb-1">Dashboard Overview</h1>
                <p className="text-muted">Thursday, June 12, 2025</p>
            </div>

            {/* Quick Stats - Stack on mobile, 2x2 grid on sm, 4 columns on md+ */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-muted mb-0">Total Orders</h3>
                            <div className="stat-card-icon bg-primary bg-opacity-10">
                                <i className="ri-shopping-cart-line text-primary"></i>
                            </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <p className="display-5 fw-semibold mb-0">247</p>
                            <div className="d-flex align-items-center ms-2 text-success small">
                                <i className="ri-arrow-up-line me-1"></i>
                                <span>12.5%</span>
                            </div>
                        </div>
                        <p className="text-muted small mb-0">vs previous month</p>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-muted mb-0">Revenue</h3>
                            <div className="stat-card-icon bg-success bg-opacity-10">
                                <i className="ri-money-dollar-circle-line text-success"></i>
                            </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <p className="display-5 fw-semibold mb-0">$1.28M</p>
                            <div className="d-flex align-items-center ms-2 text-success small">
                                <i className="ri-arrow-up-line me-1"></i>
                                <span>8.3%</span>
                            </div>
                        </div>
                        <p className="text-muted small mb-0">vs previous month</p>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-muted mb-0">Inventory</h3>
                            <div className="stat-card-icon bg-info bg-opacity-10">
                                <i className="ri-archive-line text-info"></i>
                            </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <p className="display-5 fw-semibold mb-0">183</p>
                            <div className="d-flex align-items-center ms-2 text-danger small">
                                <i className="ri-arrow-down-line me-1"></i>
                                <span>4.2%</span>
                            </div>
                        </div>
                        <p className="text-muted small mb-0">vehicles in stock</p>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-muted mb-0">Production</h3>
                            <div className="stat-card-icon bg-purple bg-opacity-10">
                                <i className="ri-settings-line text-purple"></i>
                            </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <p className="display-5 fw-semibold mb-0">92%</p>
                            <div className="d-flex align-items-center ms-2 text-success small">
                                <i className="ri-arrow-up-line me-1"></i>
                                <span>3.1%</span>
                            </div>
                        </div>
                        <p className="text-muted small mb-0">completion rate</p>
                    </div>
                </div>
            </div>

            {/* Charts Row - Stack on mobile, side by side on lg+ */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
                            <h3 className="h5 mb-0">Sales Trend</h3>
                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                <button className="btn btn-sm btn-outline-secondary rounded-pill">
                                    Weekly
                                </button>
                                <button className="btn btn-sm btn-primary rounded-pill">
                                    Monthly
                                </button>
                                <button className="btn btn-sm btn-outline-secondary rounded-pill">
                                    Yearly
                                </button>
                            </div>
                        </div>
                        <div id="salesChart" className="chart-container" style={{ minHeight: '300px' }}></div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
                            <h3 className="h5 mb-0">Vehicle Categories</h3>
                            <button className="btn btn-link p-0 text-decoration-none">
                                <span className="small">View All</span>
                                <i className="ri-arrow-right-s-line ms-1"></i>
                            </button>
                        </div>
                        <div id="categoryChart" className="chart-container" style={{ minHeight: '300px' }}></div>
                    </div>
                </div>
            </div>

            {/* Recent Orders and Inventory Status - Stack on mobile, 70/30 split on lg+ */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-8">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
                            <h3 className="h5 mb-0">Recent Orders</h3>
                            <button className="btn btn-link p-0 text-decoration-none">
                                <span className="small">View All</span>
                                <i className="ri-arrow-right-s-line ms-1"></i>
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-muted small text-uppercase">Order ID</th>
                                        <th className="text-muted small text-uppercase d-none d-sm-table-cell">Customer</th>
                                        <th className="text-muted small text-uppercase">Vehicle</th>
                                        <th className="text-muted small text-uppercase d-none d-md-table-cell">Amount</th>
                                        <th className="text-muted small text-uppercase">Status</th>
                                        <th className="text-muted small text-uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fw-medium">#ORD-7829</td>
                                        <td className="d-none d-sm-table-cell">
                                            <div className="d-flex align-items-center">
                                                <div className="user-avatar bg-primary bg-opacity-10 text-primary">JD</div>
                                                <span>James Donovan</span>
                                            </div>
                                        </td>
                                        <td>Tesla Model Y</td>
                                        <td className="fw-medium d-none d-md-table-cell">$58,990</td>
                                        <td>
                                            <span className="badge-status bg-success bg-opacity-10 text-success">Completed</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-link text-muted">
                                                <i className="ri-more-2-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-medium">#ORD-7828</td>
                                        <td className="d-none d-sm-table-cell">
                                            <div className="d-flex align-items-center">
                                                <div className="user-avatar bg-purple bg-opacity-10 text-purple">RL</div>
                                                <span>Rebecca Liu</span>
                                            </div>
                                        </td>
                                        <td>Ford F-150 Lightning</td>
                                        <td className="fw-medium d-none d-md-table-cell">$62,500</td>
                                        <td>
                                            <span className="badge-status bg-warning bg-opacity-10 text-warning">Processing</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-link text-muted">
                                                <i className="ri-more-2-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-medium">#ORD-7827</td>
                                        <td className="d-none d-sm-table-cell">
                                            <div className="d-flex align-items-center">
                                                <div className="user-avatar bg-success bg-opacity-10 text-success">AM</div>
                                                <span>Alexander Martinez</span>
                                            </div>
                                        </td>
                                        <td>Rivian R1S</td>
                                        <td className="fw-medium d-none d-md-table-cell">$78,000</td>
                                        <td>
                                            <span className="badge-status bg-info bg-opacity-10 text-info">In Production</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-link text-muted">
                                                <i className="ri-more-2-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-medium">#ORD-7826</td>
                                        <td className="d-none d-sm-table-cell">
                                            <div className="d-flex align-items-center">
                                                <div className="user-avatar bg-danger bg-opacity-10 text-danger">SP</div>
                                                <span>Sarah Parker</span>
                                            </div>
                                        </td>
                                        <td>Lucid Air</td>
                                        <td className="fw-medium d-none d-md-table-cell">$87,400</td>
                                        <td>
                                            <span className="badge-status bg-secondary bg-opacity-10 text-secondary">Pending</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-link text-muted">
                                                <i className="ri-more-2-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
                            <h3 className="h5 mb-0">Inventory Status</h3>
                            <button className="btn btn-link p-0 text-decoration-none">
                                <span className="small">View All</span>
                                <i className="ri-arrow-right-s-line ms-1"></i>
                            </button>
                        </div>
                        <div className="mb-4">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="small">Electric Sedans</span>
                                <span className="small fw-medium">68%</span>
                            </div>
                            <div className="progress progress-thin mb-3">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "78%", minWidth: "30px", backgroundColor: "rgba(87, 181, 231, 1)" }}
                                ></div>
                            </div>

                            <div className="d-flex justify-content-between mb-1">
                                <span className="small">Electric SUVs</span>
                                <span className="small fw-medium">92%</span>
                            </div>
                            <div className="progress progress-thin mb-3">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "92%", backgroundColor: "rgba(87, 181, 231, 1)" }}
                                ></div>
                            </div>

                            <div className="d-flex justify-content-between mb-1">
                                <span className="small">Electric Trucks</span>
                                <span className="small fw-medium">45%</span>
                            </div>
                            <div className="progress progress-thin mb-3">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "45%", backgroundColor: "rgba(87, 181, 231, 1)" }}
                                ></div>
                            </div>

                            <div className="d-flex justify-content-between mb-1">
                                <span className="small">Hybrid Vehicles</span>
                                <span className="small fw-medium">78%</span>
                            </div>
                            <div className="progress progress-thin">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "78%", backgroundColor: "rgba(87, 181, 231, 1)" }}
                                ></div>
                            </div>
                        </div>

                        <div className="pt-3 mt-3 border-top">
                            <h4 className="small fw-medium mb-3">Low Stock Alert</h4>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="user-avatar bg-danger bg-opacity-10 text-danger">
                                            <i className="ri-alert-line"></i>
                                        </div>
                                        <div className="ms-2">
                                            <p className="small fw-medium mb-0">Tesla Model 3</p>
                                            <p className="small text-muted mb-0">Only 3 left in stock</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-sm btn-primary rounded-pill">
                                        Reorder
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="user-avatar bg-danger bg-opacity-10 text-danger">
                                            <i className="ri-alert-line"></i>
                                        </div>
                                        <div className="ms-2">
                                            <p className="small fw-medium mb-0">Ford Mustang Mach-E</p>
                                            <p className="small text-muted mb-0">Only 5 left in stock</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-sm btn-primary rounded-pill">
                                        Reorder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Production Timeline - Full width */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="dashboard-card">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 mb-md-4">
                            <h3 className="h5 mb-2 mb-md-0">Production Timeline</h3>
                            <div className="d-flex flex-wrap gap-2">
                                <div className="dropdown">
                                    <button className="btn btn-outline-secondary dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown">
                                        This Month
                                    </button>
                                </div>
                                <button className="btn btn-primary rounded-pill">
                                    <i className="ri-download-line me-1"></i>
                                    Export
                                </button>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <div className="border-bottom pb-3 mb-3 d-none d-md-block">
                                <div className="row">
                                    <div className="col-md-3">
                                        <span className="small text-muted text-uppercase">Vehicle Model</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span className="small text-muted text-uppercase">Status</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span className="small text-muted text-uppercase">Completion</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span className="small text-muted text-uppercase">Estimated Delivery</span>
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="user-avatar bg-info bg-opacity-10 text-info">
                                                <i className="ri-car-line"></i>
                                            </div>
                                            <div className="ms-2">
                                                <p className="mb-0">Tesla Model Y</p>
                                                <p className="small text-muted mb-0">Batch #TY-2025-06</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <span className="badge-status bg-success bg-opacity-10 text-success">In Production</span>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="progress progress-thin flex-grow-1 me-2">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: "75%", backgroundColor: "#0dcaf0" }}
                                                ></div>
                                            </div>
                                            <span className="small fw-medium">75%</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <p className="mb-0">June 25, 2025</p>
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="user-avatar bg-info bg-opacity-10 text-info">
                                                <i className="ri-car-line"></i>
                                            </div>
                                            <div className="ms-2">
                                                <p className="mb-0">Rivian R1T</p>
                                                <p className="small text-muted mb-0">Batch #RT-2025-06</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <span className="badge-status bg-info bg-opacity-10 text-info">Assembly</span>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="progress progress-thin flex-grow-1 me-2">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: "45%", backgroundColor: "#0dcaf0" }}
                                                ></div>
                                            </div>
                                            <span className="small fw-medium">45%</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <p className="mb-0">July 10, 2025</p>
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="user-avatar bg-info bg-opacity-10 text-info">
                                                <i className="ri-car-line"></i>
                                            </div>
                                            <div className="ms-2">
                                                <p className="mb-0">Lucid Air</p>
                                                <p className="small text-muted mb-0">Batch #LA-2025-06</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <span className="badge-status bg-warning bg-opacity-10 text-warning">Quality Check</span>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="progress progress-thin flex-grow-1 me-2">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: "92%", backgroundColor: "#ffc107" }}
                                                ></div>
                                            </div>
                                            <span className="small fw-medium">92%</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <p className="mb-0">June 18, 2025</p>
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="user-avatar bg-info bg-opacity-10 text-info">
                                                <i className="ri-car-line"></i>
                                            </div>
                                            <div className="ms-2">
                                                <p className="mb-0">Ford F-150 Lightning</p>
                                                <p className="small text-muted mb-0">Batch #FL-2025-06</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <span className="badge-status bg-purple bg-opacity-10 text-purple">Materials Prep</span>
                                    </div>
                                    <div className="col-6 col-md-3 mb-2 mb-md-0">
                                        <div className="d-flex align-items-center">
                                            <div className="progress progress-thin flex-grow-1 me-2">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: "15%", backgroundColor: "#6f42c1" }}
                                                ></div>
                                            </div>
                                            <span className="small fw-medium">15%</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <p className="mb-0">August 5, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Sheets Sync Status - Stack on mobile, 3 columns on md+ */}
            <div className="row g-3">
                <div className="col-12">
                    <div className="dashboard-card">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 mb-md-4">
                            <h3 className="h5 mb-2 mb-md-0">Google Sheets Sync Status</h3>
                            <button className="btn btn-primary rounded-pill">
                                <i className="ri-refresh-line me-1"></i>
                                Sync Now
                            </button>
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-4">
                                <div className="sync-card h-100">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="user-avatar bg-success bg-opacity-10 text-success">
                                            <i className="ri-check-line"></i>
                                        </div>
                                        <h4 className="small fw-medium mb-0 ms-2">Orders Spreadsheet</h4>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="small text-muted mb-0">Last synced: 10 minutes ago</p>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="autoSyncOrders"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="sync-card h-100">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="user-avatar bg-success bg-opacity-10 text-success">
                                            <i className="ri-check-line"></i>
                                        </div>
                                        <h4 className="small fw-medium mb-0 ms-2">Inventory Spreadsheet</h4>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="small text-muted mb-0">Last synced: 25 minutes ago</p>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="autoSyncInventory"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="sync-card h-100">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="user-avatar bg-warning bg-opacity-10 text-warning">
                                            <i className="ri-error-warning-line"></i>
                                        </div>
                                        <h4 className="small fw-medium mb-0 ms-2">Production Spreadsheet</h4>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="small text-muted mb-0">Last synced: 2 hours ago</p>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="autoSyncProduction"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;