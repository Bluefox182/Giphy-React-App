import React from "react";
import ReactDOM from "react-dom";
import GifList from "./components/GifList";
import SearchBar from "./components/SearchBar";
import request from "superagent";
import "./styles/app.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      gifs: [],
    };
  }

  handleTermChange = (term) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(
      /\s/g,
      "+"
    )}&api_key=uB6lVPNzd7wu1XgVYQlMdBt7KKKFUiUJ&limit=10`;
    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data });
    });
  };

  render() {
    return (
      <div>
        <div className="navbar">Giphy API Search</div>
        <div>
          <SearchBar onTermChange={this.handleTermChange} />
          <GifList gifs={this.state.gifs} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
