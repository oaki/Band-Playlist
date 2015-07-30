/* use strict */
var firebase = new Firebase('https://scorching-inferno-4935.firebaseio.com/');

var app = angular.module('BandPlaylist',
    [
        'firebase',
        'ngDraggable',
        'wysiwyg.module','colorpicker.module',
        'ngRoute',
        'ngFileUpload',
        'pascalprecht.translate'
    ]);

app.config(['$translateProvider', function ($translateProvider) {
    var translations = {
        'Add food': 'Add food',
        'INTRO_TEXT': 'And it has i18n support!'
    };
    $translateProvider.translations('en', translations);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');


}]);

app.value('fbURL', 'https://scorching-inferno-4935.firebaseio.com/');

/* use strict */
app.controller('AddSongCtrl', [
    '$scope',
    '$firebaseArray',
    '$location',
    'fbURL',
    function ($scope, $firebaseArray, $location, fbURL) {
        //$scope.songs = songsFactory;
        var songsRef = new Firebase(fbURL + 'songs/');
        // download the data from a Firebase reference into a (pseudo read-only) array
        // all server changes are applied in realtime

        $scope.songs = $firebaseArray(songsRef);

        $scope.menu = [
            ['bold', 'italic', 'underline'],
            ['format-block'],
            ['font-size'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['left-justify', 'center-justify', 'right-justify'],
            ['link', 'image'],
            ['css-class']
        ];
        $scope.addSong = function () {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            $scope.songs.$add({
                name: $scope.name,
                artist: $scope.artist,
                lyrics: $scope.lyrics
            });

            $location.path('/');
        };
    }]);

/* use strict */
app.controller('EditSongCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    function ($scope, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL) {

        //console.log($routeParams.id);
        //$scope.songs = songsFactory;
        var songsRef = new Firebase(fbURL + 'songs/' + $routeParams.id);
        // download the data from a Firebase reference into a (pseudo read-only) array
        // all server changes are applied in realtime

        $scope.song = $firebaseObject(songsRef);

        $scope.menu = [
            ['bold', 'italic', 'underline'],
            ['format-block'],
            ['font-size'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['left-justify', 'center-justify', 'right-justify'],
            ['link', 'image'],
            ['css-class']
        ];

        $scope.saveSong = function () {
            $scope.song.$save()
                .then(function () {
                    $location.path('/');
                }).catch(function (error) {
                    alert('Error!');
                });
        }
    }]);

/* use strict */
app.controller('MainCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    'Song',

    function ($scope, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL, Song) {
        var songsRef = new Firebase(fbURL + 'songs/');
        var roundRef = new Firebase(fbURL + 'playlist/');

        $scope.rounds = [1, 2, 3, 4, 5, 6, 7];
        $scope.showRound = false;

        var loadSongName = function () {
            angular.forEach($scope.roundsongs, function (value, index) {
                Song(value.songId).$loaded().then(function (data) {
                    $scope.roundsongs[index].name = data.name;
                });
            })
        };

        repairPossition = function (round) {
            var counter = 0;
            angular.forEach($scope.roundsongs, function (value, index) {
                if (value.round == round) {
                    $scope.roundsongs[index].position = ++counter;
                    $scope.roundsongs.$save(index);
                }

            });
        };

        if (typeof $routeParams.round !== 'undefined') {
            $scope.showRound = true;
            $scope.activeRound = $routeParams.round;

            var roundQuery = roundRef.orderByChild("position");
            $scope.roundsongs = $firebaseArray(roundQuery);

            loadSongName();
        }

        $scope.songs = $firebaseArray(songsRef);

        $scope.onDropComplete = function (data, evt, round) {
            $scope.roundsongs.$add({
                songId: data.$id,
                position: 9999,
                round: round
            }).then(function () {
                repairPossition($scope.activeRound);
            });
        };

        $scope.rounds = [1, 2, 3, 4, 5, 6, 7];
        $scope.showRound = false;

        if (typeof $routeParams.round !== 'undefined') {
            $scope.showRound = true;
            $scope.activeRound = $routeParams.round;

            var roundQuery = roundRef.orderByChild("position");
            $scope.roundsongs = $firebaseArray(roundQuery);

            loadSongName();

            $scope.roundsongs.$watch(function (event) {
                loadSongName();
            });
        }



        var query = songsRef.orderByChild("name").limitToLast(500);
        $scope.filteredsongs = $firebaseArray(query);

        $scope.editSong = function (id) {
            $location.path('/editSong/' + id);
        };

        $scope.deleteSong = function (id) {
            if (confirm('Are You sure to Delete?')) {
                var ref = new Firebase(fbURL + 'songs/' + id);
                $firebaseObject(ref).$remove().then(function (ref) {
                }, function (error) {
                    console.log("Error:", error);
                });
            }
        };

        $scope.deleteSongFromPlaylist = function (id) {
            if (confirm('Are You sure to Delete?')) {
                var ref = new Firebase(fbURL + '/playlist/' + id);
                $firebaseObject(ref).$remove().then(function (ref) {
                    repairPossition($scope.activeRound);
                }, function (error) {
                    console.log("Error:", error);
                });
            }
        }

    }]);

