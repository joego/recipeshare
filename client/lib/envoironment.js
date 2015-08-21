Template.registerHelper('isOwner', function () {
  return this.owner === Meteor.userId();
});

Template.registerHelper('isLogged', function () {
  return Meteor.user();
});

Template.registerHelper('ingredients', function() {
  var ingredientList = [];
  for (i in this.ingredients) {
    ingredientList.push({name: this.ingredients[i]});
  }
  return ingredientList;
});

Template.registerHelper('hasIngredients', function() {
  if (this.ingredients.length === 0) {
    return false;
  } else {
    return true;
  }
});