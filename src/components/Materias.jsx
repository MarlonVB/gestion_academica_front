import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt, faTriangleExclamation, faFaceSadTear} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from "reactstrap";
import {getMateria} from "../funtions/funtions";
import axios from "axios";

const urlApi = 'https://api-ademicobd.herokuapp.com/materia/'

class Materias extends React.Component{

    state={
        data:[],
        modalAgregar: false,
        modalAdvertencia: false,
        modalError: false,
        tipoErro: '',
        detalleError: '',
        form:{
            id: '',
            descripcion: '',
            departamento: ''
        },
        tipoModal:''
    }

    getMaterias = () =>{
        axios.get(urlApi+'list').then(response =>{
            this.setState({data: response.data});
        }).catch(err=>{
            this.setState({tipoErro: 'listar'})
            this.setState({detalleError: err})
            this.setState({modalError: true})
        })
    }

    setMaterias =async () =>{
        await axios.post(urlApi+'crear', this.state.form).then(response =>{
            this.modalAgregar();
            this.getMaterias();
        }).catch(err=>{
            this.setState({tipoErro: 'agregar'})
            this.setState({detalleError: err})
            this.setState({modalError: true})
        })
    }

    updateMateria=()=>{
        axios.put(urlApi+this.state.form.id, this.state.form).then(response=>{
            this.modalAgregar()
            this.getMaterias()
        }).catch(err=>{
            this.setState({tipoErro: 'editar'})
            this.setState({detalleError: err})
            this.setState({modalError: true})
        })
    }

    deleteMaterias=()=>{
        axios.delete(urlApi+this.state.form.id).then(response=>{
            this.setState({modalAdvertencia:false});
            this.getMateria();
        }).catch(err=>{

        }).catch(err=>{
            this.setState({tipoErro: 'eliminar'})
            this.setState({detalleError: err})
            this.setState({modalError: true})
        })
    }

    modalAgregar=()=>{
        this.setState({modalAgregar: !this.state.modalAgregar});
    }

    handleOnChange=async capInput=>{
        capInput.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [capInput.target.name]: capInput.target.value
            }
        })
        console.log(this.state.form);
    }

    materiaSeleccion=(materia)=>{
        this.setState({
            tipoModal: 'actulizar',
            form:{
                id: materia.id,
                descripcion: materia.descripcion,
                departamento: materia.departamento
            }
        })
    }

    componentDidMount() {
        this.getMaterias();
    }

    render(){
        return (
            <>
                <div className="table-responsive">
                    <table className="table table-striped table-light">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Descripcion</th>
                                <th>Departamento</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.data.map(materia =>{
                            return(
                                <tr>
                                    <td>{materia.id}</td>
                                    <td>{materia.descripcion}</td>
                                    <td>{materia.departamento}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={()=>{this.materiaSeleccion(materia); this.modalAgregar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        {"    "}
                                        <button className="btn btn-danger" onClick={()=>{this.materiaSeleccion(materia); this.setState({modalAdvertencia: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <Modal isOpen={this.state.modalAgregar}>
                        <ModalHeader>Agregar nueva Asignatura</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input className="form-control" type="text" name="id" id="id" onChange={this.handleOnChange}/>
                                <br/>
                                <label htmlFor="descripcion">Descripcion</label>
                                <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleOnChange} value={this.state.form?this.state.form.descripcion:''}/>
                                <br/>
                                <label htmlFor="departamento">Departamento</label>
                                <input className="form-control" type="text" name="departamento" id="departamento" onChange={this.handleOnChange} value={this.state.form?this.state.form.departamento:''}/>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {this.state.tipoModal==='insertar'?
                                <button className="btn btn-success" onClick={()=>this.setMaterias()}>Confirmar</button>:
                                <button className="btn btn-primary" onClick={()=>this.updateMateria()}>Guardar</button>
                            }
                            <button className="btn btn-danger" onClick={()=>this.modalAgregar()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalAdvertencia}>
                        <ModalHeader><FontAwesomeIcon icon={faTriangleExclamation}/> Advertencia</ModalHeader>
                        <ModalBody>
                            ¿Esta seguro de eliminar la materia {this.state && this.state.form.descripcion}?
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={()=>{this.deleteMaterias()}}>Si</button>
                            <button className="btn btn-secondary" onClick={()=>this.setState({modalAdvertencia: false})}>No</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalError}>
                        <ModalHeader><FontAwesomeIcon icon={faFaceSadTear}/> Error</ModalHeader>
                        <ModalBody>
                            Se a producido un error al tratar de {this.state.tipoErro} los datos
                            Detalle: {this.state.detalleError}
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={()=>{this.deleteMaterias()}}>Si</button>
                            <button className="btn btn-secondary" onClick={()=>this.setState({modalAdvertencia: false})}>No</button>
                        </ModalFooter>
                    </Modal>

                    <Button color="success" onClick={()=>{this.setState({tipoModal:'insertar'}); this.modalAgregar()}}>Agregar Materia</Button>
                </div>
            </>
        )
    }
}

export default Materias