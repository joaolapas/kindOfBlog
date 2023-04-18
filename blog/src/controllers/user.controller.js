const hello = (req, res) => {
  const hello = 'Hello from controllers!'

  res.send({ message: hello });
};

module.exports = { hello };
