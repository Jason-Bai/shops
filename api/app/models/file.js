const U = require('../lib/utils');
const ModelBase = require('./base');
const config = require('../configs');

const { Sequelize } = U.rest;

module.exports = (sequelize) => {
  const File = U._.extend(sequelize.define('file', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      set(val) { return this.setDataValue('name', U.nt2space(val)); },
      validate: {
        len: {
          args: [1, 100],
          msg: 'length cannot greater than 100',
        },
      },
      comment: '自定义报告名称',
    },
    extension: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
      comment: '文件类型',
    },
    path: {
      type: Sequelize.STRING,
      get() {
        return `${config.upload.accessUrl}/${this.getDataValue('path')}`;
      },
      comment: '文件路径',
    },
    bytes: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '文件所占字节数',
    },
    sina: {
      type: Sequelize.TEXT,
      allowNull: true,
      set(value) {
        return this.setDataValue('sina', JSON.stringify(value));
      },
      get() {
        try {
          return JSON.parse(this.getDataValue('sina'));
        } catch (error) {
          return {};
        }
      },
    },
    creatorId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '创建者ID',
    },
  }, {
    comment: '上传文件表',
    freezeTableName: true,
    instanceMethods: {
      saveSina(value) {
        return this.update({ sina: value }, { fields: ['sina'] });
      },
    },
    classMethods: {},
  }), ModelBase, {
    includes: {
      creator: 'user',
    },
    sort: {
      default: 'id',
      allow: ['id', 'name', 'createdAt', 'updatedAt'],
    },
    writableCols: [
      'name', 'path', 'bytes', 'extension',
    ],
    editableCols: [],
  });

  return File;
};
