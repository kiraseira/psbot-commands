exports.kirabot_command = {
		name: "trust",
		desc: "adds/removes a userf from the trusted list",
		help: "trust: adds a user to the trusted list allowing them to play sounds on command and possibly use other commands. untrust: removes them",
		aliases: ["untrust"],
		userlevel: 2,
		pingsender: 1,
		execution_check: false,
		cds: {
				user: 2,				//how often a user can call this command (in secs)
				channel: 3				//how often the command can be used by anyone
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					//Example {resolvedOnSucces: true, msg: "successfully played the sound." }
					const inparam = lparam.split(" ");
					if (inparam.length <2){
						resolve({resolvedOnSucces: false, msg: "please specify a username." });
						return;
					}
					if(inparam[1].indexOf(`'`) != -1){
						resolve({resolvedOnSucces: false, msg: "FeelsWeirdMan" });
						return;
					}
					let s;
					const targetuser = inparam[1].toLowerCase();
					switch(inparam[0]){
						case "trust":
							if(targetuser === ksb.c.operator || targetuser === ksb.c.prodch.name){
								resolve({resolvedOnSucces: false, msg: "the operator and the broadcaster can already run commands requiring trusted level" });
								return;
							}
							if(targetuser === ksb.c.username){
								resolve({resolvedOnSucces: false, msg: "thank you for trusting me peepoGladDank" });
								return;
							}
							s = ksb.db.syncSelect(`SELECT * FROM trusted WHERE username='${targetuser}';`);
							if (s.length>0){
								resolve({resolvedOnSucces: false, msg: "that user is already trusted" });
								return;
							}
							ksb.db.syncInsert(`INSERT INTO trusted (username) VALUES ('${targetuser}');`);
							resolve({resolvedOnSucces: true, msg: `successfully added ${targetuser} to the trusted list.` });
							return;
							break;
						case "untrust":
							if(targetuser === ksb.c.operator || targetuser === ksb.c.prodch.name){
								resolve({resolvedOnSucces: false, msg: "cannot untrust the operator or the broadcaster." });
								return;
							}
							if(targetuser === ksb.c.username){
								resolve({resolvedOnSucces: false, msg: "y u no trust me peepoSadDank" });
								return;
							}
							s = ksb.db.syncSelect(`SELECT * FROM trusted WHERE username='${targetuser}';`);
							if (s.length===0){
								resolve({resolvedOnSucces: false, msg: "that user is not on the trusted list." });
								return;
							}
							ksb.db.syncInsert(`DELETE FROM trusted WHERE username='${targetuser}';`);
							resolve({resolvedOnSucces: true, msg: `successfully removed ${targetuser} from the trusted list.` });
							return;
							break;
						default:
							reject(`internal error: unknown alias ${inparam[0]}`);
							break;
						}
					});
				}
				}
				
				
