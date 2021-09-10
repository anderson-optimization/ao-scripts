
// ensure you run login script
// npm run login


const aoCli = require('@anderson-optimization/ao-cli');
const _ = require('lodash');
let aoLib;

function* iterateAssetRefs(project) {
    for (let [stepKey, step] of Object.entries(project.step)) {
        if (!step.asset) continue;
        for (let [groupKey, group] of Object.entries(step?.asset)) {
            for (let [assetKey, assetRef] of Object.entries(group)) {
                yield {
                    stepKey,
                    groupKey,
                    assetKey,
                    assetRef
                }
            }
        }
    }
}

async function main() {
    try {
        let [bin, script, namePrefix, tid] = process.argv;
        aoLib = await aoCli.getAoLib();
        if (!namePrefix) {
            console.error('No name prefix supplied');
            process.exit(1);
        }
        //
        if (!tid) {
            const userState = await aoLib.$user.getUserState();
            tid = userState.team; // this is the currently select team similar to the UI
        }
        console.log('searching for ',namePrefix);
        const assets = await aoLib.resource.asset.list({ 
            limitTo: 100, 
            orderByChild: 'parameter/name/name',
            prefix: namePrefix,
            tid });
        if(!assets){
            console.log('No assets found!');
            process.exit(0);
        }
        for (let [id,asset] of Object.entries(assets)){
            console.log(`Match: ${asset.parameter.name.name}`);
        }
    } catch (err) {
        console.error(err);
        console.error('Error running rate asset script');
        process.exit(1)
    }
    process.exit(0);
}
main();