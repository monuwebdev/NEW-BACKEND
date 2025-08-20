import express from 'express';
import Doctor from '../models/Doctor.js';
import { requireAuth, handleLogin, handleLogout } from '../middleware/auth.js';
const router = express.Router();

router.get('/login', (req,res)=> res.render('login', { error: null }));
router.post('/login', handleLogin);
router.get('/logout', handleLogout);

// Admin dashboard
router.get('/', requireAuth, async (req,res)=>{
  const doctors = await Doctor.find().lean();
  res.render('dashboard', { doctors, user:req.session.user });
});

// Create
router.post('/doctors', requireAuth, async (req,res)=>{
  const { name, dept, exp } = req.body;
  await Doctor.create({ name, dept, exp });
  res.redirect('/admin');
});

// Update
router.post('/doctors/:id', requireAuth, async (req,res)=>{
  const { name, dept, exp } = req.body;
  await Doctor.findByIdAndUpdate(req.params.id, { name, dept, exp });
  res.redirect('/admin');
});

// Delete
router.post('/doctors/:id/delete', requireAuth, async (req,res)=>{
  await Doctor.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

export default router;
