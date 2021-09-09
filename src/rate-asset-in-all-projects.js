
// ensure you run login script
// npm run login


const aoCli = require('@anderson-optimization/ao-cli');
const _ = require('lodash');
let aoLib;

function *iterateAssetRefs(project){
    for (let [stepKey,step] of Object.entries(project.step)){
        if(!step.asset) continue;
        for (let [groupKey,group] of Object.entries(step?.asset)){
            for (let [assetKey,assetRef] of Object.entries(group)){
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

async function main(){
    try{
        const [bin,script,assetRn, rating] = process.argv;
        aoLib = await aoCli.getAoLib();
        const userState = await aoLib.$user.getUserState();
        const tid = userState.team; // this is the currently select team similar to the UI
        console.log(`Searching all projects in current team=${tid} for assetRn=${assetRn}`)

        const projects = await aoLib.resource.project.list({limitTo:1000,tid});

        // Loop through each project and search for assetref
        // update project with rating if rating is supplied
        for (const [pid,project] of Object.entries(projects)){
            const projectUpdate={
                rn: project.rn
            }
            for (const {stepKey,groupKey,assetKey,assetRef} of iterateAssetRefs(project)){
                const path=`step/${stepKey}/asset/${groupKey}/${assetKey}`;
                if(assetRef.rn===assetRn){
                    const currentRating = assetRef.rating;
                    console.log(`Found asset in project ${project.rn} at ${path} currentRating=${currentRating}`);
                    if(rating){
                        projectUpdate[`${path}/rating`]=rating;
                    }
                }
            }
            if(_.size(projectUpdate)>1){
                console.log('Updating project!!!',projectUpdate);
                await aoLib.resource.project.update(projectUpdate);
            }
        }
    } catch(err){
        console.error(err);
        console.error('Error running rate asset script');
        process.exit(1)
    }
    process.exit(0);
}
main();