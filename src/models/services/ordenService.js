import { ordenesDao as ordenesApi } from "../daos/index.js";

class ordenesService {
    constructor() { }

    async generarOrden(items, email) {
        try {
            return await ordenesApi.generarOrden(items, email);
        } catch (error) {
            console.error(error);
        }
    }
}

export default ordenesService