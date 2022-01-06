# terra-boilerplate

This repo contains boilerplate contracts for terra blockchain. Contract simply say you `gm` followed by your name. This repo also includes scripts to upload, instantiate & interact with contract.

## Prerequisite

1. Rust and Cargo (v1.51.0+)
2. Docker
3. NodeJs

## Installation
```
npm install
```

### Building the Contract

This will check for any preliminary errors before optimizing.
```
cargo wasm
```

### Optimizing your build:

```
cargo run-script optimize
```

This will result in an optimized build of `artifacts/terra_boilerplate.wasm` or `artifacts/terra_boilerplate-aarch64.wasm` in your working directory.

### Tests:

You an run unit test for contract via below command:
```
cargo unit-test
```

## Contract Deployment

### Upload & Instantiate Contract code:
```
npm run upload
```

#### Expected Output:
```bash
Uploading contract code...
Upload finished!
Transaction: https://finder.terra.money/testnet/tx/2D2BB6BC07AE660DB4F0B00E217893486583E6E5A3D2B7490FD487BB665B0B6C

Code ID: 31074

Initiating contract with CodeID 31074...
Contract Initiated successfully!
Transaction: https://finder.terra.money/testnet/tx/F417E778D43B016CA6CA0937737F9D3ED06F147BFB62A969076EF672B65EDCEB

Contract Address:  terra1ej0wfpdym4gf0ql80lj3jam2xg4wnrnh8vgcny
(https://finder.terra.money/testnet/address/terra1ej0wfpdym4gf0ql80lj3jam2xg4wnrnh8vgcny)

```

### Query Message:

```
npm run query
```

#### Expected Output:
```bash
Message: gm terra!
```

### Update Name (MsgExecute):

```
npm run update --name=lunatics
```
#### Expected Output:
```bash
Changing user name...
Name changes successfully!
Transaction: https://finder.terra.money/testnet/tx/2DD2E6966290CACF275354573FE26CF067DDDB7CCC1F3C17715E24B62490637C
```

#### New Message:

```
npm run query
```

#### Expected Output:
```bash
Message: gm lunatics!
```