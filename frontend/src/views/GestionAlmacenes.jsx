import { useState, useEffect } from 'react'
import { Warehouse, MapPin } from 'lucide-react'
import api from '../api'

export default function GestionAlmacenes() {
  const [almacenes, setAlmacenes] = useState([])

  useEffect(() => {
    const cargarAlmacenes = async () => {
      try {
        const respuesta = await api.get('/almacenes')
        setAlmacenes(respuesta.data)
      } catch (error) {
        console.error("Error al cargar almacenes:", error)
      }
    }
    cargarAlmacenes()
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestión de Almacenes y Bodegas</h1>
          <p className="text-slate-500 text-sm mt-1">Listado general de las ubicaciones físicas de almacenamiento en TexCore.</p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium">Bodegas activas:</span>
          <span className="text-base font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
            {almacenes.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nombre y Ubicación</th>
                <th className="px-6 py-4 text-right">Rollos Asignados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {almacenes.map((alc) => (
                <tr key={alc.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400 font-medium">#{String(alc.id).padStart(3, '0')}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{alc.nombre}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> {alc.ubicacion || 'Sin ubicación específica'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-700">
                    <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs">
                      {alc.rollos?.length || 0} rollos
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}