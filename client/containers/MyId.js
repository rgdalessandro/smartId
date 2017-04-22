/**
 * Created by ricardodalessandro on 4/22/17.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setWalletAddress, setIdAddress } from '../actions';
import { lookupAccount } from '../models/blockchain';

import CreateId from '../components/CreateId';

class MyId extends Component {
  render() {
    const { addresses } = this.props;

    if (addresses.id) return (
      'YOU ALREADY HAVE ONE'
    );

    else return <CreateId addresses={ addresses } />
  }
}

const mapStateToProps = (state) => { return { addresses: state.addresses } };
const mapDispatchToProps = (dispatch) => bindActionCreators({ setWalletAddress, setIdAddress }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MyId);

const styles = {
  title: {
    fontSize: 20
  }
};