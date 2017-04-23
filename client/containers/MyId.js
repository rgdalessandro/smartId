/**
 * Created by ricardodalessandro on 4/22/17.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import VerifyField from '../components/VerifyField';
import { bindActionCreators } from 'redux';

import { setWalletAddress, setIdAddress } from '../actions';
import { getIdentity } from '../models/blockchain';

import CreateId from '../components/CreateId';

class MyId extends Component {
  render() {
    const { addresses } = this.props;
    const { owner, publicUserData, lastPublicUserDataChange, hashedUserData, lastHashedUserDataChange, numAttestations } = this.props.myIdentity;

    let hashedUserDataArr = [];

    if ( hashedUserData ) {
      let hashedUserDataObj = JSON.parse(hashedUserData);

      for ( let i in hashedUserDataObj ) {
        hashedUserDataArr.push({
          title: i,
          value: hashedUserDataObj[i]
        });
      }
    }

    if (addresses.id) return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">My ID</h3>
        </div>
        <div className="panel-body">
          {/*<p>owner: { owner ? owner : 'loading...' }</p>*/}

          {hashedUserDataArr.map(item=><VerifyField key={item.title} title={item.title} value={item.value}/>)}
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
    fontSize: 14,
    color: "#666"
  }
};