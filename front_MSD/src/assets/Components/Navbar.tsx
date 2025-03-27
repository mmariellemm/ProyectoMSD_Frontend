import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaUserTie, FaSignInAlt, FaChartBar, FaUsers } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const usuarioAutenticado = JSON.parse(localStorage.getItem('usuarioAutenticado') || '{}');

  const handleLogout = () => {
    // Limpiar el localStorage
    localStorage.removeItem('usuarioAutenticado');
    // Redirigir al login
    navigate('/login');
    // Recargar la página para asegurar que el estado se actualice
    window.location.reload();
  };

  return (
    <nav className="text-white sidebar vh-100 p-3" style={{ backgroundColor: "#0a3d83" }}>
      <div className="sidebar-sticky">
        <h1 className="text-center py-3">Sistema</h1>
        <ul className="nav flex-column">
          {/* Home (Dashboard) */}
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
              <FaHome className="me-2" /> Home
            </Link>
          </li>

          {/* Inventario - visible para Admin y empleados */}
          <li className="nav-item">
            <Link to="/inventario" className="nav-link text-white d-flex align-items-center">
              <FaBoxOpen className="me-2" /> Inventario
            </Link>
          </li>

          {/* Reporte de Empleados - visible solo para Admin */}
          {usuarioAutenticado.rol === 'admin' && (
            <li className="nav-item">
              <Link to="/reporte-empleados" className="nav-link text-white d-flex align-items-center">
                <FaChartBar className="me-2" /> Reporte de Empleados
              </Link>
            </li>
          )}

          {/* Ventas - visible para Admin y empleados */}
          {(usuarioAutenticado.rol === 'admin' || usuarioAutenticado.rol === 'empleado') && (
            <li className="nav-item">
              <Link to="/ventas" className="nav-link text-white d-flex align-items-center">
                <FaBoxOpen className="me-2" /> Ventas
              </Link>
            </li>
          )}

          {/* Empleados - visible solo para Admin */}
          {usuarioAutenticado.rol === 'admin' && (
            <li className="nav-item">
              <Link to="/empleados" className="nav-link text-white d-flex align-items-center">
                <FaUserTie className="me-2" /> Empleados
              </Link>
            </li>
          )}

          {/* Clientes - visible para Admin y empleados */}
          <li className="nav-item">
            <Link to="/clientes" className="nav-link text-white d-flex align-items-center">
              <FaUsers className="me-2" /> Clientes
            </Link>
          </li>

          {/* Enlace para logout o Login */}
          {usuarioAutenticado && usuarioAutenticado.rol ? (
            <li className="nav-item">
              <button 
                onClick={handleLogout}
                className="nav-link text-white d-flex align-items-center bg-transparent border-0 w-100"
              >
                <FaSignInAlt className="me-2" /> Cerrar Sesión
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white d-flex align-items-center">
                <FaSignInAlt className="me-2" /> Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;