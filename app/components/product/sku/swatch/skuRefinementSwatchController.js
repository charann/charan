module.exports = [
  '$scope', '$attrs',
  function($scope, $attrs) {
    $scope.activeSku = $scope.product.details.skuId;
    $scope.parentIndex = $attrs.parentindex;

    for(i=0;i<$scope.product.skuRefinements.skuGroups[$scope.parentIndex].contents.length;i++) {
      if($scope.product.skuRefinements.skuGroups[$scope.parentIndex].contents[i].skuId == $scope.product.details.skuId)
      {
        $scope.defaultOffset = i;
        $scope.defaultTitle = $scope.product.skuRefinements.skuGroups[$scope.parentIndex].contents[i].label;
        break;
      }
    }

    $scope.title = $scope.defaultTitle;

    // Get default title

    $scope.setActiveSku = function(activeSku, title)
    {
      if($scope.product.skuRefinements.validSkus.indexOf(activeSku) > -1) {
        $scope.activeSku = activeSku;
        $scope.title = title;
      }
      else
      {
        $scope.activeSku = $scope.product.details.skuId;
        $scope.title=$scope.defaultTitle;
      }
    };


  }
];
