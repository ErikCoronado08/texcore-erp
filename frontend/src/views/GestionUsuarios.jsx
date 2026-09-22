import { useState, useEffect } from 'react'
import { Users, Shield } from 'lucide-react'
import api from '../api'

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await api.get('/users')
        setUsuarios(respuesta.data)
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
      }
    }
    cargarUsuarios()
  }, [])

  const getRoleBadge = (role) => {
    switch (role) {
      case 'administrador': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'gerente': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'operario': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Control de Usuarios y Roles</h1>
          <p className="text-slate-500 text-sm mt-1">Listado del personal autorizado y niveles de permisos en TexCore.</p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium">Usuarios activos:</span>
          <span className="text-base font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
            {usuarios.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nombre y Correo</th>
                <th className="px-6 py-4">Rol / Permiso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {usuarios.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400 font-medium">#{String(usr.id).padStart(3, '0')}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{usr.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{usr.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border rounded-full ${getRoleBadge(usr.role)}`}>
                      <Shield size={12} />
                      {usr.role ? usr.role.toUpperCase() : 'ESTÁNDAR'}
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