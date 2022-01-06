const { LCDClient, MsgExecuteContract, MnemonicKey } = require('@terra-money/terra.js')
const fs = require('fs');

// test1 key from testnet accounts
const mk = new MnemonicKey({
    mnemonic: 'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius'
})

// connect to terra testnet
const terra = new LCDClient({
    URL: 'https://bombay-lcd.terra.dev',
    chainID: 'bombay-12'
});

const wallet = terra.wallet(mk);

const execute = new MsgExecuteContract(
    wallet.key.accAddress, // sender
    fs.readFileSync("address.txt", "utf8"), // contract account address
    { "change": { "user": process.env.npm_config_name } }, // handle msg
);

// console.log(execute)
async function change(){
    console.log('Changing user name...')
    const executeTx = await wallet.createAndSignTx({
        msgs: [execute]
    });
      
    const executeTxResult = await terra.tx.broadcast(executeTx);

    console.log('Name changes successfully!')
    console.log(`Transaction: https://finder.terra.money/testnet/tx/${executeTxResult.txhash}\n`)

}

change()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });