Template.add.events({
  
  "click .new-ingredient" : function(e) {
    
    // Prevent default action
    e.preventDefault();
    
    // Clone and adjust input for ingredient
    $('.recipe-ingredient').eq(0).clone().find("input").val("").end().addClass('removable').appendTo($('.recipe-form'));
  },
  
  "click .remove-ingredient" : function(e) {

    // Prevent default action
    e.preventDefault();

    // Delete ingredient from DOM
    $(e.currentTarget).parent().remove();
  }
});

Template.addMenu.events({
  
  "click .save-recipe" : function(e) {
    // Prevent default action
    e.preventDefault();
    
    // Make array with ingredients
    var arrIgredients = [];
    $('.recipe-ingredient').each(function(idx, obj){
      arrIgredients[idx] = $(obj).children('input').val();
    });
    
    // Get value from inputs
    var data = {
      "title" : $('.recipe-title').val(),
      //"image" : $('.recipe-image').val(),
      "directions" : $('.recipe-directions').val(),
      "ingredients" : arrIgredients
    };
    
    // Insert new recipe into the collection
    Meteor.call('addItem', data, function(){
      Router.go('addImg');
    });
    
    // Clear form
    $('.recipe').find('.removable').remove();
    $('.recipe').find('.full-input').val('');
    
  },
  
  "click .cancel" : function(e) {
    
    // Prevent default action
    e.preventDefault();
    
    // Go back to home
    Router.go('/');
  }
  
});

Template.addImg.events({
  "click .recipe-image" : function(e) {
  
    // Prevent default action
    e.preventDefault();
  
    $(e.currentTarget).find('input:file').trigger('click');
  
  },
  
  "focus .recipe-image" : function(e) {
  
    // Prevent default action
    e.preventDefault();
  
    // Trigger click on hidden field
    $(e.currentTarget).find('input:file').trigger('click');
  
  },
  
  "click .recipe-image-file" : function(e) {
  
    // Prevent event propagation
    e.stopImmediatePropagation();
  
  },
  
  "click .recipe-image-button-add" : function(e) {

    // Prevent default action
    e.preventDefault();

    $('.recipe-image-file').trigger('click');
  
  },
  
  "change .recipe-image-file" : function(e) {
  
    $('.recipe-image-button-add').addClass('hidden');
    $('.recipe-image-button-change').removeClass('hidden');
  
    var files = e.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
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
        }
      });
    }
  }
});

Template.addImg.helpers({
  recipeImg: function() {
    var currImgData = Session.get('currImg');
    if (currImgData !== undefined) {
      var imageId = currImgData.imageId;
      return Images.findOne(imageId);
    } else {
      return false;
    }
  }
});

Template.addImgMenu.events({

  "click .add-image" :  function(e) {

    // Prevent default action
    e.preventDefault();

    var data = Session.get('currImg');
    if (data !== undefined) {
      // Add image reference to the recipe
      Meteor.call("updateImg", data, function() {
        // Remove image from list of unused
        var i = unusedImages.indexOf(data.imageId);
        if (i !== -1) { unusedImages.splice(i, 1); }
        // Delete unused images
        for (i in unusedImages) {
          Images.remove(unusedImages[i]);
        }
        // Clear list of unused images
        unusedImages = [];
      });
      Session.set('currImg', undefined);
    }
    
    // Show recipe
    Router.go("/recipe/"+currId);

  }
  
});