import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFaceSadTear, faThumbsUp, faTrashAlt, faTriangleExclamation, faPlus} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Estudiantes.css';

const urlApi = 'https://api-ademicobd.herokuapp.com/estudiante/'

class Estudiantes extends React.Component{

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
            curso: '',
            paralelo: ''
        },
        tipoModal: '',
        validarForm: {},
        isSubmit: false,
        allOk: false,
        tipoOperacion: '',
        mensajeOk: '',
        detalleOperacion: ''
    }

    getEstudiantes = () =>{
        axios.get(urlApi+'list').then(response =>{
            this.setState({data: response.data});
        }).catch(err=>{
            this.setState({tipoErro: 'listar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    setEstudiantes = async () =>{
        await axios.post(urlApi+'crear', this.state.form).then(response =>{
            this.getEstudiantes();
        }).catch(err=>{
            this.setState({tipoErro: 'agregar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    updateMateria=()=>{
        axios.put(urlApi+this.state.form.id, this.state.form).then(response=>{
            this.getEstudiantes()
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
        }).catch(err=>{
            this.setState({tipoErro: 'editar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    deleteEstudiante=()=>{
        axios.delete(urlApi+this.state.form.id).then(response=>{
            this.setState({modalAdvertencia:false});
            this.getEstudiantes();
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

    estudianteSlect=(estudiante)=>{
        this.setState({
            tipoModal: 'actulizar',
            form: {
                id: estudiante.id,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                cedula: estudiante.cedula,
                telefono: estudiante.telefono,
                correo: estudiante.correo,
                curso: estudiante.curso,
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

        if (!val.curso) {
            errores.curso = 'El curso es requerido'
            errores.estadoCurso = 0
        }else {
            errores.estadoCurso = 1
        }

        if (!val.paralelo) {
            errores.paralelo = 'El paralelo es requerido'
            errores.estadoParalelo = 0
        }else {
            errores.estadoParalelo = 1
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
            this.state.validarForm.estadoCurso === 0 ||
            this.state.validarForm.estadoParalelo === 0){

            this.setState({isSubmit: true})

        }else {
            this.setState({modalAgregar:false})
            if (this.state.tipoModal==='insertar'){
                this.setEstudiantes();
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
        this.getEstudiantes();
    }

    render(){
        return(
            <header>
                <NavBar></NavBar>
                <Modal isOpen={this.state.modalAgregar}>
                    <ModalHeader>Agregar nueva Asignatura</ModalHeader>
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
                            <label htmlFor="curso">Curso</label>
                            <input
                                className="form-control"
                                type="text"
                                name="curso"
                                id="curso"
                                value={this.state.form?this.state.form.curso:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.curso && this.state.isSubmit && <p>{this.state.validarForm.curso}</p>}
                            <br/>
                            <label htmlFor="paralelo">Paralelo</label>
                            <input
                                className="form-control"
                                type="text"
                                name="paralelo"
                                id="paralelo"
                                value={this.state.form?this.state.form.paralelo:''}
                                onChange={(event)=>this.handleOnChange(event)}
                                onBlur={(e)=>{this.handleBlur(e)}}/>
                            {this.state.validarForm.paralelo && this.state.isSubmit && <p>{this.state.validarForm.paralelo}</p>}
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
                        ¿Esta seguro de eliminar al estudiante {this.state && this.state.form.nombre && this.state.form.apellido}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>{this.deleteEstudiante()}}>Si</button>
                        <button className="btn btn-secondary" onClick={()=>this.setState({modalAdvertencia: false})}>No</button>
                    </ModalFooter>
                </Modal>

                <div className="container text-center">
                    <Button
                        className="button-add"
                        color="success"
                        onClick={
                            ()=>{
                                this.setState({tipoModal:'insertar'});
                                this.setState({modalAgregar:true})
                            }}>
                        <FontAwesomeIcon icon={faPlus}/>
                        Agregar Estudiante</Button>

                    <div className="row table-responsive">
                        <div className="col">
                                <table className="table table-striped table-light">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Cedula</th>
                                        <th>Telefono</th>
                                        <th>Correo</th>
                                        <th>Curso</th>
                                        <th>Paralelo</th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {this.state.data.map(estudiante =>{
                                        return(
                                            <tr>
                                                <td>{estudiante.id}</td>
                                                <td>{estudiante.nombre}</td>
                                                <td>{estudiante.apellido}</td>
                                                <td>{estudiante.cedula}</td>
                                                <td>{estudiante.telefono}</td>
                                                <td>{estudiante.correo}</td>
                                                <td>{estudiante.curso}</td>
                                                <td>{estudiante.paralelo}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={
                                                            ()=>{
                                                                this.estudianteSlect(estudiante);
                                                                this.setState({modalAgregar: !this.state.modalAgregar})
                                                            }}>

                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                    {"    "}
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={
                                                            ()=>{
                                                                this.estudianteSlect(estudiante);
                                                                this.setState({modalAdvertencia: true})
                                                            }}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                        </div>
                    </div>

                </div>
            </header>
        )
    }
}

export default Estudiantes