import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import ClientesList from "./assets/Components/Clientes/ClientesList";
import ClientesAdd from "./assets/Components/Clientes/ClientesAdd";
import ClientesEdit from "./assets/Components/Clientes/CientesEdit";
import POS from "./assets/Components/Punto de venta/POS";
import Ticket from "./assets/Components/Punto de venta/Ticket";
import Login from "./assets/Components/Login/Login";
import Registro from "./assets/Components/Registro/Registro";
import ProductManager from "./assets/Components/ProductMain/ProductManager";
import EmpleadosForm from "./assets/Components/Empledados/EmpleadosForm";
import EmpleadoTable from "./assets/Components/Empledados/EmpleadoTable";
import ProductoVista from "./assets/Components/productos/ProductoVista";
import ProductoAgregar from "./assets/Components/productos/ProductoAgregar";
import { Employee, Product } from "./interfaces/types";
import './App.css';

const App: React.FC = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
    { id: 2, nombre: "Ana López", email: "ana@example.com" },
  ]);

  const [clienteEditando, setClienteEditando] = useState<{
    id: number;
    nombre: string;
    email: string;
  } | null>(null);

  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);

  const handleAddCliente = (nuevoCliente: { id: number; nombre: string; email: string }) => {
    setClientes([...clientes, nuevoCliente]);
  };

  const handleUpdateCliente = (clienteActualizado: { id: number; nombre: string; email: string }) => {
    setClientes(clientes.map((cliente) => (cliente.id === clienteActualizado.id ? clienteActualizado : cliente)));
    setClienteEditando(null);
  };

  const handleDeleteCliente = (id: number) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  const handleProductSubmit = (product: Product) => {
    if (product.id) {
      setProducts(prevProducts => {
        const updatedProducts = prevProducts.map(p =>
          p.id === product.id ? product : p
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    } else {
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts, { ...product, id: products.length + 1 }];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    }
    navigate("/productos");
  };

  const handleEmployeeSubmit = (employee: Omit<Employee, 'id' | 'role'>, id?: number) => {
    if (id) {
      // Editar empleado
      setEmployees(prevEmployees => {
        const updatedEmployees = prevEmployees.map(emp =>
          emp.id === id ? { ...emp, ...employee, role: emp.role } : emp // Mantén el valor de `role` existente
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
    } else {
      // Agregar nuevo empleado
      const newEmployee: Employee = {
        ...employee,
        id: employees.length + 1,
        role: "Empleado", // Asigna un valor válido para `role`
      };
      setEmployees(prevEmployees => {
        const updatedEmployees = [...prevEmployees, newEmployee];
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
    }
    navigate("/empleadosTable"); // Redirige a la lista de empleados
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      navigate("/agregar-producto", { state: { product: productToEdit } });
    }
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <Router>
      <div className="container-fluid vw-100 p-0 d-flex flex-column">
        {/* Barra de navegación */}
        <header className="bg-primary text-white text-center py-3">
          <h1>Sistema de Gestión y Tienda Online</h1>
          <nav className="d-flex justify-content-center gap-3">
            <Link to="/" className="text-white text-decoration-none">
              Gestión de Clientes
            </Link>
            <Link to="/pos" className="text-white text-decoration-none">
              Punto de Venta
            </Link>
            <Link to="/tienda" className="text-white text-decoration-none">
              Tienda Online
            </Link>
            <Link to="/productos" className="text-white text-decoration-none">
              Productos
            </Link>
            <Link to="/empleadosForm" className="text-white text-decoration-none">
              Agregar Empleado
            </Link>
            <Link to="/empleadosTable" className="text-white text-decoration-none">
              Ver Empleados
            </Link>
            <Link to="/ticket" className="text-white text-decoration-none">
              Ticket
            </Link>
            <Link to="/login" className="text-white text-decoration-none">
              Login
            </Link>
            <Link to="/registro" className="text-white text-decoration-none">
              Registro
            </Link>
          </nav>
        </header>

        {/* Contenido principal */}
        <div className="flex-grow-1 d-flex">
          <div className="col-12 h-100 d-flex flex-column p-4 bg-light">
            <Routes>
              {/* Ruta principal: Gestión de Clientes */}
              <Route
                path="/"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <h2 className="text-center mb-4">Gestión de Clientes</h2>
                      {clienteEditando ? (
                        <ClientesEdit
                          cliente={clienteEditando}
                          onUpdateCliente={handleUpdateCliente}
                          onCancel={() => setClienteEditando(null)}
                        />
                      ) : (
                        <>
                          <ClientesAdd onAddCliente={handleAddCliente} />
                          <div className="mt-4">
                            <ClientesList clientes={clientes} onDeleteCliente={handleDeleteCliente} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                }
              />

              {/* Ruta para el Punto de Venta */}
              <Route
                path="/pos"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <POS />
                    </div>
                  </div>
                }
              />

              {/* Ruta para la Tienda Online */}
              <Route
                path="/tienda"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <h1 className="text-2xl font-bold text-center mt-4">Tienda Online</h1>
                      <ProductManager products={products} setProducts={setProducts} />
                    </div>
                  </div>
                }
              />

              {/* Ruta para Productos */}
              <Route
                path="/productos"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <ProductoVista products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
                    </div>
                  </div>
                }
              />

              {/* Ruta para Agregar/Editar Producto */}
              <Route
                path="/agregar-producto"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <ProductoAgregar onSubmit={handleProductSubmit} onClose={() => navigate("/productos")} />
                    </div>
                  </div>
                }
              />

              {/* Ruta para Agregar/Editar Empleado */}
              <Route
                path="/empleadosForm/:id?"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <EmpleadosForm
                        employees={employees}
                        onSubmit={handleEmployeeSubmit}
                      />
                    </div>
                  </div>
                }
              />

              {/* Ruta para Ver Empleados */}
              <Route
                path="/empleadosTable"
                element={
                  <div className="card shadow-lg flex-grow-1">
                    <div className="card-body">
                      <EmpleadoTable employees={employees} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
                    </div>
                  </div>
                }
              />

              {/* Otras rutas */}
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;