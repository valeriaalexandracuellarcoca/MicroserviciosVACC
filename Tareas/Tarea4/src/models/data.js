//simulación de una base de datos en memoria
let productos = [
    { id: 1, nombre: 'Laptop HP', descripcion: 'Laptop de 15 pulgadas', marca: 'HP', stock: 50 },
    { id: 2, nombre: 'Teclado Mecánico', descripcion: 'Teclado con switches Cherry MX', marca: 'Corsair', stock: 100 },
];

let clientes = [
    { id: 1, ci: '1234567', nombres: 'Juan', apellidos: 'Perez', sexo: 'M' },
    { id: 2, ci: '7654321', nombres: 'Ana', apellidos: 'Gomez', sexo: 'F' },
];

let facturas = [
    { id: 1, fecha: '2025-09-04', cliente_id: 1 },
];

let detallesFacturas = [
    { id: 1, factura_id: 1, producto_id: 1, cantidad: 1, precio: 1200.50 },
    { id: 2, factura_id: 1, producto_id: 2, cantidad: 1, precio: 150.00 },
];

module.exports = {
    productos,
    clientes,
    facturas,
    detallesFacturas,
};