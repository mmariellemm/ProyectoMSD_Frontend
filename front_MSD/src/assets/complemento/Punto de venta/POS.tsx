import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate en lugar de useHistory
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Camiseta Negra", price: 20 },
  { id: 2, name: "Jeans Azul", price: 35 },
  { id: 3, name: "Zapatillas Blancas", price: 50 },
  { id: 4, name: "Chaqueta de Cuero", price: 80 },
  { id: 5, name: "Gorra Roja", price: 15 },
];

const POS: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]); // Definimos explícitamente que cart es un array de Product
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handlePayment = () => {
    navigate("/ticket", {
      state: { cart, total: getTotal() }, // Pasamos el cart y el total a la siguiente página
    });
  };

  return (
    <div className="container mt-4">
      <h2>Punto de Venta</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Productos</h4>
          <ul className="list-group">
            {products.map((product) => (
              <li
                key={product.id} // Usamos product.id como key en lugar de index para mayor consistencia
                className="list-group-item d-flex justify-content-between"
              >
                {product.name} - ${product.price}
                <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Carrito</h4>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                {item.name} - ${item.price}
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <h5 className="mt-3">Total: ${getTotal()}</h5>
          <button className="btn btn-success mt-2" onClick={handlePayment}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
