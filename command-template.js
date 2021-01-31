exports.kirabot_command = {
		name: "",						//primary name of the command that will be used to invoke it
		desc: "",						//description of what it does
		help: "",						//when a user runs the help command with this one's name this help will be displayed
		aliases: null,					//array of strings with the aliases of the command
		userlevel: 0,					//0: anyone can run it 1: needs to be at least trusted user 2: needs to be at least broadcaster 3: operator only
		pingsender: 1,					//1: text reply from the command will be prefixed by "<calling users name>, " 0: it won't be
		execution_check: false,			//if true right before starting the command the user is flagged for having a command executing which prevents them
										//from running other commands before the previous one was finished
		cds: {
				user: 5,				//how often a user can call this command (in secs)
				channel: 10				//how often the command can be used by anyone
			},
		code: function(sender, lparam) {
				return new Promise((resolve, reject) => {
					//resolve on success and minor, handled errors like not enough parameters, invalid parameter etc.
					//reject on serious errors like http error, sql error etc.
					//both rejection and resolve must return a string!
				
				});
				}
}
