import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  const ventasCollection = collection(db, "ventas");

  const getVentas = async () => {
    const data = await getDocs(ventasCollection);
    setVentas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteVenta = async (id) => {
    const ventaDoc = doc(db, "ventas", id);
    await deleteDoc(ventaDoc);
    getVentas();
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta venta?",
      text: "¡No podrás recuperar los datos de la venta!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVenta(id);
        Swal.fire("Eliminada", "La venta ha sido eliminada.", "success");
      }
    });
  };

  useEffect(() => {
    getVentas();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-dark">Ventas</h2>
        <Link to="/agregar-venta" className="btn btn-success">
          <i className="fa-solid fa-plus me-2"></i>Agregar Venta
        </Link>
      </div>

      <div className="card shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.producto}</td> 
                    <td>{new Date(venta.fecha.seconds * 1000).toLocaleDateString()}</td>
                    <td>{venta.cantidad}</td>
                    <td>S/. {venta.total}</td>
                    <td>
                      <Link to={`/edit-venta/${venta.id}`} className="btn btn-outline-success btn-sm me-2">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        onClick={() => confirmDelete(venta.id)}
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

export default Ventas;
