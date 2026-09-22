import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Truck } from 'lucide-react'
import api from '../api'

export default function RecepcionRollo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    producto_id: '1',
    almacen_id: '1',
    codigo_tinte: '',
    metraje_inicial: ''
  })

  const registrarCompra = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rollos', formData);
      alert("¡Nuevo rollo registrado y agregado al inventario con éxito!");
      navigate('/inventario');
    } catch (error) {
      console.error("Error al registrar el nuevo rollo:", error);
      alert("Ocurrió un error al registrar la compra. Revisa los datos.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recepción de Nuevo Rollo (Compra)</h1>
        <p className="text-slate-500 text-sm mt-1">Da de alta rollos nuevos provenientes de proveedores para alimentar el inventario base.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 p-8">
        <form onSubmit={registrarCompra} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">ID de Producto / Tela</label>
            <input 
              type="number" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. 1"
              value={formData.producto_id}
              onChange={(e) => setFormData({...formData, producto_id: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">ID de Almacén / Bodega</label>
            <input 
              type="number" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. 1 (Bodega Principal)"
              value={formData.almacen_id}
              onChange={(e) => setFormData({...formData, almacen_id: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Código de Lote (Dye Lot)</label>
            <input 
              type="text" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-mono"
              placeholder="Ej. DYE-99xz"
              value={formData.codigo_tinte}
              onChange={(e) => setFormData({...formData, codigo_tinte: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Metraje Inicial (metros)</label>
            <input 
              type="number" step="0.01" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. 100.00"
              value={formData.metraje_inicial}
              onChange={(e) => setFormData({...formData, metraje_inicial: e.target.value})}
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex justify-center items-center gap-2 text-sm">
              <Truck size={18} />
              Registrar Compra y Dar de Alta Rollo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}