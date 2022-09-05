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
                    <section className="banner contenedor">
                        <secrion className="banner_title">
                            <h2>Les gusto <br/> este proyecto?</h2>
                            <a href="https://github.com/MarlonVB/gestion_academica_front.git" target="_blank" className="llamanos">Link Repositorio!</a>
                        </secrion>
                        <div className="banner_img">
                            <img src="https://i.postimg.cc/26kMnMQc/Academy.png"/>
                        </div>
                    </section>

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