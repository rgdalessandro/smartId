/**
 * Created by stevedakh on 4/22/17.
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import {getAttestation} from '../models/blockchain'
import moment from "moment";

class Attestation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
      data: null,
      from: null,
      expirationTime: null,
    }
  }

  static propTypes = {
    contractAddress: PropTypes.string,
    attestationID: PropTypes.number,
  };

  componentWillMount () {
    getAttestation(this.props.contractAddress, this.props.attestationID, (err,res) => {
      this.setState({
        from: res[0],
        category: res[2],
        time: res[1].toString(),
        data: res[3],
        expirationTime: res[4]
      });
    });
  }

  render() {

    const {category, time, data, expirationTime, from} = this.state;

    return (
      <div style={ styles.container } >
        <div className="panel panel-default">
          <div className="panel-heading">
            {moment(time*1000).format("LLLL")}
          </div>
          <div className="panel-body">
            <div>From: <a href={"/contract/" + from}>{from}</a></div>
            <div>Type: {category?JSON.parse(category).type:null}</div>
            <div className="well" style={styles.well}>{data}</div>

          </div>
        </div>
      </div>
    );
  }
}

export default Attestation;

const styles = {
  well: {
    marginTop: 10
  }
};