const { review } = require('../models');

module.exports = {
  get: async (req, res) => {
    res.status(200).send('ok');
  },
  post: (req, res) => {
    const { score, content } = req.body;
    if (!score || !content) {
      res.status(422).send('blanks exist');
    } else {
      review.create({ score, content })
        .then(([result, created]) => {});
    }
  },
  patch: async (req, res) => {
    res.status(200).send('ok');
  },
  delete: (req, res) => {
    res.status(201).send('ok');
  }
};
// score,content,user_id,item_id
