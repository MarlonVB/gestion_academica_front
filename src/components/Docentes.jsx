import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFaceSadTear, faThumbsUp, faTrashAlt, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../components/styles/Estudiantes.css';

const urlApi = 'https://api-ademicobd.herokuapp.com/docente/'

class Docentes extends React.Component{

    state ={
        data:[],
        modalAgregar: false,
        modalAdvertencia: false,
        modalError: false,
        tipoErro: '',
        detalleError: '',
        form: {
            id: '',
            nombre: '',
            apellido: '',
            cedula: '',
            telefono: '',
            correo: '',
            materia: '',
            tutor: ''
        },
        tipoModal: '',
        validarForm: {},
        isSubmit: false,
        allOk: false,
        tipoOperacion: '',
        mensajeOk: '',
        detalleOperacion: ''
    }

    getDocentes = () =>{
        axios.get(urlApi+'list').then(response =>{
            this.setState({data: response.data});
        }).catch(err=>{
            // this.setState({tipoErro: 'listar'})
            // this.setState({detalleError: 'Tipo error '+err})
            // this.setState({modalError: true})
        })
    }

    setDocente =async () =>{
        await axios.post(urlApi+'crear', this.state.form).then(response =>{
            this.getDocentes();
        }).catch(err=>{
            this.setState({tipoErro: 'agregar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    updateMateria=()=>{
        axios.put(urlApi+this.state.form.id, this.state.form).then(response=>{
            this.getDocentes()
            this.setState({
                form: {
                    id: '',
                    nombre: '',
                    apellido: '',
                    cedula: '',
                    telefono: '',
                    correo: '',
                    materia: '',
                    tutor: ''
                }
            })
        }).catch(err=>{
            this.setState({tipoErro: 'editar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    deleteDocente=()=>{
        axios.delete(urlApi+this.state.form.id).then(response=>{
            this.setState({modalAdvertencia:false});
            this.getDocentes();
        }).catch(err=>{
            this.setState({modalAdvertencia: false})
            this.setState({tipoErro: 'eliminar'})
            this.setState({detalleError: 'Error de tipo '+err})
            this.setState({modalError: true})
        })
    }

    modalAgregarClose=()=>{
        this.setState({validarForm: {}})
        this.setState({isSubmit: false})
        this.setState({
            form: {
                id: '',
                nombre: '',
                apellido: '',
                cedula: '',
                telefono: '',
                correo: '',
                curso: '',
                paralelo: ''
            }
        })
    }

    handleOnChange = async (evt)=>{
        const {name, value} = evt.target;
        await this.setState({
            form:{
                ...this.state.form,
                [name]: value,
            }
        })
    }

    handleBlur = async (evt) =>{
        await this.handleOnChange(evt)
        let returnValidar = this.validarForm(this.state.form);
        this.setState({validarForm: returnValidar})
    }

    docenteSlect=(estudiante)=>{
        this.setState({
            tipoModal: 'actulizar',
            form: {
                id: estudiante.id,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                cedula: estudiante.cedula,
                telefono: estudiante.telefono,
                correo: estudiante.correo,
                materia: estudiante.materia,
                paralelo: estudiante.paralelo
            }
        })
    }

    validarForm = (val) => {

        let errores = {}

        if (!val.id) {
            errores.id = 'El ID es requerido'
            errores.estadoId = 0
        }else {
            errores.estadoId = 1
        }
        if (!val.nombre) {
            errores.estadoNombre = 0
            errores.nombre = 'El nombre es requerido'
        }else {
            errores.estadoDes = 1
        }

        if (!val.apellido) {
            errores.apellido = 'El apepellido es requerido'
            errores.estadoAplellido = 0
        }else {
            errores.estadoAplellido = 1
        }

        if (!val.cedula) {
            errores.cedula = 'El cedula es requerida'
            errores.estadoCedula = 0
        }else {
            errores.estadoCedula = 1
        }

        if (!val.telefono) {
            errores.telefono = 'El telefono es requerido'
            errores.estadoTelefono = 0
        }else {
            errores.estadoTelefono = 1
        }

        if (!val.correo) {
            errores.correo = 'El correo es requerido'
            errores.estadoCorreo = 0
        }else {
            errores.estadoCorreo = 1
        }

        if (!val.materia) {
            errores.materia = 'La Materia es requerida'
            errores.estadoMateria = 0
        }else {
            errores.estadoMateria = 1
        }

        if (!val.tutor) {
            errores.tutor = 'El estado de Tutor es requerido'
            errores.estadoTutor = 0
        }else {
            errores.estadoTutor = 1
        }

        return errores;
    }

    preSubmit = () =>{

        if(this.state.validarForm.estadoId === 0 ||
            this.state.validarForm.estadoNombre === 0 ||
            this.state.validarForm.estadoAplellido === 0 ||
            this.state.validarForm.estadoCedula === 0 ||
            this.state.validarForm.estadoTelefono === 0 ||
            this.state.validarForm.estadoCorreo === 0 ||
            this.state.validarForm.estadoMateria === 0 ||
            this.state.validarForm.estadoTutor === 0){

            this.setState({isSubmit: true})

        }else {
            this.setState({modalAgregar:false})
            if (this.state.tipoModal==='insertar'){
                this.setDocente();
                this.setState({allOk: true})
                this.setState({mensajeOk: 'Los datos han sido registrados correctamente'})
                this.setState({detalleOperacion: 'Nuevo alumno ingresado: '+this.state.form.nombre+' '+this.state.form.apellido})
            }else {
                this.updateMateria();
                this.setState({allOk: true})
                this.setState({mensajeOk: 'Los cambios han sido registrados correctamente'})
                this.setState({detalleOperacion: 'Alumno editado: '+this.state.form.nombre+' '+this.state.form.apellido})
            }
        }
    }

    componentDidMount() {
        this.getDocentes();
    }

    render() {
        return(
            <>
                <NavBar></NavBar>

                <Button
                    color="success"
                    onClick={
                        ()=>{
                            this.setState({tipoModal:'insertar'});
                            this.setState({modalAgregar:true})
                        }}
                >Agregar Docente</Button>

                <Modal isOpen={this.state.modalAgregar}>
                    <ModalHeader>{this.state.tipoModal.trim().replace(/^\w/, (c) => c.toUpperCase())} Docente</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input
                                className="form-control"
                                type="text"
                                name="id"
                                id="id"
                                value={this.state.form?this.state.form.id:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.id && this.state.isSubmit && <p>{this.state.validarForm.id}</p>}
                            <br/>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombre"
                                id="nombre"
                                value={this.state.form?this.state.form.nombre:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.nombre && this.state.isSubmit && <p>{this.state.validarForm.nombre}</p>}
                            <br/>
                            <label htmlFor="apellido">Apellido</label>
                            <input
                                className="form-control"
                                type="text"
                                name="apellido"
                                id="apellido"
                                value={this.state.form?this.state.form.apellido:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.apellido && this.state.isSubmit && <p>{this.state.validarForm.apellido}</p>}
                            <br/>
                            <label htmlFor="cedula">Cedula</label>
                            <input
                                className="form-control"
                                type="text"
                                name="cedula"
                                id="cedula"
                                value={this.state.form?this.state.form.cedula:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.cedula && this.state.isSubmit && <p>{this.state.validarForm.cedula}</p>}
                            <br/>
                            <label htmlFor="telefono">Telefono</label>
                            <input
                                className="form-control"
                                type="text"
                                name="telefono"
                                id="telefono"
                                value={this.state.form?this.state.form.telefono:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.telefono && this.state.isSubmit && <p>{this.state.validarForm.telefono}</p>}
                            <br/>
                            <label htmlFor="correo">Correo</label>
                            <input
                                className="form-control"
                                type="text"
                                name="correo"
                                id="correo"
                                value={this.state.form?this.state.form.correo:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.correo && this.state.isSubmit && <p>{this.state.validarForm.correo}</p>}
                            <br/>
                            <label htmlFor="materia">Materia</label>
                            <input
                                className="form-control"
                                type="text"
                                name="materia"
                                id="materia"
                                value={this.state.form?this.state.form.materia:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.materia && this.state.isSubmit && <p>{this.state.validarForm.materia}</p>}
                            <br/>
                            <label htmlFor="tutor">Tutor</label>
                            <input
                                className="form-control"
                                type="text"
                                name="tutor"
                                id="tutor"
                                value={this.state.form?this.state.form.tutor:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.tutor && this.state.isSubmit && <p>{this.state.validarForm.tutor}</p>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal==='insertar'?
                            <button className="btn btn-success" onClick={()=> {this.preSubmit()}}>Confirmar</button>:
                            <button className="btn btn-primary" onClick={()=> {this.preSubmit()}}>Guardar</button>
                        }
                        <button className="btn btn-danger" onClick={()=>{this.setState({modalAgregar:false}); this.modalAgregarClose()}}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalError}>
                    <ModalHeader><FontAwesomeIcon icon={faFaceSadTear}/> Error</ModalHeader>
                    <ModalBody>
                        <p>Se a producido un error al tratar de {this.state.tipoErro} los datos</p>
                        <br/>
                        <small>Detalle: <br/> {this.state.detalleError}</small>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>{this.setState({modalError:false})}}>Ok</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.allOk}>
                    <ModalHeader><FontAwesomeIcon icon={faThumbsUp}/> Operacion Exitosa</ModalHeader>
                    <ModalBody>
                        <p>{this.state.mensajeOk}</p>
                        <br/>
                        <small>Detalle: <br/> {this.state.detalleOperacion}</small>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>{this.setState({allOk:false})}}>Ok</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalAdvertencia}>
                    <ModalHeader><FontAwesomeIcon icon={faTriangleExclamation}/> Advertencia</ModalHeader>
                    <ModalBody>
                        ¿Esta seguro de eliminar al docente {this.state && this.state.form.nombre && this.state.form.apellido}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>{this.deleteDocente()}}>Si</button>
                        <button className="btn btn-secondary" onClick={()=>this.setState({modalAdvertencia: false})}>No</button>
                    </ModalFooter>
                </Modal>

                <header>
                    <div className="container-tab table-responsive">
                        <table className="table table-striped table-light">
                            <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Cedula</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                                <th>ID Materia</th>
                                <th>Estado Tutor</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.data.map(docentes =>{
                                return(
                                    <tr>
                                        <td>{docentes.id}</td>
                                        <td>{docentes.nombre}</td>
                                        <td>{docentes.apellido}</td>
                                        <td>{docentes.cedula}</td>
                                        <td>{docentes.telefono}</td>
                                        <td>{docentes.correo}</td>
                                        <td>{docentes.materia}</td>
                                        <td>{docentes.tutor}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={
                                                    ()=>{
                                                        this.docenteSlect(docentes);
                                                        this.setState({modalAgregar: !this.state.modalAgregar})
                                                    }}
                                            >
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </button>
                                            {"    "}
                                            <button
                                                className="btn btn-danger"
                                                onClick={
                                                    ()=>{
                                                        this.docenteSlect(docentes);
                                                        this.setState({modalAdvertencia: true})
                                                    }}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </header>
            </>
        )
    }
}

export default Docentes