Router.configure({
  layoutTemplate: 'masterLayout',
  notFoundTemplate: 'notFound',
  //loadingTemplate: 'loading',
});
//Router.onBeforeAction(function () {
//  if ( ! Meteor.userId() && window.location.pathname !== '/' ) {
//    window.location.href = '/';
//  } else {
//    this.next();
//  }
//});
Router.route('/', function () {
  this.render('home', {to: 'content'} );
  this.render('dashboard', {to: 'footer'} );
});
Router.route('/search', function () {
  this.render('search', {to: 'content'} );
  this.render('dashboard', {to: 'footer'} );
}, {
  onAfterAction: function(){
    setTimeout(function(){
      $('.search-input').focus();
    }, 200);
  }
});
Router.route('/add', function () {
  this.render('add', {to: 'content'} );
  this.render('addMenu', {to: 'footer'} );
});
Router.route('/recipe/:_id', function () {
  this.render('show', {
    to: 'content',
    data: dataForTemplate
  });
  this.render('showMenu', {
    to: 'footer',
    data: dataForTemplate
  } );
});
Router.route('/recipe/:_id/edit', function () {
  this.render('edit', {
    to: 'content',
    data: dataForTemplate
  });
  this.render('editMenu', {
    to: 'footer',
    data: dataForTemplate
  } );
});
Router.route('/about', function () {
  this.render('about', {to: 'content'} );
  this.render('dashboard', {to: 'footer'} );
});

var nextURL = '/';
var dataForTemplate = function () { return Recipes.findOne({_id: this.params._id}) }; 