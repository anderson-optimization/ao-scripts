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

module.exports = iterateAssetRefs;