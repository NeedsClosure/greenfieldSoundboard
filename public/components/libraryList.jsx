var LibraryList = ({library, getCurrentSound}) => {
  var results = library;
  var audio = null;
  var wave = null;
  var wavesurfer = null;

  var playTrack = function(item){
    audio = new Audio(item);
    audio.play();
    var parent = document.getElementById("waveform");
    var wave = document.getElementsByTagName("wave");
    var a = document.getElementsByTagName("audio");
    console.log('sound here', a);
    console.log(wave);
    if(!wave.length){
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
}


  return (
    <div className="sound-library">
      <div className="akai">
        AKAI
      <img className="logo" src="http://zamaraevk.github.io/portfolio/css/decep.png"></img>
      </div>
      <div className="wawa">
        <div id="waveform"></div>
      </div>
      <ul>
        {results.map(function(result) {
         return <li className="sound-item" key={results.indexOf(result)} onClick={() =>
             { playTrack(result.previews['preview-hq-mp3']);
               getCurrentSound(result.previews['preview-hq-mp3']);
             }}></li>;
       })}
      </ul>
    </div>

  );
};

window.LibraryList = LibraryList;
