Template.mail.events({
  "click .btn-send-message": function(e) {
    e.preventDefault();
    var mailWriter = $('.author-name').val() + ' <' + $('.author-email').val() + '>',
        mailText = $('.mail-message').val();
    
    Meteor.call('sendEmail', mailWriter, mailText, function(){
      // Insert message on page
      $('<div class="alert alert-info">Your message has been sent.</div>').insertAfter('h2');
      // Remove message after 5 seconds
      setTimeout(function(){
        $('.alert-info').remove();
      }, 5000);
    });
  }
});