import { allCustomersQuery, deleteCustomersQuery, searchCustomersQuery, updateCustomersQuery, updateMultiCustomersQuery } from "../constants/queries.js";
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
            return res.status(200).json({ success: true, rowCount: results.rowCount, customers: results.rows });
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

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        let query = searchCustomersQuery;
        let conditions = [];

        if (BA_Origin && BA_Origin != "") {
            const queries = BA_Origin.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(BA_ORIGIN) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }

        if (Customer_Group_Calc && Customer_Group_Calc != "") {
            const queries = Customer_Group_Calc.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Customer_Group_Calc) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Cust_Name && Cust_Name != "") {
            const queries = Cust_Name.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Cust_Name) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Cust_No && Cust_No != "") {
            const queries = Cust_No.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Cust_No) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Cust_Elim_or_Name && Cust_Elim_or_Name != "") {
            const queries = Cust_Elim_or_Name.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Cust_Elim_or_Name) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Cust_Sales_Area && Cust_Sales_Area != "") {
            const queries = Cust_Sales_Area.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Cust_Sales_Area) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Operational_Hub_Code && Operational_Hub_Code != "") {
            const queries = Operational_Hub_Code.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Operational_Hub_Code) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }

        if (Company_Code && Company_Code != "") {
            const queries = Company_Code.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Company_Code) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Company_Full_Name && Company_Full_Name != "") {
            const queries = Company_Full_Name.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Company_Full_Name) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }

        if (Segment && Segment != "") {
            const queries = Segment.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Segment) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Sales_Person_Name && Sales_Person_Name != "") {
            const queries = Sales_Person_Name.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Sales_Person_Name) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Market_Code && Market_Code != "") {
            const queries = Market_Code.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Market_Code) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Operational_Site_Group && Operational_Site_Group != "") {
            const queries = Operational_Site_Group.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Operational_Site_Group) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Plant_Code && Plant_Code != "") {
            const queries = Plant_Code.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Plant_Code) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Plant_Name && Plant_Name != "") {
            const queries = Plant_Name.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Plant_Name) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Commercial_Name && Commercial_Name != "") {
            const queries = Commercial_Name.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Commercial_Name) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Package_Type && Package_Type != "") {
            const queries = Package_Type.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Package_Type) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Product_Code && Product_Code != "") {
            const queries = Product_Code.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Product_Code) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (Mineral_Calc && Mineral_Calc != "") {
            const queries = Mineral_Calc.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(Mineral_Calc) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }
        if (SOP_Mineral_Group && SOP_Mineral_Group != "") {
            const queries = SOP_Mineral_Group.split(',');
            let multiquery = [];
            for (let i = 0; i < queries.length; i++) {
                multiquery.push(`(LOWER(SOP_Mineral_Group) LIKE LOWER('%${queries[i]}%'))`)
            }
            conditions.push(`(${multiquery.join(' OR ')})`);
        }

        if (conditions.length == 0) {
            return res.status(400).json({ success: false, message: "Invalid Fields" })
        }

        query += conditions.join(' AND ');
        query += ' ORDER BY id '

        console.log(query);
        pool.query(query, function (err, results) {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            if (results.rowCount == 0) {
                return res.status(400).json({ success: false, message: "No Data Found" });
            }
            const totalPages = Math.ceil(results.rowCount / limit);
            const totalRecords = results.rowCount;

            query += ` LIMIT ${limit} OFFSET ${offset} `
            pool.query(query, function (err, results) {
                if (err) {
                    return res.status(400).json({ success: false, message: err });
                }

                return res.status(200).json({
                    success: true,
                    rowCount: results.rowCount,
                    currentPage: page,
                    totalRecords: totalRecords,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1,
                    customers: results.rows,
                });
            })
        });

    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const updateCustomers = async (req, res) => {
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
            SOP_Mineral_Group,
            id
        } = req.query;

        let query = updateCustomersQuery
        let conditions = [];

        if (BA_Origin && BA_Origin != "") {
            conditions.push(` BA_Origin = '${BA_Origin}'`);
        }

        if (Customer_Group_Calc && Customer_Group_Calc != "") {
            conditions.push(` Customer_Group_Calc = '${Customer_Group_Calc}'`);
        }
        if (Cust_Name && Cust_Name != "") {
            conditions.push(` Cust_Name = '${Cust_Name}'`);
        }
        if (Cust_No && Cust_No != "") {
            conditions.push(` Cust_No = '${Cust_No}'`);
        }
        if (Cust_Elim_or_Name && Cust_Elim_or_Name != "") {
            conditions.push(` Cust_Elim_or_Name = '${Cust_Elim_or_Name}'`);
        }
        if (Cust_Sales_Area && Cust_Sales_Area != "") {
            conditions.push(` Cust_Sales_Area = '${Cust_Sales_Area}'`);
        }
        if (Operational_Hub_Code && Operational_Hub_Code != "") {
            conditions.push(` Operational_Hub_Code = '${Operational_Hub_Code}'`);
        }

        if (Company_Code && Company_Code != "") {
            conditions.push(` Company_Code = '${Company_Code}'`);
        }
        if (Company_Full_Name && Company_Full_Name != "") {
            conditions.push(` Company_Full_Name = '${Company_Full_Name}'`);
        }

        if (Segment && Segment != "") {
            conditions.push(` Segment = '${Segment}'`);
        }
        if (Sales_Person_Name && Sales_Person_Name != "") {
            conditions.push(` Sales_Person_Name = '${Sales_Person_Name}'`);
        }
        if (Market_Code && Market_Code != "") {
            conditions.push(` Market_Code = '${Market_Code}'`);
        }
        if (Operational_Site_Group && Operational_Site_Group != "") {
            conditions.push(` Operational_Site_Group = '${Operational_Site_Group}'`);
        }
        if (Plant_Code && Plant_Code != "") {
            conditions.push(` Plant_Code = '${Plant_Code}'`);
        }
        if (Plant_Name && Plant_Name != "") {
            conditions.push(` Plant_Name = '${Plant_Name}'`);
        }
        if (Commercial_Name && Commercial_Name != "") {
            conditions.push(` Commercial_Name = '${Commercial_Name}'`);
        }
        if (Package_Type && Package_Type != "") {
            conditions.push(` Package_Type = '${Package_Type}'`);
        }
        if (Product_Code && Product_Code != "") {
            conditions.push(` Product_Code = '${Product_Code}'`);
        }
        if (Mineral_Calc && Mineral_Calc != "") {
            conditions.push(` Mineral_Calc = '${Mineral_Calc}'`);
        }
        if (SOP_Mineral_Group && SOP_Mineral_Group != "") {
            conditions.push(` SOP_Mineral_Group = '${SOP_Mineral_Group}'`);
        }

        query += conditions.join(',');
        query += ` WHERE id = ${id} `;
        console.log(query);
        pool.query(query, function (err, results) {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            if (results.rowCount < 1) {
                return res.status(400).json({ success: false, message: "Error Updating Field" });
            }

            return res.status(200).json({
                success: true,
                message: "Customers Updated"
            });
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
}

const updateMultipleCustomers = async (req, res) => {
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
            SOP_Mineral_Group,
            ids
        } = req.query;

        const customerIds = ids.split(',');
        let query = updateCustomersQuery;
        const conditions = [];

        if (BA_Origin && BA_Origin != "") {
            const values = BA_Origin.split(',');
            let temp = '';
            temp += `BA_Origin = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Customer_Group_Calc && Customer_Group_Calc != "") {
            const values = Customer_Group_Calc.split(',');
            let temp = '';
            temp += `Customer_Group_Calc = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Cust_Name && Cust_Name != "") {
            const values = Cust_Name.split(',');
            let temp = '';
            temp += `Cust_Name = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Cust_No && Cust_No != "") {
            const values = Cust_No.split(',');
            let temp = '';
            temp += `Cust_No = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Cust_Elim_or_Name && Cust_Elim_or_Name != "") {
            const values = Cust_Elim_or_Name.split(',');
            let temp = '';
            temp += `Cust_Elim_or_Name = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Cust_Sales_Area && Cust_Sales_Area != "") {
            const values = Cust_Sales_Area.split(',');
            let temp = '';
            temp += `Cust_Sales_Area = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Company_Code && Company_Code != "") {
            const values = Company_Code.split(',');
            let temp = '';
            temp += `Company_Code = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Company_Full_Name && Company_Full_Name != "") {
            const values = Company_Full_Name.split(',');
            let temp = '';
            temp += `Company_Full_Name = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Segment && Segment != "") {
            const values = Segment.split(',');
            let temp = '';
            temp += `Segment = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Sales_Person_Name && Sales_Person_Name != "") {
            const values = Sales_Person_Name.split(',');
            let temp = '';
            temp += `Sales_Person_Name = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Market_Code && Market_Code != "") {
            const values = Market_Code.split(',');
            let temp = '';
            temp += `Market_Code = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Operational_Hub_Code && Operational_Hub_Code != "") {
            const values = Operational_Hub_Code.split(',');
            let temp = '';
            temp += `Operational_Hub_Code = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Operational_Site_Group && Operational_Site_Group != "") {
            const values = Operational_Site_Group.split(',');
            let temp = '';
            temp += `Operational_Site_Group = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Plant_Code && Plant_Code != "") {
            const values = Plant_Code.split(',');
            let temp = '';
            temp += `Plant_Code = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Plant_Name && Plant_Name != "") {
            const values = Plant_Name.split(',');
            let temp = '';
            temp += `Plant_Name = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Commercial_Name && Commercial_Name != "") {
            const values = Commercial_Name.split(',');
            let temp = '';
            temp += `Commercial_Name = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Package_Type && Package_Type != "") {
            const values = Package_Type.split(',');
            let temp = '';
            temp += `Package_Type = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Product_Code && Product_Code != "") {
            const values = Product_Code.split(',');
            let temp = '';
            temp += `Product_Code = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (Mineral_Calc && Mineral_Calc != "") {
            const values = Mineral_Calc.split(',');
            let temp = '';
            temp += `Mineral_Calc = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }
        if (SOP_Mineral_Group && SOP_Mineral_Group != "") {
            const values = SOP_Mineral_Group.split(',');
            let temp = '';
            temp += `SOP_Mineral_Group = (CASE `
            for (let i = 0; i < customerIds.length; i++) {
                temp += `WHEN id = ${customerIds[i]} THEN '${values[i]}' `
            }
            temp += `END) `
            conditions.push(temp);
        }

        query += conditions.join(',');
        query += ` WHERE id IN (${ids})`
        console.log(query);
        pool.query(query, function (err, results) {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            if (results.rowCount < 1) {
                return res.status(400).json({ success: false, message: "Error Updating Field" });
            }
            return res.status(200).json({ success: true, message: "Customers Updated" });
        });


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const deleteCustomers = async(req, res) => {
    try {
        const { ids } = req.query;

        let query = deleteCustomersQuery;
        query += ` id IN (${ids}) `;
        console.log(query);

        pool.query(query, function(err,results) {
            if(err){
                return res.status(400).json({ success: false, message: err });
            }

            if(results.rowCount <= 0){
                return res.status(400).json({ success: false, message: "Error Deleting Customers" });
            }

            return res.status(200).json({ success: true, message: 'Customers Deleted' });
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


export { allCustomers, searchCustomers, updateCustomers, updateMultipleCustomers, deleteCustomers };