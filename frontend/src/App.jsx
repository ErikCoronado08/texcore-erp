import { useState, useEffect } from 'react'
import api from './api'

function App() {
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

  const getBadgeStyle = (tipo) => {
    switch (tipo) {
      case 'entrada_compra': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'salida_corte': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'merma': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ERP TexCore</h1>
            <p className="text-gray-500 mt-1">Auditoría y Kardex de Movimientos (Mesa de Corte)</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <span className="text-sm text-gray-500 font-medium">Registros totales: </span>
            <span className="text-lg font-bold text-emerald-600">{movimientos.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">ID Transacción</th>
                  <th className="px-6 py-4 font-semibold">Material (Tela)</th>
                  <th className="px-6 py-4 font-semibold">Lote (Dye Lot)</th>
                  <th className="px-6 py-4 font-semibold">Tipo de Operación</th>
                  <th className="px-6 py-4 font-semibold text-right">Metraje Involucrado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {movimientos.map((mov) => (
                  <tr key={mov.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-gray-500">
                      #{String(mov.id).padStart(5, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{mov.rollo?.producto?.nombre}</div>
                      <div className="text-xs text-gray-400">SKU: {mov.rollo?.producto?.sku}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">
                      {mov.rollo?.codigo_tinte}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold border rounded-full ${getBadgeStyle(mov.tipo_movimiento)}`}>
                        {mov.tipo_movimiento.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-700">
                      {mov.metraje} m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App