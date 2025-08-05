import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { products } from "./products.js";
import customerRoutes from "./routes/CustomerRoutes.js"
import {connectPostgresDB} from "./db/postgresPool.js";
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Imerys API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options)

app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/customers', customerRoutes);

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
    connectPostgresDB();
    console.log("SERVER RUNNING ON PORT", PORT);
});