Template.mail.events({
  "click .btn-send-message": function(e) {
    e.preventDefault();
    var mailWriter = $('.author-name').val() + ' <' + $('.author-email').val() + '>',
        mailText = $('.mail-message').val();
    Meteor.call('sendEmail', mailWriter, mailText, function(){
      $('.mail-form').prepend('<div class="alert-info">Your message has been sent.</div>');
      setTimeout(function(){
        $('.alert-info').remove();
      }, 5000);
    });
  }
});