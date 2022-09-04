import React, {useEffect, useState} from "react";
import {getMateria} from "../funtions/funtions";
import {Card} from 'primereact/card';
import '../components/styles/CardOptions.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const Inicio = () => {

    return (
        <>
            <header className="container-main">
                <div className="header-nav">
                    <nav className="nav-menu">
                        <ul className="nav-list-items">
                            <li>
                                <a href="#">Inicio</a>
                            </li>
                            <li>
                                <a href="#">Estudiantes</a>
                            </li>
                            <li>
                                <a href="#">Docentes</a>
                            </li>
                            <li>
                                <Link to="/materia">Asignaturas</Link>
                            </li>
                        </ul>
                    </nav>
                    <div>

                    </div>
                    <img className="logo" src="https://i.postimg.cc/65k595dJ/icons8-mortarboard-100px.png"/>
                    <h1 className="title">Academico</h1>
                </div>

                {/*CONTENIDO*/}

                <div>
                    <div className="container mt-5">

                        <div className="row text-center me-10">
                            <div className="col">
                                <Card className="card" title="Esdiantes">
                                    <img src="https://i.postimg.cc/KYbzDsWK/student.jpg" width="300px"/>
                                </Card>
                            </div>
                            <div className="col">
                                <Card className="card" title="Docentes">
                                    <img src="https://i.postimg.cc/x1zJRmTZ/proffesor.jpg" width="300px" height="260px"/>
                                </Card>
                            </div>
                            <div className="col">
                                <Card className="card" title="Materias">
                                    <img src="https://i.postimg.cc/YqJjhSfz/subjects.jpg" width="300px" height="260px"/>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="burbujas">
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                        <div className="burbuja"></div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Inicio