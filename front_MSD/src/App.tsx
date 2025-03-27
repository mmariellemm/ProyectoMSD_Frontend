import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { FaStore, FaBoxOpen, FaUsers, FaUserTie, FaSignInAlt } from "react-icons/fa";
import ClientesList from "./assets/Components/Clientes/ClientesList";
import ClientesAdd from "./assets/Components/Clientes/ClientesAdd";
import ClientesEdit from "./assets/Components/Clientes/ClientesEdit";
import POS from "./assets/Components/Punto de venta/POS";
import Ticket from "./assets/Components/Punto de venta/Ticket";
import Login from "./assets/Components/Login/Login";
import Registro from "./assets/Components/Registro/Registro";
import EmpleadosForm from "./assets/Components/Empledados/EmpleadosForm";
import EmpleadoTable from "./assets/Components/Empledados/EmpleadoTable";
import ProductoVista from "./assets/Components/productos/ProductoVista";
import ProductoAgregar from "./assets/Components/productos/ProductoAgregar";
import OnlineStore from "./assets/Components/ProductMain/OnlineStore";
import { Employee, Product, Cliente } from "./interfaces/types";
import './App.css';

const App: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/agregar-cliente");
  };

  const handleAddCliente = (cliente: Cliente) => {
    setClientes((prevClientes) => {
      const updatedClientes = [...prevClientes, cliente];
      localStorage.setItem("clientes", JSON.stringify(updatedClientes));
      return updatedClientes;
    });
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleUpdateCliente = (updatedCliente: Cliente) => {
    const updatedClientes = clientes.map(cliente =>
      cliente.id === updatedCliente.id ? updatedCliente : cliente
    );
    setClientes(updatedClientes);
    localStorage.setItem("clientes", JSON.stringify(updatedClientes));
  };  

  const handleEditCliente = (cliente: Cliente) => {
    navigate(`/clientes/edit/${cliente.id}`);
  };

  const handleDeleteCliente = (id: number) => {
    const updatedClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(updatedClientes);
    localStorage.setItem("clientes", JSON.stringify(updatedClientes));
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

  const handleEmployeeSubmit = (employee: Omit<Employee, 'id' | 'role'>, id?: number) => {
    if (id) {
      setEmployees(prevEmployees => {
        const updatedEmployees = prevEmployees.map(emp =>
          emp.id === id ? { ...emp, ...employee, role: emp.role } : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
    } else {
      const newEmployee: Employee = {
        ...employee,
        id: employees.length + 1,
        role: "Empleado",
      };
      setEmployees(prevEmployees => {
        const updatedEmployees = [...prevEmployees, newEmployee];
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
    }
    navigate("/empleadosTable");
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('/api/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <div className="container-fluid vw-100 p-0 d-flex">
    <nav className="text-white sidebar vh-100 p-3" style={{ backgroundColor: "#0a3d83" }}>
      <div className="sidebar-sticky">
        <h1 className="text-center py-3">Sistema</h1>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/tienda" className="nav-link text-white d-flex align-items-center">
              <FaStore className="me-2" /> Tienda Online
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/productos" className="nav-link text-white d-flex align-items-center">
              <FaBoxOpen className="me-2" /> Gestión de Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/clientes" className="nav-link text-white d-flex align-items-center">
              <FaUsers className="me-2" /> Gestión de Clientes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/empleadosTable" className="nav-link text-white d-flex align-items-center">
              <FaUserTie className="me-2" /> Gestión de Empleados
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link text-white d-flex align-items-center">
              <FaSignInAlt className="me-2" /> Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>

      <div className="flex-grow-1 d-flex flex-column">
        <div className="p-4 bg-light">
          {showSuccessAlert && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Cliente agregado exitosamente!
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowSuccessAlert(false)}
              ></button>
            </div>
          )}
          
          <Routes>
            <Route
              path="/clientes"
              element={
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h2 className="text-center mb-4">Gestión de Clientes</h2>
                    <button
                      type="button"
                      className="btn btn-primary w-100 py-2 mb-3"
                      onClick={handleAddButtonClick}
                    >
                      Agregar Cliente
                    </button>
                    <ClientesList
                      clientes={clientes}
                      onDeleteCliente={handleDeleteCliente}
                      onEditCliente={handleEditCliente}
                    />
                  </div>
                </div>
              }
            />
            
            <Route
              path="/agregar-cliente"
              element={
                <ClientesAdd
                  onAddCliente={(cliente) => {
                    handleAddCliente(cliente);
                    setTimeout(() => navigate("/clientes"), 1500);
                  }}
                  onClose={() => navigate("/clientes")}
                />
              }
            />
            
            <Route path="/pos" element={<POS />} />
            <Route path="/tienda" element={<OnlineStore products={products} />} />
            <Route
              path="/productos"
              element={
                <ProductoVista 
                  products={products} 
                  onEdit={handleEditProduct} 
                  onDelete={handleDeleteProduct} 
                />
              }
            />
            <Route
              path="/agregar-producto"
              element={
                <ProductoAgregar 
                  onSubmit={handleProductSubmit} 
                  onClose={() => navigate("/productos")} 
                />
              }
            />
            <Route
              path="/empleadosForm/:id?"
              element={
                <EmpleadosForm 
                  employees={employees} 
                  onSubmit={handleEmployeeSubmit} 
                />
              }
            />
            <Route 
              path="/empleadosTable" 
              element={
                <EmpleadoTable 
                  employees={employees} 
                  onEdit={(id: number) => navigate(`/empleadosForm/${id}`)} 
                  onDelete={(id: number) => {
                    const updatedEmployees = employees.filter(emp => emp.id !== id);
                    setEmployees(updatedEmployees);
                    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
                  }} 
                />
              } 
            />
            <Route 
              path="/clientes/edit/:id" 
              element={
                <ClientesEdit 
                  clientes={clientes} 
                  onEditCliente={handleEditCliente} 
                  onUpdateCliente={handleUpdateCliente}
                />
              }
            />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/" element={<Login />} />  
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;