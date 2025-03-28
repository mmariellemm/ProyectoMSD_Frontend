import React from "react";
import { useNavigate } from "react-router-dom";
import { Venta } from "../../../interfaces/types";
import "./VentasList.css";

interface VentasListProps {
  ventas: Venta[];
  onAddVenta: (venta: Venta) => void;
}

const VentasList: React.FC<VentasListProps> = ({ ventas }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl text-center">
      <div className="justify-content-between">
        <h2 className=" font-semibold text-gray-700 mb-6">Ventas realizadas</h2>
        <button
          onClick={() => navigate("/ventas/add")}
          className="mb-4 px-6 py-2 bg-re-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Agregar Venta
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-4">Id</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Productos</th>
              <th className="p-4">Empleado</th>
              <th className="p-4">Total</th>
              <th className="p-4">Metodo de Pago</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta) => (
                <tr
                  key={venta.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-4">{venta.id}</td>
                  <td className="p-4">{venta.fecha}</td>
                  <td className="p-4">
                    {/* Mostrar los nombres de los productos y cantidades */}
                    {venta.productos.map((prod, index) => (
                      <div key={index}>
                        {prod.nombre} (x{prod.cantidad}) - ${prod.precio}
                      </div>
                    ))}
                  </td>
                  <td className="p-4">{venta.empleado}</td>
                  <td className="p-4 font-semibold text-green-600">
                    ${venta.total.toFixed(2)}
                  </td>
                  <td className="p-4">{venta.metodoPago}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-gray-500">
                  No hay ventas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VentasList;
