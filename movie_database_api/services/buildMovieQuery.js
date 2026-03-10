import { and, or, ilike, eq, lt, desc } from "drizzle-orm";
import { movies } from "../configs/schemas/movie.js";

export const buildMovieQuery = (queryParams) => {

  const {
    q,
    title,
    description,
    genre,
    director,
    actor,
    actress,
    cursor,
    sort
  } = queryParams;

  let conditions = [];

  // search
  if (q) {
    conditions.push(
      or(
        ilike(movies.title, `%${q}%`),
        ilike(movies.description, `%${q}%`),
        ilike(movies.actor, `%${q}%`),
        ilike(movies.actress, `%${q}%`),
        ilike(movies.director, `%${q}%`)
      )
    );
  }

  // filtering
  if (title) conditions.push(eq(movies.title, title));
  if (description) conditions.push(eq(movies.description, description));
  if (genre) conditions.push(eq(movies.genre, genre));
  if (director) conditions.push(eq(movies.director, director));
  if (actor) conditions.push(eq(movies.actor, actor));
  if (actress) conditions.push(eq(movies.actress, actress));

  // cursor pagination
  if (cursor) {
    conditions.push(lt(movies.id, Number(cursor)));
  }

  return { conditions, sort };
};