# egg-elasticsearch-js

## Install

```bash
$ npm i egg-elasticsearch-js --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.elasticsearch = {
  enable: true,
  package: 'egg-elasticsearch-js',
};
```

## Configuration
#### Single instance

```js
// {app_root}/config/config.default.js
exports.elasticsearch = {
  client: {
    node: 'host:port'
  }
  // more options: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html
};
```

#### Multiple instances
```js
exports.elasticsearch = {
  clients: {
    es1: {
      node: 'host1:port',
    },
    es2: {
      node: 'host2:port',
    }
  }
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example
#### Single instance
```js
'use strict';

module.exports = app => {
  app.get('/', async function () {
    try {
      const result = await app.elasticsearch.info();
      this.body = result;
    } catch (error) {
      this.status = 500;
      this.body = error;
    }
  });
};
```

#### Multiple instances
```js
'use strict';

module.exports = app => {
  app.get('/', async function () {
    try {
      const result1 = await app.elasticsearch.get('es1').info();
      const result2 = await app.elasticsearch.get('es2').info();
      this.body = {result1, result2};
    } catch (error) {
      this.status = 500;
      this.body = error;
    }
  });
};
```

## License

[MIT](LICENSE)
