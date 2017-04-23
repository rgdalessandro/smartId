/**
 * Created by ricardodalessandro on 4/22/17.
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authorizeAttestation } from '../models/blockchain';

import Field from '../components/Field';
import VerifyField from '../components/VerifyField';
import CreateId from '../components/CreateId';
import Attestation from '../components/Attestation';
import PendingModal from '../components/PendingModal';

class MyId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attestor: '',
      category: '',
      isSending: false
    }
  }

  handleSubmit() {
    const { attestor, category } = this.state;
    const { addresses } = this.props;

    authorizeAttestation(addresses.id, attestor, category, (err, txHash) => {
      if (err) return;

      this.setState({
        attestor: '',
        category: '',
        isSending: true
      });

      checkForTx.call(this);

      function checkForTx ()
      {
        web3.eth.getTransaction(txHash, (err, res) => {
          console.log(res);
          if ( res.blockNumber ) {
            this.setState({
              isSending: false
            });
            location.reload();
          } else {
            setTimeout(checkForTx.bind(this), 5000);
          }
        });
      }
    })
  }

  getAttestations () {
    let attestations = [];

    let {myIdentity} = this.props;

    for ( let i = 0; i < Number(myIdentity.numAttestations.toString()); i++) {
      attestations.push(<Attestation contractAddress={myIdentity.address} key={i} attestationID={i} />);
    }

    return attestations;
  }

  render() {
    const { addresses, myIdentity } = this.props;
    const { publicUserData, hashedUserData } = this.props.myIdentity;
    const { attestor, category } = this.state;

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

    if (addresses.id) return (
      <div>
        <PendingModal
          text={"Authorizing attestation"}
          modalIsOpen={this.state.isSending}
          closeModal={()=>this.setState({isSending:false})}
        />
        <div style={styles.heading}>My Identity</div>

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

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Authorize an Attestation</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline">
              <div className="form-group">
                <div htmlFor="attestor" style={ styles.title }>Attestor</div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    style={ styles.input }
                    id="attestor"
                    placeholder="Attestor address"
                    value={ attestor }
                    onChange={ (e) => this.setState({ attestor: e.target.value }) }
                  />
                </div>
              </div>
              <div className="form-group">
                <div htmlFor="category" style={ styles.title }>Category</div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    style={ styles.input }
                    id="category"
                    placeholder="Category"
                    value={ category }
                    onChange={ (e) => this.setState({ category: e.target.value }) }
                  />
                </div>
              </div>
              <div style={ styles.button }>
                <button onClick={ this.handleSubmit.bind(this) } type="button" className="btn btn-default">Authorize Attestation</button>
              </div>
            </form>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Attestations</h3>
          </div>
          <div className="panel-body">
            { myIdentity.numAttestations && myIdentity.numAttestations.toString() != "0" ?
              this.getAttestations.call(this)
              : <div>There are no attestations on this identity</div>
            }
          </div>
        </div>
      </div>
    );

    else return <CreateId addresses={ addresses } />
  }
}

const mapStateToProps = (state) => { return { addresses: state.addresses, myIdentity: state.myIdentity } };
export default connect(mapStateToProps)(MyId);

const styles = {
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
    marginTop: 4,
    display: 'block'
  },
  input: {
    width: 560,
    display: 'block'
  },
  button: {
    marginTop: 12
  },
  heading: {
    fontSize: 22,
    fontWeight: 200,
    marginBottom: 10
  }
};
