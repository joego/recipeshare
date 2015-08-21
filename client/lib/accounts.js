Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

//Meteor.logout = _.wrap(Meteor.logout, function(logout){
//  // Define new callback
//  var newCallback = function() {
//    $('.login-close-text').click();
//    if ( window.location.pathname !== '/' && ! Meteor.userId() ) {
//      Router.go('/');
//    }
//  };
//  // Call the original function plus the new callback
//  logout(newCallback);
//});