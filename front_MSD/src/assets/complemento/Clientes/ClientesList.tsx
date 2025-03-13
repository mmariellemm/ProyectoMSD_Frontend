import React from "react";

interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

interface ClientesListProps {
  clientes: Cliente[];
  onDeleteCliente: (id: number) => void;
}

const ClientesList: React.FC<ClientesListProps> = ({ clientes, onDeleteCliente }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>
      <ul className="border rounded-lg p-4 bg-white shadow-md">
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <li key={cliente.id} className="border-b py-2 last:border-none flex justify-between items-center">
              <span>
                <strong>{cliente.nombre}</strong> - {cliente.email}
              </span>
              <button
                onClick={() => onDeleteCliente(cliente.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No hay clientes disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default ClientesList;