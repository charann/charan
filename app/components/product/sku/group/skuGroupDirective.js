module.exports = function() {
  return {
    transclude: true,
    restrict: 'E',
    templateUrl: '/app/components/product/sku/group/skuGroupTemplate.html',
    controller: require('./skuGroupController')
  };
};
