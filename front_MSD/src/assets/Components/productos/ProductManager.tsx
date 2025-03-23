import React from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

interface ProductManagerProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductManager: React.FC<ProductManagerProps> = ({ products, setProducts }) => {
  const navigate = useNavigate(); // Hook para navegación

  // Función para eliminar producto
  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="relative min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>

      {/* Mostrar lista de productos */}
      <ProductList products={products} onEdit={() => {}} onDelete={handleDeleteProduct} />

      {/* Botón para navegar a "Agregar Producto" */}
      <button
        onClick={() => navigate("/agregar")}
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        + Agregar Producto
      </button>
    </div>
  );
};

export default ProductManager;