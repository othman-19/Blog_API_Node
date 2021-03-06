const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const mongoose = require('mongoose');
// const session = require('express-session');
const debug = require('debug')('blog-api:');
// const flash = require('express-flash');
// const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
// const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const {
  database,
  port,
  // secret,
  // secure,
} = require('./config/index');

const jwtAuth = require('./config/auth');

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression());

app.use(helmet());

app.set('trust proxy', 1);

// app.use(session({
//   secret,
//   resave: true,
//   saveUninitialized: true,
//   name: 'sessionId',
//   cookie: {
//     httpOnly: true,
//     secure,
//   },
// }));

const allowedOrigins = ['null', 'http://localhost:3000', 'https://blog-api-node.herokuapp.com'];
app.use(cors({
  origin(origin, callback) {
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

// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);
// app.use((req, res, next) => {
//   res.locals._csrf = req.csrfToken();
//   next();
// });

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - user has full speed until the max limit is reached
}));

// eslint-disable-next-line consistent-return
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', jwtAuth, postsRouter);
app.use('/api/v1/posts', jwtAuth, commentsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// CSRF error handler
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  return res.status(403).send('form tampered with');
});

module.exports = app;
