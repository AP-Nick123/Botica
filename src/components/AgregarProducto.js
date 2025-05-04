import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 

const AgregarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    stock: 0,
    precio: 0,
    codigo: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "productos"), {
        ...producto,
        stock: Number(producto.stock),
        precio: Number(producto.precio),
        fechaIngreso: Timestamp.now(),
      });
      Swal.fire("Producto agregado", "El producto fue registrado con éxito", "success");
      setProducto({ nombre: "", descripcion: "", categoria: "", stock: 0, precio: 0, codigo: "" });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); 
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase font-weight-bold text-primary">Registrar Nuevo Producto</h4>
      <div className="card shadow-lg p-4 mt-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre" className="font-weight-semibold">Nombre:</label>
            <input
              id="nombre"
              className="form-control mb-3"
              name="nombre"
              placeholder="Ingrese el nombre del producto"
              onChange={handleChange}
              value={producto.nombre}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion" className="font-weight-semibold">Descripción:</label>
            <input
              id="descripcion"
              className="form-control mb-3"
              name="descripcion"
              placeholder="Ingrese una descripción"
              onChange={handleChange}
              value={producto.descripcion}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria" className="font-weight-semibold">Categoría:</label>
            <input
              id="categoria"
              className="form-control mb-3"
              name="categoria"
              placeholder="Ingrese la categoría"
              onChange={handleChange}
              value={producto.categoria}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="font-weight-semibold">Stock:</label>
            <input
              id="stock"
              className="form-control mb-3"
              type="number"
              name="stock"
              placeholder="Cantidad disponible"
              onChange={handleChange}
              value={producto.stock}
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio" className="font-weight-semibold">Precio:</label>
            <input
              id="precio"
              className="form-control mb-3"
              type="number"
              name="precio"
              placeholder="Precio del producto"
              onChange={handleChange}
              value={producto.precio}
            />
          </div>

          <div className="form-group">
            <label htmlFor="codigo" className="font-weight-semibold">Código:</label>
            <input
              id="codigo"
              className="form-control mb-4"
              name="codigo"
              placeholder="Código único del producto"
              onChange={handleChange}
              value={producto.codigo}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success btn-lg">Agregar Producto</button>
            <button type="button" onClick={handleBackToDashboard} className="btn btn-secondary btn-lg">Volver al Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;
