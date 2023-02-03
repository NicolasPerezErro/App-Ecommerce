export default class productosCarritoDto {
    constructor(datos) {
        this.id = datos.id;
        this.title = datos.title;
        this.price = datos.price;
        this.amount = 1;
    }
}

export function asDtoProdCarrito(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new productosCarritoDto(p)) // p es la clase productosDto
    else
        return new productosCarritoDto(prod)
}