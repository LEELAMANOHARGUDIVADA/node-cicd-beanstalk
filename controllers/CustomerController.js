import { sql } from "../db/postgresdb.js";

const allCustomers = async(req, res) => {
    try {
        const customers = await sql`SELECT * FROM customer_data`;
        if(customers.length == 0){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }
        return res.status(200).json({ success: true, message: "Data Fetched", customers });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const searchCustomers = async(req, res) => {
    try {
        const data = req.query;
        console.log(data);
        const customers = await sql`
            SELECT * FROM customer_data WHERE 
            BA_Origin = ${data.BA_Origin} AND
            Operational_Hub_Code = ${data.Operational_Hub_Code}
        `
        if(customers.length == 0){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }
        return res.status(200).json({ success: true, message: "Customers Fetched", customers });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


export { allCustomers, searchCustomers }