app.factory("Song", ["$firebaseObject", 'fbURL',
    function ($firebaseObject, fbURL) {
        var Song = $firebaseObject.$extend({});

        return function (songId) {
            var ref = new Firebase(fbURL + '/songs/').child(songId);
            return new Song(ref);
        }
    }
]);
