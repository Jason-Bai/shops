module.exports = (Models) => {
  Models.shop.belongsTo(Models.user, {
    as: 'creator',
    foreignKey: 'creatorId',
  });
};
