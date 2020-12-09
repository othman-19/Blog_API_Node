const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const mongoose = require('mongoose');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
const debug = require('debug')('members-only:');
const compression = require('compression');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const {
  database,
  port,
  secret,
  secure,
} = require('./config/index');

mongoose.connect(
  database,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
).then(() => {
  debug('DataBase Connected');
  debug(`app listening on port ${port}!`);
})
  .catch(err => {
    debug(`update error:  ${err}`);
  });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());

app.use(helmet());

app.set('trust proxy', 1);

app.use(session({
  secret,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
  cookie: {
    httpOnly: true,
    // secure,
  },
}));

const allowedOrigins = ['null', 'http://localhost:3000', 'https://members-only-node.herokuapp.com'];
app.use(cors({
  origin(origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not '
                + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
