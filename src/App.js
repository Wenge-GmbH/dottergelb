import React, { Component } from 'react';

class App extends Component {
  state = {
    text: 'dotter it is!',
    text2: 'dotter it is!',
  };

  handleClick = (param) => () => {
    this.setState({
      [param]: this.state[param] + '2',
    })
  }
  test(startWert) {
    var counter = startWert;
    return function () {
      return counter++;
    }
  }


  render() {
    this.count = this.test(6);
    this.count2 = this.test(1);

    return (
      <div className="App">

      </div>
    );
  }
}


export default App;


var test = new App();
