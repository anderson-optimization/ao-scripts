
// ensure you run login script
// npm run login


const aoCli = require('@anderson-optimization/ao-cli');
const _ = require('lodash');
let aoLib;


async function main(){
    try{
        aoLib = await aoCli.getAoLib();
        const userState = await aoLib.$user.getUserState();
        const tid = userState.team; // this is the currently select team similar to the UI

        // Fetch 5 projects
        const projects = await aoLib.resource.project.list({limitTo:5,tid});

        // Loop through each project and log name and description
        for (let [pid,project] of Object.entries(projects)){
            const rn = project.rn;
            const name=_.get(project,'step.start.parameter.name.name');
            const description=_.get(project,'step.start.parameter.name.description');
            console.log(`\n\n${rn}: ${name} - ${description}\n`);

            // Loop through each parcel, log the distance to POI
            // Fetch parcel, log the name
            const parcels = _.get(project,'step.land.asset.land',{});
            for (let [aid,assetRef] of Object.entries(parcels)){
                console.log(`Parcel ${assetRef.rn} is ${assetRef.distance}m from ${assetRef.distance_poi_name}`)
                const asset = await aoLib.resource.asset.get(assetRef.rn);
                const assetName=_.get(asset,'parameter.name.name','unknown asset');
                console.log(`${assetName}\n`); //  asset name
            }
        }
    } catch(err){
        console.error(err);
        console.error('Error running user info script');
        process.exit(1)
    }
    process.exit(0);
}
main();