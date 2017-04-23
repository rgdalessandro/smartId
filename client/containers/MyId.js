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

class MyId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attestor: '',
      category: ''
    }
  }

  handleSubmit() {
    const { attestor, category } = this.state;
    const { addresses } = this.props;

    authorizeAttestation(addresses.id, attestor, category, (err, res) => {
      if (err) return;

      this.setState({
        attestor: '',
        category: ''
      })
    })
  }

  render() {
    const { addresses } = this.props;
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
                    placeholder="YYYY-MM-DD"
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
  }
};
