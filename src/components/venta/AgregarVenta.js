import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";  

const AgregarVenta = () => {
  const [venta, setVenta] = useState({
    producto: "",
    cantidad: 0,
    total: 0,
    fecha: new Date(),
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "ventas"), {
        ...venta,
        cantidad: Number(venta.cantidad),
        total: Number(venta.total),
        fecha: Timestamp.now(),
      });
      Swal.fire("Venta agregada", "La venta fue registrada con éxito", "success");
      setVenta({ producto: "", cantidad: 0, total: 0, fecha: new Date() });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");  
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase font-weight-bold text-primary">Registrar Nueva Venta</h4>
      <div className="card shadow-lg p-4 mt-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="producto" className="font-weight-semibold">Producto:</label>
            <input
              id="producto"
              className="form-control mb-3"
              name="producto"
              placeholder="Ingrese el ID del producto"
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
              placeholder="Cantidad del producto"
              onChange={handleChange}
              value={venta.cantidad}
            />
          </div>

          <div className="form-group">
            <label htmlFor="total" className="font-weight-semibold">Total:</label>
            <input
              id="total"
              className="form-control mb-3"
              type="number"
              name="total"
              placeholder="Total de la venta"
              onChange={handleChange}
              value={venta.total}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success btn-lg">Agregar Venta</button>
            <button type="button" onClick={handleBackToDashboard} className="btn btn-secondary btn-lg">Volver al Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarVenta;
