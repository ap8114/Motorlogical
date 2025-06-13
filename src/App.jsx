import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import MainLayout from './Layout/MainLayout';
import OrdersManagement from './Components/Orders/OrdersManagement';
import InventoryManagement from './Components/InventoryManagement/InventoryManagement';

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
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
