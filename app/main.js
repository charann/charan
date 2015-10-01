/*
    Require angular as a dependancy.

    Since angular by default binds itself to window after requiring it
    zero out window.angular by setting it to an empty object.

    This will avoid the error 'Tried to load angular more than once'
    and allow you to use whatever version you've pulled down via NPM for
    this project.

    It will be encapsulated in just your project.

    The same goes for any other libraries you may want to pull in.

    Be sure to npm install --save any libraries you want in your projects.

    Browserify will look at any package.json and node_modules folder relative
    to the file as well, so you can nest as many dependancies without collisions
    as needed.

    Check out npmjs.org for any packages you might need.
*/
var windowAngular = window.angular || {};
window.angular = {};

var ng = require('angular');

ng.module('ProductDetailsPage', []);

window.angular = windowAngular= ng;
// windowAngular = {};

/*
    Since we're using multiple versions of Angular, we'll also potentially have multiple
    angular apps running on the same page.

    Since angular limits the usage of the ng-app attribute, we are programmatically
    linking our apps based on ID.

    DomReady is a library that easily implements DomReady (document.ready)
    functionality with Browersify
*/

domready = require('domready');

domready(function() {
    ng.bootstrap(document.getElementById('app-pdp'), ['ProductDetailsPage']);
});

/*
    We can then go ahead and write our app as normal.

    We'll want to be requiring our components in the same fashion
    that we required angular.
*/

/*
    Product Service --
    This handles backend calls and parsing for the product object
*/


ng.module('ProductDetailsPage')
    .service('ProductService',
        require('./services/productService'));

/*
  PDP Controller
  this provides a root scope for the page and manages switching out products,
  allowing us to share information among different components without implementing
  a heavy watch presence on a data service.
*/

ng.module('ProductDetailsPage')
    .controller('PDPController',
        require('./components/product/pdp/pdpController'));


/*
    SKU Groupings
*/

ng.module('ProductDetailsPage')
    .directive('skuGroup',
        require('./components/product/sku/group/skuGroupDirective'));

ng.module('ProductDetailsPage')
    .directive('skuRefinementDropdown',
        require('./components/product/sku/dropdown/skuRefinementDropdownDirective'));

ng.module('ProductDetailsPage')
    .directive('skuRefinementColorSwatch',
        require('./components/product/sku/swatch/skuRefinementSwatchDirective'));

ng.module('ProductDetailsPage')
    .directive('skuRefinementThumbnail',
        require('./components/product/sku/thumbnail/skuRefinementThumbnailDirective'));


/*
  Product Menu
*/

// Stationary
ng.module('ProductDetailsPage')
    .directive('productDetailsStationaryTab',
        require('./components/product/menu/stationary/productDetailsStationaryDirective'));

//Sticky

ng.module('ProductDetailsPage')
    .directive('productDetailsStickyMenu',
        require('./components/product/menu/sticky/productDetailsStickyMenuDirective'));
