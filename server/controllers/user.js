module.exports = {
  get: async (req, res) => {
    res.status(200).send('five');
  },
  patch: (req, res) => {
    res.status(201).send('ok');
  }
};
