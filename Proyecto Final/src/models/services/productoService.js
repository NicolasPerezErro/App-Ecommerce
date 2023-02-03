import { productosDao as productosApi } from "../daos/index.js";

class productosService {

    constructor() { }

    async obtenerProductoPorId(id) {
        try {
            return await productosApi.obtenerPorId(id)
        } catch (error) {
            console.error(error);
        }
    }

    async obtenerTodoProductos() {
        try {
            return await productosApi.obtenerTodo();
        } catch (error) {
            console.error(error);
        }
    }

    async guardarProducto(body) {
        try {
            return await productosApi.guardarProducto(body);
        } catch (error) {
            console.error(error);
        }
    }

    async actualizarProducto(body, id) {
        try {
            return await productosApi.actualizarProducto(body, id);
        } catch (error) {
            console.error(error);
        }
    }

    async borrarProductoPorId(id) {
        try {
            return await productosApi.borrarPorId(id);
        } catch (error) {
            console.error(error);
        }
    }

    async obtenerProductosPorCategoria(category){
        try {
            return await productosApi.obtenerProductosPorCategoria(category)
        } catch (error) {
            console.error(error);
        }
    }

}

export default productosService