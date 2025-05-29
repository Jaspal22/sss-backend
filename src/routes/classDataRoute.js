import express from 'express';
import { GetDataByClass, UpdateDataByClass, UpdateDataByTeacherName } from '../controllers/classController.js';

const classRouter = express.Router();

classRouter.post('/classdata', GetDataByClass);
classRouter.post('/updatebyclass', UpdateDataByClass);
classRouter.post('/updateByTeacherwise', UpdateDataByTeacherName);

export default classRouter;