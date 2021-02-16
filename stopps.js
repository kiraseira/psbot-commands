exports.kirabot_command = {
		name: "stopps",
		desc: "Stops playback",
		help: "Stops the current playback. Note: due to stream delays the sound might have already stopped by the time you hear and try to stop it.",
		aliases: ["stop"],
		userlevel: 1,
		pingsender: 1,
		execution_check: false,
		cds: {
				user: 2,
				channel: 2
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					ksb.player.stop();
					ksb.util.logger(3, "Stopping playback on command.");
					ksb.status = "idle";
					//reset the execution status of the playsound command so the user doesn't have to wait
					//for the 1 min grace period to be over to use the command again.
					if(ksb.util.getExecutionStatus(sender, "playsound")){
						let i = ksb.util.cooldowns.findIndex(nam => nam.usr === sender && nam.cmd === "__command_execution:playsound");
						if(i!=-1) ksb.util.cooldowns[i].ptime -= 61;
					}
					resolve({resolvedOnSuccess: true, msg: "Playback stopped."});
				});
				}
}

