exports.kirabot_command = {
		name: "psinfo",
		desc: "Playsound information command",
		help: "Gives you some short information about a playsound",
		aliases: ["psi", "soundinfo"],
		userlevel: 0,
		pingsender: 1,
		execution_check: false,
		cds: {
				user: 5,				//how often a user can call this command (in secs)
				channel: 7				//how often the command can be used by anyone
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					const inparam = lparam.split(" ");
					if(inparam.length<2){
						resolve({resolvedOnSuccess: false, msg: `please specify a playsound name. You can run ${ksb.c.prefix}listps for a list of enabled playsounds`});
						return;
					}
					let sval = ksb.db.syncSelect(`SELECT * FROM playsounds WHERE name='${inparam[1].toLowerCase()}';`);	
					if(sval.length===0){
						resolve({resolvedOnSuccess: false, msg: `unknown playsound "${inparam[1]}"`});
						return;
					}
					if(sval[0].enabled===0){
						resolve({resolvedOnSuccess: true, msg: `playsound exists, but its not enabled.`});
						return
					}
					let sndlen, sndcat;
					switch(sval[0].category){
						case "a":
							sndcat = ksb.c.categories.a;
							break;
						case "b":
							sndcat = ksb.c.categories.b;
							break;
						case "c":
							sndcat = ksb.c.categories.c;
							break;
						default:
							sndcat = "invalid";
							break;							
					}
					ksb.wavinfo.infoByFilename(ksb.c.pspath+sval[0].path, function(err, info){
						if(err){
							sndlen = "(invalid)";
							ksb.util.logger(1, `<psinfo> warning: cannot stat ${klb.c.pspath+sval[0].path}: ${err}`);
						} else {
							sndlen = info.duration.toFixed(2)+"sec";
						}
						resolve({resolvedOnSuccess: true, msg: `chpoint category: ${sndcat}, length: ${sndlen}, description: ${sval[0].description}`});
					});
					return;
				});
				}
}