/* use strict */
app.controller('PlayCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    function ($scope, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL) {

        var configRef = new Firebase(fbURL + 'config/');
        $scope.config = $firebaseObject(configRef);

        $scope.config.$loaded().then(function () {
            console.log($scope.config);
            if (typeof $scope.config.round == 'undefined') {
                $scope.config.round = 1;
            }

            if (typeof $scope.config.song == 'undefined') {
                $scope.config.song = 1;
            }

            $scope.config.$save();
        });
        var playlistRef = new Firebase(fbURL + 'playlist/');
        // download the data from a Firebase reference into a (pseudo read-only) array
        // all server changes are applied in realtime


        $scope.song = $firebaseObject(playlistRef);

        $scope.menu = [
            ['bold', 'italic', 'underline'],
            ['format-block'],
            ['font-size'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['left-justify', 'center-justify', 'right-justify'],
            ['link', 'image'],
            ['css-class']
        ];

        $scope.saveSong = function () {
            $scope.song.$save()
                .then(function () {
                    $location.path('/');
                }).catch(function (error) {
                    alert('Error!');
                });
        }
    }]);

///* use strict */
//app.factory('dataFactory', ['$firebaseObject', function ($firebaseObject) {
//
//    return $firebaseObject.$extend({
//        /**
//         * Called each time there is an update from the server
//         * to update our Book data
//         */
//        $$updated: function (snap) {
//            // call the super
//            var changed = $firebaseObject.prototype
//                .$$updated.apply(this, arguments);
//            // manipulate the date
//            if( changed ) {
//                this.date = new Date(this.date||0);
//            }
//            // inform the sync manager that it changed
//            return changed;
//        },
//
//        /**
//         * Used when our book is saved back to the server
//         * to convert our dates back to JSON
//         */
//        toJSON: function() {
//            return angular.extend({}, this, {
//                // revert Date objects to json data
//                date: this.date? this.date.getTime() : null
//            });
//        }});
//        //var dataFactory = {
//        //    'urlBase':'http://dogdiary.bincik.sk/server/api/'
//        //};
//        //
//        //dataFactory.getAll = function () {
//        //    return $http.get(this.urlBase);
//        //};
//        //
//        //dataFactory.get = function (id) {
//        //    return $http.get(this.urlBase + '/' + id);
//        //};
//        //
//        //dataFactory.insert = function (food) {
//        //    return $http.post(this.urlBase, JSON.stringify(food));
//        //};
//        //
//        //dataFactory.update = function (cust) {
//        //    return $http.put(this.urlBase + '/' + cust.ID, cust)
//        //};
//        //
//        //dataFactory.delete = function (id) {
//        //    return $http.delete(this.urlBase + '/' + id);
//        //};
//        //
//        //return dataFactory;
//    }]);

