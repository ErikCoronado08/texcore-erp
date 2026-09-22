import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import VistaKardex from './views/DashboardKardex'
import VistaInventario from './views/InventarioRollos'
import VistaProductos from './views/CatalogoProductos'
import VistaFormulario from './views/RegistrarMovimiento'
import VistaNuevaCompra from './views/RecepcionRollo'
import VistaNuevoProducto from './views/NuevoProducto'

export default function App() {
  return (
    <Router>
      <div className="flex bg-slate-100/70 min-h-screen font-sans antialiased text-slate-800">
        <Sidebar />
        <main className="flex-1 ml-64 p-10">
          <Routes>
            <Route path="/" element={<VistaKardex />} />
            <Route path="/inventario" element={<VistaInventario />} />
            <Route path="/productos" element={<VistaProductos />} />
            <Route path="/nuevo-movimiento" element={<VistaFormulario />} />
            <Route path="/nueva-compra" element={<VistaNuevaCompra />} />
            <Route path="/nuevo-producto" element={<VistaNuevoProducto />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}