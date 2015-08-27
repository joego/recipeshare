Template.edit.events({
  "click .remove-ingredient" : function(e) {
    e.preventDefault();
    $(e.currentTarget).parent().remove();
  },
  "click .new-ingredient": function(e) {
    e.preventDefault();
    $('.recipe-ingredient').eq(0).clone().find("input").val("").end().addClass('removable').insertBefore(e.currentTarget);
  }
});

Template.editMenu.events({
  
  "click .save-recipe" : function(e) {
    // Prevent default action
    e.preventDefault();

    // Make array with ingredients
    var arrIgredients = [];
    $('.recipe-ingredient').each(function(idx, obj){
      arrIgredients[idx] = $(obj).children('input').val();
    });

    // Get value from inputs
    var recipeId = this._id;
    var data = {
      "id" : recipeId,
      "title" : $('.recipe-title').val(),
      "directions" : $('.recipe-directions').val(),
      "ingredients" : arrIgredients,
      "created" : $('.recipe-form').attr('data-created')
    };

    // Update recipe on the collection
    Meteor.call('updateItem', data, function() {
      
      // Show recipe
      Router.go('/recipe/'+recipeId+'/edit/image');
    });

  },
  
  "click .remove-recipe": function(e) {
    // Prevent default action
    e.preventDefault();
    
    // Delete recipe
    Meteor.call('deleteItem', this._id, function(){
      // Go back to home
      Router.go('/');
    });

  }
});

Template.editImg.helpers({
  recipeImg: function() {
    var recipe = Recipes.findOne(this._id);
    if (recipe.image !== undefined) {
      return Images.findOne(recipe.image);
    } else {
      return false;
    }
  }
});

Template.editImg.events({

  "click .recipe-image-button" : function() {

    // Trigger click on hidden field
    $('.recipe-image-file').trigger('click');

  },

  "click .recipe-image>img" : function() {

    // Trigger click on hidden field
    $('.recipe-image-file').trigger('click');

  },

  "change .recipe-image-file" : function(e) {
    var files = e.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      // Store image on database
      Images.insert(files[i], function (err, fileObj) {
        if (err){
          console.error(err);
        } else {
          var data = {
            recipeId: currId,
            imageId: fileObj._id
          };
          Session.set('currImg', data);
          unusedImages.push(fileObj._id);
          // Add image reference to recipe
          Meteor.call("updateImg", data);
        }
      });
    }
  },
});

Template.editImg.onRendered(function(){
  currId = $('.recipe-image').attr('id');
  Session.set('currImg', undefined);
});

Template.editImgMenu.events({
  "click .save-recipe-image" :  function(e) {

    // Prevent default action
    e.preventDefault();

    var data = Session.get('currImg');
    if (data !== undefined) {
        // Remove image from list of unused
        var i = unusedImages.indexOf(data.imageId);
        if (i !== -1) { 
          unusedImages.splice(i, 1); 
        }
    }
    // Delete unused images from database
    for (i in unusedImages) {
      Images.remove(unusedImages[i]);
    }
    // Clear list of unused images
    unusedImages = [];
    
    // Show recipe
    var url = window.location.href;
    url = url.replace('/edit/image','');
    Router.go(url);

  }
});
