import express from 'express';
import { addmovie, getMovies, } from '../controllers/moviecontroller.js';
import { roleCheck } from '../middlewares/roleCheck.js';
import { authenticate } from '../middlewares/authenticate.js';



export const movieRouter = express.Router();


movieRouter.post( '/addmovies', authenticate, roleCheck, addmovie);
movieRouter.get('/',getMovies );