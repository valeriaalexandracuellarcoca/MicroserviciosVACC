"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var data_source_1 = require("./data-source");
var agendaRoutes_1 = __importDefault(require("./routes/agendaRoutes"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// Middleware para habilitar CORS
app.use((0, cors_1.default)());
// Middleware para parsear JSON en las solicitudes
app.use(express_1.default.json());
// Rutas de la API
app.use("/api", agendaRoutes_1.default);
// Servir archivos estáticos del frontend
app.use(express_1.default.static("../frontend/public"));
// Inicializar la conexión a la base de datos y el servidor
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log("Conexión a la base de datos establecida correctamente.");
    app.listen(PORT, function () {
        console.log("Servidor Express escuchando en el puerto ".concat(PORT));
    });
})
    .catch(function (error) { return console.error("Error al conectar a la base de datos:", error); });
