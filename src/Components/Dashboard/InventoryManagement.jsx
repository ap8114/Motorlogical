// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import InventoryList from "./InventoryManagementTab/InventoryList";
import Report from "./InventoryManagementTab/Report";
const InventoryManagement = () => {
  const [editIndex, setEditIndex] = useState(null);

  const [activeTab, setActiveTab] = useState("inventory");

  const [showItemDetailsModal, setShowItemDetailsModal] = useState(false);
  const [demo, selectedItem] = useState();

  return (
    <div>
      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left Section: Heading and Subheading */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
              Logistics Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage all vehicle inventory in one place
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("inventory")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${
                activeTab === "inventory"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <i className="fas fa-warehouse mr-2"></i> Inventory List
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer !rounded-button ${
                activeTab === "reports"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <i className="fas fa-chart-bar mr-2"></i> Reports
            </button>
          </nav>
        </div>

        {activeTab === "inventory" && <div><InventoryList/></div>}

        {activeTab === "reports" && <div><Report/></div>}
      </main>
    </div>
  );
};

export default InventoryManagement;
