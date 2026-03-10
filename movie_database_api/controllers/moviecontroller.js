import { db } from "../configs/db.js";
import { movies } from "../configs/schemas/movie.js";
import { fetchMovies } from "../services/movieServices.js";



export const addmovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      director,
      actor,
      actress,
      releaseYear,
      rating,
    } = req.body;

    if (
      !title ||
      !description ||
      !genre ||
      !director ||
      !actor ||
      !actress ||
      !releaseYear ||
      !rating
    ) {
      return res.status(400).json({
        message: "Fill all fields before adding movie",
      });
    }

    const movie = await db
      .insert(movies)
      .values({
        title,
        description,
        genre,
        director,
        actor,
        actress,
        releaseYear,
        rating,
        creatorId: req.user.id,
      })
      .returning();

    return res.status(201).json({
      message: "Movie added successfully",
      data: movie[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while adding movie",
      error: error.message,
    });
  }
};




export const getMovies = async (req, res) => {

  try {

    const data = await fetchMovies(req.query);

    return res.status(200).json({
      message: "Movies fetched successfully",
      data: data.movies,
      nextCursor: data.nextCursor
    });

  } catch (error) {

    return res.status(500).json({
      message: "Error fetching movies",
      error: error.message
    });

  }

};