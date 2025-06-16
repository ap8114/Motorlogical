import React, { useState, useEffect, useRef } from 'react';
import {
  Table, Button, Dropdown, Form, Spinner, Toast,
  Container, Row, Col, Card, Badge, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import {
  FiSearch, FiFile, FiFilter, FiCalendar, FiRefreshCw,
  FiEye, FiMoreHorizontal, FiChevronLeft, FiChevronRight,
  FiCheck, FiX, FiCopy
} from 'react-icons/fi';
import * as echarts from 'echarts';
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

const ProductionStatus = () => {
  // Sample production data
  const productionData = [
    { id: "JOB-2025-0142", product: "Luxury Sedan Model X", stage: "Completed", stageDetail: "Final Quality Check", eta: "2025-06-10", notes: "All quality checks passed. Ready for delivery to customer. Vehicle has been detailed and is in the delivery bay." },
    { id: "JOB-2025-0156", product: "SUV Premium Plus", stage: "In Progress", stageDetail: "Painting", eta: "2025-06-15", notes: "Custom metallic paint application in progress. Estimated completion of painting stage by June 14." },
    { id: "JOB-2025-0163", product: "Compact Hybrid EV", stage: "In Progress", stageDetail: "Assembly", eta: "2025-06-18", notes: "Battery pack installation complete. Moving to interior assembly next week." },
    { id: "JOB-2025-0178", product: "Luxury Coupe Sport", stage: "Scheduled", stageDetail: "Materials Preparation", eta: "2025-06-22", notes: "Waiting for special order carbon fiber components to arrive from supplier." },
    { id: "JOB-2025-0184", product: "Executive Sedan", stage: "Not Started", stageDetail: "Pending", eta: "2025-06-30", notes: "Production scheduled to begin on June 20. All materials on order." },
    { id: "JOB-2025-0191", product: "Family Minivan Deluxe", stage: "Completed", stageDetail: "Delivery", eta: "2025-06-08", notes: "Vehicle delivered to customer on June 8. Customer reported high satisfaction with the vehicle." },
    { id: "JOB-2025-0197", product: "Electric SUV Premium", stage: "In Progress", stageDetail: "Electronics", eta: "2025-06-17", notes: "Installing advanced driver assistance systems. Software calibration in progress." },
    { id: "JOB-2025-0205", product: "Compact Sedan Base", stage: "Scheduled", stageDetail: "Production Planning", eta: "2025-06-25", notes: "Production slot confirmed. Materials being gathered for assembly line." },
    { id: "JOB-2025-0212", product: "Luxury SUV Platinum", stage: "In Progress", stageDetail: "Interior", eta: "2025-06-16", notes: "Custom leather upholstery installation in progress. Woodgrain trim being applied." },
    { id: "JOB-2025-0219", product: "Sports Convertible", stage: "Not Started", stageDetail: "Design Confirmation", eta: "2025-07-05", notes: "Awaiting final customer approval on custom design elements before production." },
    { id: "JOB-2025-0226", product: "Hybrid Crossover", stage: "Completed", stageDetail: "Quality Assurance", eta: "2025-06-11", notes: "All systems tested and verified. Vehicle passed final inspection with no issues." },
    { id: "JOB-2025-0233", product: "Electric Compact", stage: "In Progress", stageDetail: "Drivetrain", eta: "2025-06-19", notes: "Electric motor installation complete. Battery integration in progress." },
    { id: "JOB-2025-0240", product: "Luxury Sedan Executive", stage: "Scheduled", stageDetail: "Component Preparation", eta: "2025-06-27", notes: "Special order parts have arrived. Production scheduled to begin next week." },
    { id: "JOB-2025-0247", product: "SUV Off-Road Edition", stage: "Not Started", stageDetail: "Awaiting Materials", eta: "2025-07-08", notes: "Delay in specialized suspension components. Supplier has promised delivery by June 25." },
    { id: "JOB-2025-0254", product: "City Electric Mini", stage: "In Progress", stageDetail: "Testing", eta: "2025-06-14", notes: "Range testing in progress. Initial results show better than expected performance." },
    { id: "JOB-2025-0261", product: "Premium Hatchback", stage: "Completed", stageDetail: "Ready for Delivery", eta: "2025-06-12", notes: "Vehicle completed ahead of schedule. Customer notified for early pickup." },
    { id: "JOB-2025-0268", product: "Full-Size Pickup Truck", stage: "In Progress", stageDetail: "Body Assembly", eta: "2025-06-20", notes: "Cab and bed assembly in progress. Custom towing package being installed." },
    { id: "JOB-2025-0275", product: "Luxury Coupe Limited", stage: "Scheduled", stageDetail: "Production Queue", eta: "2025-06-29", notes: "Production slot confirmed. Special tooling being prepared for limited edition features." },
    { id: "JOB-2025-0282", product: "Electric Performance Sedan", stage: "Not Started", stageDetail: "Engineering Review", eta: "2025-07-10", notes: "Final engineering review of custom performance package before production begins." },
    { id: "JOB-2025-0289", product: "Midsize Family Sedan", stage: "In Progress", stageDetail: "Exterior Finishing", eta: "2025-06-16", notes: "Paint curing complete. Moving to final exterior trim installation." },
    { id: "JOB-2025-0296", product: "Compact SUV Economy", stage: "Completed", stageDetail: "Dealership Transfer", eta: "2025-06-09", notes: "Vehicle completed and transferred to dealership inventory on June 9." },
    { id: "JOB-2025-0303", product: "Hybrid Luxury Sedan", stage: "In Progress", stageDetail: "Powertrain", eta: "2025-06-21", notes: "Hybrid system integration in progress. Engine and electric motor synchronization being fine-tuned." },
    { id: "JOB-2025-0310", product: "Sport Utility Compact", stage: "Scheduled", stageDetail: "Materials Allocation", eta: "2025-07-02", notes: "All components allocated. Production scheduled to begin on June 22." },
    { id: "JOB-2025-0317", product: "Executive Electric SUV", stage: "Not Started", stageDetail: "Production Planning", eta: "2025-07-15", notes: "Finalizing production plan for new model variant with extended range battery." }
  ];

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([...productionData]);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [stageFilters, setStageFilters] = useState(['Completed', 'In Progress', 'Scheduled', 'Not Started']);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showStageFilter, setShowStageFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDealership, setSelectedDealership] = useState('Riverside Dealership');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [allStagesSelected, setAllStagesSelected] = useState(true);
  const [expandedNotes, setExpandedNotes] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Refs for charts and DOM elements
  const stageChartRef = useRef(null);
  const timelineChartRef = useRef(null);
  const stageFilterRef = useRef(null);
  const dateFilterRef = useRef(null);

  // Initialize charts
  useEffect(() => {
    const stageChart = echarts.init(stageChartRef.current);
    const timelineChart = echarts.init(timelineChartRef.current);

    // Stage chart options
    const stageOption = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { color: '#1f2937' }
      },
      series: [{
        name: 'Production Stage',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: '14', fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: [
          { value: 6, name: 'Completed', itemStyle: { color: '#10B981' } },
          { value: 8, name: 'In Progress', itemStyle: { color: '#F59E0B' } },
          { value: 5, name: 'Scheduled', itemStyle: { color: '#3B82F6' } },
          { value: 5, name: 'Not Started', itemStyle: { color: '#9CA3AF' } }
        ]
      }]
    };

    // Timeline chart options
    const timelineOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      },
      legend: {
        data: ['Completed', 'In Progress', 'Scheduled'],
        bottom: 0,
        textStyle: { color: '#1f2937' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        axisLine: { lineStyle: { color: '#d1d5db' } },
        axisLabel: { color: '#1f2937' }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: '#1f2937' },
        splitLine: { lineStyle: { color: '#e5e7eb' } }
      },
      series: [
        {
          name: 'Completed',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 3, color: '#10B981' },
          areaStyle: { color: 'rgba(16, 185, 129, 0.1)' },
          emphasis: { focus: 'series' },
          symbolSize: 0,
          data: [3, 5, 8, 6]
        },
        {
          name: 'In Progress',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 3, color: '#F59E0B' },
          areaStyle: { color: 'rgba(245, 158, 11, 0.1)' },
          emphasis: { focus: 'series' },
          symbolSize: 0,
          data: [5, 7, 6, 8]
        },
        {
          name: 'Scheduled',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 3, color: '#3B82F6' },
          areaStyle: { color: 'rgba(59, 130, 246, 0.1)' },
          emphasis: { focus: 'series' },
          symbolSize: 0,
          data: [4, 6, 5, 7]
        }
      ]
    };

    stageChart.setOption(stageOption);
    timelineChart.setOption(timelineOption);

    // Handle window resize
    const handleResize = () => {
      stageChart.resize();
      timelineChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      stageChart.dispose();
      timelineChart.dispose();
    };
  }, []);

  // Filter and sort data
  useEffect(() => {
    const filterData = () => {
      setIsLoading(true);

      const filtered = productionData.filter(item => {
        // Search filter
        const matchesSearch = searchTerm === '' ||
          Object.values(item).some(
            val => typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
          );

        // Stage filter
        const matchesStage = stageFilters.includes(item.stage);

        // Date filter
        let matchesDate = true;
        const itemDate = new Date(item.eta);
        if (dateRange.from && dateRange.to) {
          matchesDate = itemDate >= new Date(dateRange.from) && itemDate <= new Date(dateRange.to);
        } else if (dateRange.from) {
          matchesDate = itemDate >= new Date(dateRange.from);
        } else if (dateRange.to) {
          matchesDate = itemDate <= new Date(dateRange.to);
        }

        return matchesSearch && matchesStage && matchesDate;
      });

      // Sort data
      const sorted = [...filtered].sort((a, b) => {
        let valueA = a[sortField];
        let valueB = b[sortField];

        if (sortField === 'eta') {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        }

        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      setFilteredData(sorted);
      setIsLoading(false);
    };

    filterData();
  }, [searchTerm, stageFilters, dateRange, sortField, sortDirection]);

  // Auto-refresh
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stageFilterRef.current && !stageFilterRef.current.contains(event.target)) {
        setShowStageFilter(false);
      }
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target)) {
        setShowDateFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle stage filter change
  const handleStageFilterChange = (stage, isChecked) => {
    if (isChecked) {
      setStageFilters([...stageFilters, stage]);
    } else {
      setStageFilters(stageFilters.filter(s => s !== stage));
    }
  };

  // Toggle all stages
  const toggleAllStages = (isChecked) => {
    setAllStagesSelected(isChecked);
    if (isChecked) {
      setStageFilters(['Completed', 'In Progress', 'Scheduled', 'Not Started']);
    } else {
      setStageFilters([]);
    }
  };

  // Show toast message
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Toggle notes expansion
  const toggleNotes = (id) => {
    setExpandedNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy job ID to clipboard
  const copyJobId = (id) => {
    navigator.clipboard.writeText(id);
    showToastMessage(`Copied: ${id}`);
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get badge variant based on stage
  const getBadgeVariant = (stage) => {
    switch (stage) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'Scheduled': return 'primary';
      case 'Not Started': return 'secondary';
      default: return 'light';
    }
  };

  return (
    <div className="production-status">
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <h1 className="h5 h-md-3 mb-0 font-weight-bold text-gray-900">Production Status</h1>
            </Col>
            <Col xs={12} md={8}>
              <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-end gap-2">
                <Dropdown className="me-md-2 mb-2 mb-md-0">
                  <Dropdown.Toggle variant="light" id="dealership-dropdown" size="sm" className="w-100 w-md-auto">
                    {selectedDealership}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item active={selectedDealership === 'Riverside Dealership'}
                      onClick={() => setSelectedDealership('Riverside Dealership')}>
                      Riverside Dealership
                    </Dropdown.Item>
                    <Dropdown.Item active={selectedDealership === 'Lakeside Dealership'}
                      onClick={() => setSelectedDealership('Lakeside Dealership')}>
                      Lakeside Dealership
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="position-relative flex-grow-1 mb-2 mb-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ps-5"
                    size="sm"
                  />
                  <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
                </div>

                <Button variant="primary" size="sm" onClick={() => showToastMessage('Exporting to Excel...')}>
                  <FiFile className="mr-2" />
                  <span className="d-none d-md-inline">Export</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-4">
        <Container fluid>
          {/* Filters */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={12} md={4} className="mb-3 mb-md-0">
                  <h2 className="h6 h-md-5 mb-0 font-weight-bold">Active Production Jobs</h2>
                </Col>
                <Col xs={12} md={8}>
                  <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                    {/* Stage Filter */}
                    <div ref={stageFilterRef} className="position-relative mb-2 mb-md-0">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setShowStageFilter(!showStageFilter)}
                        className="w-100 w-md-auto"
                      >
                        <FiFilter className="mr-2" />
                        <span>Stage</span>
                      </Button>

                      {showStageFilter && (
                        <Card className="position-md-absolute end-md-0 mt-md-2 shadow-sm w-100 w-md-auto" style={{ zIndex: 1000 }}>
                          <Card.Body>
                            <Form.Group>
                              <Form.Check
                                type="checkbox"
                                label="All Stages"
                                checked={allStagesSelected}
                                onChange={(e) => toggleAllStages(e.target.checked)}
                              />
                            </Form.Group>
                            <hr />
                            <Form.Group>
                              <Form.Check
                                type="checkbox"
                                label={<Badge bg="success">Completed</Badge>}
                                checked={stageFilters.includes('Completed')}
                                onChange={(e) => handleStageFilterChange('Completed', e.target.checked)}
                              />
                              <Form.Check
                                type="checkbox"
                                label={<Badge bg="warning">In Progress</Badge>}
                                checked={stageFilters.includes('In Progress')}
                                onChange={(e) => handleStageFilterChange('In Progress', e.target.checked)}
                              />
                              <Form.Check
                                type="checkbox"
                                label={<Badge bg="primary">Scheduled</Badge>}
                                checked={stageFilters.includes('Scheduled')}
                                onChange={(e) => handleStageFilterChange('Scheduled', e.target.checked)}
                              />
                              <Form.Check
                                type="checkbox"
                                label={<Badge bg="secondary">Not Started</Badge>}
                                checked={stageFilters.includes('Not Started')}
                                onChange={(e) => handleStageFilterChange('Not Started', e.target.checked)}
                              />
                            </Form.Group>
                          </Card.Body>
                        </Card>
                      )}
                    </div>

                    {/* Date Filter */}
                    <div ref={dateFilterRef} className="position-relative mb-2 mb-md-0">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setShowDateFilter(!showDateFilter)}
                        className="w-100 w-md-auto"
                      >
                        <FiCalendar className="mr-2" />
                        <span>ETA Range</span>
                      </Button>

                      {showDateFilter && (
                        <Card className="position-md-absolute end-md-0 mt-md-2 shadow-sm w-100 w-md-auto" style={{ zIndex: 1000 }}>
                          <Card.Body>
                            <Form.Group className="mb-3">
                              <Form.Label>From</Form.Label>
                              <Form.Control
                                type="date"
                                value={dateRange.from || ''}
                                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                size="sm"
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>To</Form.Label>
                              <Form.Control
                                type="date"
                                value={dateRange.to || ''}
                                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                size="sm"
                              />
                            </Form.Group>
                            <div className="d-flex justify-content-between">
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => setDateRange({ from: null, to: null })}
                              >
                                Clear
                              </Button>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setShowDateFilter(false)}
                              >
                                Apply
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      )}
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setStageFilters(['Completed', 'In Progress', 'Scheduled', 'Not Started']);
                        setDateRange({ from: null, to: null });
                        setAllStagesSelected(true);
                      }}
                      className="text-nowrap mb-2 mb-md-0"
                    >
                      <FiRefreshCw className="mr-1" />
                      <span>Clear</span>
                    </Button>

                    {/* Auto Refresh */}
                    <Form.Group className="d-flex align-items-center mb-0">
                      <Form.Label className="mb-0 mr-2 d-none d-md-block">Auto-refresh:</Form.Label>
                      <Form.Check
                        type="switch"
                        id="auto-refresh-switch"
                        checked={autoRefresh}
                        onChange={(e) => {
                          setAutoRefresh(e.target.checked);
                          showToastMessage(`Auto-refresh ${e.target.checked ? 'enabled' : 'disabled'}`);
                        }}
                        label={<span className="d-md-none">Auto-refresh</span>}
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Production Table */}
          <Card className="mb-4">
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading production data...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-5">
                <FiSearch size={48} className="text-muted mb-3" />
                <h3 className="h5">No matching production jobs found</h3>
                <p className="text-muted">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th onClick={() => handleSort('id')} style={{ cursor: 'pointer', minWidth: '120px' }}>
                          <div className="d-flex align-items-center">
                            <span className="d-none d-md-inline">Job ID</span>
                            <span className="d-inline d-md-none">ID</span>
                            {sortField === 'id' && (
                              <span className="ml-1">
                                {sortDirection === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                              </span>
                            )}
                          </div>
                        </th>
                        <th onClick={() => handleSort('product')} style={{ cursor: 'pointer', minWidth: '150px' }}>
                          <div className="d-flex align-items-center">
                            Product
                            {sortField === 'product' && (
                              <span className="ml-1">
                                {sortDirection === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                              </span>
                            )}
                          </div>
                        </th>
                        <th onClick={() => handleSort('stage')} style={{ cursor: 'pointer', minWidth: '120px' }}>
                          <div className="d-flex align-items-center">
                            Stage
                            {sortField === 'stage' && (
                              <span className="ml-1">
                                {sortDirection === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                              </span>
                            )}
                          </div>
                        </th>
                        <th onClick={() => handleSort('eta')} style={{ cursor: 'pointer', minWidth: '100px' }}>
                          <div className="d-flex align-items-center">
                            <span className="d-none d-md-inline">ETA</span>
                            <span className="d-inline d-md-none">Due</span>
                            {sortField === 'eta' && (
                              <span className="ml-1">
                                {sortDirection === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                              </span>
                            )}
                          </div>
                        </th>
                        <th style={{ minWidth: '200px' }}>Notes</th>
                        <th className="text-end" style={{ minWidth: '80px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item) => {
                        const etaDate = new Date(item.eta);
                        const today = new Date();
                        const isPastDue = etaDate < today && item.stage !== 'Completed';
                        const formattedEta = etaDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        });

                        return (
                          <tr key={item.id}>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Click to copy</Tooltip>}
                              >
                                <span
                                  className="font-weight-bold text-primary cursor-pointer"
                                  onClick={() => copyJobId(item.id)}
                                >
                                  {item.id}
                                </span>
                              </OverlayTrigger>
                            </td>
                            <td>{item.product}</td>
                            <td>
                              <div className="d-flex flex-column">
                                <Badge bg={getBadgeVariant(item.stage)} className="mb-1">
                                  {item.stage}
                                </Badge>
                                <small className="text-muted">{item.stageDetail}</small>
                              </div>
                            </td>
                            <td>
                              <div className={`${isPastDue ? 'text-danger font-weight-bold' : ''}`}>
                                {formattedEta}
                                {isPastDue && (
                                  <Badge bg="danger" className="ms-2">Past Due</Badge>
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div className="text-truncate" style={{ maxWidth: '300px', whiteSpace: expandedNotes[item.id] ? 'normal' : 'nowrap' }}>
                                  {item.notes}
                                </div>
                                {item.notes.length > 60 && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="p-0"
                                    onClick={() => toggleNotes(item.id)}
                                  >
                                    {expandedNotes[item.id] ? 'Show less' : 'Show more'}
                                  </Button>
                                )}
                              </div>
                            </td>
                            <td className="text-end">
                              <div className="d-flex justify-content-end gap-2">
                                <Button variant="link" className="text-primary p-0">
                                  <FiEye />
                                </Button>
                                <Button variant="link" className="text-secondary p-0">
                                  <FiMoreHorizontal />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>

                {/* Pagination */}
                <Card.Footer className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="text-muted mb-2 mb-md-0">
                    Showing {((currentPage - 1) * itemsPerPage) + 1}-
                    {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} jobs
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="me-2"
                    >
                      <FiChevronLeft />
                    </Button>
                    <span className="mx-2">Page {currentPage}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      disabled={currentPage === totalPages || totalPages === 0}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <FiChevronRight />
                    </Button>
                  </div>
                </Card.Footer>
              </>
            )}
          </Card>

          {/* Statistics */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-center mb-4">
                <Col xs={12} md={6} className="mb-3 mb-md-0">
                  <h2 className="h6 h-md-5 mb-0 font-weight-bold">Production Statistics</h2>
                </Col>
                <Col xs={12} md={6} className="text-md-end">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="timeframe-dropdown" size="sm">
                      {selectedTimeframe === '30' ? 'Last 30 Days' :
                        selectedTimeframe === '90' ? 'Last 90 Days' :
                          selectedTimeframe === '180' ? 'Last 180 Days' : 'Last 365 Days'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item active={selectedTimeframe === '30'} onClick={() => setSelectedTimeframe('30')}>
                        Last 30 Days
                      </Dropdown.Item>
                      <Dropdown.Item active={selectedTimeframe === '90'} onClick={() => setSelectedTimeframe('90')}>
                        Last 90 Days
                      </Dropdown.Item>
                      <Dropdown.Item active={selectedTimeframe === '180'} onClick={() => setSelectedTimeframe('180')}>
                        Last 180 Days
                      </Dropdown.Item>
                      <Dropdown.Item active={selectedTimeframe === '365'} onClick={() => setSelectedTimeframe('365')}>
                        Last 365 Days
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>

              <Row>
                <Col xs={12} lg={6} className="mb-3 mb-lg-0">
                  <Card>
                    <Card.Body>
                      <h3 className="h6 font-weight-medium text-muted mb-2">Production by Stage</h3>
                      <div ref={stageChartRef} style={{ height: '300px', width: '100%' }} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} lg={6}>
                  <Card>
                    <Card.Body>
                      <h3 className="h6 font-weight-medium text-muted mb-2">Production Timeline</h3>
                      <div ref={timelineChartRef} style={{ height: '300px', width: '100%' }} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </main>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed bottom-0 end-0 m-3"
        delay={3000}
        autohide
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ProductionStatus;