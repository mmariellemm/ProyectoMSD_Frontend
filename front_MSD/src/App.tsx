import React, { useState } from "react";
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
    <div className="p-6">
      {clienteEditando ? (
        <ClientesEdit
          cliente={clienteEditando}
          onUpdateCliente={handleUpdateCliente}
          onCancel={() => setClienteEditando(null)}
        />
      ) : (
        <>
          <ClientesAdd onAddCliente={handleAddCliente} />
          <ClientesList clientes={clientes} onDeleteCliente={handleDeleteCliente} />
        </>
      )}
    </div>
  );
};

export default App;
