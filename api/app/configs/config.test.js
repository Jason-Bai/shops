const config = require('./base');

config.service.port = '9988';

config.db.host = '127.0.0.1';
config.db.port = '3306';
config.db.user = 'root';
config.db.pass = 'rootrootroot';
config.db.name = 'shop_apitest';

config.cache.host = '127.0.0.1';
config.cache.port = '6379';
config.cache.opts.namespace = 'shop_test';

module.exports = config;
