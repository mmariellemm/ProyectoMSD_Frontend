import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../interfaces/types";
import "bootstrap/dist/css/bootstrap.min.css";

interface CartItem extends Product {
  quantity: number;
}

interface OnlineStoreProps {
  products: Product[];
}

const OnlineStore: React.FC<OnlineStoreProps> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getSafePrice = (price: any): number => {
    const num = typeof price === "number" ? price : Number(price);
    return isNaN(num) ? 0 : num;
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const safePrice = getSafePrice(product.price);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, price: safePrice }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + getSafePrice(item.price) * item.quantity, 0);
  };

  const proceedToPOS = (paymentMethod: string) => {
    setShowModal(false);
    navigate("/pos", { state: { cart, paymentMethod } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tienda en Línea</h2>
      <div className="row">
        <div className="col-lg-8 col-md-7">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map((product) => {
              const safePrice = getSafePrice(product.price);

              return (
                <div key={product.id} className="col">
                  <div className="card h-100 shadow-sm">
                    {product.image && (
                      <img
                        src={product.image}
                        className="card-img-top p-2"
                        alt={product.name}
                        style={{ height: "180px", width: "100%", objectFit: "contain" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-muted small">{product.description}</p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="h5 text-primary mb-0">${safePrice.toFixed(2)}</span>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => addToCart(product)}>
                          <i className="bi bi-cart-plus me-1"></i>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-lg-4 col-md-5">
          <div className="card shadow sticky-top" style={{ top: "20px" }}>
            <div className="card-body">
              <h4 className="card-title mb-3">
                <i className="bi bi-cart3 me-2"></i>
                Carrito de Compras
              </h4>

              {cart.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-cart-x text-muted" style={{ fontSize: "2rem" }}></i>
                  <p className="text-muted mt-2">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="cart-items" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {cart.map((item) => {
                      const safePrice = getSafePrice(item.price);
                      const subtotal = safePrice * item.quantity;

                      return (
                        <div key={item.id} className="mb-3 border-bottom pb-3">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="mb-1">{item.name}</h6>
                              <small className="text-muted">${safePrice.toFixed(2)} c/u</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="input-group input-group-sm" style={{ width: "110px" }}>
                                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                  -
                                </button>
                                <input
                                  type="text"
                                  className="form-control text-center"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  min="1"
                                />
                                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                  +
                                </button>
                              </div>
                              <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => removeFromCart(item.id)}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <small className="text-muted">Subtotal:</small>
                            <strong>${subtotal.toFixed(2)}</strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-top pt-3 mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">Total:</h5>
                      <h4 className="mb-0 text-primary">${getTotal().toFixed(2)}</h4>
                    </div>
                    <button className="btn btn-primary w-100 py-2" onClick={() => setShowModal(true)}>
                      <i className="bi bi-credit-card me-2"></i>
                      Proceder al Pago
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de selección de pago */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selecciona el Método de Pago</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <button className="btn btn-success m-2" onClick={() => proceedToPOS("Tarjeta")}>
                  Tarjeta de Crédito/Débito
                </button>
                <button className="btn btn-warning m-2" onClick={() => proceedToPOS("Efectivo")}>
                  Efectivo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineStore;
