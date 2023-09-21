import './Clock.css';
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Clock extends Component {
  state = { clock: moment().utcOffset(this.props.zone) };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState({ clock: moment().utcOffset(this.props.zone) });
    }, 500);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  degree = (momentTime) => {
    const second = momentTime.second() * 6;
    const minute = momentTime.minute() * 6;
    const hour = momentTime.hour() * 30;
    return { second, minute, hour };
  };

  render() {
    const { second, minute, hour } = this.degree(this.state.clock);
    return (
      <div className="clock">
        {this.props.title} (UTC - {this.props.zone})
        <div className="clock-dial">
          <div className="clock-arrows">
            <div
              className="clock-hour"
              style={{ transform: `rotate(${hour}deg)` }}
            >
              <div className="clock-arm" />
            </div>
          </div>
          <div className="clock-arrows">
            <div
              className="clock-minute"
              style={{ transform: `rotate(${minute}deg)` }}
            >
              <div className="clock-arm" />
            </div>
          </div>
          <div className="clock-arrows">
            <div
              className="clock-second"
              style={{ transform: `rotate(${second}deg)` }}
            >
              <div className="clock-arm" />
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

Clock.propTypes = {
  title: PropTypes.string.isRequired,
  zone: PropTypes.number.isRequired,
};
