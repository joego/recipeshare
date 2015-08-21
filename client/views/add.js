Template.add.events({
  
  "click .new-ingredient" : function(e) {
    
    // Prevent default action
    e.preventDefault();
    
    // Clone and adjust input for ingredient
    $('.recipe-ingredient').eq(0).clone().addClass('removable').insertBefore(e.currentTarget);
    
  },
  
  "click .remove-ingredient" : function(e) {
  
    // Prevent default action
    e.preventDefault();
    
    // Delete ingredient from DOM
    $(e.currentTarget).parent().remove();
  }
});

Template.addMenu.events({
  
  "click .save-recipe" : function(e) {
    // Prevent default action
    e.preventDefault();
    
    // Make array with ingredients
    var arrIgredients = [];
    $('.recipe-ingredient').each(function(idx, obj){
      arrIgredients[idx] = $(obj).children('input').val();
    });
    
    // Get value from inputs
    var data = {
      "title" : $('.recipe-title').val(),
      "image" : $('.recipe-image').val(),
      "directions" : $('.recipe-directions').val(),
      "ingredients" : arrIgredients
    };
    
    // Insert new taks into the collection
    Meteor.call('addItem', data, function(){
      Router.go(nextURL);
    });
    
    // Clear form
    $('.recipe').find('.removable').remove();
    $('.recipe').find('.full-input').val('');
    
  },
  
  "click .cancel" : function(e) {
    
    // Prevent default action
    e.preventDefault();
    
    // Go back to home
    Router.go('/');
  }
  
});