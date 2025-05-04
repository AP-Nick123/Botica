import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

const MiSwal = withReactContent(Swal);

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const productosCollection = collection(db, "productos");

  const getProductos = async () => {
    const data = await getDocs(productosCollection);
    setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteProducto = async (id) => {
    const productoDoc = doc(db, "productos", id);
    await deleteDoc(productoDoc);
    getProductos(); 
  };

  const confirmDelete = (id) => {
    MiSwal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "¡No se podrá recuperar el producto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(id);
        Swal.fire("Eliminado!", "El producto ha sido eliminado.", "success");
      }
    });
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-dark">Inventario</h2>
        <Link to="/agregar-producto" className="btn btn-success">
          <i className="fa-solid fa-plus me-2"></i>Agregar Producto
        </Link>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Código</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.stock}</td>
                    <td>S/. {producto.precio}</td>
                    <td>{producto.codigo}</td>
                    <td>
                      <Link to={`/edit/${producto.id}`} className="btn btn-outline-success btn-sm me-2">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        onClick={() => confirmDelete(producto.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
