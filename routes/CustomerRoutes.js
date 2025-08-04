import { Router } from "express";
import { allCustomers, searchCustomers } from "../controllers/CustomerController.js";

const router = Router();

router.get('/',  allCustomers);
router.get('/search',  searchCustomers);

export default router;