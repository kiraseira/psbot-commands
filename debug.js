exports.kirabot_command = {
		name: "debug",
		desc: "Lets the operator run raw javascript",
		help: "Lets the operator to run raw javascript and returns the result of the expression.",
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
					if(lparam.split(" ").length<2){
						resolve({resolvedOnSuccess: true, msg: "PowerUpL EntropyWins PowerUpR"});
						return;
					}
					const startt = new Date();
					try{
						dbgret = eval ("(function() {"+lparam.substr(lparam.indexOf(" ")+1)+"})()");
					}
					catch(err){
						resolve({resolvedOnSuccess: false, msg: `Error while evaluation expression: ${err}`});
						return;
					}
					const totaltime = new Date()-startt;
					resolve({resolvedOnSuccess: true, msg: `result (in ${totaltime} ms): ${dbgret}`});

				});
				}
}
