const U = require('../../app/lib/utils');

const imageData = 'R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=';
const base64image = `data:image/gif;base64,${imageData}`;
const unBase64image = 'data:image/gif;base64,';

module.exports = [{
  name: '管理员添加一个商店',
  uri: '/shops',
  verb: 'post',
  headers: {
    'X-Auth-Token': 'MOCK::1',
  },
  data: {
    name: 'Node.js',
    site: 'https://nodejs.org',
  },
  expects: {
    Status: 201,
    JSON: {
      id: 1,
      name: 'Node.js',
      site: 'https://nodejs.org',
      status: 'enabled',
      isDelete: 'no',
    },
  },
}, {
  name: '普通用户可以设置商店徽标',
  uri: '/shops/1',
  verb: 'put',
  headers: {
    'X-Auth-Token': 'MOCK::2',
  },
  data: {
    logo: base64image,
  },
  expects: {
    Status: 200,
    JSON: {
      id: 1,
      logo: (v, assert) => {
        const logoPath = v.substr(7);
        assert.equal(0, v.indexOf('/_logo/'));
        assert.ok(U.fs.existsSync(`${__dirname}/../../logo/${logoPath}`));
      },
    },
  },
}, {
  name: '普通用户再次设置商店徽标',
  uri: '/shops/1',
  verb: 'put',
  headers: {
    'X-Auth-Token': 'MOCK::2',
  },
  data: {
    logo: base64image,
  },
  expects: {
    Status: 200,
    JSON: {
      id: 1,
      logo: (v, assert) => {
        const logoPath = v.substr(7);
        assert.equal(0, v.indexOf('/_logo/'));
        assert.ok(U.fs.existsSync(`${__dirname}/../../logo/${logoPath}`));
      },
    },
  },
}, {
  name: '普通用户再次设置商店徽标, 图片不存在',
  uri: '/shops/1',
  verb: 'put',
  headers: {
    'X-Auth-Token': 'MOCK::2',
  },
  data: {
    logo: unBase64image,
  },
  expects: {
    Status: 200,
    JSON: {
      id: 1,
      logo: (v, assert) => {
        const logoPath = v.substr(7);
        assert.equal(0, v.indexOf('/_logo/'));
        assert.ok(U.fs.existsSync(`${__dirname}/../../logo/${logoPath}`));
      },
    },
  },
}];
