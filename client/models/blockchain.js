/**
 * Created by ricardodalessandro on 4/22/17.
 */
const factoryABI = [ { "constant": true, "inputs": [ { "name": "contractAddress", "type": "address" } ], "name": "verify", "outputs": [ { "name": "valid", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "lookupAccount", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "createIdentityContract", "outputs": [ { "name": "newIdentity", "type": "address" } ], "payable": false, "type": "function" }, { "payable": false, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "contractAddress", "type": "address" } ], "name": "NewIdentity", "type": "event" } ];
const identityABI = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "attestations", "outputs": [ { "name": "from", "type": "address", "value": "0xff539b43d27d221e5a38704be647da0cc9aaf708" }, { "name": "time", "type": "uint256", "value": "1490995249" }, { "name": "category", "type": "string", "value": "verify" }, { "name": "data", "type": "string", "value": "{version: \"0.1.0\", verifyFields: [\"firstName\", \"lastName\", \"address\"]}" }, { "name": "expirationTime", "type": "uint256", "value": "0" }, { "name": "revokeTime", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "numAttestations", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "lastPublicUserDataChange", "outputs": [ { "name": "", "type": "uint256", "value": "1492871810" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "data", "type": "string" } ], "name": "setHashedUserData", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "lastHashedUserDataChange", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "data", "type": "string" } ], "name": "setPublicUserData", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "data", "type": "string" }, { "name": "expirationTime", "type": "uint256" } ], "name": "attest", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xb8f70e2fc5a2af588889d33babfeb0513977ac0a" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "attestAllowedList", "outputs": [ { "name": "category", "type": "string", "value": "" }, { "name": "allowed", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "publicUserData", "outputs": [ { "name": "", "type": "string", "value": "{v:\"0.1.0\",name:\"Steven Dakh\",github:\"slavik0329\"}" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "allowedAddress", "type": "address" }, { "name": "category", "type": "string" } ], "name": "authorizeAttestation", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "hashedUserData", "outputs": [ { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" }, { "inputs": [ { "name": "_owner", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;owner", "template": "elements_input_address", "value": "" } ], "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "authorizedAddress", "type": "address" }, { "indexed": false, "name": "category", "type": "string" } ], "name": "AttestationAuthorized", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "attestationID", "type": "uint256" }, { "indexed": false, "name": "data", "type": "string" } ], "name": "AttestationCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "string" }, { "indexed": false, "name": "to", "type": "string" } ], "name": "PublicUserDataChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "string" }, { "indexed": false, "name": "to", "type": "string" } ], "name": "HashedUserDataChanged", "type": "event" } ];
const factoryAddress = "0xFE924d7D94E35EE2c6Aaf160D187D810a9A0D746";

export const lookupAccount = (addresses, callback) => {
  const ContractWeb3 = web3.eth.contract(factoryABI).at(factoryAddress);

  ContractWeb3.lookupAccount.call( addresses.wallet, (err, res) => {
    if (res !== '0x0000000000000000000000000000000000000000') addresses.id = res;
    callback(addresses);
  });
};

export const createIdentityContract = (hashedUserData, publicUserData, callback) => {
  const ContractWeb3 = web3.eth.contract(factoryABI).at(factoryAddress);

  ContractWeb3.createIdentityContract.sendTransaction( hashedUserData, publicUserData, {from: web3.eth.accounts[0]}, (err, res) => {
    callback(err, res);
  });
};

export const setPublicUserData = (contractAddress, publicUserData, callback) => {
  const ContractWeb3 = web3.eth.contract(identityABI).at(contractAddress);

  ContractWeb3.setPublicUserData.sendTransaction( publicUserData, {from: web3.eth.accounts[0]}, (err, res) => {
    callback(err, res);
  });
};

export const setHashedUserData = (contractAddress, hashedUserData, callback) => {
  const ContractWeb3 = web3.eth.contract(identityABI).at(contractAddress);

  ContractWeb3.setHashedUserData.sendTransaction( hashedUserData, {from: web3.eth.accounts[0]}, (err, res) => {
    callback(err, res);
  });
};

export const authorizeAttestation = (contractAddress, allowedAddress, category, callback) => {
  const ContractWeb3 = web3.eth.contract(identityABI).at(contractAddress);

  ContractWeb3.authorizeAttestation.sendTransaction( allowedAddress, category, {from: web3.eth.accounts[0]}, (err, res) => {
    callback(err, res);
  });
};

export const attest = (contractAddress, data, expirationTime, callback) => {
  const ContractWeb3 = web3.eth.contract(identityABI).at(contractAddress);

  ContractWeb3.attest.sendTransaction( data, expirationTime, {from: web3.eth.accounts[0]}, (err, res) => {
    callback(err, res);
  });
};

export const isAllowedToAttest = (contractAddress, address, callback) => {
  const ContractWeb3 = web3.eth.contract(identityABI).at(contractAddress);

  ContractWeb3.attestAllowedList.call(address, (err, res) => {
    callback(err, res);
  });
};