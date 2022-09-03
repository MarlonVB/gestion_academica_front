import React, {useEffect, useState} from "react";
import {getMateria} from "../funtions/funtions";
import { Card } from 'primereact/card';
import '../components/styles/CardOptions.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const Inicio = () => {
    // const [personajes, setPersonajes] = useState(null)
    useEffect(() => {
        getMateria()
    },[])

    return (
        <>
            <div className="container text-center position-absolute">
                <div className="row">
                    <div className="col">
                        <Card className="card position-absolute top-30 start-40" title="Title" subTitle="SubTitle">
                            Content
                        </Card>
                    </div>
                    <div className="col">
                        <Card className="card" title="Title" subTitle="SubTitle">
                            Content
                        </Card>
                    </div>
                    <div className="col">
                        <Card className="card" title="Title" subTitle="SubTitle">
                            Content
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inicio