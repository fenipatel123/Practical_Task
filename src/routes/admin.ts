import express from 'express';
import { loginAdminUser } from '../controller/admin';

const router = express.Router();

router.post('/adminlogin', loginAdminUser);


export default router;
