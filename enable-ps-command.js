exports.kirabot_command = {
		name: "enableps",
		desc: "This command lets the broadcaster and operator disable/enable the playsound command for everyone",
		help: "eps/enableps/enableplaysound lets anyone use the playsound command. dps/disableps/disableplaysound sets it to trused or above. Setting it not saved between restarts.",
		aliases: ["eps", "enableplaysound", "dps", "disableps", "disableplaysound"],
		userlevel: 0,
		pingsender: 1,
		execution_check: false,

		cds: {
				user: 5,				//how often a user can call this command (in secs)
				channel: 10				//how often the command can be used by anyone
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					//Example {resolvedOnSucces: true, msg: "successfully played the sound." }
					const lcmd = lparam.split(" ");
					if(!ksb.cmds.find(nam => nam.name === "playsound")){
						resolve({resolvedOnSucces: false, msg: "the playsound command does not exists, so you cannot enable it." });
						return;
					}
					switch(lcmd[0]){
						case "enableplaysound":
						case "enableps":
						case "eps":
							ksb.cmds[ksb.cmds.findIndex(nam => nam.name==="playsound")].userlevel = 0;
							resolve({resolvedOnSucces: true, msg: `the ${ksb.c.prefix}playsound command is now enabled for everyone KomodoHype` });
							return;
							break;
						case "disableplaysound":
						case "disableps":
						case "dps":
							ksb.cmds[ksb.cmds.findIndex(nam => nam.name==="playsound")].userlevel = 1;
							resolve({resolvedOnSucces: true, msg: `the ${ksb.c.prefix}playsound command is now only can be used by permitted users.` });
							return;
							break;
						default:
							reject(`internal command error: unknown alias ${lcmd[0]}`);
							return;
							break;
					}
				});
				}
}
