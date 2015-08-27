Template.show.events({
  "click .remove-recipe": function(e) {
    e.preventDefault();
    var recipeId = $(e.currentTarget).parent().attr('id');
    Meteor.call("deleteItem", recipeId);
    Router.go('/');
  }
});

Template.show.helpers({
  recipeImg: function() {
    var currRecipe = Recipes.findOne(this._id);
    var imageImg = currRecipe.image;
    return Images.findOne(imageImg);
  }
});

Template.show.onRendered( function() {
  $('.recipe-details-directions').html($('.recipe-details-directions').html().replace(/\r?\n/g, '<br>'));
  window.scrollTo(0,0);
});

Template.showMenu.events({
  "click .edit-recipe": function(e) {
    e.preventDefault();
    var recipeId = $('.recipe-details').attr('id');
    Router.go('/recipe/'+recipeId+'/edit');
  }
});