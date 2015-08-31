Router.configure({
  layoutTemplate: "masterLayout",
  loadingTemplate: "loading",
  //notFoundTemplate: "notFound"
});
Router.route('/', function() {
  this.render('home', {to: 'content'} );
  this.render('dashboard', {to: 'footer'} );
});
Router.route('/search', {
  action: function() {
    this.render('search', {to: 'content'} );
    this.render('dashboard', {to: 'footer'} );
  },
  onAfterAction: function(){
    setTimeout(function(){
      $('.search-input').focus();
    }, 200);
  }
});
Router.route('/add', function () {
  this.render('add', {to: 'content'} );
  this.render('addMenu', {to: 'footer'} );
}, {
  onBeforeAction: function() {
    if ( Meteor.userId() ) {
      this.next();
    }
  }
});
Router.route('/addImg', function () {
  this.render('addImg', {to: 'content'} );
  this.render('addImgMenu', {to: 'footer'} );
}, {
  onBeforeAction: function() {
    if ( Meteor.userId() ) {
      this.next();
    }
  }
});
Router.route('/recipe/:_id', function () {
  this.render('show', {
    to: 'content',
    data: function () { return Recipes.findOne({_id: this.params._id}) }
  });
  this.render('showMenu', {
    to: 'footer',
    data: function () { return Recipes.findOne({_id: this.params._id}) }
  } );
});
Router.route('/recipe/:_id/edit', function () {
  this.render('edit', {
    to: 'content',
    data: function () { return Recipes.findOne({_id: this.params._id}) }
  });
  this.render('editMenu', {
    to: 'footer',
    data: function () { return Recipes.findOne({_id: this.params._id}) }
  } );
});
Router.route('/recipe/:_id/edit/image', function () {
  this.render('editImg', {
    to: 'content',
    data: function () { return Recipes.findOne({_id: this.params._id}) }
  });
  this.render('editImgMenu', {
    to: 'footer',
    data: function () { return Recipes.findOne({_id: this.params._id}) }
  } );
});
Router.route('/about', function () {
  this.render('about', {to: 'content'} );
  this.render('dashboard', {to: 'footer'} );
});
Router.route('/mail', function () {
  this.render('mail', {to: 'content'} );
  this.render('dashboard', {to: 'footer'} );
});

Router.route("/(.*)", function() {
  this.render('notFound', {to: 'content'});
  this.render('dashboard', {to: 'footer'} );
  //this.next();
});

//var dataForTemplate = function () { return Recipes.findOne({_id: this.params._id}) }; 