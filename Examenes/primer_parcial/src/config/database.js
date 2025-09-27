
require("reflect-metadata");
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "", 
    database: process.env.DB_DATABASE || "medicos_db",
    entities: [__dirname + "/../entities/*.js"],
    synchronize: true, 
});

module.exports = {
    AppDataSource
};
