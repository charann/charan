module.exports = function (){
	return{
		restrict: 'E',
		transclude: true,
		templateUrl: '/app/components/product/menu/stationary/productDetailsStationaryTab.html',
		 controller: require('./productDetailsStationaryController')
	};
};
