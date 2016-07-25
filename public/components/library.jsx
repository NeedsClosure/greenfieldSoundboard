
class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSoud: null,
      name: '',
      library: []
    }
    this.getCurrentSound = this.getCurrentSound.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getSound('transformers');
  }
  getCurrentSound(sound){
    console.log('getting sound name', sound);
    this.setState({
      currentSoud: sound
    })
  }
  handleNameChange(e) {
   this.setState({name: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('name',this.state.name, this.state.currentSoud);
    var soundObject = { "name": this.state.name, "currentSoud": this.state.currentSoud}
    console.log("object being sent", soundObject);

    // $.post('/sound', {hey: 'hey'} ).done(function(data){
    //   console.log('HEEEY', data);
    // })
    $.ajax({
      type: 'POST',
      url: '/newSound',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(soundObject),
      success: function(data){
        console.log('success and ', data);
      },
      error: function(err){
        console.log('failed and ', err);
      }
    });
  }

  getSound(query) {
    var options = {
      key: '8mv3F2fRjY7HXptzrqlxrI5XLedmX862Pdp1rFnr',
      query: query
    };
    //bind this keyword, to have access to state
    var component = this;
    soundSearch(options, function(resp){
        console.log(resp);
        component.setState({
          library: resp
        })
    })
  }

  render() {
    //this.createKeyboard();
    console.log("yuck you", this.state.library)
    return (
      <div className="container-fluid">
        <div className="row library">
            <div className="col-md-10">
              <h2>SOUND LIBRARY</h2>
            </div>
            <div className="col-md-2">
              <a className="exit" href="/"><h2>EXIT</h2></a>
          </div>
        </div>
        <div className="row">
            <div className="col-md-12 center">
              <div className="console">
                <LibraryList library={this.state.library} getCurrentSound={this.getCurrentSound}/>
                <Search handleInputSearch = {this.getSound.bind(this)} />
              </div>
              <div className="menu">
                <p>M</p>
                  <div className="center">
                       <form className="soundForm">
                        <input
                          className=""
                          type="text"
                          onChange={this.handleNameChange}
                          placeholder="New Sound Name..."
                        />
                      <button className="btn-custom" onClick={this.handleSubmit}>Save Sound</button>
                    </form>
                    <div className="center">
                      <span className="title">FILE UPLOAD</span>
                      <form encType="multipart/form-data" method="post" action='/soundUpload'>
                        <input type="file" name="sound" id="file" className="inputfile" multiple accept='audio/*' data-multiple-caption="{count} files selected"/>
                        <label htmlFor="file">Choose a file</label>
                        <button className="btn-custom">Submit</button>
                      </form>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
      // <pre>nameOfCurrentSound = {this.state.nameOfCurrentSound}</pre>
    );
  }
}

ReactDOM.render(
  <Library />,
  document.getElementById('lib')
);
