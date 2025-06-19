// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const Reporting = () => {

    const salesTrendChartRef = useRef(null);

    // Report filter states
    const [reportType, setReportType] = useState('sales');
    const [dateRange, setDateRange] = useState({ from: '2025-05-19', to: '2025-06-19' });
    const [exportType, setExportType] = useState('excel');
    const [showDealershipDropdown, setShowDealershipDropdown] = useState(false);
    const [selectedDealerships, setSelectedDealerships] = useState([]);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [activeReportTab, setActiveReportTab] = useState('overview');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleForm, setScheduleForm] = useState({
        name: '',
        type: 'sales',
        format: 'pdf',
        frequency: 'monthly',
        day: '1',
        time: '08:00',
        emails: '',
        notification: true
    });

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Schedule form submitted:', scheduleForm);
        setShowScheduleModal(false);
        // Reset form
        setScheduleForm({
            name: '',
            type: 'sales',
            format: 'pdf',
            frequency: 'monthly',
            day: '1',
            time: '08:00',
            emails: '',
            notification: true
        });
    };
    // Charts refs

    const inventoryTurnoverChartRef = useRef(null);
    const profitabilityChartRef = useRef(null);
    const categoryComparisonChartRef = useRef(null);
    const revenueChartRef = useRef(null);
    const expenseChartRef = useRef(null);
    const roiChartRef = useRef(null);
    const cashFlowChartRef = useRef(null);
    const salesByModelChartRef = useRef(null);
    const salesByPersonChartRef = useRef(null);
    const customerDemographicsChartRef = useRef(null);
    const conversionRatesChartRef = useRef(null);
    // Sample dealerships
    const dealerships = [
        { id: '1', name: 'City Motors Downtown' },
        { id: '2', name: 'Highway Auto Mall' },
        { id: '3', name: 'Luxury Cars Inc.' },
        { id: '4', name: 'Valley Vehicles' },
        { id: '5', name: 'Eastside Auto Group' },
        { id: '6', name: 'Westside Dealership' }
    ];
    // Sample report history
    const reportHistory = [
        { id: '1', name: 'Monthly Sales Report', type: 'Sales', format: 'PDF', date: '2025-06-15', size: '2.4 MB' },
        { id: '2', name: 'Quarterly Inventory Analysis', type: 'Inventory', format: 'Excel', date: '2025-06-10', size: '3.8 MB' },
        { id: '3', name: 'Profitability by Category', type: 'Financial', format: 'PDF', date: '2025-06-05', size: '1.7 MB' },
        { id: '4', name: 'YTD Order Fulfillment', type: 'Orders', format: 'Excel', date: '2025-05-28', size: '4.2 MB' }
    ];
    // Toggle dealership dropdown
    const toggleDealershipDropdown = () => {
        setShowDealershipDropdown(!showDealershipDropdown);
    };
    // Handle dealership selection
    const handleDealershipSelection = (id) => {
        if (selectedDealerships.includes(id)) {
            setSelectedDealerships(selectedDealerships.filter(item => item !== id));
        } else {
            setSelectedDealerships([...selectedDealerships, id]);
        }
    };
    // Handle select all dealerships
    const handleSelectAllDealerships = () => {
        if (selectedDealerships.length === dealerships.length) {
            setSelectedDealerships([]);
        } else {
            setSelectedDealerships(dealerships.map(d => d.id));
        }
    };
    // Handle generate report
    const handleGenerateReport = () => {
        setIsGeneratingReport(true);
        setTimeout(() => {
            setIsGeneratingReport(false);
        }, 1500);
    };
    // Initialize charts
    useEffect(() => {
        // Initialize sales analysis charts when sales tab is active
        if (activeReportTab === 'sales') {
            if (salesByModelChartRef.current) {
                const salesByModelChart = echarts.init(salesByModelChartRef.current);
                const salesByModelOption = {
                    animation: false,
                    title: {
                        text: 'Sales by Model',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        bottom: 'bottom'
                    },
                    series: [
                        {
                            name: 'Sales Distribution',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: true,
                                formatter: '{b}: {c} ({d}%)'
                            },
                            data: [
                                { value: 45, name: 'Model X SUV' },
                                { value: 38, name: 'Luxury Sedan Pro' },
                                { value: 32, name: 'EcoSport EV' },
                                { value: 28, name: 'City Compact' },
                                { value: 25, name: 'Hybrid Elite' }
                            ]
                        }
                    ]
                };
                salesByModelChart.setOption(salesByModelOption);
            }
            if (salesByPersonChartRef.current) {
                const salesByPersonChart = echarts.init(salesByPersonChartRef.current);
                const salesByPersonOption = {
                    animation: false,
                    title: {
                        text: 'Sales by Salesperson',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '12%',
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: ['John Smith', 'Sarah Johnson', 'Mike Brown', 'Lisa Davis', 'Tom Wilson']
                    },
                    series: [
                        {
                            name: 'Sales Amount',
                            type: 'bar',
                            data: [820, 765, 680, 620, 590],
                            itemStyle: {
                                color: '#4F46E5'
                            }
                        }
                    ]
                };
                salesByPersonChart.setOption(salesByPersonOption);
            }
            if (customerDemographicsChartRef.current) {
                const customerDemographicsChart = echarts.init(customerDemographicsChartRef.current);
                const customerDemographicsOption = {
                    animation: false,
                    title: {
                        text: 'Customer Demographics',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        bottom: 0
                    },
                    series: [
                        {
                            name: 'Age Groups',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 35, name: '25-34' },
                                { value: 30, name: '35-44' },
                                { value: 20, name: '45-54' },
                                { value: 15, name: '55+' }
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                customerDemographicsChart.setOption(customerDemographicsOption);
            }
            if (conversionRatesChartRef.current) {
                const conversionRatesChart = echarts.init(conversionRatesChartRef.current);
                const conversionRatesOption = {
                    animation: false,
                    title: {
                        text: 'Sales Conversion Rates',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Lead to Test Drive', 'Test Drive to Sale'],
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '12%',
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    },
                    series: [
                        {
                            name: 'Lead to Test Drive',
                            type: 'line',
                            data: [45, 48, 52, 50, 55, 58],
                            smooth: true
                        },
                        {
                            name: 'Test Drive to Sale',
                            type: 'line',
                            data: [25, 28, 32, 30, 35, 38],
                            smooth: true
                        }
                    ]
                };
                conversionRatesChart.setOption(conversionRatesOption);
            }
            return () => {
                if (salesByModelChartRef.current) {
                    const chart = echarts.getInstanceByDom(salesByModelChartRef.current);
                    chart?.dispose();
                }
                if (salesByPersonChartRef.current) {
                    const chart = echarts.getInstanceByDom(salesByPersonChartRef.current);
                    chart?.dispose();
                }
                if (customerDemographicsChartRef.current) {
                    const chart = echarts.getInstanceByDom(customerDemographicsChartRef.current);
                    chart?.dispose();
                }
                if (conversionRatesChartRef.current) {
                    const chart = echarts.getInstanceByDom(conversionRatesChartRef.current);
                    chart?.dispose();
                }
            };
        }
        if (activeReportTab === 'overview' && salesTrendChartRef.current) {
            const salesTrendChart = echarts.init(salesTrendChartRef.current);
            const salesOption = {
                animation: false,
                title: {
                    text: 'Sales Trend',
                    left: 'center',
                    top: 0,
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['2025', '2024'],
                    bottom: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '12%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '${value}k'
                    }
                },
                series: [
                    {
                        name: '2025',
                        type: 'line',
                        data: [140, 182, 191, 234, 290, 330],
                        lineStyle: {
                            width: 3,
                            color: '#4F46E5'
                        },
                        itemStyle: {
                            color: '#4F46E5'
                        },
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(79, 70, 229, 0.3)' },
                                    { offset: 1, color: 'rgba(79, 70, 229, 0.1)' }
                                ]
                            }
                        }
                    },
                    {
                        name: '2024',
                        type: 'line',
                        data: [120, 132, 101, 134, 190, 230],
                        lineStyle: {
                            width: 3,
                            color: '#9CA3AF',
                            type: 'dashed'
                        },
                        itemStyle: {
                            color: '#9CA3AF'
                        }
                    }
                ]
            };
            salesTrendChart.setOption(salesOption);
            return () => {
                salesTrendChart.dispose();
            };
        }
    }, [activeReportTab]);
    useEffect(() => {
        if (inventoryTurnoverChartRef.current) {
            const inventoryTurnoverChart = echarts.init(inventoryTurnoverChartRef.current);
            const turnoverOption = {
                animation: false,
                title: {
                    text: 'Inventory Turnover',
                    left: 'center',
                    top: 0,
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['Turnover Rate'],
                    bottom: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '12%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['SUV', 'Sedan', 'Luxury', 'Compact', 'Electric', 'Hybrid']
                },
                yAxis: {
                    type: 'value',
                    name: 'Days',
                    nameLocation: 'middle',
                    nameGap: 30
                },
                series: [
                    {
                        name: 'Turnover Rate',
                        type: 'bar',
                        data: [
                            { value: 45, itemStyle: { color: '#10B981' } },
                            { value: 32, itemStyle: { color: '#10B981' } },
                            { value: 60, itemStyle: { color: '#F59E0B' } },
                            { value: 28, itemStyle: { color: '#10B981' } },
                            { value: 75, itemStyle: { color: '#EF4444' } },
                            { value: 42, itemStyle: { color: '#10B981' } }
                        ],
                        barWidth: '40%',
                        label: {
                            show: true,
                            position: 'top'
                        }
                    }
                ]
            };
            inventoryTurnoverChart.setOption(turnoverOption);
            return () => {
                inventoryTurnoverChart.dispose();
            };
        }
    }, [activeReportTab]);
    useEffect(() => {
        if (profitabilityChartRef.current) {
            const profitabilityChart = echarts.init(profitabilityChartRef.current);
            const profitOption = {
                animation: false,
                title: {
                    text: 'Profitability Analysis',
                    left: 'center',
                    top: 0,
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    data: ['Revenue', 'Cost', 'Profit Margin'],
                    bottom: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '12%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['SUV', 'Sedan', 'Luxury', 'Compact', 'Electric', 'Hybrid'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Amount',
                        min: 0,
                        max: 1000,
                        interval: 200,
                        axisLabel: {
                            formatter: '${value}k'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Profit Margin',
                        min: 0,
                        max: 50,
                        interval: 10,
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Revenue',
                        type: 'bar',
                        data: [675, 308, 216, 572, 480, 297],
                        barWidth: '20%',
                        itemStyle: {
                            color: '#4F46E5'
                        }
                    },
                    {
                        name: 'Cost',
                        type: 'bar',
                        data: [520, 245, 135, 450, 410, 220],
                        barWidth: '20%',
                        itemStyle: {
                            color: '#9CA3AF'
                        }
                    },
                    {
                        name: 'Profit Margin',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [23, 20, 38, 21, 15, 26],
                        lineStyle: {
                            width: 3,
                            color: '#10B981'
                        },
                        itemStyle: {
                            color: '#10B981'
                        }
                    }
                ]
            };
            profitabilityChart.setOption(profitOption);
            return () => {
                profitabilityChart.dispose();
            };
        }
    }, [activeReportTab]);
    useEffect(() => {
        // Initialize financial charts when financial tab is active
        if (activeReportTab === 'financial') {
            if (revenueChartRef.current) {
                const revenueChart = echarts.init(revenueChartRef.current);
                const revenueOption = {
                    animation: false,
                    title: {
                        text: 'Revenue Trend',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['2025', '2024'],
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '12%',
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '${value}M'
                        }
                    },
                    series: [
                        {
                            name: '2025',
                            type: 'line',
                            data: [4.2, 4.5, 4.8, 5.0, 5.2, 5.5],
                            lineStyle: { width: 3 },
                            itemStyle: { color: '#10B981' },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0, y: 0, x2: 0, y2: 1,
                                    colorStops: [
                                        { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
                                        { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
                                    ]
                                }
                            }
                        },
                        {
                            name: '2024',
                            type: 'line',
                            data: [3.8, 4.0, 4.2, 4.3, 4.5, 4.8],
                            lineStyle: { width: 3, type: 'dashed' },
                            itemStyle: { color: '#9CA3AF' }
                        }
                    ]
                };
                revenueChart.setOption(revenueOption);
            }
            if (expenseChartRef.current) {
                const expenseChart = echarts.init(expenseChartRef.current);
                const expenseOption = {
                    animation: false,
                    title: {
                        text: 'Expense Analysis',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'shadow' }
                    },
                    legend: {
                        data: ['Fixed', 'Variable'],
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '12%',
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '${value}K'
                        }
                    },
                    series: [
                        {
                            name: 'Fixed',
                            type: 'bar',
                            stack: 'total',
                            data: [320, 332, 301, 334, 390, 330],
                            itemStyle: { color: '#6366F1' }
                        },
                        {
                            name: 'Variable',
                            type: 'bar',
                            stack: 'total',
                            data: [220, 182, 191, 234, 290, 330],
                            itemStyle: { color: '#8B5CF6' }
                        }
                    ]
                };
                expenseChart.setOption(expenseOption);
            }
            if (roiChartRef.current) {
                const roiChart = echarts.init(roiChartRef.current);
                const roiOption = {
                    animation: false,
                    title: {
                        text: 'ROI by Department',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        bottom: 'bottom'
                    },
                    series: [
                        {
                            name: 'ROI Distribution',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: true,
                                formatter: '{b}: {c}%'
                            },
                            data: [
                                { value: 35, name: 'Sales', itemStyle: { color: '#10B981' } },
                                { value: 25, name: 'Marketing', itemStyle: { color: '#6366F1' } },
                                { value: 20, name: 'Service', itemStyle: { color: '#8B5CF6' } },
                                { value: 15, name: 'Parts', itemStyle: { color: '#F59E0B' } },
                                { value: 5, name: 'Other', itemStyle: { color: '#EF4444' } }
                            ]
                        }
                    ]
                };
                roiChart.setOption(roiOption);
            }
            if (cashFlowChartRef.current) {
                const cashFlowChart = echarts.init(cashFlowChartRef.current);
                const cashFlowOption = {
                    animation: false,
                    title: {
                        text: 'Cash Flow Analysis',
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Inflow', 'Outflow', 'Net Flow'],
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '12%',
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '${value}K'
                        }
                    },
                    series: [
                        {
                            name: 'Inflow',
                            type: 'bar',
                            data: [520, 532, 501, 534, 590, 630],
                            itemStyle: { color: '#10B981' }
                        },
                        {
                            name: 'Outflow',
                            type: 'bar',
                            data: [-420, -432, -401, -434, -490, -530],
                            itemStyle: { color: '#EF4444' }
                        },
                        {
                            name: 'Net Flow',
                            type: 'line',
                            data: [100, 100, 100, 100, 100, 100],
                            lineStyle: { width: 3 },
                            itemStyle: { color: '#6366F1' }
                        }
                    ]
                };
                cashFlowChart.setOption(cashFlowOption);
            }
            return () => {
                if (revenueChartRef.current) {
                    const chart = echarts.getInstanceByDom(revenueChartRef.current);
                    chart?.dispose();
                }
                if (expenseChartRef.current) {
                    const chart = echarts.getInstanceByDom(expenseChartRef.current);
                    chart?.dispose();
                }
                if (roiChartRef.current) {
                    const chart = echarts.getInstanceByDom(roiChartRef.current);
                    chart?.dispose();
                }
                if (cashFlowChartRef.current) {
                    const chart = echarts.getInstanceByDom(cashFlowChartRef.current);
                    chart?.dispose();
                }
            };
        }
        if (categoryComparisonChartRef.current) {
            const categoryComparisonChart = echarts.init(categoryComparisonChartRef.current);
            const comparisonOption = {
                animation: false,
                title: {
                    text: 'Category Comparison',
                    left: 'center',
                    top: 0,
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    bottom: 'bottom'
                },
                series: [
                    {
                        name: 'Sales Distribution',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 35, name: 'SUV', itemStyle: { color: '#F59E0B' } },
                            { value: 20, name: 'Sedan', itemStyle: { color: '#3B82F6' } },
                            { value: 15, name: 'Luxury', itemStyle: { color: '#8B5CF6' } },
                            { value: 12, name: 'Compact', itemStyle: { color: '#10B981' } },
                            { value: 8, name: 'Electric', itemStyle: { color: '#EF4444' } },
                            { value: 10, name: 'Hybrid', itemStyle: { color: '#6366F1' } }
                        ]
                    }
                ]
            };
            categoryComparisonChart.setOption(comparisonOption);
            return () => {
                categoryComparisonChart.dispose();
            };
        }
    }, [activeReportTab]);
    // Handle window resize for charts
    useEffect(() => {
        const handleResize = () => {
            const charts = [];
            if (salesTrendChartRef.current) {
                const chart = echarts.getInstanceByDom(salesTrendChartRef.current);
                if (chart) charts.push(chart);
            }
            if (inventoryTurnoverChartRef.current) {
                const chart = echarts.getInstanceByDom(inventoryTurnoverChartRef.current);
                if (chart) charts.push(chart);
            }
            if (profitabilityChartRef.current) {
                const chart = echarts.getInstanceByDom(profitabilityChartRef.current);
                if (chart) charts.push(chart);
            }
            if (categoryComparisonChartRef.current) {
                const chart = echarts.getInstanceByDom(categoryComparisonChartRef.current);
                if (chart) charts.push(chart);
            }
            charts.forEach(chart => chart.resize());
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="min-h-screen bg-gray-50 p-2">
            <div className="max-w-[1440px] mx-auto">
                <div className="mt-4 px-0 sm:px-6 lg:px-8">
                    <div className=" py-4 px-6 rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                            {/* Heading */}
                            <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
 
                            {/* Right Side Controls */}
                            <div className="flex flex-col md:flex-row items-center gap-3">

                                {/* Search Input */}
                                <div className="relative w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Search reports..."
                                        className="py-2 pl-10 pr-4 w-full md:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    />
                                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition whitespace-nowrap">
                                        <i className="fas fa-cog mr-2"></i> Settings
                                    </button>
                                    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition whitespace-nowrap">
                                        <i className="fas fa-plus mr-2"></i> New Report
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-3">
                    {/* Report Filter Form Section */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-medium text-gray-800">Report Filters</h2>
                            <div className="text-sm text-gray-500">Last updated: June 19, 2025</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                                <div className="relative">
                                    <select
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        value={reportType}
                                        onChange={(e) => setReportType(e.target.value)}
                                    >
                                        <option value="sales">Sales</option>
                                        <option value="orders">Orders</option>
                                        <option value="inventory">Inventory</option>
                                        <option value="financial">Financial</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <i className="fas fa-chevron-down text-xs"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            value={dateRange.from}
                                            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            value={dateRange.to}
                                            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dealership</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm !rounded-button whitespace-nowrap"
                                        onClick={toggleDealershipDropdown}
                                    >
                                        <span className="block truncate">
                                            {selectedDealerships.length === 0 && 'All Dealerships'}
                                            {selectedDealerships.length === dealerships.length && 'All Dealerships'}
                                            {selectedDealerships.length > 0 && selectedDealerships.length < dealerships.length &&
                                                `${selectedDealerships.length} Selected`}
                                        </span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <i className="fas fa-chevron-down text-gray-400"></i>
                                        </span>
                                    </button>
                                    {showDealershipDropdown && (
                                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            <div className="sticky top-0 z-10 bg-white">
                                                <div className="flex items-center px-3 py-2 border-b">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        checked={selectedDealerships.length === dealerships.length}
                                                        onChange={handleSelectAllDealerships}
                                                    />
                                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                                        Select All
                                                    </label>
                                                </div>
                                                <div className="px-3 py-2 border-b">
                                                    <input
                                                        type="text"
                                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                        placeholder="Search dealerships..."
                                                    />
                                                </div>
                                            </div>
                                            {dealerships.map((dealership) => (
                                                <div
                                                    key={dealership.id}
                                                    className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50"
                                                    onClick={() => handleDealershipSelection(dealership.id)}
                                                >
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                            checked={selectedDealerships.includes(dealership.id)}
                                                            onChange={() => { }}
                                                        />
                                                        <span className="ml-3 block font-normal truncate">
                                                            {dealership.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <label className="block text-sm font-medium text-gray-700 mr-3">Export As:</label>
                                <div className="flex space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            id="export-excel"
                                            name="export-type"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            checked={exportType === 'excel'}
                                            onChange={() => setExportType('excel')}
                                        />
                                        <label htmlFor="export-excel" className="ml-2 block text-sm text-gray-700">
                                            Excel
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="export-pdf"
                                            name="export-type"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            checked={exportType === 'pdf'}
                                            onChange={() => setExportType('pdf')}
                                        />
                                        <label htmlFor="export-pdf" className="ml-2 block text-sm text-gray-700">
                                            PDF
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="export-csv"
                                            name="export-type"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            checked={exportType === 'csv'}
                                            onChange={() => setExportType('csv')}
                                        />
                                        <label htmlFor="export-csv" className="ml-2 block text-sm text-gray-700">
                                            CSV
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                                >
                                    <i className="fas fa-redo mr-2"></i> Reset Filters
                                </button>
                                <button
                                    type="button"
                                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap ${isGeneratingReport ? 'opacity-75' : ''}`}
                                    onClick={handleGenerateReport}
                                    disabled={isGeneratingReport}
                                >
                                    {isGeneratingReport ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin mr-2"></i> Generating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-file-export mr-2"></i> Generate Report
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Report Tabs */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex">
                                <button
                                    onClick={() => setActiveReportTab('overview')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeReportTab === 'overview'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-chart-pie mr-2"></i> Overview
                                </button>
                                <button
                                    onClick={() => setActiveReportTab('sales')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeReportTab === 'sales'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-chart-line mr-2"></i> Sales Analysis
                                </button>
                                <button
                                    onClick={() => setActiveReportTab('inventory')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeReportTab === 'inventory'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-warehouse mr-2"></i> Inventory Analysis
                                </button>
                                <button
                                    id="financial-tab"
                                    onClick={() => setActiveReportTab('financial')}
                                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${activeReportTab === 'financial'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <i className="fas fa-dollar-sign mr-2"></i> Financial Performance
                                </button>
                            </nav>
                        </div>
                    </div>
                    {/* Financial Performance Content */}
                    <div className={`${activeReportTab !== 'financial' ? 'hidden' : ''}`}>
                        {/* Financial KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                                        <i className="fas fa-dollar-sign text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">Total Revenue</h2>
                                        <p className="text-2xl font-bold text-gray-800">$5.2M</p>
                                        <span className="text-sm text-green-500">+15.3% vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                        <i className="fas fa-chart-pie text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">Net Profit</h2>
                                        <p className="text-2xl font-bold text-gray-800">$1.8M</p>
                                        <span className="text-sm text-green-500">+12.8% vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                        <i className="fas fa-chart-line text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">ROI</h2>
                                        <p className="text-2xl font-bold text-gray-800">34.6%</p>
                                        <span className="text-sm text-green-500">+2.4% vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                        <i className="fas fa-wallet text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">Operating Margin</h2>
                                        <p className="text-2xl font-bold text-gray-800">28.5%</p>
                                        <span className="text-sm text-green-500">+1.2% vs last month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Financial Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={revenueChartRef} style={{ height: '320px' }}></div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={expenseChartRef} style={{ height: '320px' }}></div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={roiChartRef} style={{ height: '320px' }}></div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={cashFlowChartRef} style={{ height: '320px' }}></div>
                            </div>
                        </div>
                        {/* Financial Tables */}
                        <div className="bg-white rounded-lg shadow mb-6">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800">Profitability by Vehicle Category</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Luxury Vehicles</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2.1M</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1.6M</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$500K</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">23.8%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SUVs</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1.8M</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1.3M</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$500K</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">27.8%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Electric Vehicles</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$850K</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$620K</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$230K</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">27.1%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Expense Breakdown */}
                        <div className="bg-white rounded-lg shadow mb-6">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800">Expense Breakdown</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-32 text-sm text-gray-600">Operations</div>
                                        <div className="flex-1 ml-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-sm text-gray-600">35%</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-32 text-sm text-gray-600">Marketing</div>
                                        <div className="flex-1 ml-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-sm text-gray-600">25%</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-32 text-sm text-gray-600">Personnel</div>
                                        <div className="flex-1 ml-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-sm text-gray-600">20%</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-32 text-sm text-gray-600">Technology</div>
                                        <div className="flex-1 ml-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-sm text-gray-600">15%</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-32 text-sm text-gray-600">Other</div>
                                        <div className="flex-1 ml-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-sm text-gray-600">5%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                    <i className="fas fa-chart-line text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-sm font-medium text-gray-600">Total Sales</h2>
                                    <p className="text-2xl font-bold text-gray-800">$1.28M</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i> 12.5%
                                </span>
                                <span className="text-gray-500 ml-2">from last month</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100 text-green-600">
                                    <i className="fas fa-car text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-sm font-medium text-gray-600">Units Sold</h2>
                                    <p className="text-2xl font-bold text-gray-800">245</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i> 8.3%
                                </span>
                                <span className="text-gray-500 ml-2">from last month</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                    <i className="fas fa-percentage text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-sm font-medium text-gray-600">Profit Margin</h2>
                                    <p className="text-2xl font-bold text-gray-800">24.8%</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i> 2.1%
                                </span>
                                <span className="text-gray-500 ml-2">from last month</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <i className="fas fa-clock text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-sm font-medium text-gray-600">Avg. Turnover</h2>
                                    <p className="text-2xl font-bold text-gray-800">42 days</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-red-500 flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i> 3.5%
                                </span>
                                <span className="text-gray-500 ml-2">from last month</span>
                            </div>
                        </div>
                    </div>
                    {/* Charts Section */}
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ${activeReportTab !== 'overview' ? 'hidden' : ''}`}>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div ref={salesTrendChartRef} style={{ height: '320px' }}></div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div ref={inventoryTurnoverChartRef} style={{ height: '320px' }}></div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div ref={profitabilityChartRef} style={{ height: '320px' }}></div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div ref={categoryComparisonChartRef} style={{ height: '320px' }}></div>
                        </div>
                    </div>
                    {/* Sales Analysis Content */}
                    <div className={`${activeReportTab !== 'sales' ? 'hidden' : ''}`}>
                        {/* Sales KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                        <i className="fas fa-dollar-sign text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">Monthly Revenue</h2>
                                        <p className="text-2xl font-bold text-gray-800">$428.5K</p>
                                        <span className="text-sm text-green-500">+12.5% vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                                        <i className="fas fa-chart-line text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">Conversion Rate</h2>
                                        <p className="text-2xl font-bold text-gray-800">24.8%</p>
                                        <span className="text-sm text-green-500">+2.1% vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                        <i className="fas fa-users text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">New Customers</h2>
                                        <p className="text-2xl font-bold text-gray-800">164</p>
                                        <span className="text-sm text-green-500">+8.3% vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                        <i className="fas fa-trophy text-xl"></i>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-600">Avg Deal Size</h2>
                                        <p className="text-2xl font-bold text-gray-800">$32.5K</p>
                                        <span className="text-sm text-green-500">+5.2% vs last month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sales Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={salesByModelChartRef} style={{ height: '320px' }}></div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={salesByPersonChartRef} style={{ height: '320px' }}></div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={customerDemographicsChartRef} style={{ height: '320px' }}></div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div ref={conversionRatesChartRef} style={{ height: '320px' }}></div>
                            </div>
                        </div>
                        {/* Top Selling Vehicles */}
                        <div className="bg-white rounded-lg shadow mb-6">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800">Top Selling Vehicles</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Model X SUV</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SUV</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2.25M</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$50,000</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Luxury Sedan Pro</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Luxury</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">38</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2.85M</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$75,000</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EcoSport EV</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electric</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1.28M</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$40,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Recent Reports Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-800">Recent Reports</h3>
                                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                                        View All
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Report Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Format
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Size
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {reportHistory.map((report) => (
                                            <tr key={report.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${report.type === 'Sales' ? 'bg-indigo-100 text-indigo-800' :
                                                        report.type === 'Inventory' ? 'bg-green-100 text-green-800' :
                                                            report.type === 'Financial' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {report.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {report.format}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(report.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {report.size}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end space-x-2">
                                                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer !rounded-button whitespace-nowrap" title="Download">
                                                            <i className="fas fa-download"></i>
                                                        </button>
                                                        <button className="text-blue-600 hover:text-blue-900 cursor-pointer !rounded-button whitespace-nowrap" title="View">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap" title="Share">
                                                            <i className="fas fa-share-alt"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800">Scheduled Reports</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Monthly Sales Summary</h4>
                                        <p className="text-xs text-gray-500 mt-1">Every 1st of the month</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Weekly Inventory Status</h4>
                                        <p className="text-xs text-gray-500 mt-1">Every Monday at 8:00 AM</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Quarterly Financial Report</h4>
                                        <p className="text-xs text-gray-500 mt-1">Every 3 months</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Pending
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button
                                        id="scheduleReportBtn"
                                        onClick={() => setShowScheduleModal(true)}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                        <i className="fas fa-plus mr-2"></i> Schedule New Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Comparison Section */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-800">Performance Comparison</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="col-span-1">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Compare By</label>
                                        <div className="relative">
                                            <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                <option>Time Period</option>
                                                <option>Vehicle Category</option>
                                                <option>Dealership</option>
                                                <option>Sales Person</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <i className="fas fa-chevron-down text-xs"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Period 1</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="relative">
                                                <input type="date" className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                                            </div>
                                            <div className="relative">
                                                <input type="date" className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Period 2</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="relative">
                                                <input type="date" className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                                            </div>
                                            <div className="relative">
                                                <input type="date" className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Metrics</label>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <input id="metric-sales" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                                                <label htmlFor="metric-sales" className="ml-2 block text-sm text-gray-700">
                                                    Sales Volume
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="metric-revenue" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                                                <label htmlFor="metric-revenue" className="ml-2 block text-sm text-gray-700">
                                                    Revenue
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="metric-profit" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                                                <label htmlFor="metric-profit" className="ml-2 block text-sm text-gray-700">
                                                    Profit Margin
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="metric-turnover" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                                <label htmlFor="metric-turnover" className="ml-2 block text-sm text-gray-700">
                                                    Inventory Turnover
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                        <i className="fas fa-sync-alt mr-2"></i> Update Comparison
                                    </button>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="bg-gray-50 rounded-lg p-6 h-full">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-base font-medium text-gray-800">Comparison Results</h4>
                                            <div className="flex space-x-2">
                                                <button className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-file-pdf mr-1"></i> PDF
                                                </button>
                                                <button className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fas fa-file-excel mr-1"></i> Excel
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                                <div className="text-sm text-gray-500 mb-1">Sales Volume</div>
                                                <div className="flex items-end">
                                                    <div className="text-2xl font-bold text-gray-800">245</div>
                                                    <div className="text-sm text-green-500 ml-2 flex items-center">
                                                        <i className="fas fa-arrow-up mr-1"></i> 12.5%
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">vs 218 units</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                                <div className="text-sm text-gray-500 mb-1">Revenue</div>
                                                <div className="flex items-end">
                                                    <div className="text-2xl font-bold text-gray-800">$1.28M</div>
                                                    <div className="text-sm text-green-500 ml-2 flex items-center">
                                                        <i className="fas fa-arrow-up mr-1"></i> 8.3%
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">vs $1.18M</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                                <div className="text-sm text-gray-500 mb-1">Profit Margin</div>
                                                <div className="flex items-end">
                                                    <div className="text-2xl font-bold text-gray-800">24.8%</div>
                                                    <div className="text-sm text-green-500 ml-2 flex items-center">
                                                        <i className="fas fa-arrow-up mr-1"></i> 2.1%
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">vs 22.7%</div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Category
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Period 1
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Period 2
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Change
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">SUV</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$420,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$480,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-500 text-right">+14.3%</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Sedan</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$320,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$308,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-500 text-right">-3.8%</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Luxury</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$180,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$216,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-500 text-right">+20.0%</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Compact</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$160,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$152,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-500 text-right">-5.0%</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Electric</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$0</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$58,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-500 text-right">+100%</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Hybrid</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$100,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">$66,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-500 text-right">-34.0%</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr className="bg-gray-50">
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">TOTAL</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-right">$1,180,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-right">$1,280,000</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-500 text-right">+8.5%</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 mt-auto">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                        <div className="flex justify-center space-x-6 md:order-2">
                            <a href="#" className="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap">
                                <span className="sr-only">Help Center</span>
                                <i className="fas fa-question-circle"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap">
                                <span className="sr-only">Documentation</span>
                                <i className="fas fa-book"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap">
                                <span className="sr-only">Settings</span>
                                <i className="fas fa-cog"></i>
                            </a>
                        </div>
                        <div className="mt-8 md:mt-0 md:order-1">
                            <p className="text-center text-base text-gray-400">
                                &copy; 2025 AutoDealerPro. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>

                {/* Schedule Report Modal */}
                {showScheduleModal && (
                    <div className="fixed z-50 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <form onSubmit={handleScheduleSubmit}>
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Schedule New Report</h3>

                                            <div className="mb-4">
                                                <label htmlFor="reportName" className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                                                <input
                                                    type="text"
                                                    id="reportName"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={scheduleForm.name}
                                                    onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                                                    <select
                                                        id="reportType"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={scheduleForm.type}
                                                        onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
                                                    >
                                                        <option value="sales">Sales</option>
                                                        <option value="inventory">Inventory</option>
                                                        <option value="financial">Financial</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="reportFormat" className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                                                    <select
                                                        id="reportFormat"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={scheduleForm.format}
                                                        onChange={(e) => setScheduleForm({ ...scheduleForm, format: e.target.value })}
                                                    >
                                                        <option value="pdf">PDF</option>
                                                        <option value="excel">Excel</option>
                                                        <option value="csv">CSV</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                                                    <select
                                                        id="frequency"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={scheduleForm.frequency}
                                                        onChange={(e) => setScheduleForm({ ...scheduleForm, frequency: e.target.value })}
                                                    >
                                                        <option value="daily">Daily</option>
                                                        <option value="weekly">Weekly</option>
                                                        <option value="monthly">Monthly</option>
                                                        <option value="quarterly">Quarterly</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                                    <input
                                                        type="time"
                                                        id="scheduleTime"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={scheduleForm.time}
                                                        onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="recipientEmails" className="block text-sm font-medium text-gray-700 mb-1">Recipient Emails</label>
                                                <input
                                                    type="text"
                                                    id="recipientEmails"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Enter email addresses separated by commas"
                                                    value={scheduleForm.emails}
                                                    onChange={(e) => setScheduleForm({ ...scheduleForm, emails: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-center mb-4">
                                                <input
                                                    type="checkbox"
                                                    id="notification"
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    checked={scheduleForm.notification}
                                                    onChange={(e) => setScheduleForm({ ...scheduleForm, notification: e.target.checked })}
                                                />
                                                <label htmlFor="notification" className="ml-2 block text-sm text-gray-700">
                                                    Send notification when report is ready
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm !rounded-button whitespace-nowrap"
                                        >
                                            Schedule Report
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm !rounded-button whitespace-nowrap"
                                            onClick={() => setShowScheduleModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
export default Reporting