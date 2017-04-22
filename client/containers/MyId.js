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
    // const { owner,  } = this.props.myIdentity;

    if (addresses.id) return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">My Id</h3>
        </div>
        <div className="panel-body">
          {/*owner: { owner }*/}
        </div>
      </div>
    );

    else return <CreateId addresses={ addresses } />
  }
}

const mapStateToProps = (state) => {
  const { addresses, identity } = state;
  return { addresses, identity }
};
//const mapDispatchToProps = (dispatch) => bindActionCreators({ setWalletAddress, setIdAddress }, dispatch);
export default connect(mapStateToProps)(MyId);

const styles = {
  title: {
    fontSize: 20
  }
};