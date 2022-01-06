const { LCDClient } = require('@terra-money/terra.js')
const fs = require('fs')

// connect to terra testnet
const terra = new LCDClient({
    URL: 'https://bombay-lcd.terra.dev',
    chainID: 'bombay-12'
});

async function get(){

    const result = await terra.wasm.contractQuery(
        fs.readFileSync("address.txt", "utf8"), //contract address
        { get_message: {} } // query msg
    );

    console.log("Message: " + result.message)

}

get()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});