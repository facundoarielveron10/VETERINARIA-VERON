import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  // ESTADO - PACIENTES
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  // EFECTO - PACIENTES
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes'));
      if (pacientesLS === null) {
        localStorage.setItem('pacientes', JSON.stringify([]));
      }
      setPacientes(pacientesLS);
    }
    obtenerLS();
  }, []);

  useEffect(() => {
    if(pacientes.length > 0){
      localStorage.setItem('pacientes', JSON.stringify( pacientes ));
    }
  }, [pacientes]);
  
  
  // Elimina un paciente
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
    if (pacientesActualizados.length === 0) {
      localStorage.setItem('pacientes', JSON.stringify( pacientesActualizados ));
    }
  }

  return (
    // Contenedor
    <div className="container mx-auto mt-20">
      {/* Header */}
      <Header />
      {/* Body */}
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>

    </div>
  )
}

export default App