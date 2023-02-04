export default class mensajesDto {
    constructor(datos) {
        this.email = datos.email;
        this.dateTime = datos.dateTime;
        this.type = datos.type;
        this.body = datos.body;
    }
}

export function asDtoMess(mess) {
    if (Array.isArray(mess))
        return mess.map(p => new mensajesDto(p)) // p es la clase productosDto
    else
        return new carritosDto(mess)
}