Template.loginButtons.onRendered( function () {
  
  $(".page").bind("DOMSubtreeModified", function() {
    $('body')
      .find('#login-username').attr('placeholder', 'Username').end()
      .find('#login-password').attr('placeholder', 'Password').end()
      .find('#login-old-password').attr('placeholder', 'Current password').end()
      .find('#login-password-again').attr('placeholder', 'Password (again)');
  });
  
});