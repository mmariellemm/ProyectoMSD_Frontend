import React from "react";
import ClientesList from "./assets/complemento/Clientes/ClientesList";

const clientes = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
  { id: 2, nombre: "Ana López", email: "ana@example.com" },
];

const App: React.FC = () => {
  return (
    <div className="p-6">
      <ClientesList clientes={clientes} />
    </div>
  );
};

export default App;
