exports.kirabot_command = {
	name: "chatstats",
	desc: "statistics about the chatters of a stream",
	help: "shows chat statistics about a specified channel",
	aliases: null,
	userlevel: 0,
	pingsender: 1,
	execution_check: true,
	cds: {
			user: 20,				//how often a user can call this command (in secs)
			channel: 15 				//how often the command can be used by anyone
		},
	code: function(sender, lparam) {
			return new Promise((resolve, reject) => {
				//Example {resolvedOnSucces: true, msg: "successfully played the sound." }
				const inmsg = lparam.split(" ");
				if (inmsg.length<2){
					resolve({resolvedOnSucces: false, msg: "please specify a channel name." });
					return;
				}
				ksb.got.get("https://tmi.twitch.tv/group/user/"+inmsg[1]+"/chatters").json().then((data) => {
					resolve({resolvedOnSucces: true, msg: `VIPS: ${data.chatters.vips.length}, MODS : ${data.chatters.moderators.length}, viewers ${data.chatters.viewers.length}`});
					return;
				}).catch((err) => {
					reject(err);
					return;
				});
			});
			}
}

