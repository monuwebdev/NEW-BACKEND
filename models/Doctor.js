import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dept: { type: String, required: true },
  exp: { type: String, default: '5+ yrs' }
}, { timestamps: true });

export default mongoose.model('Doctor', DoctorSchema);
