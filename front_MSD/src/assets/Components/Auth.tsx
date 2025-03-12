import { useState } from "react";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            console.log("Iniciando sesión con:", { email, password });
        } else {
            console.log("Registrando usuario:", { name, email, password });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white shadow-xl rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isLogin ? "Iniciar Sesión" : "Registro"}
                </h2>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Nombre</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Correo Electrónico</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
                        {isLogin ? "Ingresar" : "Registrarse"}
                    </button>
                </form>

                <p className="text-center mt-4">
                    {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                    <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
                    </button>
                </p>
            </div>
        </div>
    );
}
