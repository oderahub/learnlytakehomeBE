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


app.use(
  cors({
    origin: '*', // Specify the exact origin(s) here
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  })
);

// app.options('*', cors());

app.use(bodyParser.json());
app.use(requestLogger); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

setupSwagger(app);

// Error handling middleware
app.use(errorMiddleware);

export default app;
