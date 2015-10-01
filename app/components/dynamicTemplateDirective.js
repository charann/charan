module.exports = function() {
  return {
    transclude: true,
    restrict: 'E',
    controller: require('./dynamicTemplateController.js')
  };
};
