const express = require("express");
const UserSchema = require("../models/usersmodel");
const router = express.Router();

// Crear usuario

router.post('/crearusuario', (req, res) => {
    const user = UserSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Mostrar todos los usuarios

router.get('/usuarios', (req, res) => {
    UserSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Mostrar un usuario especifico

router.get('/usuario/:id', (req, res) => {
    const { id } = req.params;
    UserSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Actualizar un usuario especifico

router.put("/actusuario/:id", (req, res) => {
    const { id } = req.params;
    const { username, description, name, email } = req.body;
    UserSchema
        .updateOne({ _id: id }, { $set: { username, description, name, email } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Eliminar un usuario

router.delete("/eliminarusuario/:id", (req, res) => {
    const { id } = req.params;
    UserSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;