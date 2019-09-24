'use strict';

const assert = require('assert');
const { Client } = require('@elastic/elasticsearch');
let count = 0;

module.exports = app => {
  app.addSingleton('elasticsearch', createOneClient);

  function createOneClient (config, app) {
    const { node, nodes } = config;
    assert(node || nodes, '[egg-elasticsearch-js] node is required.');
    const client = new Client(config);

    app.beforeStart(async () => {
      const index = count++;
      const info = await client.info();
      if (info.statusCode === 200) {
        app.coreLogger.info(`[egg-elasticsearch-js] instance[${index}] status Ok.`);
      } else {
        app.coreLogger.info('elasticsearch cluster is down!');
      }
    });
    return client;
  }

};
