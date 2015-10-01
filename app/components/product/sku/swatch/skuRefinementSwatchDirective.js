module.exports = function() {
  return {
    transclude: true,
    restrict: 'E',
    templateUrl: '/app/components/product/sku/swatch/skuRefinementSwatchTemplate.html',
    scope: {parentindex: '=',
            product: '='},
    controller: require('./skuRefinementSwatchController')
  };
};
