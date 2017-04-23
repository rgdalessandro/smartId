/**
 * Created by ricardodalessandro on 4/22/17.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setWalletAddress, setIdAddress, setMyIdentity } from '../actions';
import { lookupAccount, getIdentity } from '../models/blockchain';


class Header extends Component {
  componentDidMount() {
    const { setWalletAddress, setIdAddress, setMyIdentity } = this.props;   // actions
    const { addresses } = this.props;                                       // redux state

    setTimeout(() => {
      if (!window.web3) return;                                             // check for web3 network
      addresses.wallet = window.web3 ? window.web3.eth.accounts[0] : null;  // get user wallet address from web3
      setWalletAddress(addresses);

      lookupAccount(addresses.wallet, (err, res) => {
        if (!err && res !== '0x0000000000000000000000000000000000000000' && res !== '0x') {
          addresses.id = res;
          setIdAddress(addresses);
          getIdentity(addresses.id, (contractData) => setMyIdentity(contractData));
        }
      });
    }, 100);
  }

  render() {
    const { addresses } = this.props;

    return (
      <div className="navbar navbar-primary" style={{borderRadius: "0 0 4px 4px"}}>
        <div>
          {/*<!-- Brand and toggle get grouped for better mobile display -->*/}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/" style={{paddingLeft:4}}>
              <span style={styles.title}>Affinity</span><br/>
              <span style={{fontSize:12, color:'#bbb'}}>Identity on the blockchain</span>
            </a>
          </div>

          {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
          <div className="collapse navbar-collapse" style={{paddingLeft:0}}>
            <ul className="nav navbar-nav navbar-center">
              {/*<li><a></a></li>*/}
            </ul>

            <ul className="nav navbar-nav navbar-right" style={{textAlign: "right", marginTop:10}} >
              <li>
                {addresses.wallet?
                  <div style={styles.accountInfo}>
                    <span style={styles.small}>Account: </span>
                    <span>{addresses.wallet}</span>
                  </div>:null}
                {addresses.id?
                  <div style={styles.accountInfo}>
                    <span style={styles.small}>My Contract: </span>
                    <span>{addresses.id}</span>
                  </div>:null}
              </li>
            </ul>
          </div>{/*<!-- /.navbar-collapse -->*/}

        </div>{/*<!-- /.container-fluid -->*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => { return { addresses: state.addresses } };
const mapDispatchToProps = (dispatch) => bindActionCreators({ setWalletAddress, setIdAddress, setMyIdentity }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = {
  title: {
    fontSize: 20
  },
  small: {
    fontSize: 12,
  },
  accountInfo: {
    color: "#666"
  }
};