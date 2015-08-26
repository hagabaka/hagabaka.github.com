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

  ko.bindingHandlers.transitionVisible = {
    init: function(element, valueAccessor) {
      var showing = ko.unwrap(valueAccessor());
      if(showing) {
        element.dataset.displayState = 'shown';
      } else {
        element.dataset.displayState = 'hidden';
      }
      element.addEventListener('transitionend', function() {
        switch(element.dataset.displayState) {
          case 'showing':
          case 'finishedShowing':
          case 'shown':
            element.dataset.displayState = 'shown';
            break;
          case 'hiding':
          case 'finishedHiding':
          case 'hidden':
            element.dataset.displayState = 'hidden';
            break;
        }
      });
    },
    update: function(element, valueAccessor) {
      console.log(JSON.stringify(element.dataset.displayState));
      var showing = ko.unwrap(valueAccessor());
      if(showing) {
        element.dataset.displayState = 'showing';
        element.clientHeight;
        element.dataset.displayState = 'finishedShowing';
        element.clientHeight;
      } else if(element.dataset.displayState === 'shown') {
        element.dataset.displayState = 'hiding';
        element.clientHeight;
        element.dataset.displayState = 'finishedHiding';
        element.clientHeight;
      } else {
        element.dataset.displayState = 'hidden';
      }
    }
  };
});
