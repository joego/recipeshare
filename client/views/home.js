Template.home.helpers({
  recipes: function() {
    return Recipes.find({}, {limit: 10});
  }
});

Template.recipe.helpers({
  recipeImg: function() {
    var currRecipe = Recipes.findOne(this._id);
    var imageImg = currRecipe.image;
    return Images.findOne(imageImg);
  }
});

Template.recipe.onRendered( function() {
  var self = $(this.firstNode),
    imgsrc = self.find('img').attr('src');
  self
    .height(0)
    .css('background-image', 'url(' + imgsrc + ')')
    .find('img').addClass('hidden')
    .removeAttr('style');
});

Template.home.onCreated( function() {
  if('querySelector' in document
    && 'localStorage' in window
    && 'addEventListener' in window) {
  } else {
    var msg = 'You are using an obsolete browser. Please install a modern browser to view this page. You can try <a href="https://www.mozilla.org/firefox/">Firefox</a> for example.';
    document.write(msg);
    throw new Error(msg);
  }
});

Template.dashboard.events({
  "click .add-item": function(e) {
    e.preventDefault();
    Router.go('/add');
  },
  "click .remove-all" : function(e) {
    e.preventDefault();
    Meteor.call('removeAll');
    console.info('Recipes removed');
  }
});