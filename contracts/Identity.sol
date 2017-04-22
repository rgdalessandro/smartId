// (c) Steve Dakh 2017
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity ^0.4.0;

contract owned {
    address public owner;

    function owned() {
        owner = msg.sender;
    }

    modifier isOwner {
        if (msg.sender != owner) throw;
        _;
    }

    function transferOwnership(address newOwner) isOwner {
        owner = newOwner;
    }
}

contract Identity is owned {
    // Mapping of allowed to attest addresses
    mapping(address => AllowListItem) public attestAllowedList;

    // Count of attestations
    uint public numAttestations;

    // Public user data
    string public publicUserData;
    uint public lastPublicUserDataChange;

    // Hashed user data
    string public hashedUserData;
    uint public lastHashedUserDataChange;

    Attestation[] public attestations;

    struct AllowListItem {
        string category;
        bool allowed;
    }

    // Structure of each attestation
    struct Attestation {
        address from; // Who attested
        uint time; // When attested
        string category; // Category of attestation
        string data; // Additional data field
        uint expirationTime;
        uint revokeTime;
    }

    // Only allow an allowed address to attest. Don't allow owner to attest for himself
    modifier isAllowedToAttest {
        AllowListItem _allowedListItem = attestAllowedList[msg.sender];

        if (_allowedListItem.allowed != true || msg.sender == owner) throw;
        _;
    }

    event AttestationAuthorized(address authorizedAddress, string category);
    event AttestationCreated(address from, uint attestationID, string data);
    event PublicUserDataChanged(string from, string to);
    event HashedUserDataChanged(string from, string to);

    function setPublicUserData (string data) isOwner {
        PublicUserDataChanged(publicUserData, data);

        publicUserData = data;
        lastPublicUserDataChange = now;
    }

    function setHashedUserData (string data) isOwner {
        HashedUserDataChanged(hashedUserData, data);

        hashedUserData = data;
        lastHashedUserDataChange = now;
    }

    function authorizeAttestation (address allowedAddress, string category) isOwner {
        AllowListItem _allowedListItem = attestAllowedList[allowedAddress];
        _allowedListItem.allowed = true;
        _allowedListItem.category = category;

        AttestationAuthorized(allowedAddress, category);
    }

    function attest (string data, uint expirationTime) isAllowedToAttest {
        AllowListItem _allowedListItem = attestAllowedList[msg.sender];

        var attestationID = attestations.length++;
        Attestation a = attestations[attestationID];
        a.from = msg.sender;
        a.time = now;
        a.data = data;
        a.expirationTime = expirationTime;
        a.category = _allowedListItem.category;
        numAttestations = attestationID + 1;

        _allowedListItem.allowed = false;

        AttestationCreated(msg.sender, attestationID, data);
    }

    function Identity(
        address _owner,
        string _hashedUserData,
        string _publicUserData
    ) {
        owner = _owner;
        
        if ( bytes(_hashedUserData).length != 0 ) {
            hashedUserData = _hashedUserData;        
            lastHashedUserDataChange = now;
        }

        if ( bytes(_publicUserData).length != 0 ) {
            publicUserData = _publicUserData;        
            lastPublicUserDataChange = now;
        }
    }
}

contract IdentityFactory {
    event NewIdentity(address owner, address contractAddress);

    mapping( address => bool ) _verify;
    // Mapping of ethereum accounts to Identity contract addresses
    mapping( address => address ) public lookupAccount;

    function verify( address contractAddress ) constant returns ( bool valid ) {
        valid = _verify[contractAddress];
    }

    function createIdentityContract(string _hashedUserData, string _publicUserData) returns (address newIdentity) {
        newIdentity = new Identity(msg.sender, _hashedUserData, _publicUserData);

        lookupAccount[msg.sender] = newIdentity;
        _verify[newIdentity] = true;

        NewIdentity(msg.sender, newIdentity);
    }

    // Prevents accidental sending of ether to the factory
    function () {
        throw;
    }
}