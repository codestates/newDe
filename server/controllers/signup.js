const { user } = require('../models');
const { sign } = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password || !nickname) {
    res.status(422).send('blanks exist');
  } else {
    user.findOrCreate({ where: { email, nickname, password } })
      .then(([result, created]) => {
        if (created) {
          const payload = {
            id: result.dataValues.id,
            email: result.dataValues.email,
            updatedAt: result.dataValues.updatedAt,
            createdAt: result.dataValues.createdAt
          };
          const jwtToken = sign(payload, process.env.ACCESS_SECRET, { expiresIn: '10m' });
          res.cookie('jwt', jwtToken).status(201).send({ message: 'ok' });
        } else {
          res.status(409).send('email exist');
        }
      });
  }
};
