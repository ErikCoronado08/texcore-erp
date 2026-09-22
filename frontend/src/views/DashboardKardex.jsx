import { useState, useEffect } from 'react'
import { TrendingUp, Truck, Scissors, AlertTriangle } from 'lucide-react'
import api from '../api'

export default function DashboardKardex() {
  const [movimientos, setMovimientos] = useState([])

  useEffect(() => {
    const cargarKardex = async () => {
      try {
        const respuesta = await api.get('/kardex')
        setMovimientos(respuesta.data)
      } catch (error) {
        console.error("Error al conectar con Laravel:", error)
      }
    }
    cargarKardex()
  }, [])

  const totalMovimientos = movimientos.length
  const totalEntradas = movimientos.filter(m => m.tipo_movimiento === 'entrada_compra').length
  const totalCortes = movimientos.filter(m => m.tipo_movimiento === 'salida_corte').length
  const totalMermas = movimientos.filter(m => m.tipo_movimiento === 'merma').length

  const getBadgeStyle = (tipo) => {
    switch (tipo) {
      case 'entrada_compra': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'salida_corte': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'merma': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard General & Auditoría</h1>
        <p className="text-slate-500 text-sm mt-1">Resumen ejecutivo del estado de operaciones en piso de producción.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Transacciones</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalMovimientos}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><TrendingUp size={24} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Entradas por Compra</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{totalEntradas}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><Truck size={24} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salidas a Corte</p>
            <h3 className="text-2xl font-bold text-sky-600 mt-1">{totalCortes}</h3>
          </div>
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl border border-sky-100"><Scissors size={24} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mermas / Desperdicio</p>
            <h3 className="text-2xl font-bold text-rose-600 mt-1">{totalMermas}</h3>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><AlertTriangle size={24} /></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-800 text-base">Historial de Movimientos</h2>
          <span className="text-xs text-slate-400 font-medium">Actualizado en tiempo real</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID Transacción</th>
                <th className="px-6 py-4">Material / Tela</th>
                <th className="px-6 py-4">Tipo de Operación</th>
                <th className="px-6 py-4 text-right">Metraje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {movimientos.map((mov) => (
                <tr key={mov.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400 font-medium">#{String(mov.id).padStart(5, '0')}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{mov.rollo?.producto?.nombre}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Lote: <span className="font-mono text-slate-600">{mov.rollo?.codigo_tinte}</span></div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold border rounded-full ${getBadgeStyle(mov.tipo_movimiento)}`}>
                      {mov.tipo_movimiento.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-700">{mov.metraje} <span className="text-slate-400 font-normal">m</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}