import express from 'express';
import { addCategories, getAllCategories, updateCategory, deleteCategory } from '../controller/category';
import {auth} from '../middleware/auth'
import {userauth} from '../middleware/userAuth'


const router = express.Router();

router.post('/addCategory',auth ,addCategories);

router.get('/listCategory',userauth,getAllCategories);

router.patch('/updateCategory/:id',auth ,updateCategory);

router.delete('/deleteCategory/:id',auth ,deleteCategory);


export default router;
