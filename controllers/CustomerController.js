import { pool } from "../db/db.js";
import { sql } from "../db/postgresdb.js";

const allCustomers = async (req, res) => {
    try {
        const customers = await sql`SELECT * FROM customer_data`;
        if (customers.length == 0) {
            return res.status(400).json({ success: false, message: "No Data Found" });
        }
        return res.status(200).json({ success: true, message: "Data Fetched", customers });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const searchCustomers = async (req, res) => {
    try {
        const { BA_Origin, Operational_Hub_Code } = req.query;

        const customers = await sql`SELECT * FROM customer_data WHERE BA_ORIGIN = ${BA_Origin} AND Operational_Hub_Code = ${Operational_Hub_Code}`;

        if (customers.length == 0) {
            return res.status(400).json({ success: false, message: "No Data Found" });
        }
        return res.status(200).json({ success: true, message: "Customers Fetched", customers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const searchCustomersMySql = async (req, res) => {
    try {
        const { 
            BA_Origin, 
            Customer_Group_Calc, 
            Cust_Name, 
            Cust_No, 
            Cust_Elim_or_Name, 
            Cust_Sales_Area,
            Company_Code,
            Company_Full_Name,
            Segment,
            Operational_Hub_Code 
        } = req.query;

        let sql = 'SELECT * FROM customer_data WHERE '
        let conditions = [];

        if (BA_Origin) {
            conditions.push(`BA_ORIGIN = '${BA_Origin}'`);
        }

        if (Customer_Group_Calc) {
            conditions.push(`Customer_Group_Calc = '${Customer_Group_Calc}'`);
        }
        if (Cust_Name) {
            conditions.push(`Cust_Name = '${Cust_Name}'`);
        }
        if (Cust_No) {
            conditions.push(`Cust_No = '${Cust_No}'`);
        }
        if (Cust_Elim_or_Name) {
            conditions.push(`Cust_Elim_or_Name = '${Cust_Elim_or_Name}'`);
        }
        if (Cust_Sales_Area) {
            conditions.push(`Cust_Sales_Area = '${Cust_Sales_Area}'`);
        }
        if (Operational_Hub_Code) {
            conditions.push(`Operational_Hub_Code = '${Operational_Hub_Code}'`);
        }

        if(Company_Code){
            conditions.push(`Company_Code = '${Company_Code}'`);
        }
        if(Company_Full_Name){
            conditions.push(`Company_Full_Name = '${Company_Full_Name}'`);
        }

        if(Segment){
            conditions.push(`Segment = '${Segment}'`)
        }

        sql += conditions.join(' AND ')
        console.log(sql)
        pool.query(sql, function (err, results) {
            if (err) {
                return res.status(400).json({ success: true, message: err.message });
            }

            return res.status(200).json({ success: true, message: "Customers Fetched", customers: results });
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


export { allCustomers, searchCustomers, searchCustomersMySql }