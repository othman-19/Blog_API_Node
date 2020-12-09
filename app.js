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
