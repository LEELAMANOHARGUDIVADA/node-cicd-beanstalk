import postgres from "postgres";

let sql;
const connectPostgres = (uri) => {
    try {
        sql = postgres("postgresql://postgres.ycwbjcyksweukbednmgr:EjZbsSUZ8fAA2Hxr@aws-0-ap-south-1.pooler.supabase.com:5432/postgres");
        // console.log(sql);
        console.log("SUPABASE CONNECTED");
    } catch (error) {
        console.log("Error Connecting Postgres: ", error.message);
    }
}

export { sql, connectPostgres }
