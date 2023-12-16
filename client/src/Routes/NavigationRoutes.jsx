import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HomePage from "../Pages/HomePage";
import ManagerDashboard from "../Pages/ManagerDashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../Pages/Cart";
import PaymentSucess from "../components/PaymentSucess";
import Orders from "../Pages/Orders";
import AddProduct from "../components/AddProduct";
import ManagerOrders from "../Pages/ManagerOders";


const Allroutes = () => {
  const { state } = useAuth();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");


  const renderDashboard = () => {
    if (state.isAuthenticated || isAuthenticated) {
      if (role === "Customer") {
        return <HomePage />;
      } else if (role === "Manager") {
        return <ManagerDashboard />;
      }
    }
    return <Login />;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={renderDashboard()} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart/:userId" element={<Cart />} />
        <Route path="/paymentSuccess" element={<PaymentSucess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/addModal" element={<AddProduct />} />
        <Route path="/managerOrders" element={<ManagerOrders />} />
      </Routes>
    </div>
  );
};

export default Allroutes;
