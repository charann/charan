module.exports = [
  '$attrs', '$http', '$element',
  function($attrs, $http, $scope, $element) {
    $http.get($attrs.url).then(
      function success(res){
        $element.html(res.data);
      }
    );
  }
];
