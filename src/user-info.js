
// ensure you run login script
// npm run login


const aoCli = require('@anderson-optimization/ao-cli');
let aoLib;


async function main(){
    try{
        aoLib = await aoCli.getAoLib();
        const uid = aoLib.$user.getUid();
        console.log(`My user id is: ${uid}`)
        const userState = await aoLib.$user.getUserState();
        console.log(`My user state is `,userState);
        const userTeams = await aoLib.resource.userTeam.get(uid,{});
        const tids = Object.keys(userTeams);
        console.log(`I am a member of ${tids.length} teams`);
        for (let tid of tids){
            const team = await aoLib.resource.team.get(tid,{});
            if(team && team.member){
                const members = Object.keys(team.member);
                console.log(`Team ${team.name} with ${members.length} members`);
            } else {
                console.warn(`Error processing tid=${tid}`)
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