import express from 'express';
import {addProduct,updateProduct,deleteProducts,getAllProducts,listProductWithPagination, getAllProductsWithFilters } from '../controller/product';
import {auth} from '../middleware/auth'
import {userauth} from '../middleware/userAuth'


const router = express.Router();

router.post('/addProduct',auth ,addProduct);

router.patch('/updateProduct/:id',auth ,updateProduct);

router.delete('/deleteProducts/:id',auth ,deleteProducts);

router.get('/getAllProducts',userauth ,getAllProducts);

router.get('/getAllProductsPagination',userauth ,listProductWithPagination);

router.get('/getAllProductsFilters',userauth,getAllProductsWithFilters);








export default router;
