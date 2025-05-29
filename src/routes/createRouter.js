import { Router } from 'express'
import { AddByTeacher, AddData, GetData } from '../controllers/creationController.js';

const createRouter = Router();

createRouter.post('/addData', AddData);
createRouter.post('/getData', GetData);
createRouter.post('/AddByTeacher',AddByTeacher);

export default createRouter;