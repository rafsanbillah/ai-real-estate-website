import jwt from 'jsonwebtoken';

export function login(req, res) {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  if (email !== adminEmail || password !== adminPassword) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET || 'replace_this_with_secure_secret', { expiresIn: '1d' });
  res.json({ token });
}
