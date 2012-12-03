var Bot    = require('../index');
var AUTH   = '';
var USERID = '';
var ROOMID = '';

var bot = new Bot(AUTH, USERID, ROOMID);
//bot.debug = true;
bot.on('speak', function (data) {
  // Get the data
  var name = data.name;
  var userID = data.userid;
  var text = data.text;

  // Respond to "/hello" command
	if (text.match(/^\/hello$/)) {
		bot.speak('Hey! How are you @'+name+'?');
	}
  
	if (text.match(/^\/play$/)) {
		console.log('I\'ve been asked to play music');
		if(userID = '4f42adc4590ca27dbb004ade') {
			bot.addDj();
		}
	}
	if (text.match(/^\/stop$/)) {
		console.log('My songs are bad, and I should feel bad');
		if (userID = '4f42adc4590ca27dbb004ade') {
			bot.remDj();
		}
	}
  
});

bot.on('registered', function(data) {
	var user = data.user[0];
	console.log(user.name+' just entered the room.');
	if(user.userid != '50bc2750aaa5cd5f9938fc3b') {
		bot.speak('Welcome to the machine @'+user.name+'!');
	};
});

bot.on('speak', function (data) {
	var text = data.text;
	if (text.match(/^\/help$/)) {
		console.log('Someone invoked the help command');
		bot.speak('I am bot-A-tron, please insert music.');
	}
});

bot.on('newsong', function (data) {
	var userid = data.userid;
	if(userid != '50bc2750aaa5cd5f9938fc3b'){
		songID = data.room.metadata.current_song._id;
		bot.playlistAdd(songID);
		console.log('I just added a song to my queue.');
	}
});

bot.on('add_dj', function (data) {
var dj = data.user[0].name;
console.log('DJ '+dj+ ' just got up on the decks');

});

	/* Logger stuff below here 
bot.on('ready',        function (data) { bot.roomRegister(ROOMID); });
bot.on('roomChanged',  function (data) { console.log('The bot has changed room.', data); });
bot.on('speak',        function (data) { console.log('Someone has spoken', data); });
bot.on('update_votes', function (data) { console.log('Someone has voted',  data); });
bot.on('registered',   function (data) { console.log('Someone registered', data); }); */

