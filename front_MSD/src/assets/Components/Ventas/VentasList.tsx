import React from "react";
import { Venta } from "../../../interfaces/types";

interface VentasListProps {
  ventas: Venta[];
  onAddVenta: () => void;
}

const VentasList: React.FC<VentasListProps> = ({ ventas, onAddVenta }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Lista de Ventas</h2>
        
        <button
          onClick={onAddVenta}
          className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Agregar Venta
        </button>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4">ID</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length > 0 ? (
                ventas.map((venta) => (
                  <tr
                    key={venta.id}
                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                  >
                    <td className="p-4">{venta.id}</td>
                    <td className="p-4">{venta.fecha}</td>
                    <td className="p-4 font-semibold text-green-600">${venta.total.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-gray-500">
                    No hay ventas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VentasList;
