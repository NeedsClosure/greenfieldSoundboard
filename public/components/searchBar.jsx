class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleInputChange(e) {
    this.props.handleInputSearch(e.target.value);
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="form-control"
          type="text"
          placeholder="SEARCH NEW SOUND"
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)}
        />
      </div>
    );
  }
}

window.Search = Search;
