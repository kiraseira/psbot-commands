exports.kirabot_command = {
		name: "dank",
		desc: "woah FeelsDankMan",
		help: "let you dank/donk/nam/quack others :) ",
		aliases: ["donk", "nam", "quack"],
		userlevel: 0,
		pingsender: 0,
		execution_check: false,
		cds: {
				user: 5,
				channel: 10
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					const input = lparam.split(" ");
					if(input.length <2){
						switch(input[0]){
							case "dank":
								resolve({resolvedOnSuccess: true, msg: `${sender} you're flippin dank FeelsDankMan`});
								return;
							case "donk":
								resolve({resolvedOnSuccess: true, msg: `${sender} you're flippin donk FeelsDonkMan`});
								return;
							case "nam":
								resolve({resolvedOnSuccess: true, msg: `${sender} get flippin NaM med`});
								return;
							case "quack":
								resolve({resolvedOnSuccess: true, msg: `${sender} get flippin quacked DuckerZ`});
								return;
							default:
								reject("internal command error FeelsDonkMan");
								return;
						}
					} else {
						switch(input[0]){
							case "dank":
								resolve({resolvedOnSuccess: true, msg: `get flippin danked ${input[1]} FeelsDankMan`});
								return;
							case "donk":
								resolve({resolvedOnSuccess: true, msg: `get flippin donked ${input[1]} FeelsDonkMan`});
								return;
							case "nam":
								resolve({resolvedOnSuccess: true, msg: `get flippin NaM med ${input[1]}`});
								return;
							case "quack":
								resolve({resolvedOnSuccess: true, msg: `get flippin quacked ${input[1]} DuckerZ`});
								return;
							default:
								reject("internal command error FeelsDonkMan");
								return;
						}
					}			
				});
				}
}
