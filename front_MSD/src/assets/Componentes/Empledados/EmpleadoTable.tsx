import React from 'react';
import { Employee } from "../../../interfaces/types";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

interface EmpleadoTableProps {
  employees: Employee[];
  onEdit: (id: number) => void; // Asegúrate de que esta línea esté presente
  onDelete: (id: number) => void;
}

const EmpleadoTable: React.FC<EmpleadoTableProps> = ({ employees, onDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = (id: number) => {
    navigate(`/empleadosForm/${id}`); // Redirige a EmpleadoForm con el ID del empleado
  };

  return (
    <div> 
      <h2>Lista de Empleados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Ingreso</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.joiningDate}</td>
              <td>
                {employee.image ? (
                  <img src={employee.image} alt={employee.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                ) : (
                  <span>No disponible</span>
                )}
              </td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEditClick(employee.id)}>Editar</button>
                <button  className="btn btn-danger me-2" onClick={() => onDelete(employee.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpleadoTable;