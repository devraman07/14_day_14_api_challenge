import express from 'express';
import { AddBlog, deleteBlog, getMyBlogs,  updateBlog } from '../controllers/blogController.js';
import { authenticate } from '../services/authenticate.js';
import { RoleCheck } from '../services/isAdmin.js';

export const blogRouter = express.Router();

blogRouter.post('/addblog', authenticate, AddBlog );
blogRouter.put('/updateblog/:id', authenticate, updateBlog);
blogRouter.delete('/deleteblog/:id', authenticate, deleteBlog);
blogRouter.get('/myblogs', authenticate, getMyBlogs);
blogRouter.post('/addblog/admin', authenticate, RoleCheck, AddBlog );
blogRouter.delete('/deleteblog/admin/:id', authenticate, RoleCheck, deleteBlog);
