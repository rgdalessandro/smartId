/**
 * Created by ricardodalessandro on 4/22/17.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setWalletAddress, setIdAddress } from '../actions';
import { getIdentity } from '../models/blockchain';

import CreateId from '../components/CreateId';

class MyId extends Component {
  render() {
    const { addresses } = this.props;
    const { owner, publicUserData, lastPublicUserDataChange, hashedUserData, lastHashedUserDataChange, numAttestations } = this.props.myIdentity;

    if (addresses.id) return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">My Id</h3>
        </div>
        <div className="panel-body">
          <p>owner: { owner ? owner : 'loading...' }</p>
        </div>
      </div>
    );

    else return <CreateId addresses={ addresses } />
  }
}

const mapStateToProps = (state) => { return { addresses: state.addresses, myIdentity: state.myIdentity } };
//const mapDispatchToProps = (dispatch) => bindActionCreators({ setWalletAddress, setIdAddress }, dispatch);
export default connect(mapStateToProps)(MyId);

const styles = {
  title: {
    fontSize: 20
  }
};