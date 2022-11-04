const express = require("express");
const FollowerSchema = require("../models/followersmodel");
const UserSchema = require("../models/usersmodel");
const router = express.Router();

// seguir

router.post('/seguir', async (req, res) => {
    const seguir = await FollowerSchema(req.body);
    const aux = await UserSchema.findById(seguir.seguido)
    const aux2 = await UserSchema.findById(seguir.seguidor)
    if ((seguir.seguido === undefined || seguir.seguidor === undefined)) {
        res.json({ message: "Los ID's no estan definidos" })
    } else {
        if (seguir.seguido.toString() === seguir.seguidor.toString()) {
            res.json({ message: "Los ID's de seguidor y seguido son iguales" })
        } else {
            if (aux.seguidores.includes(aux2.username)) {
                res.json({ message: "El vinculo que se intenta crear ya existe" })
            } else {
                await UserSchema
                    .updateOne({ _id: seguir.seguido }, { $addToSet: { seguidores: aux2.username } })
                await UserSchema
                    .updateOne({ _id: seguir.seguidor }, { $addToSet: { seguidos: aux.username } })
                await seguir
                    .save()
                    .then((data) => res.json(data))
                    .catch((error) => res.json({ message: error }));
            }
        }
    }

})

// seguidores de un usuario

router.get("/seguidores/:id", async (req, res) => {
    const { id } = req.params;
    const aux = await UserSchema.findById(id)
    if (aux.seguidores.length === 0) {
        res.json({ message: "0 seguidores :(" })
    } else {
        res.json(`Seguidores de ` + aux.username + `: ` + aux.seguidores)
    }
});

// seguidos de un usuario especifico

router.get("/seguidos/:id", async (req, res) => {
    const { id } = req.params;
    const aux = await UserSchema.findById(id)
    if (aux.seguidos.length === 0) {
        res.json({ message: "0 seguidos :(" })
    } else {
        res.json(`Seguidos de ` + aux.username + `: ` + aux.seguidos)
    }
});

// dejar de seguir

router.delete("/dejardeseguir", async (req, res) => {
    const aux = req.body.seguido
    const aux2 = req.body.seguidor
    if (aux.length !== 24) {
        res.json({ message: "ese seguido no existe" })
    } else {
        if (aux2.length !== 24) {
            res.json({ message: "el seguidor no existe" })
        } else {
            const aux3 = await UserSchema.findById(aux)
            const aux4 = await UserSchema.findById(aux2)
            if ((aux === undefined || aux2 === undefined)) {
                res.json({ message: "ninguno de los dos existe" })
            } else {
                if (aux === aux2) {
                    res.json({ message: "Error, estos son iguales" })
                } else {
                    if (!aux4.seguidos.includes(aux3.username)) {
                        res.json({ message: "Ni si quiera te sigue ni na" })
                    } else {
                        await UserSchema
                            .updateOne({ _id: aux }, { $pull: { seguidores: aux4.username } })
                        await UserSchema
                            .updateOne({ _id: aux2 }, { $pull: { seguidos: aux3.username } })
                        await FollowerSchema
                            .remove({ seguidor: aux2, seguido: aux })
                            .then((data) => res.json(data))
                            .catch((error) => res.json({ message: error }));
                    }
                }
            }
        }
    }
});

module.exports = router;