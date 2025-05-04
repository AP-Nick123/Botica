import React, { useState } from "react";

const Atencion = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [historial, setHistorial] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre && email && mensaje) {
      const nuevoTicket = {
        nombre,
        email,
        mensaje,
        fecha: new Date().toLocaleString(),
      };
      setHistorial([nuevoTicket, ...historial]);


      setNombre("");
      setEmail("");
      setMensaje("");
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Atención al Cliente</h2>
      <p>Estamos aquí para ayudarte. Si tienes alguna consulta o necesitas soporte, por favor completa el formulario.</p>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4>Formulario de contacto</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                className="form-control"
                rows="4"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar Consulta
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h4>Historial de Consultas</h4>
          {historial.length > 0 ? (
            <ul className="list-group">
              {historial.map((ticket, index) => (
                <li key={index} className="list-group-item">
                  <strong>{ticket.nombre}</strong> - {ticket.email} <br />
                  <span>{ticket.fecha}</span>
                  <p>{ticket.mensaje}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes consultas previas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Atencion;
