import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './views/Login'
import VistaKardex from './views/DashboardKardex'
import VistaInventario from './views/InventarioRollos'
import VistaProductos from './views/CatalogoProductos'
import VistaFormulario from './views/RegistrarMovimiento'
import VistaNuevaCompra from './views/RecepcionRollo'
import VistaNuevoProducto from './views/NuevoProducto'
import GestionAlmacenes from './views/GestionAlmacenes'
import NuevoAlmacen from './views/NuevoAlmacen'
import GestionUsuarios from './views/GestionUsuarios'
import NuevoUsuario from './views/NuevoUsuario'

// Componente para blindar las rutas privadas y renderizar el Layout con Sidebar
function RutaProtegida({ children }) {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex bg-slate-100/70 min-h-screen font-sans antialiased text-slate-800">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública de acceso */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas envueltas con control de autenticación */}
        <Route path="/" element={<RutaProtegida><VistaKardex /></RutaProtegida>} />
        <Route path="/inventario" element={<RutaProtegida><VistaInventario /></RutaProtegida>} />
        <Route path="/productos" element={<RutaProtegida><VistaProductos /></RutaProtegida>} />
        <Route path="/nuevo-movimiento" element={<RutaProtegida><VistaFormulario /></RutaProtegida>} />
        <Route path="/nueva-compra" element={<RutaProtegida><VistaNuevaCompra /></RutaProtegida>} />
        <Route path="/nuevo-producto" element={<RutaProtegida><VistaNuevoProducto /></RutaProtegida>} />
        <Route path="/almacenes" element={<RutaProtegida><GestionAlmacenes /></RutaProtegida>} />
        <Route path="/nuevo-almacen" element={<RutaProtegida><NuevoAlmacen /></RutaProtegida>} />
        <Route path="/usuarios" element={<RutaProtegida><GestionUsuarios /></RutaProtegida>} />
        <Route path="/nuevo-usuario" element={<RutaProtegida><NuevoUsuario /></RutaProtegida>} />

        {/* Redirección por defecto para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}