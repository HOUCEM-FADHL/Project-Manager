const ClientController = require("../controllers/client.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get("/api/clients", authenticate, ClientController.getAllClients);
    app.post("/api/createClient", authenticate ,ClientController.createClient);
    app.get("/api/getOneClient/:id", authenticate, ClientController.getOneClient);
    app.patch("/api/updateClient/:id", authenticate, ClientController.updateClient);
    app.delete("/api/deleteClient/:id", authenticate, ClientController.deleteClient);
}