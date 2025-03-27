import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validación básica
    if (!formData.email || !formData.password) {
      setError("Por favor complete todos los campos");
      setIsLoading(false);
      return;
    }

    try {
      // Simulación de llamada a API con retraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificación de credenciales (en producción sería una llamada real a tu backend)
      let userData;
      if (formData.email === "admin@proyecto.com" && formData.password === "12345") {
        userData = {
          id: 1,
          username: "admin",
          email: formData.email,
          rol: "admin",
          name: "Administrador"
        };
      } else if (formData.email === "employee@proyecto.com" && formData.password === "54321") {
        userData = {
          id: 2,
          username: "employee",
          email: formData.email,
          rol: "employee",
          name: "Empleado"
        };
      } else {
        throw new Error("Credenciales incorrectas");
      }

      // Guardar usuario autenticado
      localStorage.setItem('usuarioAutenticado', JSON.stringify(userData));
      
      // Redirigir según el rol
      navigate(userData.rol === "admin" ? "/empleados" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error al iniciar sesión");
    } finally {
      setIsLoading(false);
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
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="user@example.com"
            autoComplete="username"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="********"
            autoComplete="current-password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
      <button 
        onClick={handleRegistro}
        className="secondary-button"
      >
        Registrarse
      </button>
    </div>
  );
}

export default Login;