import { carritosDao as carritosApi } from "../daos/index.js";

class carritosService {
    constructor() { }

    async obtenerTodosCarritos() {
        try {
            return await carritosApi.obtenerTodo();
        } catch (error) {
            console.error(error);
        }
    }

    async obtenerCarritoPorId(id) {
        try {
            return await carritosApi.obtenerPorId(id)

        } catch (error) {
            console.error(error);
        }
    }

    async crearCarrito(body, email, direccion) {
        try {
            return await carritosApi.crearCarrito(body, email, direccion)
        } catch (error) {
            console.error(error);
        }
    }

    async insertarProdEnCarrito(prod, idCarrito) {
        try {
            await carritosApi.insertarProdEnCarrito(prod, idCarrito);
        } catch (error) {
            console.error(error);
        }
    }

    async borrarCarritoPorId(id) {
        try {
            await carritosApi.borrarPorId(id);
        } catch (error) {
            console.error(error);
        }
    }

    async borrarProdDeCarrito(idProd, idCarrito) {
        try {
            await carritosApi.borrarProdDeCarrito(idProd, idCarrito);
        } catch (error) {
            console.error(error);
        }
    }

}

export default carritosService