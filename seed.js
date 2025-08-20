import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from './models/Doctor.js';
dotenv.config();

async function run(){
  if(!process.env.MONGO_URI){
    console.log('Set MONGO_URI in .env first'); process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  await Doctor.deleteMany({});
  await Doctor.insertMany([
    { name:'Dr. Suman Kumar', dept:'Cardiology', exp:'12+ yrs' },
    { name:'Dr. Meera Shah', dept:'Gynecology', exp:'10+ yrs' },
    { name:'Dr. R. Iyer', dept:'Orthopedics', exp:'9+ yrs' },
    { name:'Dr. Ali Khan', dept:'Pediatrics', exp:'7+ yrs' },
  ]);
  console.log('✅ Seeded doctors');
  process.exit(0);
}
run().catch(e=>{ console.error(e); process.exit(1); });
