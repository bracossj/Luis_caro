const express = require("express");
const router = express.Router();
const LikeSchema = require("../models/likesmodel");
const UserSchema = require("../models/usersmodel");
const TuitSchema = require("../models/tuitsmodel");

// dar like

router.post('/darlike', async (req, res) => {
    const like = await LikeSchema(req.body)
    const aux = await TuitSchema.findById({ _id: like.tuit })
    if ((like.like).toString().length !== 24) {
        res.json("eror 404")
    } else {
        if ((like.tuit).toString().length !== 24) {
            res.json("no existe la publicacion")
        } else {
            if (aux == null || aux == undefined) {
                res.json("no existe la publicacion")
            } else {
                if (aux.likes.includes(like.like)) {
                    res.json("no puedes dar doble like cole")
                } else {
                    await like
                        .save()
                        .then((data) => res.json(data))
                        .catch((error) => res.json({ message: error }));
                    const temp = (like.like).toString()
                    await TuitSchema
                        .updateOne({ _id: like.tuit }, { $addToSet: { likes: temp } });
                    await UserSchema
                        .updateOne({ _id: aux.valecita }, { $set: { 'tuits': { text: aux.text, date: aux.date, likes: (aux.likes.length + 1), _id: aux._id } } });
                    await UserSchema
                        .updateOne({ _id: like.like }, { $push: { "megustan": { text: aux.text, date: aux.date, _id: aux._id } } });
                }
            }
        }
    }
})


// ver los likes de un usuario

router.get("/like/:id", async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        res.json("este usuario no existe")
    } else {
        const aux = await UserSchema.findById(id)
        if (aux == null || aux == undefined) {
            res.json({ message: "este usuario no existe" })
        } else {
            if (aux.tuits.length === 0) {
                res.json({ message: "usuario sin tuits" })
            } else {
                res.send(`Tuits de ${aux.nombre} (${aux.username}): \t${aux.megustan}`)
            }
        }
    }
});

// quitar un like

router.delete("/likes/:id/:publicacion", async (req, res) => {
    const id = req.params;
    const id1 = mongoose.Types.ObjectId(id.id)
    const aux = mongoose.Types.ObjectId(id.publicacion)
    if (id.id.length !== 24) {
        res.json("El ID del like es invalido")
    } else {
        if (id.publicacion.length !== 24) {
            res.json("El ID de la publicacion es invalido")
        } else {
            temp = id1.toString()
            const aux2 = await TuitSchema.findById({ _id: aux })
            if (aux2 == null || aux2 == undefined) {
                res.json({ message: "El ID del like no existe" })
            } else {
                await UserSchema
                    .updateOne({ _id: aux2.autor }, { $set: { 'publicaciones': { publicacion: aux2.publicacion, date: aux2.date, likes: (aux2.likes.length - 1), _id: aux2._id } } });
                await UserSchema
                    .updateOne({ _id: id.id }, { $pull: { 'megustan': { _id: id.publicacion } } });
                await TuitSchema
                    .updateOne({ _id: id.publicacion }, { $pullAll: { likes: [id.id] } });
                await LikeSchema
                    .remove({ like: id.id, publicacion: id.publicacion })
                    .then((data) => res.json(data))
                    .catch((error) => res.json({ message: error }));
            }
        }
    }
});

module.exports = router;