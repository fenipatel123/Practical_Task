import express from 'express';
import { registerUsers, loginUser, listOfUsers } from '../controller/user';
import {auth} from '../middleware/auth'

const router = express.Router();

router.post('/register', registerUsers);

router.post('/login', loginUser);

router.get('/usersList',auth, listOfUsers);



export default router;
