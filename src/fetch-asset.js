
// ensure you run login script
// npm run login


const aoCli = require('@anderson-optimization/ao-cli');
const _ = require('lodash');
let aoLib;

async function main() {
    try {
        let [bin, script, rn] = process.argv;
        aoLib = await aoCli.getAoLib();
        const asset = await aoLib.resource.asset.get(rn);
        if(asset){
            console.log(JSON.stringify(asset,undefined,2))
        } else {
            console.log(`Asset not found for ${rn}`);
        }
    } catch (err) {
        console.error(err);
        console.error('Error running asset script');
        process.exit(1)
    }
    process.exit(0);
}
main();