import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditarVenta = () => {
  const [venta, setVenta] = useState({
    producto: "",
    cantidad: 0,
    total: 0,
    fecha: new Date(),
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const updateVenta = async (e) => {
    e.preventDefault();
    try {
      const ventaRef = doc(db, "ventas", id);
      const data = {
        ...venta,
        cantidad: Number(venta.cantidad),
        total: Number(venta.total),
      };
      await updateDoc(ventaRef, data);
      Swal.fire("Venta actualizada", "Los datos se actualizaron correctamente", "success");
      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const getVentaById = async (id) => {
    const ventaDoc = await getDoc(doc(db, "ventas", id));
    if (ventaDoc.exists()) {
      setVenta(ventaDoc.data());
    } else {
      Swal.fire("Error", "¡La venta no existe!", "error");
    }
  };

  useEffect(() => {
    getVentaById(id);
  }, [id]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase font-weight-bold text-primary">Editar Venta</h4>
      <div className="card shadow-lg p-4 mt-3">
        <form onSubmit={updateVenta}>
          <div className="form-group">
            <label htmlFor="producto" className="font-weight-semibold">Producto:</label>
            <input
              id="producto"
              className="form-control mb-3"
              name="producto"
              placeholder="Nombre o ID del producto"
              onChange={handleChange}
              value={venta.producto}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cantidad" className="font-weight-semibold">Cantidad:</label>
            <input
              id="cantidad"
              className="form-control mb-3"
              type="number"
              name="cantidad"
              placeholder="Cantidad vendida"
              onChange={handleChange}
              value={venta.cantidad}
            />
          </div>

          <div className="form-group">
            <label htmlFor="total" className="font-weight-semibold">Total (S/.):</label>
            <input
              id="total"
              className="form-control mb-4"
              type="number"
              name="total"
              placeholder="Total de la venta"
              onChange={handleChange}
              value={venta.total}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary btn-lg">Actualizar Venta</button>
            <button type="button" onClick={handleBackToDashboard} className="btn btn-secondary btn-lg">Volver al Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarVenta;
