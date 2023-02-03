import mongoose from 'mongoose';
import logger from '../../config/logger.js'


class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async obtenerPorId(id) {
        try {
            const registro = await this.coleccion.find({ id: id });
            if (registro.length > 0) {
                return registro;
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async borrarPorId(id) {
        try {
            const registroBuscado = await this.obtenerPorId(id);
            if (registroBuscado) {
                await this.coleccion.deleteOne({ id: id });
                logger.info("Registro borrado")
            } else {
                logger.info("No se encuentra el registo para borrar")
            }
            return registroBuscado;
        } catch (error) {
            logger.error(error);
        }
    }

    async obtenerTodo() {
        try {
            const registros = await this.coleccion.find({});
            if (registros.length > 0) {
                logger.info('--Mostrando registros--');
            } else {
                logger.info("No hay resgistros");
            }
            return registros;
        } catch (error) {
            logger.error(error);
        }
    }

    async guardarProducto(objeto) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let ultimoId = 0;
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id > ultimoId) {
                        ultimoId = registros[i].id;
                    }
                }
                objeto["id"] = (ultimoId + 1);
                logger.info(ultimoId + 1);
            } else {
                objeto["id"] = 1;
            }
            objeto.timestamp = Date.now();
            await this.coleccion.collection.insertOne(objeto);
            return "Producto guardado";
        } catch (error) {
            logger.error(error);
        }
    }

    async obtenerProductosPorCategoria(category) {
        try {
            const registros = await this.coleccion.find({ category: { $eq: category } });
            if (registros.length > 0) {
                return registros;
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async actualizarProducto(elem, id) {
        try {
            const registroBuscado = await this.obtenerPorId(id);
            if (registroBuscado) {
                await this.coleccion.updateOne({ id: id }, {
                    $set: {
                        title: elem.title,
                        description: elem.description,
                        code: elem.code,
                        thumbnail: elem.thumbnail,
                        price: elem.price,
                        stock: elem.stock,
                        category: elem.category
                    }
                });
                return "Producto actualizado";
            } else {
                return "Producto no encontrado";
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async crearCarrito(objeto, email, address) {
        try {
            const registros = await this.obtenerTodo();
            const today = new Date();
            if (registros.length > 0) {
                let ultimoId = 0;
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id > ultimoId) {
                        ultimoId = registros[i].id;
                    }
                }
                objeto["id"] = (ultimoId + 1);
                logger.info(ultimoId + 1);
            } else {
                objeto["id"] = 1;
            }
            objeto.timestamp = Date.now();
            objeto.dateTime = today.toLocaleString();
            objeto.productos = [];
            objeto.email = email;
            objeto.address = address;
            await this.coleccion.collection.insertOne(objeto);
            return 'Carrito creado'
        } catch (error) {
            logger.error(error);
        }
    }

    async insertarProdEnCarrito(objeto, idCarrito) {
        try {
            const carritos = await this.obtenerTodo();
            if (carritos.length > 0) {
                let idEncontrado = false;
                let pos;
                let repetido = false;

                //busco pos del carrito
                for (let i = 0; i < carritos.length; i++) {
                    if (carritos[i].id == idCarrito) {
                        idEncontrado = true;
                        pos = i;
                    }
                }

                if (idEncontrado) {

                    //producto repetido
                    carritos[pos].productos.forEach(prod => {
                        if (prod.id == objeto.id) {
                            prod.amount++;
                            repetido = true;
                        }
                    })

                    if (!repetido) {
                        let prodNuevo = [];
                        carritos[pos].productos.push(objeto);
                        prodNuevo = carritos[pos].productos;
                        await this.coleccion.updateOne({ id: idCarrito }, {
                            $set: {
                                productos: prodNuevo
                            }
                        });
                    } else {
                        await this.coleccion.updateOne({ id: idCarrito }, {
                            $set: {
                                productos: carritos[pos].productos
                            }
                        });
                    }
                    logger.info('Producto insertado en el carrito')
                } else {
                    logger.info('carrito no encontrado');
                }
            } else {
                logger.info("Carrito no encontrado")
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async borrarProdDeCarrito(idProducto, idCarrito) {
        try {
            const carritos = await this.obtenerTodo();
            if (carritos.length > 0) {
                let idCarritoEncontrado = false;
                let idProductoEncontrado = false;
                let posProd = 0;
                let posCarrito = 0;
                let j = 0;
                let repetido = false;

                //busco pos del carrito
                for (let i = 0; i < carritos.length; i++) {
                    if (carritos[i].id == idCarrito) {
                        idCarritoEncontrado = true;
                        posCarrito = i;
                    }
                }

                //busco pos del producto
                await carritos[posCarrito].productos.forEach(element => {
                    if (element.id == idProducto) {
                        idProductoEncontrado = true;
                        posProd = j;
                    }
                    j++;
                });

                if (idCarritoEncontrado && idProductoEncontrado) {

                    //producto repetido
                    carritos[posCarrito].productos.forEach(prod => {
                        if (prod.amount >= 2) {
                            prod.amount--;
                            repetido = true;
                        }
                    })

                    if (!repetido) {
                        let prodNuevo = [];
                        carritos[posCarrito].productos.splice(posProd, 1);
                        prodNuevo = carritos[posCarrito].productos;
                        await this.coleccion.updateOne({ id: idCarrito }, {
                            $set: {
                                productos: prodNuevo
                            }
                        });
                    } else {
                        await this.coleccion.updateOne({ id: idCarrito }, {
                            $set: {
                                productos: carritos[posCarrito].productos
                            }
                        });
                    }

                    return "Producto eliminado del carrito";
                } else {
                    return "ids no encontrados";
                }
            } else {
                logger.info("Archivo vacío");
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async generarOrden(items, email) {
        try {
            const today = new Date();
            let objeto = {}
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let ultimaOrden = 0;
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].email == email) {
                        if (registros[i].nro_orden > ultimaOrden) {
                            ultimaOrden = registros[i].nro_orden;
                        }
                    } 
                }
                objeto["nro_orden"] = (ultimaOrden + 1);
                logger.info(ultimaOrden + 1);
            } else {
                objeto["nro_orden"] = 1;
            }
            objeto.items = items;
            objeto.dateTime = today.toLocaleString();
            objeto.status = "generada";
            objeto.email = email;
            await this.coleccion.collection.insertOne(objeto);
            return objeto["nro_orden"];
        } catch (error) {
            logger.error(error);
        }
    }

    async guardarMensaje(objeto) {
        try {
            if (objeto) {
                await this.coleccion.collection.insertOne(objeto);
                return "Mensaje guardado"
            } else {
                return "Mensaje vacio"
            }

        } catch (error) {
            logger.error(error);
        }

    }
}


export default ContenedorMongoDb;