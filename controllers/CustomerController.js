import { allCustomersQuery, searchCustomersQuery } from "../constants/queries.js";
import { pool } from "../db/postgresPool.js";


const allCustomers = async (req, res) => {
    try {
        pool.query(allCustomersQuery, function (err, results) {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            if (results.rowCount == 0) {
                return res.status(400).json({ success: false, message: "No Data Found" })
            }
            return res.status(200).json({ success: true, message: "Customers Fetched", customers: results.rows });
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const searchCustomers = async (req, res) => {
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
            Sales_Person_Name,
            Market_Code,
            Operational_Hub_Code,
            Operational_Site_Group,
            Plant_Code,
            Plant_Name,
            Commercial_Name,
            Package_Type,
            Product_Code,
            Mineral_Calc,
            SOP_Mineral_Group
        } = req.query;

        let query = searchCustomersQuery;
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

        if (Company_Code) {
            conditions.push(`Company_Code = '${Company_Code}'`);
        }
        if (Company_Full_Name) {
            conditions.push(`Company_Full_Name = '${Company_Full_Name}'`);
        }

        if (Segment) {
            conditions.push(`Segment = '${Segment}'`)
        }
        if (Sales_Person_Name) {
            conditions.push(`Sales_Person_Name = '${Sales_Person_Name}'`)
        }
        if (Market_Code) {
            conditions.push(`Market_Code = '${Market_Code}'`)
        }
        if (Operational_Site_Group) {
            conditions.push(`Operational_Site_Group = '${Operational_Site_Group}'`)
        }
        if (Plant_Code) {
            conditions.push(`Plant_Code = '${Plant_Code}'`)
        }
        if (Plant_Name) {
            conditions.push(`Plant_Name = '${Plant_Name}'`)
        }
        if (Commercial_Name) {
            conditions.push(`Commercial_Name = '${Commercial_Name}'`)
        }
        if (Package_Type) {
            conditions.push(`Package_Type = '${Package_Type}'`)
        }
        if (Product_Code) {
            conditions.push(`Product_Code = '${Product_Code}'`)
        }
        if (Mineral_Calc) {
            conditions.push(`Mineral_Calc = '${Mineral_Calc}'`)
        }
        if (SOP_Mineral_Group) {
            conditions.push(`SOP_Mineral_Group = '${SOP_Mineral_Group}'`)
        }

        query += conditions.join(' AND ');
        console.log(query);
        pool.query(query, function (err, results) {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            if (results.rowCount == 0) {
                return res.status(400).json({ success: false, message: "No Data Found" })
            }
            return res.status(200).json({ success: true, message: "Customers Fetched", customers: results.rows });
        });

    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


export { allCustomers, searchCustomers }