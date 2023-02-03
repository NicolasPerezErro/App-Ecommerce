import { mensajesDao as mensajesApi } from "../daos/index.js";

class mensajesService {
    constructor() { }

    async obtenerMensajes() {
        try {
            return await mensajesApi.obtenerTodo();
        } catch (error) {
            console.error(error);
        }
    }
}

export default mensajesService