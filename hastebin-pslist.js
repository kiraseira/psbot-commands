const hastebin_url = "https://kirahaste.glitch.me/";

exports.kirabot_command = {
		name: "genpslist",
		desc: "Playsound list in hastebin wow!",
		help: "generate a news playsound list and uploads it to hastebin",
		aliases: null,
		userlevel: 3,
		pingsender: 1,
		execution_check: false,
		cds: {
				user: 1,
				channel: 2
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					ksb.haste.createPaste(generateList(),
										{raw: true, contentType: 'text/plain', server: hastebin_url},
										/* options for the 'got' module here */ {}).then((data)=>{
											let psl = ksb.db.syncSelect("SELECT * FROM data WHERE name='playsound-list';");
											if(psl.length === 0){
												ksb.db.syncInsert(`INSERT INTO data (name, value) VALUES ('playsound-list', '${data}');`);
											} else {
												ksb.db.syncInsert(`UPDATE data SET value='${data}' WHERE name='playsound-list';`);
											}
											resolve({resolvedOnSucces: true, msg: `List successfully generated and uploaded to ${data} Link was saved to db.`});
											return;
										}).catch((err) => { reject(err);});	
				});
				}
}

function generateList(){
	let thelist = "",pss;
	thelist += `Playsound bot playsound list\n`;
	thelist += `Generated at ${new Date().toUTCString()} by ${ksb.c.username} for channel ${ksb.c.prodch.name}\n`;
	thelist += `List format:\nPlaysound name (duration): description\n\n`;
	pss = ksb.db.syncSelect(`SELECT * FROM playsounds WHERE enabled='1' AND category='a' ORDER BY name ASC;`);
	if(pss.length>0){
		thelist += `Enabled playsounds under channelpoint redemption item '${ksb.c.categories.a}':\n`;
		pss.forEach(psound => {
			thelist+= `${psound.name} (${psound.sndlen} s): ${psound.description}\n`;
		});
		thelist += '\n';
	}
	pss = ksb.db.syncSelect(`SELECT * FROM playsounds WHERE enabled='1' AND category='b' ORDER BY name ASC;`);
	if(pss.length>0){
		thelist += `Enabled playsounds under channelpoint redemption item '${ksb.c.categories.b}':\n`;
		pss.forEach(psound => {
			thelist+= `${psound.name} (${psound.sndlen} s): ${psound.description}\n`;
		});
		thelist += '\n';
	}
	pss = ksb.db.syncSelect(`SELECT * FROM playsounds WHERE enabled='1' AND category='c' ORDER BY name ASC;`);
	if(pss.length>0){
		thelist += `Enabled playsounds under channelpoint redemption item '${ksb.c.categories.c}':\n`;
		pss.forEach(psound => {
			thelist+= `${psound.name} (${psound.sndlen} s): ${psound.description}\n`;
		});
		thelist += '\n';
	}
	thelist += "#End of the list";
	return thelist;
}
