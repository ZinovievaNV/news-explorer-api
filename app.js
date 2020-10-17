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
const { DATABASE, PORT } = require('./configuration/conf');
const { SERVER_WILL_CRASH, THE_RESOURSE_IS_NOT_FOUND } = require('./configuration/constants');

const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');

const app = express();

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function start() {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    app.listen(PORT || 3000, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(`${error}`);
  }
}

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_WILL_CRASH);
  }, 0);
});

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginUserValidation, login);

app.use(auth);
app.use('/articles', articlesRouter);
app.use('/users', usersRouter);
app.all('*', () => {
  throw new NotFoundError(THE_RESOURSE_IS_NOT_FOUND);
});
app.use(errorLogger);
app.use(errors());
app.use(handlerError);

start();
