// import '../components/styles/NavBarStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import React from "react";
;

const NavBar = () => {
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src="https://i.postimg.cc/65k595dJ/icons8-mortarboard-100px.png" alt="" width="60"
                                 className="d-inline-block mx-2"/>
                                Academico
                        </a>
                        <div className="nav justify-content-center" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/estudiantes">Estudiantes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/docentes">Docentes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/materia">Asignaturas</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar