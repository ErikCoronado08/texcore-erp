import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boxes } from 'lucide-react'
import api from '../api'

export default function NuevoProducto() {
  const navigate = useNavigate();
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', sku: '', categoria_id: '1' })

  const registrarProducto = async (e) => {
    e.preventDefault()
    try {
      await api.post('/productos', nuevoProducto)
      alert("¡Tela registrada exitosamente en el catálogo!")
      navigate('/productos')
    } catch (error) {
      console.error("Error al registrar producto:", error)
      alert("Ocurrió un error al registrar la tela. Verifica que el SKU sea único.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Registrar Nueva Tela</h1>
        <p className="text-slate-500 text-sm mt-1">Da de alta una nueva variedad de tela y asígnale su código SKU en el sistema.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 p-8">
        <form onSubmit={registrarProducto} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre de la Tela</label>
            <input 
              type="text" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. Tela Oxford Denim"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Código SKU</label>
            <input 
              type="text" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. TEX-9988"
              value={nuevoProducto.sku}
              onChange={(e) => setNuevoProducto({...nuevoProducto, sku: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">ID de Categoría</label>
            <input 
              type="number" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. 1"
              value={nuevoProducto.categoria_id}
              onChange={(e) => setNuevoProducto({...nuevoProducto, categoria_id: e.target.value})}
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex justify-center items-center gap-2 text-sm">
              <Boxes size={18} />
              Guardar Nueva Tela
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}