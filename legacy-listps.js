exports.kirabot_command = {
	name: "oldlistps",
	desc: "Lists playsounds - legacy version",
	help: "returns a list of enabled playsounds in chat. Use the new listps version for more complete list",
	userlevel: 0,
	aliases: ["oldpslist"],
	pingsender: 1,
	execution_check: false,
	cds: {
			user: 5,
			channel: 10
		},
	code: function(sender, lparam) {
			return new Promise((resolve, reject) => {
				let sdata = ksb.db.syncSelect(`SELECT * FROM playsounds WHERE enabled='1' ORDER BY name;`);
				if (!sdata || sdata.length===0){
					resolve({resolvedOnSuccess: true, msg: `there are no enabled playsounds Saj`});
					return;
				}
				let pss = "";
				for(let i=0; i<sdata.length;i++){
					pss += sdata[i].name+" ";
				}
				resolve({resolvedOnSuccess: true, msg: `Available playsounds (total: ${sdata.length}): ${pss}`});
				return;
			});
			}
}