///* use strict */
//app.factory('songFactory', ['$firebaseObject', function ($firebaseObject) {
//    // create a new service based on $firebaseObject
//    var Song = $firebaseObject.$extend({
//        // these methods exist on the prototype, so we can access the data using `this`
//        //getFullName: function () {
//        //    return this.name + " " + this.name;
//        //}
//    });
//
//    return function (songId) {
//        var ref = firebase.child(songId);
//        return new Song(ref);
//    }
//}
//]);
//app.factory("SongFactory", function ($firebaseObject) {
//    return $firebaseObject.$extend({});
//});

//
//app.factory("SongF", '$firebaseObject','fbURL', function ( $firebaseObject, fbURL) {
//    return new Firebase(fbURL + "/songs/");
//    //return function (songId) {
//    //    return new $firebaseObject(ref.child(songId));
//    //}
//});


app.factory("Song", ["$firebaseObject", 'fbURL',
    function ($firebaseObject, fbURL) {
        // create a new service based on $firebaseObject
        var Song = $firebaseObject.$extend({});

        return function (songId) {
            var ref = new Firebase(fbURL + '/songs/').child(songId);

            // create an instance of User (the new operator is required)
            return new Song(ref);
        }
    }
]);

///* use strict */
//app.factory('songsFactory', ['$firebaseObject', function ($firebaseObject) {
//    // create a new service based on $firebaseObject
//    var Songs = $firebaseArray.$extend({
//        // these methods exist on the prototype, so we can access the data using `this`
//        //getFullName: function () {
//        //    return this.name + " " + this.name;
//        //}
//    });
//
//    return function () {
//        var ref = firebase.child(songId);
//        return new Songs(ref);
//    }
//}
//]);

/* use strict */
app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: "MainCtrl"
    })
        .when('/editRound/:show', {
            templateUrl: 'partials/home.html',
            controller: "MainCtrl"
        })
        .when('/round:round', {
            templateUrl: 'partials/home.html',
            controller: "MainCtrl"
        })
        .when('/addSong', {
            templateUrl: 'partials/addSong.html',
            controller: "AddSongCtrl"
        })
        .when('/play', {
            templateUrl: 'partials/play.html',
            controller: "PlayCtrl"
        })
        .when('/editSong/:id', {
            templateUrl: 'partials/editSong.html',
            controller: "EditSongCtrl"
        })
        .otherwise({
            template: '<h1>404</h1>'
        })
});

/* use strict */
app.service('firebaseService', [function () {
    var service = this;

    service.dateToYMD = function (date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    };

    service.getDayRange = function (day) {
        var labels = [];

        for (var i = 0; i < day; i++) {
            var dateObj = new Date();
            dateObj.setDate(dateObj.getDate() - i);
            labels.push(service.dateToYMD(dateObj));
        }

        return labels;
    };

    service.setDataWithDate = function (data) {
        angular.forEach(data, function (value) {
            var date = value.datetime.date;
            if (date !== undefined) {
                value.datetime.date = date.split(" ")[0];
            }
        });
    };

    service.getMapValuesToDate = function (data, attributes) {
        var dataMapping = {};

        angular.forEach(data, function (value) {
            var date = value.datetime.date;
            if (dataMapping[date] === undefined) {
                dataMapping[date] = {};
                angular.forEach(attributes, function (attribute) {
                    dataMapping[date][attribute] = value[attribute];
                });
            } else {
                angular.forEach(attributes, function (attribute) {
                    dataMapping[date][attribute] += value[attribute];
                });
            }
        });

        return dataMapping;
    };

    service.setValuesToChart = function (dataMapping, attributes, labels, data) {
        for (var i = 0; i < labels.length; i++) {
            if (typeof dataMapping[labels[i]] === 'undefined') {
                angular.forEach(attributes, function (attribute, key) {
                    data[key].push(0);
                });
            } else {
                angular.forEach(attributes, function (attribute, key) {
                    data[key].push(dataMapping[labels[i]][attribute]);
                });
            }
        }
    };

    service.getDataForChart = function (data, attributes) {
        //set date to usable format
        service.setDataWithDate(data);

        //map values to date
        return service.getMapValuesToDate(data, attributes);
    };

}]);