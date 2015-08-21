Recipes = new Mongo.Collection('recipes');

Meteor.methods({
  addItem: function (data) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    // Add recipe to collection
    Recipes.insert({
      title: data.title,
      directions: data.directions,
      image: data.image,
      ingredients: data.ingredients,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    }, function(error, result){
      if (error) {
        console.error(error);
      } else {
        nextURL = '/recipe/'+result;
      }
    });
  },
  deleteItem: function (recipeId) {
    // Check if user is owner
    var recipe = Recipes.findOne(recipeId);
    if (recipe.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Recipes.remove(recipeId);
  },
  removeAll: function() {
    Recipes.remove({});
  },
  updateItem: function(data) {
    // Check if user is owner
    var recipe = Recipes.findOne(data.id);
    if (recipe.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    // Update recipe data
    Recipes.update(data.id, {
      title: data.title,
      directions: data.directions,
      image: data.image,
      ingredients: data.ingredients,
      createdAt: data.created,
      updatedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }
});