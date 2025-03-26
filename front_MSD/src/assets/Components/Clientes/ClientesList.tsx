import React from "react";
import { Cliente } from "../../../interfaces/types";

interface ClientesListProps {
  clientes: Cliente[];
  onDeleteCliente: (id: number) => void;
  onEditCliente: (cliente: Cliente) => void; // Añadir esta propiedad aquí
}

const ClientesList: React.FC<ClientesListProps> = ({ clientes, onDeleteCliente, onEditCliente }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => onEditCliente(cliente)}>Editar</button>
                <button onClick={() => onDeleteCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;
