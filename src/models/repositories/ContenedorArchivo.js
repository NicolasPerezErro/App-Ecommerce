import fs from 'fs'
import config from '../config/config.js'
import logger from '../logger/logger.js'

class ContenedorArchivo {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.vecObj = [];
    }

    // PROD Y CARRITO

    async obtenerPorId(id) {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            if (contenido.length > 0) {
                this.vecObj = JSON.parse(contenido, null, '\t');;
                let idEncontrado = false;
                let pos;
                for (let i = 0; i < this.vecObj.length; i++) {
                    if (this.vecObj[i].id == id) {
                        idEncontrado = true;
                        pos = i;
                    }
                }

                if (idEncontrado) {
                    return this.vecObj[pos];
                } else {
                    return null;
                }
            } else {
                logger.info("Archivo vacío");
            }
        } catch (error) {
            logger.error('Error de lectura')
            throw new Error('Error de lectura');
        }

    }

    async borrarPorId(id) {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    let idEncontrado = false;
                    let pos;
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id == id) {
                            idEncontrado = true;
                            pos = i;
                        }
                    }

                    if (idEncontrado) {
                        this.vecObj.splice(pos, 1);
                        await fs.promises.writeFile(`${config.fileSystem.path}${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                        logger.info("Objeto eliminado");
                    } else {
                        logger.info("id no encontrado");
                    }

                } else {
                    logger.info("Archivo vacío");
                }
            } catch (error) {
                logger.error('Error de escritura')
                throw new Error('Error de escritura');
            }

        } catch (error) {
            logger.error('Error de lectura')
            throw new error('Error de lectura');
        }
    }

    async borrarTodo() {
        const vecAux = await this.getAll();
        if (vecAux.length > 0) {
            vecAux.length = 0;
        }
        try {
            await fs.promises.writeFile(`${config.fileSystem.path}${this.nombreArchivo}`, `${JSON.stringify(vecAux, null, '\t')}`);
            logger.info('Todos los objetos fueron eliminados');
        } catch (error) {
            logger.error('Error de escritura')
            throw new Error('Error de escritura');
        }
    }

    // PROD

    async obtenerTodo() {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            if (contenido.length > 0) {
                this.vecObj = JSON.parse(contenido, null, '\t');
                return this.vecObj;
            } else {
                logger.info("Archivo vacío");
            }
        } catch (error) {
            logger.error('Error de lectura')
            throw new Error('Error de lectura');
        }

    }

    async guardarProducto(objeto) {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    let ultimoId = 0;
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id > ultimoId) {
                            ultimoId = this.vecObj[i].id;
                        }
                    }
                    objeto["id"] = (ultimoId + 1);
                    logger.info(ultimoId + 1);
                } else {
                    objeto["id"] = 1;
                }
                objeto.timestamp = Date.now();
                this.vecObj.push(objeto);
                await fs.promises.writeFile(`${config.fileSystem.path}${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                logger.info("Escritura exitosa");

            } catch (error) {
                logger.error('Error de escritura')
                throw new Error('Error de escritura');
            }
            return objeto.id;
        } catch (error) {
            logger.error('Error de lectura')
            throw new Error('Error de lectura');
        }
    }

    async actualizarProducto(objeto, id) {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    let idEncontrado = false;
                    let pos;
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id == id) {
                            idEncontrado = true;
                            pos = i;
                        }
                    }

                    if (idEncontrado) {
                        //this.vecObj[pos].timestamp = Date.now();
                        this.vecObj[pos].title = objeto.title;
                        this.vecObj[pos].price = objeto.price;
                        this.vecObj[pos].thumbnail = objeto.thumbnail;
                        this.vecObj[pos].description = objeto.description;
                        this.vecObj[pos].code = objeto.code;
                        this.vecObj[pos].stock = objeto.stock;
                    }

                } else {
                    logger.info('producto no encontrado');
                }
                await fs.promises.writeFile(`${config.fileSystem.path}${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                logger.info("Actualizacion exitosa");
            } catch (error) {
                logger.error('Error de escritura')
                throw new Error('Error de escritura');
            }
        } catch (error) {
            logger.error('Error de lectura')
            throw new Error('Error de lectura');
        }
    }

    // CARRITO

    async crearCarrito(objeto) {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    let ultimoId = 0;
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id > ultimoId) {
                            ultimoId = this.vecObj[i].id;
                        }
                    }
                    objeto["id"] = (ultimoId + 1);
                    logger.info(ultimoId + 1);
                } else {
                    objeto["id"] = 1;
                }
                objeto.timestamp = Date.now();
                objeto.productos = [];
                this.vecObj.push(objeto);
                await fs.promises.writeFile(`${config.fileSystem.path}${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                logger.info("Escritura exitosa");

            } catch (error) {
                logger.error('Error de escritura')
                throw new Error('Error de escritura');
            }
            return objeto.id;
        } catch (error) {
            logger.error('Error de lectura')
            throw new Error('Error de lectura');
        }
    }

    async insertarProdEnCarrito(objeto, idCarrito) {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    let idEncontrado = false;
                    let pos;

                    //busco pos del carrito
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id == idCarrito) {
                            idEncontrado = true;
                            pos = i;
                        }
                    }

                    if (idEncontrado) {
                        this.vecObj[pos].productos.push(objeto);
                    } else {
                        logger.info('carrito no encontrado');
                    }
                }
                await fs.promises.writeFile(`${config.fileSystem.path}${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                logger.info("producto agregado al carrito");
            } catch (error) {
                logger.error('Error de escritura')
                throw new Error('Error de escritura');
            }
        } catch (error) {
            logger.error('Error de lectura')
            throw new Error('Error de lectura');
        }
    }


    async borrarProdDeCarrito(idProducto, idCarrito) {
        try {
            const contenido = await fs.promises.readFile(`${config.fileSystem.path}${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    let idCarritoEncontrado = false;
                    let idProductoEncontrado = false;
                    let posProd = 0;
                    let posCarrito = 0;
                    let j = 0;

                    //busco pos del carrito
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id == idCarrito) {
                            idCarritoEncontrado = true;
                            posCarrito = i;
                        }
                    }

                    //busco pos del producto
                    this.vecObj[posCarrito].productos.forEach(element => {
                        if (element.id == idProducto) {
                            idProductoEncontrado = true;
                            posProd = j;
                        }
                        j++;
                    });

                    if (idCarritoEncontrado && idProductoEncontrado) {
                        this.vecObj[posCarrito].productos.splice(posProd, 1);
                        await fs.promises.writeFile(`${config.fileSystem.path}${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                        logger.info("producto eliminado del carrito");
                    } else {
                        logger.info("ids no encontrados");
                    }

                } else {
                    logger.info("Archivo vacío");
                }
            } catch (error) {
                logger.error('Error de escritura')
                throw new Error('Error de escritura');
            }

        } catch (error) {
            logger.error('Error de lectura')
            throw new Error('Error de lectura');
        }
    }


}

export default ContenedorArchivo;