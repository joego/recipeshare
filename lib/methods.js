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
      if (recipe.image !== undefined ) {
        Images.remove(recipe.image);
      }
    }
  },
  removeAllRecipes: function() {
    // Check if user is jose
    if (Meteor.user().username !== 'jose') {
      throw new Meteor.Error("not-authorized");
    } else {
      Recipes.remove({});
    }
  },
  removeAllImages: function() {
    // Check if user is jose
    if (Meteor.user().username !== 'jose') {
      throw new Meteor.Error("not-authorized");
    } else {
      Images.remove({});
    }
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
    // Check if user is owner
    var recipe = Recipes.findOne(data.recipeId);
    if (recipe.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    } else {
      
      // Update recipe image
      Recipes.update(data.recipeId, {
        $set: {
          image: data.imageId,
          updatedAt: new Date()
        }
      });
    }
  },
  removeImg: function(imageId) {
    // Remove image
    Images.remove(imageId);
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