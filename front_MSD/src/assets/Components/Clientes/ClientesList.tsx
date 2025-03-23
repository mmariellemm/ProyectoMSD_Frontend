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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100 max-w-4xl p-4 bg-white rounded shadow-lg">
        <h2 className="text-center mb-4 text-dark">Lista de Clientes</h2>
        <ul className="list-group">
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <li key={cliente.id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
                <div className="d-flex flex-column">
                  <span className="fw-semibold text-dark">{cliente.nombre}</span>
                  <span className="text-muted small">{cliente.email}</span>
                </div>
                <button
                  onClick={() => onDeleteCliente(cliente.id)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-muted py-4">No hay clientes disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ClientesList;
