//work in progress!

const hastebin_url = "https://hastebin.com";
const target_filename = "pslist-url.txt";

exports.kirabot_command = {
		name: "genpslist",
		desc: "Playsound list in hastebin wow!",
		help: "generate a news playsound list and uploads it to hastebin",
		aliases: null,
		userlevel: 3,
		pingsender: 1,
		execution_check: false,
		cds: {
				user: 5,
				channel: 10
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					
			
				
				});
				}
}
