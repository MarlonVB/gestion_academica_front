import axios from "axios";

const getMateria = async (state) => {
    const peticion = await axios.get('https://api-ademicobd.herokuapp.com/materia/list')
    state(peticion.data)
}

export {
    getMateria
}