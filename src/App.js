import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Sidebar from "./components/Sidebar";  
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AgregarProducto from "./components/AgregarProducto";
import Edit from "./components/Edit";
import Ventas from "./components/venta/Ventas"; 
import AgregarVenta from "./components/venta/AgregarVenta";
import EditarVenta from "./components/venta/EditarVenta";
import Atencion from "./components/Atencion"; 
import { useAuth } from "./AuthContext"; 

function AppWrapper() {
  const { user } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <div className="d-flex" id="bc">
      {/* Mostrar Sidebar solo si hay usuario y no estamos en el login */}
      {user && !isLoginPage && <Sidebar />}
      
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agregar-producto" element={<AgregarProducto />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/ventas" element={<Ventas />} /> 
          <Route path="/agregar-venta" element={<AgregarVenta />} />
          <Route path="/edit-venta/:id" element={<EditarVenta />} />
          <Route path="/atencion" element={<Atencion />} /> 
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;