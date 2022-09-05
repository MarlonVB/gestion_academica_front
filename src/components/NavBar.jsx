// import '../components/styles/NavBarStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import React from "react";
;

const NavBar = () => {
    return (
        <>
            {/*<div className="header-nav">*/}
            {/*    <nav className="nav-menu">*/}
            {/*        <ul className="nav-list-items">*/}
            {/*            <li>*/}
            {/*                <a href="/">Inicio</a>*/}
            {/*            </li>*/}
            {/*            <li>*/}
            {/*                <a href="/estudiantes">Estudiantes</a>*/}
            {/*            </li>*/}
            {/*            <li>*/}
            {/*                <a href="#">Docentes</a>*/}
            {/*            </li>*/}
            {/*            <li>*/}
            {/*                <Link to="/materia">Asignaturas</Link>*/}
            {/*            </li>*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*    <div>*/}

            {/*    </div>*/}
            {/*    <img className="logo" src="https://i.postimg.cc/65k595dJ/icons8-mortarboard-100px.png"/>*/}
            {/*    <h1 className="title">Academico</h1>*/}
            {/*</div>*/}

            <div>
                <nav className="navbar navbar-expand-lg bg-darck">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
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