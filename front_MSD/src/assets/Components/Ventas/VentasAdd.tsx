import React, { useState } from 'react';
import { Venta, Employee, Cliente, Product } from '../../../interfaces/types';
import "./VentasAdd.css"

interface VentasAddProps {
  onAddVenta: (venta: Venta) => void;
  empleados: Employee[];
  clientes: Cliente[];
  products: Product[];
}

const VentasAdd: React.FC<VentasAddProps> = ({ onAddVenta, empleados, clientes }) => {
  const [productos, setProductos] = useState<{ nombre: string; cantidad: number; precio: number; id: number }[]>([]);
  const [fecha, setFecha] = useState('');
  const [empleado, setEmpleado] = useState<number | string>('');
  const [cliente, setCliente] = useState<number | string>('');
  const [metodoPago, setMetodoPago] = useState('');
  const [montoRecibido, setMontoRecibido] = useState<number>(0);

  const calcularTotal = () => productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha || productos.length === 0 || !cliente || !metodoPago || !empleado || montoRecibido < calcularTotal()) return;

    const nuevaVenta: Venta = {
      id: Date.now(),
      fecha,
      productos,
      total: calcularTotal(),
      empleado: String(empleado),
      cliente: String(cliente),
      metodoPago,
      montoRecibido,
    };

    onAddVenta(nuevaVenta);
    setFecha('');
    setProductos([]);
    setEmpleado('');
    setCliente('');
    setMetodoPago('');
    setMontoRecibido(0);
  };

  return (
    <div className="container">
      <h2 className="my-4">Agregar nueva venta</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label className="form-label">Fecha:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="form-control" required />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Empleado:</label>
            <select value={empleado} onChange={(e) => setEmpleado(e.target.value)} className="form-select" required>
              <option value="">Seleccionar empleado</option>
              {empleados.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Cliente:</label>
            <select value={cliente} onChange={(e) => setCliente(e.target.value)} className="form-select" required>
              <option value="">Seleccionar cliente</option>
              {clientes.map((cli) => (
                <option key={cli.id} value={cli.id}>{cli.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Método de Pago:</label>
            <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} className="form-select" required>
              <option value="">Seleccionar método</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Monto Recibido:</label>
            <input type="number" value={montoRecibido} onChange={(e) => setMontoRecibido(Number(e.target.value) || 0)} className="form-control" required />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3">Guardar Venta</button>
      </form>
    </div>
  );
};

export default VentasAdd;