const fs = require('fs');
var rp = require('request-promise');



const user = 'INSERT USER HERE';
var pages = 0;


var promise1 = rp('http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&api_key=60e256b3eda3fe54934d79339614411f&user=' + user + '&format=json');
var promise2 = rp('http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&api_key=60e256b3eda3fe54934d79339614411f&user=' + user + '&page=5&format=json');


promise1.then(function(data) {
    str = JSON.parse(data);
    pages = str.recenttracks["@attr"].totalPages;
    var arr = [];
    for (let i = 0; i < pages; i++) {
        arr.push(rp('http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&api_key=60e256b3eda3fe54934d79339614411f&user=' + user + '&page=' + (i + 1) + '&format=json'))
    }

    var ok = [];


    Promise.all(arr).then(function(data) {
        var hist = [];

        for (let i = 0; i < data.length; i++) {
            hist.push(JSON.parse(data[i]));
        }
        //console.log(ok[0].recenttracks.track[1].artist['#text']);
        console.log(hist[0].recenttracks);
        for (let i = 0; i < hist.length; i++) {
            for (let j = 0; j < hist[i].recenttracks.track.length; j++) {
                
                console.log(hist[i].recenttracks.track[j].artist['#text'],",", hist[i].recenttracks.track[j].name);
            }

        }
        //loop through array, [obj, obj, obj], 
    });

});
