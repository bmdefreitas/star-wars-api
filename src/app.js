import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import mongoose from 'mongoose';
import logger from 'morgan';

import indexRouter from './routes';
import apiRouter from './routes/api';

const app = express();

mongoose.set('useFindAndModify', false);

// iniciando a conexão com o MongoDB
mongoose.connect(process.env.NODE_ENV === 'test' ? process.env.MONGOURLTEST || 'mongodb://localhost:27017/test' : process.env.MONGOURL || 'mongodb://localhost:27017/starwars', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(compression());

app.use(cors());
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
