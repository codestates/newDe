const models = require('../models');

module.exports = async (req, res) => {
  console.log(models);
  const { email, password } = req.body;
  const data = await models.findOne({ where: { email, password } });

  if (!data) {
    res.status(404).send('invalid user');
  } else {
    const payload = {
      id: data.id,
      email: data.email,
      nickname: data.nickname,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }
};
