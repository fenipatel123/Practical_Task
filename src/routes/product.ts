import express from 'express';
import {addProduct,updateProduct,deleteProducts,getAllProducts } from '../controller/product';
import {auth} from '../middleware/auth'
import {userauth} from '../middleware/userAuth'


const router = express.Router();

router.post('/addProduct',auth ,addProduct);

router.patch('/updateProduct/:id',auth ,updateProduct);

router.delete('/deleteProducts/:id',auth ,deleteProducts);

router.get('/getAllProducts',userauth ,getAllProducts);






export default router;
