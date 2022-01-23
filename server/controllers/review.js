module.exports = {
  get: async (req, res) => {
    res.status(200).send('ok');
  },
  post: (req, res) => {
    res.status(201).send('ok');
  },
  patch: async (req, res) => {
    res.status(200).send('ok');
  },
  delete: (req, res) => {
    res.status(201).send('ok');
  }

};
