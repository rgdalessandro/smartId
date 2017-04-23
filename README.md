# AFFINITY v0.1.0

Affinity is an open source, decentralized standard for the exchange and validation of identifying information, attestations and reputation for participants in an otherwise anonymous peer-to-peer network and for the general human population.

The current standard allows for storing three (3) categories of information:

## 1) Public Information (publicUserData)

Example:
```
{
    name: "Steve Dakh",
    email: "slavik0329@gmail.com",
    gpgFingerprint: "0851536D"
}
```
## 2) Private Information (hashedUserData)
Example:
```
{
    phoneNumber: "dae80ef78ace82c5a7c715defc57c4e0013648991d324156f66dbd5811b4c77c",
    photo: "4934cb005289a552bebe9a78a666e47ba96e21e94301efc641e907be08fdfaee" // Hashed IPFS hash,
    address: "c4eaf256d6f941649e6f69c628342075f3fc72bd288ebe1423a6cb5028df0101",
    ssn: "d812ef24cfcb52f09716c5ab8bb3592d9da1b6017813eb2be5c6409868a4fadc"
}
```
## 3) Attestations

### Authorize attestation category:
```
// Category to verify specific fields
{
    "v": "0.1.0",
    "type": "verifyFields"
}
```
### Attestation:
```
// Attestation to verify specific fields
{
    "v": "0.1.0",
    "type": "verifyFields",
    "fields": ["dob", "address", "name"]
}
```
## Current standard field names:
```
[
    'name',
    'firstName',
    'lastName',
    'email',
    'email2',
    'ssn',
    'dob',
    'address',
    'phone',
    'phone2',
]
```
