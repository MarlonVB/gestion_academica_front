import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/CardOptions.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrashAlt,
    faTriangleExclamation,
    faFaceSadTear,
    faThumbsUp,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import NavBar from "./NavBar";
import '../components/styles/MateriaStyles.css';

const urlApi = 'https://api-ademicobd.herokuapp.com/materia/'

class Materias extends React.Component{

    state= {
        data: [],
        modalAgregar: false,
        modalAdvertencia: false,
        modalError: false,
        tipoErro: '',
        detalleError: '',
        form: {
            id: '',
            descripcion: '',
            departamento: ''
        },
        tipoModal: '',
        validarForm: {},
        isSubmit: false,
        allOk: false,
        tipoOperacion: '',
        mensajeOk: '',
        detalleOperacion: ''
    }

    getMaterias = () =>{
        axios.get(urlApi+'list').then(response =>{
            this.setState({data: response.data});
        }).catch(err=>{
            this.setState({tipoErro: 'listar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    setMaterias =async () =>{
        await axios.post(urlApi+'crear', this.state.form).then(response =>{
            this.getMaterias();
        }).catch(err=>{
            this.setState({tipoErro: 'agregar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    updateMateria=()=>{
        axios.put(urlApi+this.state.form.id, this.state.form).then(response=>{
            this.getMaterias()
            this.setState({
                form:{
                    id: '',
                    descripcion: '',
                    departamento: ''
                }
            })
        }).catch(err=>{
            this.setState({tipoErro: 'editar'})
            this.setState({detalleError: 'Tipo error '+err})
            this.setState({modalError: true})
        })
    }

    deleteMaterias=()=>{
        axios.delete(urlApi+this.state.form.id).then(response=>{
            this.setState({modalAdvertencia:false});
            this.getMaterias();
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
            form:{
                id: '',
                descripcion: '',
                departamento: ''
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

    validarForm = (val) => {
        let errores = {}
        console.log('ID '+val.id.toString())
        if (!val.id.toString().trim()) {
            errores.id = 'El ID es requerido'
            errores.estadoId = 0
        }else {
            errores.estadoId = 1
        }
        if (!val.descripcion.toString().trim()) {
            console.log('entro err des')
            errores.estadoDes = 0
            errores.descripcion = 'La descripcion es requerida'
        }else {
            errores.estadoDes = 1
        }
        if (!val.departamento.toString().trim()) {
            console.log('entro err dep')
            errores.departamento = 'El departamento es requerido'
            errores.estadoDep = 0
        }else {
            errores.estadoDep = 1
        }

        return errores;
    }

    preSubmit = () =>{
        if(this.state.validarForm.estadoId === 0 || this.state.validarForm.estadoDes === 0 || this.state.validarForm.estadoDep === 0){
            this.setState({isSubmit: true})
            console.log("EXISTEN ERRORES")
        }else {
            this.setState({modalAgregar:false})
            if (this.state.tipoModal==='insertar'){
                this.setMaterias();
                this.setState({allOk: true})
                this.setState({mensajeOk: 'Los datos han sido registrados correctamente'})
                this.setState({detalleOperacion: 'Nueva asignatura registrada: '+this.state.form.descripcion})
            }else {
                this.updateMateria();
                this.setState({allOk: true})
                this.setState({mensajeOk: 'Los cambios han sido registrados correctamente'})
                this.setState({detalleOperacion: 'Asignatura editada: '+this.state.form.descripcion})
            }
        }
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
                <NavBar></NavBar>
                <header className="super-container">
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
                                    onChange={(event)=>this.handleOnChange(event)}
                                    value={this.state.form?this.state.form.id:''}
                                    onBlur={(e)=>{this.handleBlur(e)}}/>
                                {this.state.validarForm.id && this.state.isSubmit && <p>{this.state.validarForm.id}</p>}
                                <br/>
                                <label htmlFor="descripcion">Descripcion</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="descripcion"
                                    id="descripcion"
                                    onChange={(event)=>this.handleOnChange(event)}
                                    value={this.state.form?this.state.form.descripcion:''}
                                    onBlur={(e)=>{this.handleBlur(e)}}/>
                                {this.state.validarForm.descripcion && this.state.isSubmit && <p>{this.state.validarForm.descripcion}</p>}
                                <br/>
                                <label htmlFor="departamento">Departamento</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="departamento"
                                    id="departamento"
                                    onChange={(event)=>this.handleOnChange(event)}
                                    value={this.state.form?this.state.form.departamento:''}
                                    onBlur={(e)=>{this.handleBlur(e)}}/>
                                {this.state.validarForm.departamento && this.state.isSubmit && <p>{this.state.validarForm.departamento}</p>}
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

                    <di className="container text-center">
                        <Button
                            color="success"
                            onClick={
                            ()=>{
                                this.setState({tipoModal:'insertar'});
                                this.setState({modalAgregar:true})
                            }}>
                            <FontAwesomeIcon icon={faPlus}/>
                            Agregar Materia</Button>

                        <div className="row table-responsive">
                            <div className="col">
                                <table className="table table-striped table-light">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Descripcion</th>
                                        <th>Departamento</th>
                                        <th></th>
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
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={
                                                            ()=>{
                                                                this.materiaSeleccion(materia);
                                                                this.setState({modalAgregar: !this.state.modalAgregar})
                                                            }}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                    {"    "}
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={
                                                            ()=>{
                                                                this.materiaSeleccion(materia);
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
                    </di>
                </header>
            </>
        )
    }
}

export default Materias