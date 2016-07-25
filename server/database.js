var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Grid = require('gridfs-stream');
var fs = require('fs');
var fse = require('fs-extra');
var db = require('./dbConnection.js')
db.conn.once('open', function(){
  console.log("connection established to remoteDB");
})
Grid.mongo = mongoose.mongo;

//SCHEMAS AND MODELS
var soundSchema = new Schema({
  name: String,
  soundLink: String,
  uploaded: Boolean
});

var Sound = mongoose.model('Sound', soundSchema);

var keyboardSchema = new Schema({
  name: String,
  97 : String,
  98 : String,
  99 : String,
  100 : String,
  101 : String,
  102 : String,
  103 : String,
  104 : String,
  105 : String,
  106 : String,
  107 : String,
  108 : String,
  109 : String,
  110 : String,
  111 : String,
  112 : String,
  113 : String,
  114 : String,
  115 : String,
  116 : String,
  117 : String,
  118 : String,
  119 : String,
  120 : String,
  121 : String,
  122 : String
});


var Keyboard = mongoose.model('Keyboard', keyboardSchema);

//RETRIEVE SOUND LIBRARY FROM DB
var retrieveLibrary = function(next, res){
  Sound.find({}, function(err, sounds){
    if(err){
      next(new Error(err));
    }
    console.log("SOUNDS RETRIEVED", sounds);
    res.send(sounds);
  })
}

//HANDLE UPLOADS

// TO ADD UPLOADED SOUND TO DATABASE
var saveToDB = function(name, res, next) {
  console.log("saveToDB called in database.js!!!!", name);
  //establishes filestream to remoteDB
  var gfs = Grid(db.conn.db);

  //creates stream to remote database and defines file name to be saved
  var writestream = gfs.createWriteStream({
      filename: name
  });
  //reads sound from uploads folder and sends it to remoteDB
  fs.createReadStream('./uploads/' + name).pipe(writestream);
  //when file is done uploading to DB
  writestream.on('close', function (file) {
    //create new sound in collection so that when library is retrieved, uploaded sounds are also seen
    var newSound = new Sound({
      "name": name,
      "soundLink": './downloads/' + name,
      "uploaded": true
    })
    newSound.save(function(err){
      //deletes from local directory after saved to remoteDB to avoid buildup of space
      fse.remove('./uploads/' + name, function (err) {
        if (err) return console.error(err)
        console.log(file.filename + 'Written To remote DB!! and deleted from local directory');
        res.redirect('/lib');
      })
    })

  });
}

//TO RETRIEVE UPLOADED SOUND FROM DATABASE
var retrieveSound = function(name, next) {
  var gfs = Grid(db.conn.db);
  var fs_write_stream = fs.createWriteStream('./downloads/'+ name);

  //read from mongodb
  var readstream = gfs.createReadStream({
       filename: name
  });
  readstream.pipe(fs_write_stream);
  fs_write_stream.on('close', function () {
       console.log('sound downloaded');
       next("sound saved to app directory")
    })
}
var newSound = function(sound){
  console.log("My sound", sound);
  var newSound = new Sound({
      name: sound.name,
      soundLink: sound.currentSoud,
      uploaded: false
    });
  newSound.save(function(err){
    if(err){
      console.log("newSound not saved")
    }
    console.log("newSound saved!");
  })
}

module.exports = {
  'keyboard': Keyboard,
  'sound': Sound,
  'saveToDB': saveToDB,
  'retrieveSound': retrieveSound,
  'retrieveLibrary': retrieveLibrary,
  'newSound': newSound
}
