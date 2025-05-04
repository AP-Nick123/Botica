import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const Edit = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    stock: 0,
    precio: 0,
    codigo: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const updateProducto = async (e) => {
    e.preventDefault();
    try {
      const productoRef = doc(db, "productos", id);
      const data = {
        ...producto,
        stock: Number(producto.stock),
        precio: Number(producto.precio),
      };
      await updateDoc(productoRef, data);
      Swal.fire("Producto actualizado", "Los datos se actualizaron correctamente", "success");
      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const getProductoById = async (id) => {
    const productoDoc = await getDoc(doc(db, "productos", id));
    if (productoDoc.exists()) {
      setProducto(productoDoc.data());
    } else {
      Swal.fire("Error", "¡El producto no existe!", "error");
    }
  };

  useEffect(() => {
    getProductoById(id);
  }, [id]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");  // Redirigir al Dashboard
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase font-weight-bold text-primary">Editar Producto</h4>
      <div className="card shadow-lg p-4 mt-3">
        <form onSubmit={updateProducto}>
          <div className="form-group">
            <label htmlFor="nombre" className="font-weight-semibold">Nombre:</label>
            <input
              id="nombre"
              className="form-control mb-3"
              name="nombre"
              placeholder="Nombre del producto"
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
              placeholder="Descripción del producto"
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
              placeholder="Categoría del producto"
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
            <button type="submit" className="btn btn-primary btn-lg">Actualizar Producto</button>
            <button type="button" onClick={handleBackToDashboard} className="btn btn-secondary btn-lg">Volver al Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
