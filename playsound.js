exports.kirabot_command = {
		name: "playsound",
		desc: "Lets users play sounds on command",
		help: "Lets users play sounds on command if enabled. Take a playsound name as parameter.",
		aliases: ["ps"],
		userlevel: 1,
		pingsender: 1,
		execution_check: true,
		cds: {
				user: 10,
				channel: 15
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					const cparam = lparam.split(" ");
					if (cparam.length<2){
						resolve({resolvedOnSuccess: false, msg: "you must specify a playsound name to play"});
						return;
					}
					if (ksb.status != "idle"){
						resolve({resolvedOnSuccess: false, msg: "a sound is already playing, wait until it finishes."});
						return;
					}
					ksb.util.playsound(cparam[1]).then((d) => {
						resolve({resolvedOnSuccess: true, msg: d});
						return;
					}).catch((err) => { reject(err); });	
				});
				}
}
