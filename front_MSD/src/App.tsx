import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientesList from "./assets/complemento/Clientes/ClientesList";
import ClientesAdd from "./assets/complemento/Clientes/ClientesAdd";
import ClientesEdit from "./assets/complemento/Clientes/CientesEdit";

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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%" }}>
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
  );
};

export default App;
