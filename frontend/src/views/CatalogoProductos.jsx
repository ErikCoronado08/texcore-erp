import { useState, useEffect } from 'react'
import api from '../api'

export default function CatalogoProductos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await api.get('/productos')
        setProductos(respuesta.data)
      } catch (error) {
        console.error("Error al cargar los productos:", error)
      }
    }
    cargarProductos()
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Catálogo de Telas y Productos</h1>
          <p className="text-slate-500 text-sm mt-1">Listado general de los tipos de tela y códigos SKU registrados en el ERP.</p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 self-start sm:self-auto">
          <span className="text-sm text-slate-500 font-medium">Tipos de tela:</span>
          <span className="text-base font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
            {productos.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nombre / SKU</th>
                <th className="px-6 py-4">Categoría</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {productos.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400 font-medium">#{String(prod.id).padStart(3, '0')}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{prod.nombre}</div>
                    <div className="text-xs font-mono text-slate-400">SKU: {prod.sku}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{prod.categoria?.nombre || 'General'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}