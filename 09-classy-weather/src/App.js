import React from "react";

class App extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      location: "Islamabad",
      weatherData: null,
    };
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search for location..."
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
          <button>Get Weather</button>
        </div>
      </div>
    );
  }
}

export default App;
