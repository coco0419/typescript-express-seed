'use strict';

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import rootRouter from './router/root-router';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.middleware();
    this.routes();
  }

  middleware(): void {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use('/api', rootRouter);
  }
}

export default new App().app;
