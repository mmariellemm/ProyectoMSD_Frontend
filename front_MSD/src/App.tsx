import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
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
    <div className="container-fluid vh-100 p-0 d-flex">
      {/* Sidebar (Barra de navegación lateral) */}
      <nav className="bg-primary text-white sidebar">
        <div className="sidebar-sticky">
          <h1 className="text-center py-3">Sistema</h1>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Gestión de Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pos" className="nav-link text-white">
                Punto de Venta
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tienda" className="nav-link text-white">
                Tienda Online
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link text-white">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/empleadosForm" className="nav-link text-white">
                Agregar Empleado
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/empleadosTable" className="nav-link text-white">
                Ver Empleados
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ticket" className="nav-link text-white">
                Ticket
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registro" className="nav-link text-white">
                Registro
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="flex-grow-1 d-flex flex-column">
        <div className="p-4 bg-light flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <div className="card shadow-lg">
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
            <Route path="/pos" element={<POS />} />
            <Route path="/tienda" element={<ProductManager products={products} setProducts={setProducts} />} />
            <Route path="/productos" element={<ProductoVista products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />} />
            <Route path="/agregar-producto" element={<ProductoAgregar onSubmit={handleProductSubmit} onClose={() => navigate("/productos")} />} />
            <Route path="/empleadosForm/:id?" element={<EmpleadosForm employees={employees} onSubmit={handleEmployeeSubmit} />} />
            <Route path="/empleadosTable" element={<EmpleadoTable employees={employees} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;