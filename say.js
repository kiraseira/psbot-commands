exports.kirabot_command = {
	name: "echo",
	desc: "Makes the bot say something",
	help: "makes the bot say something in the current channel",
	aliases: ["say"],
	userlevel: 2,
	pingsender: 0,
	execution_check: false,
	cds: {
			user: 1,
			channel: 2
		},
	code: function(sender, lparam) {
			return new Promise((resolve, reject) => {
				if(lparam.split(" ").length<2){
					resolve({resolvedOnSuccess: true, msg: "🔇"});
					return;
				}
				resolve({resolvedOnSuccess: true, msg: lparam.substr(lparam.indexOf(" ")+1) });
				});
			}
}

