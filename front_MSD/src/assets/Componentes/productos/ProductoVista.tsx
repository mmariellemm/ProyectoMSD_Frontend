import { Product } from "../../../interfaces/types";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductoVista: React.FC<{ products: Product[]; onEdit: (id: number) => void; onDelete: (id: number) => void }> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center">Lista de Productos</h2>

      {/* Botón para agregar producto */}
      <div className="mb-3">
        <button className="btn btn-success" onClick={() => navigate("/agregar-producto")}>
          Agregar Producto
        </button>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                {product.image && <img src={product.image} alt={product.name} width="50" />}
              </td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => onEdit(product.id)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoVista;