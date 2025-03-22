import React, { useState, useEffect } from "react";
import './App.css';
import ProductManager from './assets/Componentes/Login/ProductManager';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Recuperar los productos desde localStorage cuando la página se carga
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

 useEffect(() => {
    // Guardar productos en localStorage cada vez que cambien
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);
  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4">Tienda Online</h1>
      <ProductManager products={products} setProducts={setProducts} />
    </>
  );
};

export default App;