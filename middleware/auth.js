export function requireAuth(req, res, next){
  if(req.session && req.session.user){ return next(); }
  res.redirect('/admin/login');
}
export function handleLogin(req, res){
  const { username, password } = req.body;
  if(username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS){
    req.session.user = { username };
    return res.redirect('/admin');
  }
  res.render('login', { error: 'Invalid credentials' });
}
export function handleLogout(req, res){
  req.session.destroy(()=> res.redirect('/admin/login'));
}
