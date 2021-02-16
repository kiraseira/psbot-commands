exports.kirabot_command = {
		name: "ban",
		desc: "bans a user from executing commands and playing sounds with point redemptions",
		help: "ban: bans a user from using the bots command and sounds. Text entered after the username (if any) is saved as reason for the ban. unban: removes an existing ban.",
		aliases: ["unban"],
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
						case "ban":
							if(targetuser === ksb.c.operator || targetuser === ksb.c.prodch.name){
								resolve({resolvedOnSucces: false, msg: "the operator and the broadcaster cannot be banned." });
								return;
							}
							if(targetuser === ksb.c.username){
								resolve({resolvedOnSucces: false, msg: "y u want to ban me peepoSadDank" });
								return;
							}
							s = ksb.db.syncSelect(`SELECT * FROM bans WHERE username='${targetuser}';`);
							if (s.length>0){
								resolve({resolvedOnSucces: false, msg: "that user is already banned MODS Clap" });
								return;
							}
							ksb.db.syncInsert(`INSERT INTO bans
											   (username, issuedby, comment)
											   VALUES
											   ('${targetuser}', '${sender}', '${inparam.slice(2).join(" ")}');`);
							resolve({resolvedOnSucces: true, msg: `successfully banned ${targetuser} from using the bot MODS Clap` });
							return;
							break;
						case "unban":
							if(targetuser === ksb.c.operator || targetuser === ksb.c.prodch.name){
								resolve({resolvedOnSucces: false, msg: "the operator and the broadcaster cannot be banned so they don't need to be unbanned :)" });
								return;
							}
							if(targetuser === ksb.c.username){
								resolve({resolvedOnSucces: false, msg: "I'm not banned peepoMadDank" });
								return;
							}
							s = ksb.db.syncSelect(`SELECT * FROM bans WHERE username='${targetuser}';`);
							if (s.length===0){
								resolve({resolvedOnSucces: false, msg: "that user is not banned." });
								return;
							}
							ksb.db.syncInsert(`DELETE FROM bans WHERE username='${targetuser}';`);
							resolve({resolvedOnSucces: true, msg: `successfully unbanned ${targetuser}` });
							return;
							break;
						default:
							reject(`internal error: unknown alias ${inparam[0]}`);
							break;
						}
					});
				}
				}
				
				
