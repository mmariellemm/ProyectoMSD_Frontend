import React, { useState } from 'react';
import { Venta } from '../../../interfaces/types';

interface VentasAddProps {
  onAddVenta: (venta: Venta) => void;
}

const VentasAdd: React.FC<VentasAddProps> = ({ onAddVenta }) => {
  const [productos, setProductos] = useState<{ nombre: string; cantidad: number; precio: number }[]>([]);
  const [fecha, setFecha] = useState('');
  const [empleado, setEmpleado] = useState('');
  
  const calcularTotal = () => productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha || productos.length === 0) return;

    const nuevaVenta: Venta = {
      id: Date.now(),
      fecha,
      productos,
      total: calcularTotal(),
      empleado
    };

    onAddVenta(nuevaVenta);
    setFecha('');
    setProductos([]);
    setEmpleado('');
  };

  return (
    <div>
      <h2>Registrar Venta</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        
        <label>Empleado:</label>
        <input type="text" value={empleado} onChange={(e) => setEmpleado(e.target.value)} />

        <button type="submit">Guardar Venta</button>
      </form>
    </div>
  );
};

export default VentasAdd;
