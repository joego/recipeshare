Recipes = new Mongo.Collection('recipes');

//var createThumb = function(fileObj, readStream, writeStream) {
//  // Transform the image into a 10x10px thumbnail
//  gm(readStream, fileObj.name()).resize('300', '300').stream().pipe(writeStream);
//};

Images = new FS.Collection("images", {
  stores: [
    //new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
    new FS.Store.GridFS("images")
  ],
  //useHTTP: true,
  filter: {
    maxSize: 512000, //in bytes
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'jpg', 'jpeg', 'gif']
    },
    onInvalid: function (message) {
      if (Meteor.isClient) {
        alert(message);
      }
    }
  }
});

Images.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

currId = "";
unusedImages = [];