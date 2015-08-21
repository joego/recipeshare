function getUserLanguage() {
  // Firefox and Opera
  if ( window.navigator.language ) {
    var lang = window.navigator.language;
  }
  // Internet Explorer, no surprises there...
  else if ( navigator.browserLanguage ) {
    var lang = navigator.browserLanguage;
  }
  // We don't know
  else {
    var lang = "en";
  }
  //return lang;
  return "en";
}

Meteor.startup(function () {
  Session.set("showLoadingIndicator", true);

  TAPi18n.setLanguage(getUserLanguage())
    .done(function () {
      Session.set("showLoadingIndicator", false);
    })
    .fail(function (error_message) {
      // Handle the situation
      console.error(error_message);
    });

  //accountsUIBootstrap3.setLanguage(getUserLanguage());
  
});