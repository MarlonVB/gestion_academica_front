import '../src/App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Inicio from "./components/Inicio";
import Materias from "./components/Materias";
import Estudiantes from "./components/Estudiantes";
import NavBar from "./components/NavBar";
import Docentes from "./components/Docentes";

function App() {
  return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Inicio></Inicio>}></Route>
            <Route path='/materia' element={<Materias></Materias>}></Route>
            <Route path='/estudiantes' element={<Estudiantes></Estudiantes>}></Route>
              <Route path='/docentes' element={<Docentes></Docentes>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
