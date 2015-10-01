var angular = require('angular');

/*
  Expects to be called: ProductService

*/

module.exports = [
  // TODO: Needs cookie service to get store ID
  // TODO: Get Token, pass with service.
  '$http', '$q',
  function($http, $q)
  {
    var product = {};
    var storeId = '12345';

    /*
        Get merges and parses return from all product types returning
        a complete product object.

        Individual Endpoints and parsers are available below.
    */

    product.get = function(type, value, store) {
      /*
          We are running each of the calls in parallel
          but only parsing when each is returned.
      */

      store = typeof store === 'undefined' ? storeId : store;

        return $q.all([
                        product.getSkuDetails(type, value, store),
                        product.getSkuAdditionalContent(type, value, store),
                        product.getSkuPricePromotions(type, value, store)
                      ]
                    )
                .then(
                  function success(returns) {
                    productReturn = angular.merge(
                      {},
                      product.parseGetSkuDetails(returns[0].data),            // Details
                      product.parseGetSkuAdditionalContent(returns[1].data),  // Additional
                      product.parseGetSkuPricePromotions(returns[2].data)    // Promotions
                    );

                    return productReturn;
                  },
                  function failure(data) {
                    return(data);
                  }
                );
    };

    /*
        Get Helper Methods
    */

    product.getBySku = function(sku) {
      return product.get('sku', sku);
    };

    product.getByProdId = function(prodId) {
      return product.get('product', sku);
    };

    /*

        Individual API Calls and their parsers

    */


    /*
        Get SKU Details
    */


    // @TODO: Add arguments
    product.getSkuDetails = function(type, code, store) {
      return $http.get(__ENV.services.getSkuDetails + product.getParams(type,code,store))
        .then(function success(res){return res;},
              function failure(err){ });
    }

    product.parseGetSkuDetails = function(getSkuDetailsReturn) {
      // Product Overview, various details
      var parsedReturn = {details: {}, media: {}, skuRefinements: {}};
      parsedReturn.details =                    getSkuDetailsReturn.detail;
      parsedReturn.details.breadcrumbs =        getSkuDetailsReturn.breadCrumb;

      // CVS Brand
      parsedReturn.cvsBrand =                   getSkuDetailsReturn.alternateProduct;

      // Contains array of hero and thumb images
      parsedReturn.media.gallery =              getSkuDetailsReturn.auxiliaryMedia;

      // Valid SKUs are the skus which are Valid
      // considering current sku choice
      parsedReturn.skuRefinements.validSkus =   getSkuDetailsReturn.validSkus;

      // Sku Groups are refinement Types
      // The availability of these items
      // can be narrowed down with valid skus
      parsedReturn.skuRefinements.skuGroups =   getSkuDetailsReturn.skuGroupInfo;

      return parsedReturn;
    }


    /*
        Get Sku Additional Content

    */

    // @TODO: Add arguments
    product.getSkuAdditionalContent = function(type, code, store) {
      return $http.get(__ENV.services.getSkuAdditionalContent + product.getParams(type,code,store))
        .then(function success(res){return res;},
              function failure(){});
    };

    product.parseGetSkuAdditionalContent = function(getSkuAdditionalContentReturn) {
      var parsedReturn = {details: {}};

      // Tabular data for PDP
      parsedReturn.details.tabs =               getSkuAdditionalContentReturn;

      return parsedReturn;

    }


    /*
        Get SKU Price Promotions
    */

    // @TODO: Add arguments
    product.getSkuPricePromotions = function(type, code, store) {
      /*
http://hostName:port//rest/model/cvs/rest/actor/CvsProductDetailsActor/getSkuPricePromotions
?codeType=sku
&code=718218
&storeId=1245
*/
      return $http.get(__ENV.services.getSkuPricePromotions + product.getParams(type,code,store))
        .then(function success(res){return res;},
              function failure(){});
    };

    product.parseGetSkuPricePromotions = function(getSkuPricePromotionsReturn) {
        var parsedReturn = {pricing: {}, thirdParty: {}};

        // Pricing
        parsedReturn.pricing.details =            getSkuPricePromotionsReturn.priceInfo;

        // Promos (SPIN Style)
        parsedReturn.pricing.promoDetails =       getSkuPricePromotionsReturn.spinPricing;

        // Status / Availability
        parsedReturn.availability =               getSkuPricePromotionsReturn.statusInfo;

        // Third Party info (Ordergroove, etc)
        parsedReturn.thirdParty.orderGroove =     getSkuPricePromotionsReturn.ogProductJson;

        return parsedReturn;

    }

    product.getParams = function(type, code, store) {
      return '?codeType='+type+'&code='+code+'&storeId='+store;
    }


    return product;


  }
];
