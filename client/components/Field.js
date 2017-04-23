/**
 * Created by stevendakh on 4/22/17.
 */
/**
 * Created by stevedakh on 4/22/17.
 */

'use strict';

import React, { Component, PropTypes } from 'react';

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue : ''
    }
  }

  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
  };

  getTitle (title) {
    const pairs = {
      dob: "Date of Birth",
      ssn: "SSN #",
      snn: "SSN #",
      name: "Name",
      email: "E-mail  "
    };

    if ( pairs[title] ) {
      return pairs[title];
    } else {
      return title;
    }
  }

  render() {

    return (
      <div style={ styles.container } >
        <div style={styles.title}>{this.getTitle(this.props.title)}</div>

        <div style={styles.value}>{this.props.value}</div>
      </div>
    );
  }

  setInputValue(inputValue) {this.setState.call(this, { inputValue })}
}

export default Field;

const styles = {
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
  },
  value: {
    fontWeight: 200,
    marginBottom: 8,
  }
};