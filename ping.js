exports.kirabot_command = {
	name: "ping",
	desc: "Ping command 4HEad",
	help: "Pongs back with some stats",
	aliases: ["pong"],
	userlevel: 0,
	pingsender: 1,
	execution_check: false,
	cds: {
			user: 10,
			channel: 5
		},
	code: function(sender, lparam) {
			return new Promise((resolve, reject) => {
				let data = ksb.db.syncSelect(`SELECT COUNT(id) AS cid FROM playsounds WHERE enabled='1';`);
				let pingstart = new Date(), pingms, upTime;
				ksb.chatclient.ping().then(()=> {
					pingms = String(new Date()-pingstart)+"ms";
				}).catch((err) => {
					ksb.util.logger(2, `<ping cmd> Error while trying to ping TMI: ${err}`);
					pingms = "(unknown)";
				}).finally(() => {
					upTime = ksb.util.timeconv(ksb.util.getUnixtime() - ksb.startt);
					resolve ({resolvedOnSuccess: true, msg: `Playsound bot ready to roll. Uptime: ${upTime}, command prefix is ${ksb.c.prefix} , memory usage: ${ksb.util.memusage()}, enabled playsounds: ${data[0].cid}, latency to TMI:  ${pingms}`});
				});
			});
			}
}

