require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUserValidation, loginUserValidation } = require('./middlewares/user-validation');
const NotFoundError = require('./errors/not-found-err');
const handlerError = require('./middlewares/handler-error');
const { limiter } = require('./middlewares/rate-limiter');

const { PORT = 3000 } = process.env;

const auth = require('./middlewares/auth');
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');

const app = express();

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(`${error} В старте`);
  }
}

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginUserValidation, login);

app.use(auth);
app.use('/articles', articlesRouter);
app.use('/users', usersRouter);
app.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(handlerError);

start();
