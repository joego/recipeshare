Template.show.events({
  "click .remove-recipe": function(e) {
    e.preventDefault();
    var recipeId = $(e.currentTarget).parent().attr('id');
    Meteor.call("deleteItem", recipeId);
    Router.go('/');
  }
});

//Template.show.helpers({
//  ingredients: function() {
//    var ingredientList = [];
//    for (i in this.ingredients) {
//      ingredientList.push({name: this.ingredients[i]});
//    }
//    return ingredientList;
//  }
//});

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