import React from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../../../interfaces/types";

interface LocationState {
  cart: Array<Product & { quantity?: number }>;
  total: number;
  paymentAmount: number;
  paymentMethod: string;
  change: number;
  fecha: string;
  empleado: string;
  cliente: string;
  tarjetaNumero?: string;
}

const Ticket: React.FC = () => {
  const location = useLocation();
  const { 
    cart = [], 
    total = 0, 
    paymentAmount = 0, 
    paymentMethod = '', 
    change = 0,
    fecha = '',
    empleado = '',
    cliente = '',
    tarjetaNumero = ''
  }: LocationState = location.state || {};

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center">Ticket de Compra</h2>
          <div className="text-center">
            <p>Fecha: {new Date(fecha).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="card-body">
          <div className="mb-4">
            <h4>Detalles de la Venta</h4>
            <p><strong>Empleado:</strong> {empleado}</p>
            <p><strong>Cliente:</strong> {cliente}</p>
            <p><strong>Método de pago:</strong> {paymentMethod === 'efectivo' ? 'Efectivo' : 'Tarjeta'}</p>
            {paymentMethod === 'tarjeta' && tarjetaNumero && (
              <p><strong>Tarjeta:</strong> **** **** **** {tarjetaNumero.slice(-4)}</p>
            )}
          </div>

          <h4>Productos:</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity || 1}</td>
                    <td>${item.price}</td>
                    <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">No hay productos</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-end"><strong>Total:</strong></td>
                <td><strong>${total.toFixed(2)}</strong></td>
              </tr>
              {paymentMethod === 'efectivo' && (
                <>
                  <tr>
                    <td colSpan={3} className="text-end"><strong>Efectivo recibido:</strong></td>
                    <td><strong>${paymentAmount.toFixed(2)}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-end"><strong>Cambio:</strong></td>
                    <td><strong>${change.toFixed(2)}</strong></td>
                  </tr>
                </>
              )}
            </tfoot>
          </table>

          <div className="text-center mt-4">
            <p className="lead">¡Gracias por su compra!</p>
            <p>Vuelva pronto</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;