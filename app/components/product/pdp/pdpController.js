module.exports = [
  '$scope', 'ProductService',
  function($scope, ProductService) {

    $scope.updateProduct = function(id, product) {
      method = product !== 'undefined' ? 'getBySku' : 'getByProdId';

      ProductService[method](id)
        .then(
          function success(res) {
            console.log(res);
            $scope.product = res;
            $scope.$broadcast('ProductUpdated');
            console.log('Product Updated');
          },
          // @TODO: Handle Error
          function failure(err) {
            console.log(err);
            console.log('Danger Will Robinson');
          }
        );
    };

    $scope.updateProduct(123456); // SKU
  }
];
