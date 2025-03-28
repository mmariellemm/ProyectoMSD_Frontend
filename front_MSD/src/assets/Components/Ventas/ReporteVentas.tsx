import React, { useEffect, useState } from "react";
import { Venta, Employee } from "../../../interfaces/types";

// Definir las props que recibe el componente
interface ReporteVentasProps {
  ventas: Venta[];
  empleados: Employee[];
}

const ReporteVentas: React.FC<ReporteVentasProps> = ({ ventas, empleados }) => {
  const [reporte, setReporte] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Crear un objeto para almacenar las ventas totales por empleado
    const ventasPorEmpleado: { [key: string]: number } = {};

    // Recorrer las ventas para acumular los totales por empleado
    ventas.forEach((venta) => {
      if (venta.empleado) {
        // Sumar el total de la venta al empleado correspondiente
        ventasPorEmpleado[venta.empleado] =
          (ventasPorEmpleado[venta.empleado] || 0) + venta.total;
      }
    });

    setReporte(ventasPorEmpleado);
  }, [ventas]); // Dependemos de las ventas para actualizar el reporte

  return (
    <div className="container mt-4">
      <h2 className="text-center">Reporte de Ventas por Empleado</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Total de Ventas</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.name}</td>
              <td>
                {
                  // Si hay ventas acumuladas para el empleado, mostrar el total, si no mostrar "0.00"
                  reporte[empleado.name] ? reporte[empleado.name].toFixed(2) : "10"
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteVentas;
