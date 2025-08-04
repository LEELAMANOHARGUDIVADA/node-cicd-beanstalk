import mysql from "mysql2"

let pool

const connectDB = () => {
    try {
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'imerys',
            waitForConnections: true
        });
        console.log("MYSQL CONNECTED");
    } catch (error) {
        console.log("Error Connecting DB: ", error);
    }
}

export { pool, connectDB };