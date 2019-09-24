'use strict';

module.exports = app => {
  app.get('/', async function () {
    try {
      const es = app.elasticsearch;
      const result = await es.info();
      this.body = result;
    } catch (error) {
      this.status = 500;
      this.body = error;
    }
  });
};
