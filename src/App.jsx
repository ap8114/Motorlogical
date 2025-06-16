import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import MainLayout from './Layout/MainLayout';
import OrdersManagement from './Components/Orders/OrdersManagement';
import InventoryManagement from './Components/InventoryManagement/InventoryManagement';
import ProductionStatus from './Components/Productionstatus/Productionstatus';
import SalesRecords from './Components/Salesrecord/SalesRecords';
import AccountSettings from './Components/Setting/AccountSettings';
import UserPreferences from './Components/Setting/UserPreferences';
import HelpSupport from './Components/Setting/HelpSupport';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without sidebar */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}

        {/* Protected routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ordermanagement" element={<OrdersManagement />} />
            <Route path="/inventorymanagement" element={<InventoryManagement />} />
            <Route path="/productionstatus" element={<ProductionStatus />} />
             <Route path="/salesrecords" element={<SalesRecords />} />
             <Route path="/accountsetting" element={<AccountSettings />} />
             <Route path="/userpreferences" element={<UserPreferences />} />
             <Route path="/helpsupport" element={<HelpSupport />} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
