import { Router } from "express";
import { getTasks, deleteTask, newTask } from "../controllers/tasksUser.js";

export const tasksRouter = Router()

tasksRouter.get('/tasks', getTasks)
tasksRouter.post('/newTask', newTask)
tasksRouter.delete('/deleteTask/:id', deleteTask)