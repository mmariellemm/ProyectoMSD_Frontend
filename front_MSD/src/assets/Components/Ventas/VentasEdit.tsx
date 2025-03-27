import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Venta } from '../../../interfaces/types';

interface VentasEditProps {
  ventas: Venta[];
  onUpdateVenta: (venta: Venta) => void;
}

const VentasEdit: React.FC<VentasEditProps> = ({ ventas, onUpdateVenta }) => {
  const { id } = useParams<{ id: string }>();  // Obtiene el ID desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Venta, 'id'>>({
    fecha: '',
    productos: [],
    total: 0,
    empleado: ''
  });

  useEffect(() => {
    if (id) {
      const venta = ventas.find(v => v.id === parseInt(id));
      if (venta) {
        setFormData({ 
          fecha: venta.fecha, 
          productos: venta.productos, 
          total: venta.total, 
          empleado: venta.empleado || '' 
        });
      }
    }
  }, [id, ventas]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fecha || formData.productos.length === 0) return;

    const ventaActualizada: Venta = { id: parseInt(id!), ...formData };
    onUpdateVenta(ventaActualizada);
    navigate("/ventas"); // Redirige a la lista de ventas
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100 max-w-md p-4 bg-white rounded shadow-lg">
        <h2 className="text-center mb-4 text-dark">Editar Venta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Empleado:</label>
            <input
              type="text"
              name="empleado"
              value={formData.empleado}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default VentasEdit;
