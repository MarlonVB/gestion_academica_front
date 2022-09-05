import React, {useEffect, useState} from "react";
import {Card} from 'primereact/card';
import '../components/styles/CardOptions.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";

const Inicio = () => {

    return (
        <>
            <header className="container-main">
                <NavBar></NavBar>
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