var Bot = require('../index');
var AUTH = require('../pass');
var USERID = '50b92bf2eb35c119649146f9';
var ROOMID = '50a25f660f812c777476c5df'; 
//var ROOMID = '4e8c523e4fe7d049db019a2b'; 
var SELF = '50a25f17eb35c12d0d0e742a';
var BOT = require('../index');
var BOSSES = [];
var TALK = false;
var LISTEN = false;
var LOGS = true;
 
 
var bot = new BOT(AUTH, USERID, ROOMID);
//bot.debug = true;
bot.on('roomChanged', function (data) {
    var mods = data.room.metadata.moderator_id;
    LOGS ? console.log('I am setting the following keys as mods ' + mods) : '';
    for (var i = 0; i < mods.length; i++) {
        BOSSES.push(mods[i]);
    }
});
 
bot.on('speak', function (data) {
    var name = data.name;
    var userID = data.userid;
    var text = data.text;
    LOGS ? console.log(name + ' said, "' + text + '".') : '';
    // Here are the user commands:
    if (text.match(/^\/helpme$/)) {
        LOGS ? console.log(name + ' invoked the help command') : '';
        bot.speak('I am qbot, please insert music.');
    }
    // Here are the mod commands:
    for (var i = 0; i < BOSSES.length; i++) {
        if (userID === BOSSES[i]) {
            if (text.match(/^\/boo$/)) {
                console.log('My songs are bad, and I should feel bad');
                bot.remDj();
            }
            if (text.match(/^\/shuffleit$/)) {
                bot.playlistAll(function (playlist) {
                    var songCount = playlist.list.length;
                    for (i = 0; i < songCount; i++) {
                        bot.playlistReorder(i, songCount - i);
                        bot.playlistReorder(songCount, i - 1);
                    }
                });
            }
            if (text.match(/^\/sayagain$/)) {
                LISTEN = true;
            }
            if (text.match(/^\/showme$/)) {
                LOGS = true;
            }
            if (text.match(/^\/nuff$/)) {
                LOGS = false;
            }
            if (text.match(/^\/rockit$/)) {
                LOGS ? console.log(name + ' asked me to play music') : '';
                bot.addDj();
            }
            if (text.match(/^\/quiet$/)) {
                LOGS ? console.log(name + ' asked me to shut up.') : '';
                TALK = 'false';
            }
            if (text.match(/^\/speak$/)) {
                LOGS ? console.log(name + ' asked me to be verbose') : '';
                TALK = 'true';
            }
            if (text.match(/^\/skip$/)) {
                LOGS ? console.log(name + ' asked me to skip a song') : '';
                bot.skip();
            }
        }
    }
});
 
bot.on('registered', function (data) {
    var user = data.user[0];
    LOGS ? console.log(user.name + ' just entered the room.') : '';
    if (user.userid != SELF) {
        if (TALK === true) {
            bot.speak('Welcome to the machine @' + user.name + '!');
        }
        TALK ? bot.speak('Welcome to the machine @' + user.name + '!') : '';
    };
});
 
bot.on('deregistered', function (data) {
    console.log(user.name + ' decided to leave the room.');
});
 
bot.on('newsong', function (data) {
    if (LISTEN === true) {
        var userid = data.room.metadata.current_dj;
        var songCount;
        bot.playlistAll(function (playlist) {
            songCount = playlist.list.count + 1;
        });
        if (userid != SELF) {
            LOGS ? console.log('I am adding a song to my queue') : '';
            songID = data.room.metadata.current_song._id;
            bot.playlistAdd(songID, songCount);
            LOGS ? console.log('I just added a song to my queue.') : '';
        }
    }
});
 
bot.on('add_dj', function (data) {
    var dj = data.user[0].name;
    LOGS ? console.log(dj + ' just got up on the decks') : '';
});
 
/* Logger stuff below here 
bot.on('ready',        function (data) { bot.roomRegister(ROOMID); });
bot.on('roomChanged',  function (data) { console.log('The bot has changed room.', data); });
bot.on('speak',        function (data) { console.log('Someone has spoken', data); });
bot.on('update_votes', function (data) { console.log('Someone has voted',  data); });
bot.on('registered',   function (data) { console.log('Someone registered', data); }); */
 
/*******************************************************************
   Helper utils 
*******************************************************************/
//function voteUpAutomaticallyButAtRandomTime(caller, data) {
//    var maxWaitSeconds = 80;
//    var oneSecond = 1000;
//    setTimeout(function () { caller.vote('up'); }, Math.floor(Math.random() * maxWaitSeconds) * oneSecond);
//}