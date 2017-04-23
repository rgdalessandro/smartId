'use strict';

import React, { Component } from 'react';

import { createIdentityContract } from '../models/blockchain';

class CreateId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      ssn: '',
      dob: ''
    };
  }

  handleSubmit() {
    const { name, email, ssn, dob } = this.state;

    const publicData = !name && !email ? null : { name, email };
    const privateData = !ssn && !dob ? null : {
      ssn: ssn ? window.web3.sha3(ssn) : null,
      dob: dob ? window.web3.sha3(dob) : null
    };

    const publicUserData = JSON.stringify(publicData);
    const hashedUserData = JSON.stringify(privateData);

    createIdentityContract(hashedUserData, publicUserData, (err, res) => {
      if (err) return;

      this.setState({
        name: '',
        email: '',
        ssn: '',
        dob: ''
      })
    })
  }

  render() {
    const { name, email, ssn, dob } = this.state;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Create Id</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal">
            Public Information:
            <div className="form-group">
              <label htmlFor="inputName" className="col-sm-2 control-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Name"
                  value={ name }
                  onChange={ (e) => this.setState({ name: e.target.value }) }
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-2 control-label">Email</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={ email }
                  onChange={ (e) => this.setState({ email: e.target.value }) }
                />
              </div>
            </div>
            Private Information:
            <div className="form-group">
              <label htmlFor="SSN" className="col-sm-2 control-label">SSN</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="SSN"
                  placeholder="#########"
                  value={ ssn }
                  onChange={ (e) => this.setState({ ssn: e.target.value }) }
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputDoB" className="col-sm-2 control-label">Date of Birth</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputDoB"
                  placeholder="YYYY-MM-DD"
                  value={ dob }
                  onChange={ (e) => this.setState({ dob: e.target.value }) }
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button onClick={ this.handleSubmit.bind(this) } type="button" className="btn btn-default">Create Id</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateId;
