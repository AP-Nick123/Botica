import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [error, setError] = useState(""); // Added error state for form validation
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const validateInputs = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await login(userCredential.user); // Update auth context
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/dashboard");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await login(userCredential.user);
        Swal.fire({
          title: "Bienvenido!",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      // Improved error handling with specific messages
      let errorMessage = "Se produjo un error. Por favor inténtalo de nuevo.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este correo electrónico ya está registrado.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Correo electrónico o contraseña no válidos.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos. Inténtelo de nuevo más tarde.";
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Removed hardcoded credentials from UI for security
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      id="login"
      role="main" // Accessibility improvement
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="h3 text-center mb-4">
          {isRegistering ? "Crear Cuenta" : "Inicio Sesion"}
        </h1>
        <hr aria-hidden="true" /> {/* Accessibility for divider */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleAuth} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())} // Trim input
              placeholder="correoelectronico@gmail.com"
              autoComplete="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              Nunca compartiremos su correo electrónico con nadie más.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete={isRegistering ? "new-password" : "current-password"}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            {isRegistering ? "Register" : "Inicio Sesion"}
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            {isRegistering ? "Ya tienes una cuenta?" : "No tienes Una cuenta?"}{" "}
            <button
              type="button" // Explicit button type
              className="btn btn-link p-0"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(""); // Clear errors on mode switch
              }}
              disabled={isLoading}
            >
              {isRegistering ? "Inicio Sesion" : "Registrarse"}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;