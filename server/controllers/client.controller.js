const Client = require("../models/client.model");
const jwt = require('jsonwebtoken')

module.exports = {
    createClient: async (req, res) => {
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            req.body.userId = decodedJwt.payload._id;
            console.log('createclient:', req.body);
            const client = await Client.create(req.body);
            res.status(201).json(client);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    getAllClients: (req, res) => {
        Client.find()
        .then((clients) => res.json(clients))
        .catch((err) => res.status(500).json(err));
    },

    
    getOneClient: (req, res) => {
        Client.findOne({ _id: req.params.id })
        .then((oneClient) => res.json(oneClient))
        .catch((err) => res.status(500).json(err));
    },
    
    updateClient: (req, res) => {
        Client.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
        )
        .then((client) => res.json(client))
        .catch((err) => res.status(500).json(err));
    },

    deleteClient: (req, res) => {
        Client.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Client deleted."))
        .catch((err) => res.status(500).json(err));
    }
}