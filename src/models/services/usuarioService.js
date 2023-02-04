import { usuariosDao as usuariosApi } from "../daos/index.js";

class usuariosService{
    constructor() { }

    async obtenerUsuarios() {
        try {
            return await usuariosApi.obtenerTodo();
        } catch (error) {
            console.error(error);
        }
    }


}

export default usuariosService