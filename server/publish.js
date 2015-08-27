Meteor.publish("recipes", function () {
  return Recipes.find();
});

Meteor.publish("images", function () {
  return Images.find();
});