import { Router } from 'express'
import classCreation from '../controllers/PtMarksControllers/ptClassController.js';
import ptMarksAdd from '../controllers/PtMarksControllers/ptMarksAdd.js';
import { fetchAllClasses, fetchAllClassStudents, fetchClassData } from '../controllers/PtMarksControllers/fetchAllClasses.js';

const ptclasscreateRouter = Router();

ptclasscreateRouter.post('/createClass', classCreation);
ptclasscreateRouter.post('/addMarks', ptMarksAdd);
ptclasscreateRouter.get('/fetchAllClasses', fetchAllClasses);
ptclasscreateRouter.post('/fetchClassData', fetchClassData);
ptclasscreateRouter.post('/fetchAllClassStudents', fetchAllClassStudents);

export default ptclasscreateRouter;