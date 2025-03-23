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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100 max-w-md p-4 bg-white rounded shadow-lg">
        <h2 className="text-center mb-4 text-dark">Agregar Cliente</h2>
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
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
          >
            Agregar Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientesAdd;
