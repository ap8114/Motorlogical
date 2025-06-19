import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import MainLayout from './Layout/MainLayout';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import DealershipManagement from './Components/Dashboard/DealershipManagement';
import OrderManagement from './Components/Dashboard/Ordermanagement';
import UserManagement from './Components/Dashboard/UserManagement';
import InventoryManagement from './Components/Dashboard/InventoryManagement';
import Setting from './Components/Dashboard/Setting';
import Reporting from './Components/Dashboard/Reporting';
import ManagerDashboard from './Components/Manager-Dashboard/ManagerDashboard';
import ManagerOrderManagement from './Components/Manager-Dashboard/ManagerOrderManagement';
import ManagerStaff from './Components/Manager-Dashboard/ManagerStaff';
import ManagerReports from './Components/Manager-Dashboard/ManagerReports';
import ManagerInventory from './Components/Manager-Dashboard/ManagerInventory';
import SalespersonDashboard from './Components/Salesperson-Dashboard/SalespersonDashboard';
import SalespersonInventory from './Components/Salesperson-Dashboard/SalespersonInventory';
import SalespersonOrder from './Components/Salesperson-Dashboard/SalespersonOrder';
import SalespersonCustomerInfo from './Components/Salesperson-Dashboard/SalespersonCustomerInfo';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Dashboard routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dealershipmanagement" element={<DealershipManagement />} />
          <Route path="/ordermanagement" element={<OrderManagement />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/inventorymanagement" element={<InventoryManagement />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/setting" element={<Setting />} />

          {/* <Route path="/ordermanagement" element={<OrdersManagement />} />
          <Route path="/inventorymanagement" element={<InventoryManagement />} />
          <Route path="/productionstatus" element={<ProductionStatus />} />
          <Route path="/salesrecords" element={<SalesRecords />} />
          <Route path="/accountsetting" element={<AccountSettings />} />
          <Route path="/userpreferences" element={<UserPreferences />} />
          <Route path="/helpsupport" element={<HelpSupport />} /> */}
          {/* Add more nested routes here */}
        </Route>

        {/* Manager Dashboard routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/ordermanagement" element={<ManagerOrderManagement />} />
           <Route path="/manager/managerstaff" element={<ManagerStaff />} />
            <Route path="/manager/managerreports" element={<ManagerReports />} />
            <Route path="/manager/managerinventory" element={<ManagerInventory />} />
        </Route>

         {/* Salesperson Dashboard routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/salesperson/salespersondashboard" element={<SalespersonDashboard />} />
          <Route path="/salesperson/salespersoninventory" element={<SalespersonInventory />} />
            <Route path="/salesperson/salespersonorder" element={<SalespersonOrder />} /> 
           <Route path="/salesperson/salespersoncustomerinfo" element={<SalespersonCustomerInfo />} /> 
          
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
