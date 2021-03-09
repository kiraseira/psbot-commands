exports.kirabot_command = {
	name: "listps",
	desc: "Posts a link to the playsound list hastebin",
	help: "returns a link to the list of enabled playsounds",
	userlevel: 0,
	aliases: ["pss", "playsounds", "pslist"],
	pingsender: 1,
	execution_check: false,
	cds: {
			user: 5,
			channel: 10
		},
	code: function(sender, lparam) {
			return new Promise((resolve, reject) => {
				let sdata = ksb.db.syncSelect(`SELECT * FROM data WHERE name='playsound-list';`);
				if (!sdata || sdata.length===0){
					resolve({resolvedOnSuccess: true, msg: `No playsound list URL is saved in the db. Ask the broadcaster to run ${ksb.c.prefix}genpslist`});
					return;
				}
				resolve({resolvedOnSuccess: true, msg: `Available playsounds: ${sdata[0].value}`});
				return;
			});
			}
}

