const U = require('../lib/utils');
const ModelBase = require('./base');
const config = require('../configs');

const Sequelize = U.rest.Sequelize;
const LOGO_ROOT = config.logo.uri;
const LOGO_PATH = config.logo.path;

module.exports = (sequelize) => {
  const Shop = U._.extend(sequelize.define('shop', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.type('string', 30),
      allowNull: false,
      set(val) {
        this.setDataValue('name', U.nt2space(val));
      },
      validate: {
        len: [2, 30],
      },
    },
    logo: {
      type: Sequelize.type('string', 255),
      allowNull: true,
      validate: {
        len: [1, 255],
      },
      get() {
        if (!this.getDataValue('logo')) return null;
        return `${LOGO_ROOT}/${this.getDataValue('logo')}`;
      },
      set(val) {
        const image = U.decodeBase64Image(val);
        if (!image) return;
        const value = Shop.logoPath(`${this.id}_${U.randStr(10)}`, image.type);
        const origFile = `${LOGO_PATH}/${this.getDataValue('logo')}`;
        if (U.fs.existsSync(origFile)) U.fs.unlinkSync(origFile);
        const filepath = `${LOGO_PATH}/${value}`;
        U.mkdirp(U.path.dirname(filepath));
        U.fs.writeFileSync(filepath, image.data);
        this.setDataValue('logo', value);
      },
      comment: '商店徽标',
    },
    site: {
      type: Sequelize.type('string', 200),
      allowNull: true,
      defaultValue: null,
      validate: {
        isUrl: true,
      },
      comment: '网站地址',
    },
    status: {
      type: Sequelize.ENUM,
      values: ['disabled', 'enabled'],
      defaultValue: 'enabled',
      allowNull: false,
      comment: '是否可用',
    },
    creatorId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    isDelete: {
      type: Sequelize.ENUM,
      values: ['yes', 'no'],
      defaultValue: 'no',
      allowNull: false,
      comment: '是否被删除',
    },
  }, {
    comment: '商店表',
    freezeTableName: true,
    hooks: {},

    instanceMethods: {},

    classMethods: {
      /** 计算徽标路径 */
      logoPath: (id, type) => {
        const t = type.split('/');
        const md5str = U.md5(id);
        return [
          'shop',
          md5str.substr(0, 2),
          md5str.substr(2, 3),
          `${id}.${t[1] || t}`,
        ].join('/');
      },
    },

  }), ModelBase, {
    unique: ['name'],
    sort: {
      default: 'createdAt',
      allow: ['name', 'updatedAt', 'createdAt'],
    },
    writableCols: [
      'name', 'logo', 'site', 'status',
    ],
    editableCols: [
      'name', 'logo',
      'site', 'status',
    ],
    /** 只有管理员才可以修改的字段 */
    onlyAdminCols: ['status'],

    /** 定义允许包含返回的字段，不设置为全部 */
    allowIncludeCols: [
      'name', 'logo', 'site', 'status', 'isDelete', 'createdAt',
    ],
  });

  return Shop;
};
