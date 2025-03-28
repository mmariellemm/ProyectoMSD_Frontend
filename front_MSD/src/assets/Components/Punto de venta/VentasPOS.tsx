import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { Venta, Employee, Cliente, Product } from '../../../interfaces/types';
import "./VentasPOS.css";

interface CartItem extends Product {
  quantity: number;
}

interface VentasPOSProps {
  onAddVenta: (venta: Venta) => void;
  empleados: Employee[];
  clientes: Cliente[];
  products: Product[];
  empleadoAutenticado: Employee | null; // Asumimos que pasas el empleado autenticado como prop
}

const VentasPOS: React.FC<VentasPOSProps> = ({ onAddVenta, empleados, clientes, products, empleadoAutenticado }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]); // Fecha de hoy
  const [empleado, setEmpleado] = useState<number | string>(empleadoAutenticado ? empleadoAutenticado.id : ''); // Empleado autenticado
  const [cliente, setCliente] = useState<number | string>('');
  const [metodoPago, setMetodoPago] = useState('efectivo'); // Tipo de pago por defecto
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPOS, setShowPOS] = useState<boolean>(false);
  const [tarjetaNumero, setTarjetaNumero] = useState<string>('');

  const clienteSeleccionado = clientes.find(c => c.id === cliente);
  if (!clienteSeleccionado) {
    console.log('Cliente no encontrado');
  } else {
    console.log('Cliente encontrado', clienteSeleccionado);
  }

  // Calcular el total de la venta
  const calcularTotal = () => cartItems.reduce((sum, p) => sum + (p.price || 0) * p.quantity, 0);

  // Manejar cambio de cantidad
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Agregar producto al carrito
  const agregarProducto = (product: Product) => {
    setCartItems(prevItems => {
      const exists = prevItems.find(p => p.id === product.id);
      return exists
        ? prevItems.map(p => 
            p.id === product.id 
              ? { ...p, quantity: p.quantity + 1 } 
              : p
          )
        : [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Manejar pago
  const handlePayment = () => {
    if (metodoPago === "efectivo" && amountPaid < calcularTotal()) {
      alert("El monto ingresado es insuficiente.");
      return;
    }
    setShowModal(true);
  };

  // Confirmar venta
  const handleConfirm = () => {
    if (!fecha || cartItems.length === 0 || !cliente || !metodoPago || !empleado) return;

    const nuevaVenta: Venta = {
      id: Date.now(),
      fecha,
      productos: cartItems.map(item => ({
        id: item.id,
        nombre: item.name,
        cantidad: item.quantity,
        precio: item.price || 0
      })),
      total: calcularTotal(),
      empleado: String(empleado),
      cliente: String(cliente),
      metodoPago,
      montoRecibido: amountPaid,
      ...(metodoPago === 'tarjeta' && { tarjetaNumero })
    };

    onAddVenta(nuevaVenta);
    
    // Navegar al ticket con toda la información necesaria
    navigate("/ticket", {
      state: {
        cart: cartItems,
        total: calcularTotal(),
        paymentAmount: amountPaid,
        paymentMethod: metodoPago,
        change: metodoPago === "efectivo" ? amountPaid - calcularTotal() : 0,
        fecha,
        empleado: empleados.find(e => e.id === empleado)?.name || '',
        cliente: clientes.find(c => c.id === cliente)?.name || '',
        ...(metodoPago === 'tarjeta' && { tarjetaNumero })
      },
    });

    // Resetear estado
    setFecha('');
    setCartItems([]);
    setEmpleado('');
    setCliente('');
    setMetodoPago('');
    setAmountPaid(0);
    setTarjetaNumero('');
    setShowPOS(false);
    setShowModal(false);
  };

  // Mostrar vista POS
  const mostrarPOS = () => {
    // Validamos solo los campos que son dinámicos (cliente y método de pago)
    if (!cliente) {
      alert("Por favor complete todos los campos básicos de la venta");
      return;
    }
    setShowPOS(true);
  };

  return (
    <div className="container">
      {!showPOS ? (
        // Formulario inicial de venta
        <div>
          <h2 className="my-4">Nueva Venta</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Fecha:</label>
                <input 
                  type="date" 
                  value={fecha} 
                  onChange={(e) => setFecha(e.target.value)} 
                  className="form-control" 
                  required 
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Empleado:</label>
                <select 
                  value={empleado} 
                  onChange={(e) => setEmpleado(e.target.value)} 
                  className="form-select" 
                  required
                  disabled
                >
                  <option value={empleadoAutenticado?.id}>{empleadoAutenticado?.name}</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Cliente:</label>
                <select 
                  value={cliente} 
                  onChange={(e) => {
                    const selectedCliente = e.target.value.toString();
                    console.log("Cliente seleccionado:", selectedCliente); // Verificar que el valor sea correcto
                    setCliente(selectedCliente);
                  }} 
                  className="form-select" 
                  required
                >
                  <option value="">Seleccionar cliente</option>
                  {clientes.map((cli) => (
                    <option key={cli.id} value={cli.id}>{cli.name}</option>
                  ))}
                </select>

              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Método de Pago:</label>
                <select 
                  value={metodoPago} 
                  onChange={(e) => setMetodoPago(e.target.value)} 
                  className="form-select" 
                  required
                >
                  <option value="">Seleccionar método</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                </select>
              </div>
            </div>

            <button 
              className="btn btn-primary mt-3"
              onClick={mostrarPOS}
            >
              Continuar a Punto de Venta
            </button>
          </form>
        </div>
      ) : (
        // Vista de Punto de Venta
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Punto de Venta</h2>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowPOS(false)}
            >
              Volver a datos de venta
            </button>
          </div>

          <div className="row">
            {/* Lista de productos disponibles */}
            <div className="col-md-6">
              <h4>Productos Disponibles</h4>
              <div className="row row-cols-2 row-cols-md-2 g-1 ">
                {products.map((product) => (
                  <div key={product.id} className="col">
                    <div 
                      className="card h-100 cursor-pointer"
                      onClick={() => agregarProducto(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.image && (
                        <img 
                          src={product.image} 
                          className="card-img-top" 
                          alt={product.name}
                          style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-success">${product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carrito de compras */}
            <div className="col-md-6">
              <div className="sticky-top" style={{ top: '20px' }}>
                <h4>Resumen de Venta</h4>
                
                {/* Información de la venta */}
                <div className="card mb-3">
                  <div className="card-body">
                  <p><strong>Fecha:</strong> {fecha}</p>
                  <p><strong>Empleado:</strong> {empleadoAutenticado?.name}</p>
                  <p><strong>Cliente:</strong> {cliente ? clientes.find(c => String(c.id) === String(cliente))?.name || 'Cliente no encontrado' : 'No seleccionado'}</p>
                  <p><strong>Método de pago:</strong> {metodoPago === 'efectivo' ? 'Efectivo' : 'Tarjeta'}</p>
                </div>
              </div>

                {/* Productos en carrito */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Productos</h5>
                    <ul className="list-group mb-3">
                      {cartItems.map((item) => (
                        <li key={item.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6>{item.name}</h6>
                              <small>${item.price} c/u</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="input-group" style={{ width: '120px' }}>
                                <button 
                                  className="btn btn-outline-secondary" 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <input 
                                  type="number" 
                                  className="form-control text-center"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                  min="1"
                                />
                                <button 
                                  className="btn btn-outline-secondary" 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                              <span className="ms-3">${(item.price || 0) * item.quantity}</span>
                              <button 
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => eliminarProducto(item.id)}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {cartItems.length === 0 && (
                      <div className="alert alert-warning">No hay productos en el carrito</div>
                    )}
                  </div>
                </div>

                {/* Total y opciones de pago */}
                <div className="card">
                  <div className="card-body">
                    <h5 className="d-flex justify-content-between">
                      <span>Total:</span>
                      <span>${calcularTotal().toFixed(2)}</span>
                    </h5>

                    {metodoPago === 'tarjeta' ? (
                      <div className="mb-3">
                        <label className="form-label">Número de Tarjeta</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="1234 5678 9012 3456"
                          value={tarjetaNumero}
                          onChange={(e) => setTarjetaNumero(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label className="form-label">Monto Recibido</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={amountPaid}
                          onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                          min={calcularTotal()}
                        />
                        {amountPaid > 0 && amountPaid < calcularTotal() && (
                          <div className="text-danger mt-1">Monto insuficiente</div>
                        )}
                      </div>
                    )}

                    <button 
                      className="btn btn-success w-100 py-2"
                      onClick={handlePayment}
                      disabled={cartItems.length === 0 || (metodoPago === 'efectivo' && amountPaid < calcularTotal())}
                    >
                      Confirmar Venta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Está seguro de confirmar esta venta?</p>
          <p><strong>Total:</strong> ${calcularTotal().toFixed(2)}</p>
          {metodoPago === 'efectivo' && (
            <>
              <p><strong>Efectivo recibido:</strong> ${amountPaid.toFixed(2)}</p>
              <p><strong>Cambio:</strong> ${(amountPaid - calcularTotal()).toFixed(2)}</p>
            </>
          )}
          {metodoPago === 'tarjeta' && tarjetaNumero && (
            <p><strong>Tarjeta:</strong> **** **** **** {tarjetaNumero.slice(-4)}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VentasPOS;
