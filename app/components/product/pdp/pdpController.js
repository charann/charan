module.exports = [
    '$scope', 'ProductService',
    function($scope, ProductService) {
        $scope.product = ProductService.get();
        console.log($scope.product);
        $scope.updateProduct = function(newName) {
            ProductService.switch(newName);
        };
    }
]
