module.exports = [
  '$scope', '$attrs',
  function($scope, $attrs) {
    /*
      Initialize
    */

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

    /*
      Update Active SKU.

      This will also be passing data to parent scope for updated hero image
    */

    $scope.setActiveSku = function(activeSku, title)
    {
      // If the SKU is valid / active
      if($scope.product.skuRefinements.validSkus.indexOf(activeSku) > -1) {
        $scope.activeSku = activeSku;
        $scope.title = title;
      }
      else
      {
        // Otherwise use default
        $scope.activeSku = $scope.product.details.skuId;
        $scope.title=$scope.defaultTitle;
      }
    };


  }
];
