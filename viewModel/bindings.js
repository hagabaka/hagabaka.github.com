define(['knockout'], function(ko) {
  // taken from https://github.com/knockout/knockout/wiki/Bindings---class

  //
  // Observable CSS Class Binding
  //
  ko.bindingHandlers['class'] = {
    update: function (element, valueAccessor) {
      var currentValue = ko.utils.unwrapObservable(valueAccessor()),
      prevValue = element['__ko__previousClassValue__'],

      // Handles updating adding/removing classes
      addOrRemoveClasses = function (singleValueOrArray, shouldHaveClass) {
        if (Object.prototype.toString.call(singleValueOrArray) === '[object Array]') {          
          ko.utils.arrayForEach(singleValueOrArray, function (cssClass) {
            var value = ko.utils.unwrapObservable(cssClass);
            ko.utils.toggleDomNodeCssClass(element, value, shouldHaveClass);
          });
        } else if (singleValueOrArray) {
          ko.utils.toggleDomNodeCssClass(element, singleValueOrArray, shouldHaveClass);
        }
      };

      // Remove old value(s) (preserves any existing CSS classes)
      addOrRemoveClasses(prevValue, false);

      // Set new value(s)
      addOrRemoveClasses(currentValue, true);

      // Store a copy of the current value
      element['__ko__previousClassValue__'] = currentValue.concat();
    }
  };
});
