const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.user = {
    _id: '5f37cc0b089dce31c8067ceb',
  };

  next();
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/cards', cardsRouter);
app.use('/users', userRouter);
app.use((req, res) => {
  res.status('404');
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
