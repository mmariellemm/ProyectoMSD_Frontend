import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ClientesList from "./assets/Components/Clientes/ClientesList";
import ClientesAdd from "./assets/Components/Clientes/ClientesAdd";
import ClientesEdit from "./assets/Components/Clientes/CientesEdit";
import POS from "./assets/Components/Punto de venta/POS";
import Ticket from "./assets/Components/Punto de venta/Ticket";
import Login from "./assets/Components/Login/Login";
import Registro from "./assets/Components/Registro/Registro";

const App: React.FC = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
    { id: 2, nombre: "Ana López", email: "ana@example.com" },
  ]);

  const [clienteEditando, setClienteEditando] = useState<{
    id: number;
    nombre: string;
    email: string;
  } | null>(null);

  const handleAddCliente = (nuevoCliente: { id: number; nombre: string; email: string }) => {
    setClientes([...clientes, nuevoCliente]);
  };

  const handleUpdateCliente = (clienteActualizado: { id: number; nombre: string; email: string }) => {
    setClientes(clientes.map((cliente) => (cliente.id === clienteActualizado.id ? clienteActualizado : cliente)));
    setClienteEditando(null);
  };

  const handleDeleteCliente = (id: number) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  return (
    <Router>
      <div className="container-fluid vw-100 p-0 d-flex flex-column">
        {/* Barra de navegación */}
        <header className="bg-primary text-white text-center py-3">
          <h1>Sistema de Gestión</h1>
          <nav className="d-flex justify-content-center gap-3">
            <Link to="/" className="text-white text-decoration-none">
              Gestión de Clientes
            </Link>
            <Link to="/pos" className="text-white text-decoration-none">
              Punto de Venta
            </Link>
            <Link to="/ticket" className="text-white text-decoration-none">
              Ticket
            </Link>
            <Link to="/login" className="text-white text-decoration-none">
              Login
            </Link>
            <Link to="/registro" className="text-white text-decoration-none">
              Registro
            </Link>
          </nav>
        </header>

        {/* Contenido principal */}
        <div className="flex-grow-1 d-flex">
          <div className="col-12 h-100 d-flex flex-column p-4 bg-light">
            <Routes>
              {/* Ruta principal: Gestión de Clientes */}
              <Route
                path="/"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <h2 className="text-center mb-4">Gestión de Clientes</h2>
                      {clienteEditando ? (
                        <ClientesEdit
                          cliente={clienteEditando}
                          onUpdateCliente={handleUpdateCliente}
                          onCancel={() => setClienteEditando(null)}
                        />
                      ) : (
                        <>
                          <ClientesAdd onAddCliente={handleAddCliente} />
                          <div className="mt-4">
                            <ClientesList clientes={clientes} onDeleteCliente={handleDeleteCliente} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                }
              />

              {/* Ruta para el Punto de Venta */}
              <Route
                path="/pos"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <POS />
                    </div>
                  </div>
                }
              />

              {/* Otras rutas */}
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;