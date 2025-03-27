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

  export interface Usuario {
    id: number;
    user: string;
    email: string;
    password: string;
    rol: 'admin' | 'employee';
  }

  export interface Cliente {
    id: number;
    name: string;
    email: string;
    phone: string;
  }

  export interface Venta {
    id: number;
    fecha: string;
    productos: { nombre: string; cantidad: number; precio: number }[];
    total: number;
    empleado?: string; // Opcional
  }

  export interface DetalleVenta {
    id: number;
    empleado: string;
    fecha: string;
    monto: number;
  }
