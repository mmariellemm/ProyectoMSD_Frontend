import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usuario === "sharis" && contrasena === "12345") {
      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const handleRegistro = () => {
    navigate("/registro");
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRegistro}>Ir a Registro</button>
    </div>
  );
}

export default Login;