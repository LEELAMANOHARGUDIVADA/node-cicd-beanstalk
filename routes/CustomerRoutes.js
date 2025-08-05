import { Router } from "express";
import { allCustomers, searchCustomers } from "../controllers/CustomerController.js";

const router = Router();

/**
 * @swagger
 * /api/customers/:
 *   get:
 *     summary: Returns all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: the list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               
 */
router.get('/',  allCustomers);
/**
 * @swagger
 * /api/customers/search:
 *   get:
 *     summary: Returns Filtered Customers
 *     tags: [Customers]
 *     parameters:
 *          - in : query
 *            name: BA_Origin
 *            schema:
 *              type: string
 *          - in : query
 *            name: Customer_Group_Calc
 *            schema:
 *              type: string
 *          - in : query
 *            name: Cust Name
 *            schema:
 *              type: string
 *          - in : query
 *            name: Cust_No
 *            schema:
 *              type: string
 *          - in : query
 *            name: Cust_Elim_or_Name
 *            schema:
 *              type: string
 *          - in : query
 *            name: Cust_Sales_Area
 *            schema:
 *              type: string
 *          - in : query
 *            name: Company_Code
 *            schema:
 *              type: string
 *          - in : query
 *            name: Company_Full_Name
 *            schema:
 *              type: string
 *          - in : query
 *            name: Segment
 *            schema:
 *              type: string
 *          - in : query
 *            name: Sales_Person_Name
 *            schema:
 *              type: string
 *          - in : query
 *            name: Market_Code
 *            schema:
 *              type: string
 *          - in : query
 *            name: Operational_Hub_Code
 *            schema:
 *              type: string
 *          - in : query
 *            name: Operational_Site_Group
 *            schema:
 *              type: string
 *          - in : query
 *            name: Plant_Code
 *            schema:
 *              type: string
 *          - in : query
 *            name: Plant_Name
 *            schema:
 *              type: string
 *          - in : query
 *            name: Commercial_Name
 *            schema:
 *              type: string
 *          - in : query
 *            name: Package_Type
 *            schema:
 *              type: string
 *          - in : query
 *            name: Product_Code
 *            schema:
 *              type: string
 *          - in : query
 *            name: Mineral_Calc
 *            schema:
 *              type: string
 *          - in : query
 *            name: SOP_Mineral_Group
 *            schema:
 *              type: string
 *          
 *     responses:
 *       200:
 *         description: the list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               
 *               
 */
router.get('/search',  searchCustomers);

export default router;