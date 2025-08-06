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

        if (BA_Origin && BA_Origin != "") {
            conditions.push(`LOWER(BA_ORIGIN) = LOWER('${BA_Origin}')`);
        }

        if (Customer_Group_Calc && Customer_Group_Calc != "") {
            conditions.push(`LOWER(Customer_Group_Calc) = LOWER('${Customer_Group_Calc}')`);
        }
        if (Cust_Name && Cust_Name != "") {
            conditions.push(`LOWER(Cust_Name) = LOWER('${Cust_Name}')`);
        }
        if (Cust_No && Cust_No != "") {
            conditions.push(`LOWER(Cust_No) = ('${Cust_No}')`);
        }
        if (Cust_Elim_or_Name && Cust_Elim_or_Name != "") {
            conditions.push(`LOWER(Cust_Elim_or_Name) = LOWER('${Cust_Elim_or_Name}')`);
        }
        if (Cust_Sales_Area && Cust_Sales_Area != "") {
            conditions.push(`LOWER(Cust_Sales_Area) = LOWER('${Cust_Sales_Area}')`);
        }
        if (Operational_Hub_Code && Cust_Sales_Area != "") {
            conditions.push(`LOWER(Operational_Hub_Code) = LOWER('${Operational_Hub_Code}')`);
        }

        if (Company_Code && Company_Code != "") {
            conditions.push(`LOWER(Company_Code) = LOWER('${Company_Code}')`);
        }
        if (Company_Full_Name && Company_Full_Name != "") {
            conditions.push(`LOWER(Company_Full_Name) = LOWER('${Company_Full_Name}')`);
        }

        if (Segment && Segment != "") {
            conditions.push(`LOWER(Segment) = LOWER('${Segment}')`)
        }
        if (Sales_Person_Name && Sales_Person_Name != "") {
            conditions.push(`LOWER(Sales_Person_Name) = LOWER('${Sales_Person_Name}')`)
        }
        if (Market_Code && Market_Code != "") {
            conditions.push(`LOWER(Market_Code) = LOWER('${Market_Code}')`)
        }
        if (Operational_Site_Group && Operational_Site_Group != "") {
            conditions.push(`LOWER(Operational_Site_Group) = LOWER('${Operational_Site_Group}')`)
        }
        if (Plant_Code && Plant_Code != "") {
            conditions.push(`LOWER(Plant_Code) = LOWER('${Plant_Code}')`)
        }
        if (Plant_Name && Plant_Name != "") {
            conditions.push(`LOWER(Plant_Name) = LOWER('${Plant_Name}')`)
        }
        if (Commercial_Name && Commercial_Name != "") {
            conditions.push(`LOWER(Commercial_Name) = LOWER('${Commercial_Name}')`)
        }
        if (Package_Type && Package_Type != "") {
            conditions.push(`LOWER(Package_Type) = LOWER('${Package_Type}')`)
        }
        if (Product_Code && Product_Code != "") {
            conditions.push(`LOWER(Product_Code) = LOWER('${Product_Code}')`)
        }
        if (Mineral_Calc && Mineral_Calc != "") {
            conditions.push(`LOWER(Mineral_Calc) = LOWER('${Mineral_Calc}')`)
        }
        if (SOP_Mineral_Group && SOP_Mineral_Group != "") {
            conditions.push(`LOWER(SOP_Mineral_Group) = LOWER('${SOP_Mineral_Group}')`)
        }

        if(conditions.length == 0){
            return res.status(400).json({ success: false, message: "Invalid Fields" })
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