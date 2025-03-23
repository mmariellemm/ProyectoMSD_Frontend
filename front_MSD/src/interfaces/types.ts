export interface Employee {
    id: number;
    name: string;
    email: string;
    role: "Administrador" | "Empleado"; // Opciones fijas para el rol
    joiningDate: string; // Se guarda como una cadena en formato YYYY-MM-DD
    image?: string; // La imagen puede ser opcional y en formato base64 o URL
  }

  export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }