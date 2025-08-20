import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRouter from './routes/admin.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'medihub-secret', resave: false, saveUninitialized: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// MongoDB
const MONGO_URI = process.env.MONGO_URI;
if(!MONGO_URI){
  console.warn('⚠️  MONGO_URI missing. Set it in .env');
} else {
  mongoose.connect(MONGO_URI).then(()=>console.log('✅ MongoDB connected')).catch(err=>console.error('Mongo error:', err.message));
}

// Routes
app.get('/', (req,res)=> res.redirect('/admin'));
app.use('/admin', adminRouter);

// API sample (fetch doctors JSON)
import Doctor from './models/Doctor.js';
app.get('/api/doctors', async (req,res)=>{
  const docs = await Doctor.find().limit(50).lean();
  res.json(docs);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log('🚀 Server running on http://localhost:' + PORT));
