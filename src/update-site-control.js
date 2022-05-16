
// ensure you run login script
// npm run login


const aoCli = require('@anderson-optimization/ao-cli');
const _ = require('lodash');
let aoLib;


async function main() {
    try {
        let [bin, script, rn, siteControlStatus] = process.argv;
        aoLib = await aoCli.getAoLib();
        let asset = await aoLib.resource.asset.get(rn);
        console.log(`Fetched ${asset.rn}, preparing to update`);
        const params = await aoLib.$param.getAllParameters(asset.type);
        const siteControlConfig = _.find(params,param=>param.parameterKey==='sitecontrolstatus');
        const {
            options,
            prop
        } = siteControlConfig
        if(_.includes(options,siteControlStatus)){
            const updateObj={
                rn
            }
            updateObj[prop.replace(/\./g,'/')]=siteControlStatus;
            console.log('Performing multipath update',updateObj);
            await aoLib.resource.asset.update(updateObj)

            asset = await aoLib.resource.asset.get(rn);
            console.log(`Confirming database value for ${prop}=${_.get(asset,prop)}`);
            // perform update
        } else {
            console.error(`${siteControlStatus} is not an allowed status`,siteControlConfig.options);
            process.exit(1);
        }
        // const siteControlOptions = siteControlConfig.options;
        // console.dir(siteControlConfig);
        // console.log(params)

        // const landConfig = await aoLib.$param.getTypeConfig('asset:land:off');
        // const siteControlConfig = landConfig.parameter.land;
        // console.dir(siteControlConfig);
        // const asset = await aoLib.resource.asset.get(rn);
        // if(asset){
            // console.log(JSON.stringify(landConfig,undefined,2))
        // } else {
        //     console.log(`Asset not found for ${rn}`);
        // }
    } catch (err) {
        console.error(err);
        console.error('Error running asset script');
        process.exit(1)
    }
    process.exit(0);
}
main();