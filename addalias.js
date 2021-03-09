exports.kirabot_command = {
	name: "addalias",
	desc: "adds/removed playsound alias",
	help: "Usage: addalias <playsound> <alias> adds a new alias to a ps, delalias <alias> deletes an alias",
	aliases: ["delalias"],
	userlevel: 2,
	pingsender: 1,
	execution_check: false,
	cds: {
			user: 1,				//how often a user can call this command (in secs)
			channel: 2				//how often the command can be used by anyone
		},
	code: function(sender, lparam) {
			return new Promise((resolve, reject) => {
				//Example {resolvedOnSucces: true, msg: "successfully played the sound." }
				const inparam = lparam.split(" ");
				let s, target, newalias;
				switch(inparam[0]){
					case "addalias":
						if(inparam.length<3){
							resolve({resolvedOnSucces: false, msg: `usage: ${ksb.c.prefix}addalias <playsound> <alias>` });
							return;
							break;
						}
						target = String(inparam[1]).toLowerCase();
						newalias = String(inparam[2]).toLowerCase();
						s = ksb.db.syncSelect(`SELECT * FROM aliases WHERE alias='${newalias}';`);
						if(s.length>0){
							resolve({resolvedOnSucces: false, msg: `there is already an alias with that name. To reuse the name delete it with ${ksb.c.prefix}delalias first.` });
							return;
							break;
						}
						s = ksb.db.syncSelect(`SELECT * FROM playsounds WHERE name='${target}';`);
						if(s.length===0){
							resolve({resolvedOnSucces: false, msg: `there is no playsound with that name.` });
							return;
							break;
						}
						ksb.db.syncInsert(`INSERT INTO aliases
										  (alias, target)
										  VALUES
										  ('${newalias}', '${target}');`);
						resolve({resolvedOnSucces: true, msg: `successfully added alias "${newalias}" to playsound "${target}".` });
						break;
					case "delalias":
						if(inparam.length<2){
							resolve({resolvedOnSucces: false, msg: `usage: ${ksb.c.prefix}delalias <alias>` });
							return;
							break;
						}
						target = String(inparam[1]).toLowerCase();
						s = ksb.db.syncInsert(`DELETE FROM aliases WHERE alias='${target}';`);
						if(s.changes===0){
							resolve({resolvedOnSucces: false, msg: `there is no alias with that name.` });
								return;
							break;
						} else {
							resolve({resolvedOnSucces: true, msg: `alias "${target}" deleted successfully.` });
							return;
							break;
						}
					default:
						reject(`unknown command alias ${inparam[0]}`);
						return;
					}
			
			});
			}
}

