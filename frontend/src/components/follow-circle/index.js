import React, { Component } from 'react';
import posed from 'react-pose';
import { tween } from 'popmotion';
import { interpolate } from 'polymorph-js';

const paths = {
  path1: 'M85.41,47.05c-2.18-5.1,1-15-3.22-21.19s-10.54-7.47-25.78-4.78S47.11,13,38,9.5s-17.46,4.1-19.26,12.88S22.08,35,20.25,40,8.42,46.06,8.43,58.16s5.46,18.15,12.91,19.59,12.4-3.55,17.67-3,8.27,6.3,19,5.43,7.35,12.15,16.77,11.13,16.77-7.17,16.77-23C91.57,56.22,87.59,52.15,85.41,47.05Z',
  path2: 'M80,57.91c3.32-6.88,8.91-7.32,11.41-15.63S89,21.22,74.49,19.16,60.86,11,53.28,9.87,41.54,16.08,42,20.06c.6,5.11-1,10.08-7.56,11.23s-5.07,9.66-14.51,10.8S5.08,55.66,9.5,66.58C12.77,74.66,23,81.47,32,80.88a22.33,22.33,0,0,1,15.22,4.69,21.93,21.93,0,0,0,32.51-6.31C83.67,72.43,76.71,64.79,80,57.91Z',
  path3: 'M98,33.46C98,22.93,91.42,17,81.2,15s-13,4.4-19.16,3.83S52.66,8.23,45.88,8.23c-9.35,0-11.58,9.13-20.62,11.46S-1.3,31.12,2.54,45C5.08,54.1,9.47,55.65,13.46,59.32A20.25,20.25,0,0,1,19,67.94c4.57,12.71,9.21,23.83,20.57,23.83,10.29,0,17.44-6.26,20.33-20.19,1.33-6.39,3.88-10.76,7.35-13.79,4.09-3.57,9.44-5.27,15.53-6.18C94,49.93,98,42,98,33.46Z',

}
const pathIds = Object.keys(paths);

const morphTransition = ({ from, to }) =>
  tween({
    from: 0,
    to: 1
  }).pipe(interpolate([from, to], { precision: 4 }));

const Icon = posed.path(
  pathIds.reduce((config, id) => {
    config[id] = {
      d: paths[id],
      transition: morphTransition
    };

    return config;
  }, {})
);

export default class FollowCircle extends Component {
  state = {
    cursor: '',
    x: 0,
    y: 0,
    movement: false,
    pathIndex: 0
  }

  gotoNext = () => {
    const { pathIndex } = this.state;
    const nextIndex = pathIndex + 1;
    this.setState({
      pathIndex: nextIndex > pathIds.length - 1 ? 0 : nextIndex
    });
  };

  componentDidMount() {
    this.body = document.querySelector('body');
    this.body.addEventListener('mousemove', this.handleMousemove);
    setInterval(() => {
      this.gotoNext();
    }, 5000);
  }

  handleMousemove = ({ clientX: x, clientY: y }) => {
    this.setState({
      x, y, movement: true,
    })
  }

  componentWillUnmount() {
    this.body.removeEventListener('mousemove', this.handleMousemove);
  }

  render() {
    if(!this.state.movement);
    const { x, y, cursor } = this.state;
    return (
      <div className="circle"
        style={{
          position: 'fixed',
          width: '600px',
          height: '600px',
          zIndex: 1000,
          marginLeft: '-300px',
          marginTop: '-300px',
          pointerEvents: 'none',
          top: y,
          left: x,
          cursor: `url(${cursor}), pointer`,
        }}
      >
        <svg viewBox="0 0 100 100">
          <Icon style={{
            fill: 'transparent',
            stroke: '#fa911e',
            strokeWidth: '3px',
            transform: 'translate(-0.5 -6.73)',
          }}
          pose={pathIds[this.state.pathIndex]}
        />
        </svg>
      </div>
    );
  }
}