import { Pool } from "pg";

let pool;
const connectPostgresDB = () => {
    try {
        pool = new Pool({
            host: "aws-0-ap-south-1.pooler.supabase.com",
            port: 5432,
            database: "postgres",
            user: "postgres.ycwbjcyksweukbednmgr",
            password: "EjZbsSUZ8fAA2Hxr"
        });
        pool.connect().then(
            console.log("POSTGRES CONNECTED")
        );
        pool.on('error', (err) => {
            console.log("Error in Config: ", err);
        });
    } catch (error) {
        console.log(error)
    }
}

export {pool, connectPostgresDB }