module.exports = function() {
    return {
        transclude: true,
        restrict: 'E',
        templateUrl: '/app/components/product/sku/dropdown/skuRefinementDropdownTemplate.html',
        scope: {
            parentindex: '=',
            product: '='
        },
        controller: require('./skuRefinementDropdownController')
    };
};
