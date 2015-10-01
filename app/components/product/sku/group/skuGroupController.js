module.exports = [
  '$scope', '$attrs', '$element', '$compile', 'ProductService',
  function($scope, $attrs, $element, $compile, ProductService) {

    $scope.wrapperClass = $attrs.wrapperclass ? $attrs.wrapperclass : 'sku-group';

    var init = function() {
      // If a Product object is passed into the directive attribute use that
      if($attrs.product) {

        $scope.product = $attrs.product;
        buildRefinements();

      // Otherwise use the product service.
    } else if ($attrs.service) {

        $scope.product = ProductService.data;

        /*
          Product Service will be watched.
          This will allow us to enable 2-way data binding across controllers.
        */

        $scope.$watch(function() {
            return ProductService.data;
          },
          function(newVal) {
              $scope.product = newVal;
              buildRefinements();
          }
        );
      } else {
        // Otherwise we're going to inherit the product from parent scope.
        buildRefinements();
      }

    };

    $scope.$on('ProductUpdated', function(){
      init();
    });

    // SKU Group Refinement types -- hard coded.

    var skuGroups = {
      0: 'dropdown',
      1: 'color-swatch',
      2: 'thumbnail',
      3: 'dropdown-with-color'
    };

    var skuRefinementPrefix = 'sku-refinement-';

    /*
      Actually builds the refinements
    */

    var buildRefinements = function() {
      // Ensure refinementUI is blank
      var refinementDirectives = '<div class="'+$scope.wrapperClass+'">';

      for (var i=0; i<$scope.product.skuRefinements.skuGroups.length; i++)
      {
        directiveName = skuRefinementPrefix+skuGroups[$scope.product.skuRefinements.skuGroups[i].type];
        refinementDirectives += '<'+directiveName+' parentindex="'+i+'" product="product"></'+directiveName+'>';
      }

      refinementDirectives += '</div>';

      var refinementUI = $compile(refinementDirectives)($scope);
      $element.append(refinementUI);

    };


    /*
      Utility
    */

    /*
      Initialize
    */
    //init();

  }
];
