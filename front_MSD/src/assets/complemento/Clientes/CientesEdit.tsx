import React, { useState } from "react";

interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

interface ClientesEditProps {
  cliente: Cliente;
  onUpdateCliente: (clienteActualizado: Cliente) => void;
  onCancel: () => void;
}

const ClientesEdit: React.FC<ClientesEditProps> = ({ cliente, onUpdateCliente, onCancel }) => {
  const [nombre, setNombre] = useState(cliente.nombre);
  const [email, setEmail] = useState(cliente.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCliente({ ...cliente, nombre, email });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100 max-w-md p-4 bg-white rounded shadow-lg">
        <h2 className="text-center mb-4 text-dark">Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex gap-2 mt-4">
            <button
              type="submit"
              className="btn btn-success w-100 py-2"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary w-100 py-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientesEdit;
