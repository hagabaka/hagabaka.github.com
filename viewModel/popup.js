define(['knockout'], function(ko) {
  var popups = ko.observableArray([]);
  function PopupViewModel(params) {
    var self = this;
    this.item = params.item;
    this.component = ko.pureComputed(function() {
      return self.item().typeName;
    });
    this.type = ko.pureComputed(function() {
      return self.item().typeName;
    });
    if(this.item()) {
      popups.push(self);
    }
    this.item.subscribe(function(value) {
      if(value) {
        popups.push(self);
      }
    });
    this.isTopMost = ko.pureComputed(function() {
      return popups()[popups().length - 1] === self;
    });
    this.zIndex = ko.pureComputed(function() {
      if(self.isTopMost()) {
        return 120;
      } else {
        return 100;
      }
    });
  }
  PopupViewModel.prototype.close = function() {
    var self = this;
    popups(popups().filter(function(popup) {
      return popup !== self;
    }));
    this.item(null);
  };
  PopupViewModel.popups = popups;
  return PopupViewModel;
});

