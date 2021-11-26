const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./routes/index');
const celebrateErrorHandler = require('./middlewares/celebrateErrorHandler');
const commonErrorHandler = require('./middlewares/commonErrorHandler');
const limiter = require('./middlewares/rateLimit');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/constants');
const { PORT, DB_URI } = require('./utils/config');

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use('*', cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger);
app.use(celebrateErrorHandler);
app.use(commonErrorHandler);

mongoose
  .connect(DB_URI)
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => console.log(err));
