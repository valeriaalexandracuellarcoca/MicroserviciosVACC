
const { EntitySchema } = require("typeorm");

const Medico = new EntitySchema({
    name: "Medico",
    tableName: "medicos",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        nombre: {
            type: "varchar",
        },
        apellido: {
            type: "varchar",
        },
        cedula_profesional: {
            type: "varchar",
            unique: true,
        },
        especialidad: {
            type: "varchar",
        },
        anios_de_experiencia: {
            type: "int",
        },
        correo_electronico: {
            type: "varchar",
            unique: true,
        },
    },
});

module.exports = Medico;
