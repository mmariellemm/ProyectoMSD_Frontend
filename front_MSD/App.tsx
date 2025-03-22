import { useState } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import EmpleadosForm from "./src/assets/Componentes/Empledados/EmpleadosForm";
import EmpleadoTable from "./src/assets/Componentes/Empledados/EmpleadoTable";
import ProductoVista from "./src/assets/Componentes/productos/ProductoVista";
import ProductoAgregar from "./src/assets/Componentes/productos/ProductoAgregar";
import { Employee, Product } from "./src/interfaces/types";
import { Link, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const navigate = useNavigate();

  // Función para manejar el submit de productos
  const handleProductSubmit = (product: Product) => {
    if (product.id) {
      // Si el producto tiene id, es un producto existente y se actualiza
      setProducts(prevProducts => {
        const updatedProducts = prevProducts.map(p =>
          p.id === product.id ? product : p
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    } else {
      // Si el producto no tiene id, es uno nuevo
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts, { ...product, id: products.length + 1 }];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    }
    navigate("/productos");
  };

  // Función para cerrar y redirigir
  const handleClose = () => {
    navigate("/productos");
  };

  // Función para manejar la edición de un producto
  const handleEdit = (id: number) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      // Navegar a la página de edición pasando el producto como estado
      navigate("/agregar-producto", { state: { product: productToEdit } });
    }
  };

  // Función para manejar la eliminación de un producto
  const handleDelete = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Función para manejar el submit de empleados
  const handleEmployeeSubmit = (employee: Omit<Employee, 'id'>, id?: number) => {
    if (id) {
      // Editar empleado
      setEmployees(prevEmployees => {
        const updatedEmployees = prevEmployees.map(emp => 
          emp.id === id ? { ...emp, ...employee } : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
    } else {
      // Agregar nuevo empleado
      const newEmployee: Employee = { ...employee, id: employees.length + 1 };
      setEmployees(prevEmployees => {
        const updatedEmployees = [...prevEmployees, newEmployee];
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <ul className="d-flex list-empleados">
          <li><Link className="collapse navbar-collapse me-3" to="/productos">Productos</Link></li>
          <li><Link className="collapse navbar-collapse me-3" to="/empleadosForm">Agregar Empleado</Link></li>
          <li><Link className="collapse navbar-collapse me-3" to="/empleadosTable">Ver Empleados</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/productos" element={<ProductoVista products={products} onEdit={handleEdit} onDelete={handleDelete} />} />
        <Route path="/agregar-producto" element={<ProductoAgregar onSubmit={handleProductSubmit} onClose={handleClose} />} />
        <Route path="/empleadosForm/:id?" element={<EmpleadosForm employees={employees} onSubmit={handleEmployeeSubmit} />} />
        <Route path="/empleadosTable" element={<EmpleadoTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />} />
      </Routes>
    </div>
  );
};

export default App;