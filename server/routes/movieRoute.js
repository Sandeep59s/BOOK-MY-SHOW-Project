const express = require("express");
const Movie = require("../models/movieModel");
const router = express.Router();

//Add movie

router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New Movie has been Added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all the movies

router.get("/get-all-movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched",
      data: allMovies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//Update a movie

router.put("/update-movie", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "The movie has been successfully updated.",
      data: movie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to update!!!",
    });
  }
});

module.exports = router;
