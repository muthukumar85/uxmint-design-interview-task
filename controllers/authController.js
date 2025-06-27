const { generateToken } = require('../utils/jwt');

// Dummy Users
const users = {
  tenant1: [
    { username: 'hr1@gmail.com', password: '123', role: 'HR' },
    { username: 'emp1@gmail.com', password: '123', role: 'Employee' }
  ],
  tenant2: [
    { username: 'hr2@gmail.com', password: '123', role: 'HR' },
    { username: 'emp2@gmail.com', password: '123', role: 'Employee' }
  ]
};

exports.login = (req, res) => {
  const { email, password, tenant } = req.body;
  const userList = users[tenant];

  if (!userList) return res.status(400).json({ message: 'Invalid tenant' });

  const user = userList.find(u => u.username === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken({ email:email, role: user.role, tenant });
  res.json({ token });
};
