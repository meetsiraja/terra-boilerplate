const { LCDClient, MsgStoreCode, MnemonicKey, isTxError, MsgInstantiateContract } = require('@terra-money/terra.js')
const fs = require('fs');

// test key from testnet accounts
const mk = new MnemonicKey({
    mnemonic: 'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius'
})

// connect to terra testnet
const terra = new LCDClient({
    URL: 'https://bombay-lcd.terra.dev',
    chainID: 'bombay-12'
});

const wallet = terra.wallet(mk);

const storeCode = new MsgStoreCode(
    wallet.key.accAddress,
    fs.readFileSync('./artifacts/terra_boilerplate.wasm').toString('base64')
);

async function upload(){

    console.log('Uploading contract code...')
    
    const storeCodeTx = await wallet.createAndSignTx({
        msgs: [storeCode],
      });
    const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);
    
    if (isTxError(storeCodeTxResult)) {
        throw new Error(
          `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
        );
    }

    console.log('Upload finished!')
    console.log(`Transaction: https://finder.terra.money/testnet/tx/${storeCodeTxResult.txhash}\n`)

    const {
        store_code: { code_id },
    } = storeCodeTxResult.logs[0].eventsByType;
    
    console.log("Code ID: " + code_id[0]);

    console.log(`\nInitiating contract with CodeID ${code_id[0]}...`)

    const instantiate = new MsgInstantiateContract(
        wallet.key.accAddress,
        wallet.key.accAddress,
        +30956, // code ID
        {
          user: "terra",
        } // InitMsg
    );

    const instantiateTx = await wallet.createAndSignTx({
        msgs: [instantiate],
      });
    const instantiateTxResult = await terra.tx.broadcast(instantiateTx);
      
    if (isTxError(instantiateTxResult)) {
        throw new Error(
          `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
        );
    }
    console.log("Contract Initiated successfully!")
    console.log(`Transaction: https://finder.terra.money/testnet/tx/${instantiateTxResult.txhash}\n`)

    const {
        instantiate_contract: { contract_address },
    } = instantiateTxResult.logs[0].eventsByType;

    fs.writeFileSync('address.txt', contract_address[0])

    console.log(`Contract Address:  ${fs.readFileSync("address.txt", "utf8")}`)
    console.log(`(https://finder.terra.money/testnet/address/${fs.readFileSync("address.txt", "utf8")})`)

}

upload()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});