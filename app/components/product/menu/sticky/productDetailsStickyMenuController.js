module.exports = ['$scope','$window', function($scope,$window) {
$window.onscroll=function(){
var elementTopPosition =
document.querySelector('.product-tabs').offsetTop;
$scope.headerShow = false; 
                if (this.pageYOffset >= elementTopPosition) {
                    $scope.headerShow = true;                    
                }
                $scope.$apply();
};
    $scope.scrollElementTop=function(){
    $window.scrollTo(0,0);
    };
}];
