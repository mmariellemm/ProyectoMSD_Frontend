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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
        <div className="mb-2">
          <label className="block text-sm font-semibold">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientesEdit;