import { db } from "../configs/db.js";
import { movies } from "../configs/schemas/movie.js";
import { and, desc } from "drizzle-orm";
import { buildMovieQuery } from "./buildMovieQuery.js";

export const fetchMovies = async (queryParams) => {

  const limit = Math.min(Number(queryParams.limit) || 5, 20);

  const { conditions, sort } = buildMovieQuery(queryParams);

  let query = db.select().from(movies);

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  // sorting
  if (sort === "rating") {
    query = query.orderBy(desc(movies.rating));
  } else {
    query = query.orderBy(desc(movies.releaseYear));
  }

  query = query.limit(limit);

  const result = await query;

  const nextCursor =
    result.length > 0 ? result[result.length - 1].id : null;

  return {
    movies: result,
    nextCursor
  };
};