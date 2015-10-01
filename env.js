/*
    Declares environment specific variables
*/

var __ENV = {};

(function(){


var dev = {
  rootPath : '/',
  services : {
    getSkuPricePromotions : '/mockService/getSkuPricePromotions.json',
    getSkuDetails : '/mockService/getSkuDetails.json',
    getSkuAdditionalContent : '/mockService/getSkuAdditionalContent.json'
  }
};

var qa = {
  rootPath : '/webcontent/components/product-details-page/dist/',
  services : {
    skuPricePromotions : '',
    skuDetails : '',
    skuAdditionalContent : ''
  }
};

__ENV = dev;


/*

  /webcontent/components/product-details-page/? -- rootpath -- Dist / dev

*/


})();
