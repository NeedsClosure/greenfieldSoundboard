var Upload = React.createClass ({
  getInitialState: function() {
   return {value: 'Hello!'};
  },

  render: function(){
    return (
      <div>
        <h1 className='uploadHeader'> Upload file </h1>
        <form encType="multipart/form-data" method="post" action='/soundUpload'>
          <input id="audio" type="file" name='sound' accept='audio/*'/>
          <button> Submit</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(<div>
  <Upload/>
  </div>, document.getElementById('upload')
);
