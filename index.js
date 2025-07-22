import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import bodyParser from 'body-parser';
import path from 'path';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const port = process.env.PORT;

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const uri = process.env.MONGODB_URI;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', todoRoutes);

mongoose.connect(uri)
.then(() => {
    console.log('MongoDB connected');
    app.listen(port, () =>{
    console.log(`Server is running on https://localhost:${port}`);
    });
})
.catch((err) => console.error(err));


