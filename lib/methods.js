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
      ingredients: data.ingredients,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    }, function(error, result){
      if (error) {
        console.error(error);
      } else {
        currId = result;
      }
    });
  },
  deleteItem: function (recipeId) {
    // Check if user is owner
    var recipe = Recipes.findOne(recipeId);
    if (recipe.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    } else {
      Recipes.remove(recipeId);
    }
  },
  removeAllRecipes: function() {
    Recipes.remove({});
  },
  removeAllImages: function() {
    Images.remove({});
  },
  updateItem: function(data) {
    // Check if user is owner
    var recipe = Recipes.findOne(data.id);
    if (recipe.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // Update recipe data
    Recipes.update(data.id, {
      $set: {
        title: data.title,
        directions: data.directions,
        ingredients: data.ingredients,
        updatedAt: new Date()
      }
    });
  }, 
  updateImg: function(data) {
    // Update recipe image
    Recipes.update(data.recipeId, {
      $set: {image: data.imageId}
    });
  },
  sendEmail: function (from, text) {
    check([from, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: 'goncalves.joseh@gmail.com',
      from: from,
      subject: 'RecipeShare: New Contact',
      text: text
    });
  }
});