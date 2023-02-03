export default class carritosDto {
    constructor(datos) {
        this.id = datos.id;
        this.dateTime = datos.dateTime;
        this.productos = datos.productos
        this.email = datos.email;
        this.address = datos.address;
    }
}

export function asDtoCarr(carr) {
    if (Array.isArray(carr))
        return carr.map(p => new carritosDto(p)) // p es la clase productosDto
    else
        return new carritosDto(carr)
}