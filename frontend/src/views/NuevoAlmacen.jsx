import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Warehouse } from 'lucide-react'
import api from '../api'

export default function NuevoAlmacen() {
  const navigate = useNavigate();
  const [nuevoAlmacen, setNuevoAlmacen] = useState({ nombre: '', ubicacion: '' })

  const registrarAlmacen = async (e) => {
    e.preventDefault()
    try {
      await api.post('/almacenes', nuevoAlmacen)
      alert("¡Almacén registrado con éxito!")
      navigate('/almacenes')
    } catch (error) {
      console.error("Error al registrar almacén:", error)
      alert("Ocurrió un error. Verifica que el nombre del almacén sea único.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Registrar Nueva Bodega</h1>
        <p className="text-slate-500 text-sm mt-1">Da de alta una nueva ubicación física para el control de inventario de TexCore.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 p-8">
        <form onSubmit={registrarAlmacen} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre del Almacén</label>
            <input 
              type="text" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. Bodega Secundaria"
              value={nuevoAlmacen.nombre}
              onChange={(e) => setNuevoAlmacen({...nuevoAlmacen, nombre: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ubicación / Descripción</label>
            <input 
              type="text"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. Pasillo 3, Ala Norte"
              value={nuevoAlmacen.ubicacion}
              onChange={(e) => setNuevoAlmacen({...nuevoAlmacen, ubicacion: e.target.value})}
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex justify-center items-center gap-2 text-sm">
              <Warehouse size={18} />
              Guardar Bodega
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}