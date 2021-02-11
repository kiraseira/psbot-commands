Q:	What is a hastebin?  FeelsDankMan
A:	Hastebin is a plaintext hosting service similar to pastebin and its alternatives.
	It aims to be simple, fast and easy to host.

Q:	Cool but why we need it? :)
A:	To store lists of playsounds.
	* Twitch messages will not be enough to list any health amount of playsounds
	* Free to use, no auth/no APIkey pastehtml is nonexistent (for a good reason)
	* I cannot expect the end user to set up a webserver and proxypass the bot
	  so it can serve a list
	* Generating a html then uploading it to somewhere is too donk
	
Q:	About the server....
A:	I set up an instance on the free (as in gratis) service Glitch.com
	The listps command will use that by default. Please note that Glitch
	will suspend unused services after a few minutes of inactivity so resources
	can be used elsewhere. If the service is suspended the list will take some 
	time to load and the generate command will fail because of timeout.
	You can open the site or a previous list in your browser and when it 
	finally loads try generating again.
	
Q:	Can I use other hastebin servers?
A:	Some of them will work, others won't. Sadly the hatebin module I use
	is no longer maintained (PepegaSit why do I use it?) and it has troubles
	with some hastebin servers.
	
Q:	Can I host my own hastebin?
A:	Absolutely. https://github.com/zneix/haste-server
