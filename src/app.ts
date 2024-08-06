import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'; 
import productRoutes from './routes/productRoutes';
import errorMiddleware from './middleware/errorMiddleware';
import requestLogger from './middleware/logger';
import setupSwagger from './config/swagger'; 


dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(requestLogger); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

setupSwagger(app);

// Error handling middleware
app.use(errorMiddleware);

export default app;
