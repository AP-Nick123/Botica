import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";  
import './login.css'; 

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        Swal.fire("¡Registro exitoso!", "Usuario creado correctamente", "success");
        navigate("/dashboard"); 
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        Swal.fire("¡Bienvenido!", "Inicio de sesión exitoso", "success");

        login(userCredential.user);

        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" id="login">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">{isRegistering ? "Registrar cuenta" : "Iniciar sesión"}</h3>
        <hr></hr>
        Por si acaso: <br></br>
        - usuario: nick@gmail.com <br></br>
        - contraseña: nick123<br></br>
        Se pueden agregar mas usuarios
        <hr></hr>
        <form onSubmit={handleAuth}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isRegistering ? "Registrar" : "Ingresar"}
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
            <button className="btn btn-link p-0" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Inicia sesión" : "Regístrate"}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
