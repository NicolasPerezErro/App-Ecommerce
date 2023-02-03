export default class productosDto {
    constructor(datos) {
        this.id = datos.id;
        this.category = datos.category;
        this.title = datos.title;
        this.price = datos.price;
        this.stock = datos.stock;
        this.description = datos.description;
        this.thumbnail = datos.thumbnail;
        
    }
}

export function asDtoProd(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new productosDto(p)) // p es la clase productosDto
    else
        return new productosDto(prod)
}