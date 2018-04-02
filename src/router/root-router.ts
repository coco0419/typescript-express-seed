'use strict';

import express from 'express';

class RootRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', this.index);
  }

  index(req: express.Request, res: express.Response): void {
    res.json({ result: 'GET /api it work' });
  }
}

export default new RootRouter().router;
