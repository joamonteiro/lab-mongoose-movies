const express = require('express');
const router  = express.Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//http://localhost:3000/movies
router.get('/movies', async (req, res) => {
    const movies = await Movie.find();
    console.log(`Object is ${movies}`);
    res.render("movies/movies-list", {movies});
});

//http://localhost:3000/movies/new
router.get("/movies/new", async (req, res) => {
    const celebrities = await Celebrity.find();
    res.render("movies/create-movie", {celebrities});
})

router.post("/movies/new", async (req, res) => {
    const {title, genre, plot, cast} = req.body;
    await Movie.create({title, genre, plot, cast});
    res.redirect("/movies");
});

router.post("/movies/:movieId/delete", async(req, res) => {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.redirect("/movies");
})

//Editing
router.get("/movies/:movieId/edit", async (req, res) => {
    const celebrity = await Celebrity.find();
    const movie = await Movie.findById(req.params.movieId).populate("cast");
    res.render("movies/edit-movie", {movie, celebrity});
})

router.post("/movies/:movieId/edit", async (req, res) => {
    const {title, genre, plot, cast} = req.body;
    await Movie.findByIdAndUpdate(req.params.movieId, {
        title,
        genre,
        plot,
        cast,
    });
    res.redirect(`/movies/${req.params.movieId}`)
});

//http://localhost:3000/movies/124653256
router.get('/movies/:movieId', async (req, res) => {
    const movie = await Movie.findById(req.params.movieId);
    res.render("movies/show", movie);
});


module.exports = router;