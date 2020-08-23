const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => { })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Такого пользователя не существует' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный Id' });
      } else { res.status(500).send({ message: 'Ошибка сервера' }); }
    });
};
module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Данные не валидны: ${err.message}` });
      } else { res.status(500).send({ message: 'Ошибка сервера' }); }
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(() => { })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Данные не валидны: ${err.message}` });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Такого пользователя не существует' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный Id' });
      } else { res.status(500).send({ message: 'Ошибка сервера' }); }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(() => { })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Данные не валидны: ${err.message}` });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Такого пользователя не существует' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный Id' });
      } else { res.status(500).send({ message: 'Ошибка сервера' }); }
    });
};
