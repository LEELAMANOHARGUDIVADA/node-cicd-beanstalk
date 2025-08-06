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
            const queries = BA_Origin.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(BA_ORIGIN) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }

        if (Customer_Group_Calc && Customer_Group_Calc != "") {
            const queries = Customer_Group_Calc.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Customer_Group_Calc) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Cust_Name && Cust_Name != "") {
            const queries = Cust_Name.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Cust_Name) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Cust_No && Cust_No != "") {
            const queries = Cust_No.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Cust_No) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Cust_Elim_or_Name && Cust_Elim_or_Name != "") {
            const queries = Cust_Elim_or_Name.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Cust_Elim_or_Name) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Cust_Sales_Area && Cust_Sales_Area != "") {
            const queries = Cust_Sales_Area.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Cust_Sales_Area) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Operational_Hub_Code && Operational_Hub_Code != "") {
            const queries = Operational_Hub_Code.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Operational_Hub_Code) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }

        if (Company_Code && Company_Code != "") {
            const queries = Company_Code.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Company_Code) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Company_Full_Name && Company_Full_Name != "") {
            const queries = Company_Full_Name.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Company_Full_Name) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }

        if (Segment && Segment != "") {
            const queries = Segment.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Segment) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Sales_Person_Name && Sales_Person_Name != "") {
            const queries = Sales_Person_Name.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Sales_Person_Name) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Market_Code && Market_Code != "") {
            const queries = Market_Code.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Market_Code) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Operational_Site_Group && Operational_Site_Group != "") {
            const queries = Operational_Site_Group.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Operational_Site_Group) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Plant_Code && Plant_Code != "") {
            const queries = Plant_Code.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Plant_Code) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Plant_Name && Plant_Name != "") {
            const queries = Plant_Name.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Plant_Name) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Commercial_Name && Commercial_Name != "") {
            const queries = Commercial_Name.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Commercial_Name) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Package_Type && Package_Type != "") {
            const queries = Package_Type.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Package_Type) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Product_Code && Product_Code != "") {
            const queries = Product_Code.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Product_Code) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (Mineral_Calc && Mineral_Calc != "") {
            const queries = Mineral_Calc.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(Mineral_Calc) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
        }
        if (SOP_Mineral_Group && SOP_Mineral_Group != "") {
            const queries = SOP_Mineral_Group.split(',');
            let multiquery = [];
            for(let i = 0; i<queries.length; i++){
                multiquery.push(`LOWER(SOP_Mineral_Group) LIKE LOWER('%${queries[i]}%')`)
            }
            conditions.push(`${multiquery.join(' OR ')}`);
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
            return res.status(200).json({ success: true, rowCount: results.rowCount, customers: results.rows });
        });

    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


export { allCustomers, searchCustomers }