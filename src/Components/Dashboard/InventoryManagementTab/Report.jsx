import React from "react";

function Report() {
  // Sample data for the tables
  const data = [
    {
      sourceName: "Main Warehouse",
      stock: "STK001",
      manu: "MAN001",
      manu2: "MAN002",
      invoice: "INV001",
      payment: "$25,000",
      pmtStatus: "PAID",
      payTerms: "NET 30",
      vin: "1HGCM82633A123456",
      engine: "ENG001",
      key: "KEY001",
      bl: "BL001",
      shipDate: "2023-05-15",
      brand: "Toyota",
      ocnSpec: "OCN001",
      model: "Camry",
      country: "Japan",
      myYear: "2023",
      extColor: "Red",
      intColor: "Black",
      tbd3: "N/A",
      orderMonth: "April",
      prodEst: "2023-04-10",
      shipEst: "2023-05-01",
      estArr: "2023-05-15",
      shpDte: "2023-05-01",
      arrEst: "2023-05-15",
      arrDate: "2023-05-16",
      shippingIndication: "DELIVERED"
    },
    {
      sourceName: "West Warehouse",
      stock: "STK002",
      manu: "MAN003",
      manu2: "MAN004",
      invoice: "INV002",
      payment: "$32,500",
      pmtStatus: "PENDING",
      payTerms: "NET 15",
      vin: "5XYZH4AG4JH123456",
      engine: "ENG002",
      key: "KEY002",
      bl: "BL002",
      shipDate: "2023-06-20",
      brand: "Honda",
      ocnSpec: "OCN002",
      model: "Accord",
      country: "Japan",
      myYear: "2023",
      extColor: "Blue",
      intColor: "Beige",
      tbd3: "N/A",
      orderMonth: "May",
      prodEst: "2023-05-15",
      shipEst: "2023-06-10",
      estArr: "2023-06-20",
      shpDte: "2023-06-10",
      arrEst: "2023-06-20",
      arrDate: "",
      shippingIndication: "SHIPPED"
    },
    {
      sourceName: "East Warehouse",
      stock: "STK003",
      manu: "MAN005",
      manu2: "MAN006",
      invoice: "INV003",
      payment: "$28,750",
      pmtStatus: "PAID",
      payTerms: "NET 30",
      vin: "2T1BURHE5GC123456",
      engine: "ENG003",
      key: "KEY003",
      bl: "BL003",
      shipDate: "",
      brand: "Ford",
      ocnSpec: "OCN003",
      model: "Fusion",
      country: "USA",
      myYear: "2023",
      extColor: "White",
      intColor: "Black",
      tbd3: "N/A",
      orderMonth: "June",
      prodEst: "2023-06-01",
      shipEst: "2023-06-25",
      estArr: "2023-07-05",
      shpDte: "",
      arrEst: "2023-07-05",
      arrDate: "",
      shippingIndication: "ORDERED"
    }
  ];

  // Handler functions
  const handleEditInventory = (item, index) => {
    console.log("Editing item:", item, "at index:", index);
    // Add your edit logic here
  };

  const handleDeleteInventory = (index) => {
    console.log("Deleting item at index:", index);
    // Add your delete logic here
  };

  return (
    <div>
      <div className="min-h-[600px]">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Report Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Inventory Summary</option>
                  <option>Stock Level Report</option>
                  <option>Category Analysis</option>
                  <option>Value Distribution</option>
                  <option>Inventory Movement</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Period
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Last 6 Months</option>
                  <option>Year to Date</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dealership
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>All Dealerships</option>
                  <option>City Motors</option>
                  <option>Highway Auto</option>
                  <option>Luxury Cars Inc</option>
                  <option>Downtown Autos</option>
                  <option>Valley Vehicles</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-sync-alt mr-2"></i> Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="mb-6 px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Title */}
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Inventory Summary Report
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition w-full sm:w-auto">
                  <i className="fas fa-print mr-2"></i> Print
                </button>

                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition w-full sm:w-auto">
                  <i className="fas fa-file-pdf mr-2"></i> PDF
                </button>

                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition w-full sm:w-auto">
                  <i className="fas fa-file-excel mr-2"></i> Excel
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

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Recent Export History
          </h2>
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
                {data.slice(0, 2).map((item, idx) => (
                  <tr key={`export-${item.stock}-${idx}`} className="hover:bg-gray-50">
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
    </div>
  );
}

export default Report;