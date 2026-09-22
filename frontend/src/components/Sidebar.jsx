import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Scissors, PackageSearch, Truck, Boxes, PlusSquare } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation();
  
  const menuTablas = [
    { path: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard Kardex' },
    { path: '/inventario', icon: <PackageSearch size={18} />, label: 'Inventario de Rollos' },
    { path: '/productos', icon: <Boxes size={18} />, label: 'Catálogo de Telas' },
  ];

  const menuFormularios = [
    { path: '/nuevo-movimiento', icon: <Scissors size={18} />, label: 'Registrar Corte / Merma' },
    { path: '/nueva-compra', icon: <Truck size={18} />, label: 'Recepción de Rollo' },
    { path: '/nuevo-producto', icon: <PlusSquare size={18} />, label: 'Nueva Tela (Catálogo)' },
  ];

  return (
    <aside className="w-64 min-h-screen flex flex-col fixed left-0 top-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-800 shadow-2xl z-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent"></div>

      {/* Logo */}
      <div className="px-6 py-6 flex justify-center items-center border-b border-slate-800/80 bg-slate-950/50">
        <img 
          src="/logo.png" 
          alt="TexCore Logo" 
          className="w-36 h-auto max-h-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>

      {/* Navegación Seccionada */}
      <nav className="flex-1 py-4 px-3 space-y-6">
        <div>
          <p className="px-4 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monitoreo y Tablas</p>
          <ul className="space-y-1">
            {menuTablas.map((item) => {
              const activo = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                      activo 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/20' 
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className="px-4 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registros y Operaciones</p>
          <ul className="space-y-1">
            {menuFormularios.map((item) => {
              const activo = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                      activo 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/20' 
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <div className="p-4 text-xs text-slate-500 text-center border-t border-slate-800/80 bg-slate-950/60">
        ERP Maquiladora v1.0<br/>© 2026 TexCore
      </div>
    </aside>
  )
}