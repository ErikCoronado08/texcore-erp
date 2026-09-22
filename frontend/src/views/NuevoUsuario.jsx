import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import api from '../api'

export default function NuevoUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'operario' })

  const registrarUsuario = async (e) => {
    e.preventDefault()
    try {
      await api.post('/users', formData)
      alert("¡Usuario registrado con éxito!")
      navigate('/usuarios')
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      alert("Ocurrió un error al registrar el usuario. Verifica los datos.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Registrar Nuevo Usuario</h1>
        <p className="text-slate-500 text-sm mt-1">Crea una nueva cuenta de acceso y asígnale su nivel de permisos en el ERP.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80 p-8">
        <form onSubmit={registrarUsuario} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
            <input 
              type="text" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. Carlos Mendoza"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
            <input 
              type="email" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ej. carlos@texcore.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña Temporal</label>
            <input 
              type="password" required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rol / Nivel de Acceso</label>
            <select 
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="operario">Operario (Piso de Producción)</option>
              <option value="gerente">Gerente (Supervisión y Reportes)</option>
              <option value="administrador">Administrador (Control Total)</option>
            </select>
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex justify-center items-center gap-2 text-sm">
              <UserPlus size={18} />
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}