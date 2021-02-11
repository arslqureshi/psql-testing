import express from 'express'
import TodoController from '../controller/todo.controller';

const todoRouter = express.Router();

todoRouter.get('/', TodoController.get);
todoRouter.get('/:id', TodoController.getById);

export default todoRouter;