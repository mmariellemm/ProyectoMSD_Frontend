import React, { useState } from "react";

interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

interface ClientesAddProps {
  onAddCliente: (cliente: Cliente) => void;
}

const ClientesAdd: React.FC<ClientesAddProps> = ({ onAddCliente }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email) return;

    const nuevoCliente: Cliente = {
      id: Date.now(),
      nombre,
      email,
    };

    onAddCliente(nuevoCliente);
    setNombre("");
    setEmail("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Agregar Cliente</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
        >
          Agregar Cliente
        </button>
      </form>
    </div>
  );
};

export default ClientesAdd;
