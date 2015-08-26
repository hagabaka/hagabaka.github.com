define(['knockout'], function(ko) {
  var popups = ko.observableArray([]);
  function PopupViewModel(params) {
    var self = this;
    this.visible = params.visible;
    this.item = params.item;
    this.component = ko.pureComputed(function() {
      if(self.item()) {
        return self.item().typeName;
      } else {
        return null;
      }
    });
    this.type = ko.pureComputed(function() {
      return self.component() || params.type;
    });
    this.isTopMost = ko.pureComputed(function() {
      return popups.indexOf(self) === 0;
    });
  }
  PopupViewModel.prototype.close = function() {
    popups.remove(this);
    this.visible(false);
  };
  PopupViewModel.prototype.bringToFront = function() {
    popups.unshift(this);
  };
  PopupViewModel.popups = popups;
  return PopupViewModel;
});

