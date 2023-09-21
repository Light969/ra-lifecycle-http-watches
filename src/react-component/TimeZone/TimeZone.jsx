import './TimeZone.css';      
import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from '../Form/Form';
import Clock from '../Clock/Clock';

export default class TimeZone extends Component {
  state = { clocks: [] };

  addClock = ({ title, zone }) => {
    this.setState((preState) => ({
      clocks: [...preState.clocks, { id: nanoid(), title, zone }],
    }));
  };

  delClock = (id) => {
    return () => {
      this.setState((preState) => ({
        clocks: preState.clocks.filter((clock) => clock.id !== id),
      }));
    };
  };

  render() {
    return (
      <div className="timezone">
        <Form addClock={this.addClock} />
        <div className="clocks">
          {this.state.clocks.map((clock) => (
            <Clock
              key={clock.id}
              title={clock.title}
              zone={+clock.zone}
            >
              {
                <div className="close-clocks" onClick={this.delClock(clock.id)}>
                  &#10060;
                </div>
              }
            </Clock>
          ))}
        </div>
      </div>
    );
  }
}

