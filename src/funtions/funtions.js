import axios from "axios";

const getMateria = async () => {
    const peticion = await axios.get('https://api-ademicobd.herokuapp.com/materia/list')
    console.log(peticion.data)
}

export {
    getMateria
}