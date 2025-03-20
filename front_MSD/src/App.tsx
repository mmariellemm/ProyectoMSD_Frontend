import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientesList from "./assets/complemento/Clientes/ClientesList";
import ClientesAdd from "./assets/complemento/Clientes/ClientesAdd";
import ClientesEdit from "./assets/complemento/Clientes/CientesEdit";
import POS from "./assets/complemento/Punto de venta/POS";
import Ticket from "./assets/complemento/Punto de venta/Ticket"; 

const App: React.FC = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
    { id: 2, nombre: "Ana López", email: "ana@example.com" },
  ]);

  const [clienteEditando, setClienteEditando] = useState<{ id: number; nombre: string; email: string } | null>(null);

  const handleAddCliente = (nuevoCliente: { id: number; nombre: string; email: string }) => {
    setClientes([...clientes, nuevoCliente]);
  };

  const handleUpdateCliente = (clienteActualizado: { id: number; nombre: string; email: string }) => {
    setClientes(clientes.map(cliente => (cliente.id === clienteActualizado.id ? clienteActualizado : cliente)));
    setClienteEditando(null);
  };

  const handleDeleteCliente = (id: number) => {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">Sistema de Gestión</h1>

        <div className="row">
          {/* Gestión de Clientes */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4">
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

          {/* Punto de Venta */}
          <div className="col-md-6">
            <POS />
          </div>
        </div>
      </div>

      <Routes>
        {/* Ruta para la página del ticket */}
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </Router>
  );
};

export default App;
