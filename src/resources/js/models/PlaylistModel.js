/* use strict */
app.service('playlistService', ['$filter', 'Song', 'fbURL', '$firebaseArray', '$firebaseObject', '$q',
    function ($filter, Song, fbURL, $firebaseArray, $firebaseObject, $q) {
        var service = this;

        var playlistRef = new Firebase(fbURL + 'playlist/');
        var ref = playlistRef.orderByChild("position");


        service.rounds = [1, 2, 3, 4, 5, 6, 7];
        service.config = {};

        service.setItems = function (data) {
            service.items = data;
        };
        service.getItems = function () {
            return service.items;
        };

        service.setConfig = function (config) {
            service.config = config;
        };

        service.getSongsByRound = function (round) {
            var deferred = $q.defer();
            var fb = new Firebase(fbURL);

            var norm = new Firebase.util.NormalizedCollection(
                [fb.child('playlist/' + round).orderByChild('position'), "round"],
                [fb.child('songs'), 'song', 'round.songId']
            );

            var ref = norm.select('round.songId','round.position', 'song.name').ref();
            ref.once("value", function(snap) {
                deferred.resolve(snap.val());
            });

            return deferred.promise;
        };

        service.savePosition = function (key, position) {
            var item = $firebaseObject(playlistRef.child(key));
            item.$loaded().then(function (data) {
                data.position = position;
                data.$save();
            });
        };

        service.addSong = function (data, round) {
            var ref = new Firebase(fbURL + 'playlist/' + round);
            var list = $firebaseArray(ref);
            list.$add({
                songId: data.$id,
                position: 9999,
                round: round
            }).then(function () {
                service.repairPossition(round);
            });
        };

        service.repairPossition = function (round) {
            var counter = 0;
            var ref = new Firebase(fbURL + 'playlist/' + round).orderByChild('position');
            var list = $firebaseArray(ref);
            list.$loaded().then(function (items) {
                angular.forEach(items, function (value, index) {
                    counter++;
                    //list[index].position = counter;
                    new Firebase(fbURL + 'playlist/').child(round).child(value.$id).update({'position': counter});


                });

                //list.$save();
            })

        };
        return service;

    }]);