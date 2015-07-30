app.factory("PlaylistFactory", ["$firebaseArray", 'fbURL',
    function ($firebaseArray, fbURL) {
        var Playlist = $firebaseArray.$extend({});

        return function () {
            var ref = new Firebase(fbURL + '/playlist/');
            return new Playlist(ref);
        }
    }
]);
