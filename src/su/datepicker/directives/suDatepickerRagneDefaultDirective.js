angular.module('su.datepicker.directives.suDatepickerRangeDefaultDirective', [])
  .directive('suDatepickerRangeDefault', suDatepickerRangeDefaultDirective);

suDatepickerRangeDefaultDirective.$inject = ['$filter'];
function suDatepickerRangeDefaultDirective($filter){
  var suTimeNeutralDateCompareFilter = $filter('suTimeNeutralDateCompare');
  return {
    restrict: 'E',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'su.datepicker.templates.suDatepickerRangeDefaultTemplate';
    },
    scope: {
      startDate: '=',
      isDateDisabled: '&',
      onDateSelect: '&',
      cheapMouseenterCallback: '&',
      customClass: '&',
      previousMonthDisabled: '&',
      nextMonthDisabled: '&'
    },
    link: function(scope, element, attrs){
      if(!attrs.hasOwnProperty('startDate')){
        throw "su.datepicker.directives.suDatepickerRangeDefault: start-date attribute is required";
      }

      var today = new Date(),
        potentialDate;

      // need a seperate date reference for calendar tracking
      scope.currentDateOne = util.copyDateOnly(scope.startDate || new Date());
      scope.currentDateTwo = util.changeMonth(scope.currentDateOne, 1);

      if(attrs.hasOwnProperty('isDateDisabled')){
        var originalDateDisabled = scope.isDateDisabled;
        scope.isDateDisabled = function(date){
          return originalDateDisabled({date: date});
        };
      } else {
        scope.isDateDisabled = function(date) {
          if (attrs.hasOwnProperty(attrs.$normalize('disable-past'))) {
            return suTimeNeutralDateCompareFilter(date, today) === -1;
          }
          return false;
        };
      }

      scope.moveMonth = function(diff) {
        scope.currentDateOne = util.changeMonth(scope.currentDateOne, diff);
        scope.currentDateTwo = util.changeMonth(scope.currentDateOne, 1);
      };
    }
  };
}