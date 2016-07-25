'use strict';

var Upload = React.createClass({
  displayName: 'Upload',

  getInitialState: function getInitialState() {
    return { value: 'Hello!' };
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        { className: 'uploadHeader' },
        ' Upload file '
      ),
      React.createElement(
        'form',
        { encType: 'multipart/form-data', method: 'post', action: '/soundUpload' },
        React.createElement('input', { id: 'audio', type: 'file', name: 'sound', accept: 'audio/*' }),
        React.createElement(
          'button',
          null,
          ' Submit'
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(Upload, null)
), document.getElementById('upload'));