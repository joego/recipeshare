Router.configure({
  layoutTemplate: "masterLayout",
  loadingTemplate: "loading",
  //notFoundTemplate: "notFound"
});
Router.route('/', {
  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('recipes');
  },
  action: function () {
    this.render('home', {to: 'content'} );
    this.render('dashboard', {to: 'footer'} );
  }
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
    } else {
      Router.go('/not-authorized');
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
    } else {
      Router.go('/not-authorized');
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
Router.route('/recipe/:_id/edit', {
  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('recipes', this.params._id);
  }, 
  action: function () {
    this.render('edit', {
      to: 'content',
      data: function () { return Recipes.findOne({_id: this.params._id}) }
    });
    this.render('editMenu', {
      to: 'footer',
      data: function () { return Recipes.findOne({_id: this.params._id}) }
    });
  },
  onBeforeAction: function() {
    // Check if user is owner
    var recipe = Recipes.findOne({_id: this.params._id});
    if (recipe.owner !== Meteor.userId() ) {
      Router.go('/not-authorized');
    } else {
      this.next();
    }
  }
});
Router.route('/recipe/:_id/edit/image', {
  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('recipes', this.params._id);
    return Meteor.subscribe('images', currId);
  },
  action: function () {
    this.render('editImg', {
      to: 'content',
      data: function () { return Recipes.findOne({_id: this.params._id}) }
    });
    this.render('editImgMenu', {
      to: 'footer',
      data: function () { return Recipes.findOne({_id: this.params._id}) }
    });
  }, 
  onBeforeAction: function() {
    // Check if user is owner
    var recipe = Recipes.findOne({_id: this.params._id});
    if (recipe.owner !== Meteor.userId() ) {
      Router.go('/not-authorized');
    } else {
      this.next();
    }
  }
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
});