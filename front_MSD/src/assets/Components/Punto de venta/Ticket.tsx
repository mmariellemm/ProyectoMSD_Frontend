import React from "react";
import { useLocation } from "react-router-dom";

// Definir la estructura del estado que recibimos
interface Product {
  id: number;
  name: string;
  price: number;
}

interface LocationState {
  cart: Product[];
  total: number;
}

const Ticket: React.FC = () => {
  const location = useLocation();

  // Verificamos que location.state existe antes de usarlo
  const { cart, total }: LocationState = location.state || { cart: [], total: 0 };

  return (
    <div className="container mt-4">
      <h2>Ticket de Compra</h2>
      <h4>Detalles de la Compra:</h4>
      <ul className="list-group">
        {cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.name} - ${item.price}
            </li>
          ))
        ) : (
          <li className="list-group-item">No hay productos en el carrito.</li>
        )}
      </ul>
      <h5 className="mt-3">Total: ${total}</h5>
      <p>Gracias por tu compra. ¡Nos vemos pronto!</p>
    </div>
  );
};

export default Ticket;
