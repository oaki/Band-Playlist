/* use strict */
app.service('playService', ['$filter', 'Song', 'fbURL', '$firebaseArray', '$firebaseObject', '$q',
    function ($filter, Song, fbURL, $firebaseArray, $firebaseObject, $q) {
        var service = this;
        var ref = new Firebase(fbURL + 'playlist/').orderByChild("position");

        service.list = $firebaseObject(ref);

        service.config = {};

        service.setConfig = function (config) {
            service.config = config;
        };

        service.getSong = function () {
            var round = service.config.round;
            var position = service.config.position;
            var deferredSong = $q.defer();
            service.list.$loaded().then(function (list) {
                angular.forEach(list[round], function (value, index) {
                    if (value['position'] == position) {
                        deferredSong.resolve(Song(value.songId));
                    }
                });
            });

            return deferredSong.promise;
        };

        service.isPosition = function (round, position) {
            var result = false;
            angular.forEach(service.list[round], function (value) {
                if (value['position'] == position) {
                    result = true;
                }
            });
            return result;
        };
        service.nextSong = function () {
            var round = service.config.round;
            var position = service.config.position;

            if (service.isPosition(round, position+1)) {
                service.config.position++;
                service.config.$save();
            } else {
                if (service.isPosition(round+1,1)) {
                    service.config.round++;
                    service.config.position = 1;
                    service.config.$save();
                }
            }
        };

        service.prevSong = function () {
            var round = service.config.round;
            var position = service.config.position;

            if (service.isPosition(round, position-1)) {
                service.config.position--;
                service.config.$save();
            } else {
                var tmp = round - 1;
                if (tmp < 1) {
                    service.config.round = 1;
                    service.config.position = 1;
                } else {
                    //check last index
                    var lastIndex = Object.keys(service.list[tmp]).length;
                    if(service.isPosition(tmp, lastIndex)){
                        service.config.round = tmp;
                        service.config.position = lastIndex;
                    }

                }

                service.config.$save();

            }

        };

        service.firstSong = function () {
            service.config.round = 1;
            service.config.position = 1;
            service.config.$save();
        };
        return service;

    }]);