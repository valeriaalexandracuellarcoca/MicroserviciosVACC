
const express = require("express");
const { AppDataSource } = require("./src/config/database");
const medicoRoutes = require("./src/rutas/medico.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", medicoRoutes);

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Se conecto a la BD");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

main();
