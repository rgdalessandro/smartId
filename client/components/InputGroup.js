/**
 * Created by stevendakh on 4/22/17.
 * */

'use strict';

import React, { Component, PropTypes } from 'react';

class InputGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue : ''
    }
  }

  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
    const {type, title, value, onChange, placeholder} = this.props;

    return (
          <div className="form-group">
            <label htmlFor={title} className="col-sm-2 control-label">{title}</label>
            <div className="col-sm-10">
              <input
                type={type}
                className="form-control"
                id={title}
                placeholder={ placeholder }
                value={ value }
                onChange={ (e) => this.onChange(e.target.value)  }
              />
            </div>
          </div>
    );
  }
}

export default InputGroup;