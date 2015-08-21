Template.edit.events({
  "focus .recipe-ingredient input" : function(e) {
    if ( $(e.currentTarget).val().length === 0 ) {
      $(e.currentTarget).parent().clone().addClass('removable').appendTo('.recipe');
    }
  },
  "click .remove-ingredient" : function(e) {
    e.preventDefault();
    $(e.currentTarget).parent().remove();
  },
  "click .new-ingredient": function(e) {
    e.preventDefault();
    $('.recipe-ingredient').eq(0).clone().find("input").val("").end().addClass('removable').insertBefore(e.currentTarget);
  }
});

Template.edit.onRendered( function() {
  if ($('.recipe-ingredient').length === 0) {
    
  }
});

Template.editMenu.events({
  
  "click .save-recipe" : function(e) {
  
    // Prevent default action
    e.preventDefault();

    // Make array with ingredients
    var arrIgredients = [];
    $('.recipe-ingredient').each(function(idx, obj){
      arrIgredients[idx] = $(obj).children('input').val();
    });

    // Get value from inputs
    //var recipeId = $('.recipe-form').attr('id');
    var recipeId = this._id;
    var data = {
      "id" : recipeId,
      "title" : $('.recipe-title').val(),
      "image" : $('.recipe-image').val(),
      //"directions" : $('.recipe-directions').val().replace(/\r?\n/g, '<br>'),
      "directions" : $('.recipe-directions').val(),
      "ingredients" : arrIgredients,
      "created" : $('.recipe-form').attr('data-created')
    };

    // Update recipe on the collection
    Meteor.call('updateItem', data);

    // Show recipe
    Router.go('/recipe/'+recipeId);
  },
  
  "click .remove-recipe": function(e) {

    // Prevent default action
    e.preventDefault();
    
    // Delete recipe
    Meteor.call('deleteItem', this._id);

    // Go back to home
    Router.go('/');
    
  }
  
});