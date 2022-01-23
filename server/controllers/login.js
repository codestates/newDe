const { user } = require('../models');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const data = await user.findOne({ where: { email, password } });

  if (!data) {
    res.status(404).send('invalid user');
  } else {
    const payload = {
      id: data.id,
      email: data.email,
      nickname: data.username,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    const jwtToken = sign(payload, process.env.ACCESS_SECRET, { expiresIn: '10m' });

    res.cookie('jwt', jwtToken).status(200).json({ message: 'ok' });
    res.status(200).send('login success');
  }
};
