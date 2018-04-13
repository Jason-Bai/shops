const U = require('../lib/utils');
const helper = require('./helper');
const config = require('../configs');

const Shop = U.model('shop');
const File = U.model('file');

/**
 * @api {GET} /shops 商店列表
 * @apiName shop_list
 * @apiGroup Shop
 * @apiPermission admin | member
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   Headers:
 *   {
 *     "X-Content-Record-Total": 1 // 符合条件的记录总条数，并非当前返回数组的长度
 *   }
 *   Body:
 *   [{
 *     id: 1,
 *     name: 'Node.js',
 *     logo: 'https://nodejs.org/static/images/logo.svg',
 *     site: 'https://nodejs.org',
 *     status: 'enabled',
 *     isDelete: 'no',
 *     createdAt: '2014-09-03T03:15:16.000Z',
 *     updatedAt: '2014-09-03T03:15:16.000Z'
 *   }]
 * @apiVersion 1.0.0
 */
const list = [
  helper.rest.list(Shop),
];

/**
 * @api {PUT/PATCH} /shops/:id 编辑闪电
 * @apiName shop_modify
 * @apiPermission admin | owner
 * @apiGroup Shop
 * @apiParam (query) {Number} id 商店ID
 * @apiParam (body) {String} [name] 商店名称
 * @apiParam (body) {String} [logo] logo图片
 * @apiParam (body) {String} [site] 网站地址
 * @apiParam (body) {Enum} [status] 商店状态`disabled` or `enabled` 仅管理员可用
 * @apiParam (body) {Enum} [isDelete] 是否`yes` or `no` 仅管理员可用
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   Body:
 *   {
 *     id: 1,
 *     name: 'Node.js',
 *     logo: 'https://nodejs.org/static/images/logo.svg',
 *     site: 'https://nodejs.org',
 *     status: 'enabled',
 *     isDelete: 'no',
 *     createdAt: '2014-09-03T03:15:16.000Z',
 *     updatedAt: '2014-09-03T03:15:16.000Z'
 *   }
 * @apiVersion 1.0.0
 */
const modify = [
  helper.getter(Shop, 'shop'),
  helper.assert.exists('hooks.shop'),
  [
    helper.checker.ownSelf('id', 'user'),
    helper.checker.sysAdmin(),
  ],
  helper.rest.modify(Shop, 'shop'),
];

/**
 * @api {DELETE} /shops/:id 删除商店
 * @apiName shop_del
 * @apiPermission admin
 * @apiGroup Shop
 * @apiParam {Number} id 商店ID
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 204 No Content
 * @apiVersion 1.0.0
 */
const remove = [
  helper.checker.sysAdmin(),
  helper.getter(Shop, 'shop'),
  helper.assert.exists('hooks.shop'),
  helper.rest.remove.hook('shop').exec(),
];

/**
 * @api {GET} /shop/:id 查看商店
 * @apiName shop_detail
 * @apiPermission admin | owner | member
 * @apiGroup Shop
 * @apiParam (query) {Number} id 商店ID
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   Body:
 *   {
 *     id: 1,
 *     name: 'Node.js',
 *     logo: 'https://nodejs.org/static/images/logo.svg',
 *     site: 'https://nodejs.org',
 *     status: 'enabled',
 *     isDelete: 'no',
 *     createdAt: '2014-09-03T03:15:16.000Z',
 *     updatedAt: '2014-09-03T03:15:16.000Z'
 *   }
 * @apiVersion 1.0.0
 */
const detail = [
  helper.getter(Shop, 'shop'),
  helper.assert.exists('hooks.shop'),
  helper.rest.detail('shop'),
];

/**
 * @api {POST} /shops 添加商店
 * @apiName shop_add
 * @apiPermission admin
 * @apiGroup User
 * @apiParam (body) {String} name 商店名称
 * @apiParam (body) {String} logo 徽标图片
 * @apiParam (body) {String} site 网站地址
 * @apiParam (body) {Enum} [status] 用户状态`disabled` or `enabled`
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *
 *   Body:
 *   {
 *     id: 1,
 *     name: 'Node.js',
 *     logo: 'https://nodejs.org/static/images/logo.svg',
 *     site: 'https://nodejs.org',
 *     status: 'enabled',
 *     isDelete: 'no',
 *     createdAt: '2014-09-03T03:15:16.000Z',
 *     updatedAt: '2014-09-03T03:15:16.000Z'
 *   }
 * @apiVersion 1.0.0
 */
const add = [
  helper.checker.sysAdmin(),
  helper.rest.add(Shop),
];

/*
  @api {POST} /shops/:shopId/files 在指定商店下上传文件
  @apiName UploadFile
  @apiGroup File
  @apiPermission admin | owner
  @apiVersion 1.0.0
  */
const addFile = [
  helper.getter(Shop, 'shop', 'params.shopId'),
  helper.assert.exists('hooks.shop'),
  [
    helper.checker.ownSelf('hooks.user.id'),
    helper.checker.sysAdmin(),
  ],
  helper.uploader.handleFile(config.upload),
  helper.rest.add(File),
];

module.exports = {
  list, detail, modify, remove, add, addFile,
};
