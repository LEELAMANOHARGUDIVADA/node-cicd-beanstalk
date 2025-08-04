import { Router } from "express";
import { allCustomers, searchCustomers, searchCustomersMySql } from "../controllers/CustomerController.js";

const router = Router();

router.get('/',  allCustomers);
router.get('/search',  searchCustomers);
router.get('/searchmysql',  searchCustomersMySql);

export default router;