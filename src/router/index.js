import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import MainWrapper from '../components/main-wrapper';

class MainRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={MainWrapper} />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default MainRouter;
