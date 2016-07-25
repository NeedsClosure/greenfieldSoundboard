var soundSearch = ({key, query}, callback) => {
  $.get('https://www.freesound.org/apiv2/search/text/?query='  + query + '&fields=name,previews&token=' + key)
  .done(({results}) => {
    //console.log("hello", results);
    if (callback) {
      callback(results);
    }
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    )
  });
};

window.soundSearch = soundSearch;
