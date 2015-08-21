Meteor.subscribe('recipes');

Template.home.helpers({
  recipes: function() {
    return Recipes.find();
  }
});

Template.home.onRendered( function() {
  $('.recipe-entry').each(function(){
    $(this).css('background-image', 'url('+$(this).attr('data-image')+')' );
  });
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