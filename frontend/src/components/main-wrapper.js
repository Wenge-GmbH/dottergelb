import React, { Component , Fragment } from 'react';
import Nav from '../router/nav';
import FollowCircle from './follow-circle';

class MainWrapper extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <FollowCircle />
      </Fragment>
    );
  }
}

export default MainWrapper;
