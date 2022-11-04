const express = require("express");
const TuitSchema = require("../models/tuitsmodel");
const UserSchema = require("../models/usersmodel");
const router = express.Router();

// crear un tuit

router.post('/tuitear', async (req, res) => {
    const user = await TuitSchema(req.body);
    user.likes = undefined;
    user.date = new Date();
    const aux = await UserSchema.findById(user.valecita);
    if (aux == null || aux == undefined) {
        res.json("este usuario no existe");
    } else {
        await user
            .save()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
        await UserSchema
            .updateOne({ _id: user.valecita }, { $push: { 'tuits': { text: user.text, date: user.date, likes: 0, _id: user._id } } });
    }
})

// ver todos los tuits

router.get("/tuits", (req, res) => {
    TuitSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// ver todos los tuits de un usuario especifico

router.get("/tuitsde/:id", async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        res.json("este tuit no existe");
    } else {
        const user = await UserSchema.findById(id);
        if (user == null || user == undefined) {
            res.json({ message: "Este usuario no existe" });
        } else {
            if (user.tuits.length === 0) {
                res.json({ message: "Este usuario no tiene ningun tuit" });
            } else {
                res.send(`tuits de ${user.name} (${user.username}): \t${user.tuits}`);
            }
        }
    }
});

// editar un tuit

router.put("/edittuit/:id", async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (id.length !== 24) {
        res.json("este tuit no existe");
    } else {
        const aux = await TuitSchema.findById(id);
        if (aux == null || aux == undefined) {
            res.json({ message: "este tuit no existe" });
        } else {
            await UserSchema
                .updateOne({ _id: aux.valecita }, { $set: { 'tuits': { _id: id, text: text, date: aux.date, megustan: aux.likes } } });
            await TuitSchema
                .updateOne({ _id: id }, { $set: { text: text } })
                .then((data) => res.json(data))
                .catch((error) => res.json({ message: error }));
        }
    }
});

// eliminar un tuit

router.delete("/borrartuit/:id", async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        res.json("este tuit no existe");
    } else {
        const aux = await TuitSchema.findById(id);
        if (aux == null || aux == undefined) {
            res.json({ message: "este tuit no existe" });
        } else {
            await UserSchema
                .updateOne({ _id: aux.valecita }, { $pull: { 'tuits': { _id: id } } });
            await TuitSchema
                .remove({ _id: id })
                .then((data) => res.json(data))
                .catch((error) => res.json({ message: error }));
        }
    }
});

module.exports = router;