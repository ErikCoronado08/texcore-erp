import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scissors } from 'lucide-react'
import api from '../api'

export default function RegistrarMovimiento() {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({ rollo_id: '', tipo_movimiento: 'salida_corte', metraje: '' })

  const registrarMovimiento = async (e) => {
    e.preventDefault();
    try {
      await api.post('/kardex', formulario);
      alert("Operación registrada e inventario actualizado con éxito.");
      navigate('/');
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al registrar el movimiento. Verifica el ID del rollo.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Registrar Operación</h1>
        <p className="text-slate-500 text-sm mt-1">Ingresa los datos del corte o merma para descontar automáticamente del inventario físico.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 p-8">
        <form onSubmit={registrarMovimiento} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">ID del Rollo Físico (Dye Lot)</label>
            <input 
              type="number" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. 15"
              value={formulario.rollo_id}
              onChange={(e) => setFormulario({...formulario, rollo_id: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Movimiento</label>
            <select 
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              value={formulario.tipo_movimiento}
              onChange={(e) => setFormulario({...formulario, tipo_movimiento: e.target.value})}
            >
              <option value="salida_corte">Salida a Corte (Producción)</option>
              <option value="merma">Merma / Desperdicio</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Metraje a descontar (metros)</label>
            <input 
              type="number" step="0.01" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. 12.50"
              value={formulario.metraje}
              onChange={(e) => setFormulario({...formulario, metraje: e.target.value})}
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex justify-center items-center gap-2 text-sm">
              <Scissors size={18} />
              Procesar y Descontar Inventario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}