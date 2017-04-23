/**
 * Created by stevendakh on 4/22/17.
 */
/**
 * Created by stevedakh on 4/22/17.
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import {getTypeData} from '../models/typeList';

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

  render() {

    return (
      <div style={ styles.container } >
        <div style={styles.title}>{getTypeData(this.props.title).title}</div>

        <div style={styles.value}>{this.props.value}</div>
      </div>
    );
  }
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