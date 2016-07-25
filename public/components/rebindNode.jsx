//RebindNode React class.  Represents one entry in the drop-down list for rebinding keys.
// var fs = require('fs');
var RebindNode = React.createClass({
  //this is the function that actually changes the binding of the key.
  updateKeyBinding: function(event) {
    console.log("updateKeyBinding called");
    var code = this.props.targetKey.charCodeAt();

    //this.props.targetSong  is going to be entire song object
    // var path = "/soundfiles/" + this.props.targetSong;

    var path = this.props.targetSong.soundLink;
    if(path[0] === "/") {
      path = "." + path;
      console.log("NEW PATH", path);
    }
    var songName = this.props.targetSong.name;
    var bindings = this.props.bindings;
    console.log("PATH", path);
    var pathPrefix = path.split('').splice(0, 3).join('');
    console.log("path prefix", pathPrefix);
    //if the rebind is for an uploaded sound
    if(pathPrefix === "./d") {
      console.log("sound was uploaded!");
      $.ajax({
        type: 'POST',
        url: '/checkDirectory',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({"path": path}),
        success: function(data){
          console.log("file found");
        },
        error: function(err){
          console.log('file not found', err);
          $.ajax({
            type: 'POST',
            url: '/soundDownload',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({"name": songName}),
            success: function(data){
              console.log("song downloaded");
            },
            error: function(err){
              console.log('song not downloaded', err);
              bindings.forEach(function (ele, idx) {
                if (ele.key === code) {
                  console.log("TESTING!!", path);
                  bindings[idx]["path"] = path;
                  console.log("new bindings", bindings);
                }
              }, this);
            }
          })
        }
    })
  }

  else {
    this.props.bindings.forEach(function (ele, idx) {
      if (ele.key === code) {
        console.log("has get requested failed yet?", code, ele);
        this.props.bindings[idx].path = path;
      }
    }, this);
}


  },
  //method for previewing sound before binding it.
  playSample: function() {
    var soundExample = this.props.targetSong.soundLink;

  },
  render: function() {
    return (
      <div className="rebindNode" onClick = {this.updateKeyBinding}>
        <p className="rebindSong" onClick = {this.props.reRender}>{this.props.targetSong.name}</p>
        <img className="rebindIcon" src="assets/listen.png" onClick={this.playSample}/>
      </div>
    )
  }
});
//

//this is actually not needed. Just remember that you might need to do this someday.
window.rebindNode = RebindNode;
