/**
 * Created by ricardodalessandro on 4/22/17.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSearchedIdentity } from '../actions';
import { lookupAccount, getIdentity } from '../models/blockchain';

import MyId from './MyId';

class SearchedIdentity extends Component {
  componentWillMount() {
    let { identity } = this.props.params;
    const { setSearchedIdentity } = this.props;

    lookupAccount(identity, (err, res) => {
      if (!err && res !== '0x0000000000000000000000000000000000000000' && res !== '0x') identity = res;
      getIdentity(identity, (contractData) => setSearchedIdentity(contractData));
    });

  }

  render() {
    const { addresses, searchedIdentity } = this.props;
    const { owner, publicUserData, lastPublicUserDataChange, hashedUserData, lastHashedUserDataChange, numAttestations } = searchedIdentity;

    if (addresses.wallet === owner) return <MyId />;

    else if (searchedIdentity && owner !== '0x' ) return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Searched Id</h3>
        </div>
        <div className="panel-body">
          <p>owner: { owner ? owner : 'loading...' }</p>
        </div>
      </div>
    );

    else return <div>Not Found</div>;
  }
}

const mapStateToProps = (state) => { return { addresses: state.addresses, searchedIdentity: state.searchedIdentity } };
const mapDispatchToProps = (dispatch) => bindActionCreators({ setSearchedIdentity }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SearchedIdentity);