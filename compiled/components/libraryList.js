"use strict";

var LibraryList = function LibraryList(_ref) {
  var library = _ref.library;
  var getCurrentSound = _ref.getCurrentSound;

  var results = library;
  var audio = null;
  var wave = null;
  var wavesurfer = null;

  var playTrack = function playTrack(item) {
    audio = new Audio(item);
    audio.play();
    var parent = document.getElementById("waveform");
    var wave = document.getElementsByTagName("wave");
    var a = document.getElementsByTagName("audio");
    console.log('sound here', a);
    console.log(wave);
    if (!wave.length) {
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'red',
        progressColor: 'purple'
      });
      wavesurfer.load(item);
    } else {
      console.log('WAVE ALREADY EXIST', wave);
      $('#waveform').empty();
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'red',
        progressColor: 'purple'
      });
      wavesurfer.load(item);
    }

    // if(!audio){
    //   audio = new Audio(item);
    //   audio.play();
    // } else {
    //   audio.pause();
    //   audio = null;
    // }
    // console.log(audio);
  };

  return React.createElement(
    "div",
    { className: "sound-library" },
    React.createElement(
      "div",
      { className: "akai" },
      "AKAI",
      React.createElement("img", { className: "logo", src: "http://zamaraevk.github.io/portfolio/css/decep.png" })
    ),
    React.createElement(
      "div",
      { className: "wawa" },
      React.createElement("div", { id: "waveform" })
    ),
    React.createElement(
      "ul",
      null,
      results.map(function (result) {
        return React.createElement("li", { className: "sound-item", key: results.indexOf(result), onClick: function onClick() {
            playTrack(result.previews['preview-hq-mp3']);
            getCurrentSound(result.previews['preview-hq-mp3']);
          } });
      })
    )
  );
};

window.LibraryList = LibraryList;