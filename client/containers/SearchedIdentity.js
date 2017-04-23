/**
 * Created by ricardodalessandro on 4/22/17.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSearchedIdentity } from '../actions';
import { lookupAccount, getIdentity } from '../models/blockchain';

import VerifyField from '../components/VerifyField';
import Field from '../components/Field';
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
    const { owner, publicUserData, hashedUserData } = searchedIdentity;

    let hashedUserDataArr = [];
    let publicUserDataArr = [];

    if ( hashedUserData ) {
      let hashedUserDataObj = JSON.parse(hashedUserData);

      for ( let i in hashedUserDataObj ) {
        hashedUserDataArr.push({
          title: i,
          value: hashedUserDataObj[i]
        });
      }
    }

    if ( publicUserData ) {
      let publicUserDataObj = JSON.parse(publicUserData);

      for ( let i in publicUserDataObj ) {
        publicUserDataArr.push({
          title: i,
          value: publicUserDataObj[i]
        });
      }
    }

    if (addresses.wallet === owner) return <MyId />;

    else if (searchedIdentity && owner !== '0x' ) return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Public Data</h3>
          </div>
          <div className="panel-body">
            {publicUserDataArr.map(item=><Field key={item.title} title={item.title} value={item.value}/>)}
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Private Data</h3>
          </div>
          <div className="panel-body">
            {hashedUserDataArr.map(item=><VerifyField key={item.title} title={item.title} value={item.value}/>)}
          </div>
        </div>
      </div>
    );

    else return <div>Not Found</div>;
  }
}

const mapStateToProps = (state) => { return { addresses: state.addresses, searchedIdentity: state.searchedIdentity } };
const mapDispatchToProps = (dispatch) => bindActionCreators({ setSearchedIdentity }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SearchedIdentity);