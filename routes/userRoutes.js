
const express = require("express");
const userModel = require("../models/user");

const router = express.Router();


/////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
    const user = await userModel.find({});

    try {
        // console.log(user);
        // res.send(user);
        res.render("user", { user : user , layout: 'main'});
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/create", async (req, res) => {
    res.render("user-register" );
});

router.get("/view/:id", async (req, res) => {
    res.send("View " + req.params.id);
});

router.get("/edit/:id", async (req, res) => {
    res.send("Edit " + req.params.id);
});



router.post("/", async (req, res) => {
    const user = new userModel(req.body);

    try {
        console.log(req.body);
        await  user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/:id", async (req, res) => {

    try {
        console.log(req.params, req.body);
        const user = await  userModel.findByIdAndUpdate(req.params.id, req.body);
        await  userModel.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {

    try {
        console.log(req.params);
        const user = await  userModel.findByIdAndDelete(req.params.id);
        if (!user) res.status(404).send("NO item !");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});


//////////////////////////////////////////
module.exports = router;