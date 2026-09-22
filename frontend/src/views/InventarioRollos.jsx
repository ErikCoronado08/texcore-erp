import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import api from '../api'

export default function InventarioRollos() {
  const [rollos, setRollos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [ubicacionFiltro, setUbicacionFiltro] = useState('todos')

  useEffect(() => {
    const cargarInventario = async () => {
      try {
        const respuesta = await api.get('/rollos')
        setRollos(respuesta.data)
      } catch (error) {
        console.error("Error al cargar el inventario de rollos:", error)
      }
    }
    cargarInventario()
  }, [])

  const rollosFiltrados = rollos.filter((rollo) => {
    const texto = busqueda.toLowerCase()
    const nombre = rollo.producto?.nombre?.toLowerCase() || ''
    const sku = rollo.producto?.sku?.toLowerCase() || ''
    const lote = rollo.codigo_tinte?.toLowerCase() || ''

    const coincideTexto = nombre.includes(texto) || sku.includes(texto) || lote.includes(texto)
    const ubicacionNombre = rollo.almacen?.nombre || 'Bodega Principal'
    const coincideUbicacion = ubicacionFiltro === 'todos' || ubicacionNombre === ubicacionFiltro

    return coincideTexto && coincideUbicacion
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventario de Rollos</h1>
          <p className="text-slate-500 text-sm mt-1">Control físico actual de rollos, metrajes disponibles y ubicaciones en almacén.</p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 self-start sm:self-auto">
          <span className="text-sm text-slate-500 font-medium">Rollos mostrados:</span>
          <span className="text-base font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
            {rollosFiltrados.length} <span className="text-xs text-slate-400 font-normal">/ {rollos.length}</span>
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Search size={18} /></span>
          <input 
            type="text"
            placeholder="Buscar por tela, SKU o Lote..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Filter size={16} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ubicación:</span>
          <select 
            value={ubicacionFiltro}
            onChange={(e) => setUbicacionFiltro(e.target.value)}
            className="bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          >
            <option value="todos">Todas las ubicaciones</option>
            <option value="Bodega Principal">Bodega Principal</option>
            <option value="Almacén de Mermas">Almacén de Mermas</option>
            <option value="Piso de Producción">Piso de Producción</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID Rollo</th>
                <th className="px-6 py-4">Material / Producto</th>
                <th className="px-6 py-4">Lote (Dye Lot)</th>
                <th className="px-6 py-4">Ubicación</th>
                <th className="px-6 py-4 text-right">Metraje Actual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {rollosFiltrados.length > 0 ? (
                rollosFiltrados.map((rollo) => (
                  <tr key={rollo.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-400 font-medium">#{String(rollo.id).padStart(5, '0')}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {rollo.producto?.nombre}
                      <div className="text-xs text-slate-400 font-normal">SKU: {rollo.producto?.sku}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">{rollo.codigo_tinte}</td>
                    <td className="px-6 py-4 text-slate-600">{rollo.almacen?.nombre || 'Bodega Principal'}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-700">{rollo.metraje_actual} <span className="text-slate-400 font-normal">m</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">No se encontraron rollos que coincidan con la búsqueda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}