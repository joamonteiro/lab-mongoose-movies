const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/Celebrity.model");


//http://localhost:3000/celebrities
router.get('/celebrities', async (req, res) => {
    const celebs = await Celebrity.find();
    console.log(`Object is ${celebs}`);
    res.render("celebrities/celebrities-list", {celebs});
});


//http://localhost:3000/celebrities/new
router.get("/celebrities/new", async (req, res) => {
    res.render("celebrities/create-celebrity");
})

router.post("/celebrities/new", async (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    await Celebrity.create({name, occupation, catchPhrase});
    res.redirect("/celebrities");
});

router.post("/celebrities/:celebrityId/delete", async(req, res) => {
    await Celebrity.findByIdAndDelete(req.params.celebrityId);
    res.redirect("/celebrities");
})

//Not working ________________________________________________________________________________
router.get("/celebrities/:celebrityId/edit", async (req, res) => {
    const celebrity = await Celebrity.findById(req.params.bookId).populate("author");
    res.render("celebrities/edit-celebrity", celebrity);
})

router.post("/celebrities/:celebrityId/edit", async (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    await Celebrity.findByIdAndUpdate(req.params.celebrityId, {
        name,
        occupation,
        catchPhrase,
    });
    res.redirect(`/celebrities/${req.params.celebritiesId}`)
});
//___________________________________________________________________________________________

//http://localhost:3000/celebrities/124653256
router.get('/celebrities/:celebrityId', async (req, res) => {
    const celebrity = await Celebrity.findById(req.params.celebrityId);
    res.render("celebrities/show", celebrity);
});



module.exports = router;
