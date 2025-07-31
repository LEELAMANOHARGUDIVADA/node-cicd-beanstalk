import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { products } from "./products.js";
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("SERVER IS UP AND RUNNING");
});

app.get('/greet/:name', (req, res) => {
    const { name } = req.params;
    return res.status(200).json({ success: true, message: `Hello ${name}, How are you?` });
});

app.get('/products', (req, res) => {
    return res.status(200).json({ success: true, products: products });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("SERVER RUNNING ON PORT", PORT);
});