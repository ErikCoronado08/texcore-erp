import { useState, useEffect } from 'react'
import api from './api'

function App() {
  const [rollos, setRollos] = useState([])

  useEffect(() => {
    const cargarRollos = async () => {
      try {
        const respuesta = await api.get('/rollos')
        setRollos(respuesta.data)
      } catch (error) {
        console.error("Error al conectar con Laravel:", error)
      }
    }
    
    cargarRollos()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ color: '#111827' }}>ERP TexCore - Producción Textil</h1>
      <h2 style={{ color: '#374151' }}>Rollos de Tela en Inventario: {rollos.length}</h2>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rollos.map(rollo => (
          <li key={rollo.id} style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            marginBottom: '1rem', 
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <strong style={{ color: '#047857', fontSize: '1.1rem' }}>
              {rollo.producto?.nombre} (Lote: {rollo.codigo_tinte})
            </strong>
            <p style={{ margin: '0.5rem 0 0 0', color: '#4b5563' }}>
              <strong>Metraje disponible:</strong> {rollo.metraje_actual}m | <strong>Ubicación:</strong> {rollo.almacen?.nombre}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App