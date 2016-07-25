'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Library = function (_React$Component) {
  _inherits(Library, _React$Component);

  function Library(props) {
    _classCallCheck(this, Library);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Library).call(this, props));

    _this.state = {
      currentSoud: null,
      name: '',
      library: []
    };
    _this.getCurrentSound = _this.getCurrentSound.bind(_this);
    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Library, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getSound('transformers');
    }
  }, {
    key: 'getCurrentSound',
    value: function getCurrentSound(sound) {
      console.log('getting sound name', sound);
      this.setState({
        currentSoud: sound
      });
    }
  }, {
    key: 'handleNameChange',
    value: function handleNameChange(e) {
      this.setState({ name: e.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      console.log('name', this.state.name, this.state.currentSoud);
      var soundObject = { "name": this.state.name, "currentSoud": this.state.currentSoud };
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
        success: function success(data) {
          console.log('success and ', data);
        },
        error: function error(err) {
          console.log('failed and ', err);
        }
      });
    }
  }, {
    key: 'getSound',
    value: function getSound(query) {
      var options = {
        key: '8mv3F2fRjY7HXptzrqlxrI5XLedmX862Pdp1rFnr',
        query: query
      };
      //bind this keyword, to have access to state
      var component = this;
      soundSearch(options, function (resp) {
        console.log(resp);
        component.setState({
          library: resp
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      //this.createKeyboard();
      console.log("yuck you", this.state.library);
      return React.createElement(
        'div',
        { className: 'container-fluid' },
        React.createElement(
          'div',
          { className: 'row library' },
          React.createElement(
            'div',
            { className: 'col-md-10' },
            React.createElement(
              'h2',
              null,
              'SOUND LIBRARY'
            )
          ),
          React.createElement(
            'div',
            { className: 'col-md-2' },
            React.createElement(
              'a',
              { className: 'exit', href: '/' },
              React.createElement(
                'h2',
                null,
                'EXIT'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-md-12 center' },
            React.createElement(
              'div',
              { className: 'console' },
              React.createElement(LibraryList, { library: this.state.library, getCurrentSound: this.getCurrentSound }),
              React.createElement(Search, { handleInputSearch: this.getSound.bind(this) })
            ),
            React.createElement(
              'div',
              { className: 'menu' },
              React.createElement(
                'p',
                null,
                'M'
              ),
              React.createElement(
                'div',
                { className: 'center' },
                React.createElement(
                  'form',
                  { className: 'soundForm' },
                  React.createElement('input', {
                    className: '',
                    type: 'text',
                    onChange: this.handleNameChange,
                    placeholder: 'New Sound Name...'
                  }),
                  React.createElement(
                    'button',
                    { className: 'btn-custom', onClick: this.handleSubmit },
                    'Save Sound'
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'center' },
                  React.createElement(
                    'span',
                    { className: 'title' },
                    'FILE UPLOAD'
                  ),
                  React.createElement(
                    'form',
                    { encType: 'multipart/form-data', method: 'post', action: '/soundUpload' },
                    React.createElement('input', { type: 'file', name: 'sound', id: 'file', className: 'inputfile', multiple: true, accept: 'audio/*', 'data-multiple-caption': '{count} files selected' }),
                    React.createElement(
                      'label',
                      { htmlFor: 'file' },
                      'Choose a file'
                    ),
                    React.createElement(
                      'button',
                      { className: 'btn-custom' },
                      'Submit'
                    )
                  )
                )
              )
            )
          )
        )
      )
      // <pre>nameOfCurrentSound = {this.state.nameOfCurrentSound}</pre>
      ;
    }
  }]);

  return Library;
}(React.Component);

ReactDOM.render(React.createElement(Library, null), document.getElementById('lib'));