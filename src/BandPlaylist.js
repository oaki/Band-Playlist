/* use strict */

var app = angular.module('BandPlaylist',
    [
        'firebase',
        //'ngDraggable',
        'wysiwyg.module','colorpicker.module',
        'ngRoute',
        'ngFileUpload',
        'pascalprecht.translate',
        'ui.sortable'
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
app.value('rounds', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

/* use strict */
app.controller('AddSongCtrl', [
    '$scope',
    '$firebaseArray',
    '$location',
    'fbURL',
    'authService',
    function ($scope, $firebaseArray, $location, fbURL, authService) {

        if (!authService.isLoggedIn()) {
            $location.path('/login');
        }

        var songsRef = new Firebase(fbURL + 'songs/');

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
app.controller('AddUserCtrl', [
    '$scope',
    '$firebaseArray',
    '$location',
    'fbURL',
    function ($scope, $firebaseArray, $location, fbURL) {
        var ref = new Firebase(fbURL);
        ref.createUser({
            email    : "pavolbincik@gmail.com",
            password : "palosralo"
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });
    }]);

/* use strict */
app.controller('EditSongCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    'authService',
    function ($scope, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL, authService) {

        if (!authService.isLoggedIn()) {
            $location.path('/login');
        }

        var songsRef = new Firebase(fbURL + 'songs/' + $routeParams.id);

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
app.controller('LoginCtrl', [
    '$scope','$location','authService',

    function ($scope, $location, authService) {

        $scope.login = function () {

            authService.login($scope.email,$scope.password).then(function(result){
                if (result) {
                    $location.path('/');
                }
            });
        };

    }]);

/* use strict */
app.controller('LogoutCtrl', [
    '$scope', 'authService', '$location',

    function ($scope, authService, $location) {
        authService.logout();
        $location.path('/');

    }]);

/* use strict */
app.controller('MainCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    'rounds',
    'Song',
    '$filter',
    'playlistService',
    'authService',

    function ($scope, $firebaseArray, $firebaseObject, $location,
              $routeParams, fbURL, rounds, Song, $filter, playlistService, authService) {

        if (!authService.isLoggedIn()) {
            $location.path('/play');
        }

        var songsRef = new Firebase(fbURL + 'songs/');
        var roundRef = new Firebase(fbURL + 'playlist/');

        $(".navbar-fixed-top").fadeIn();
        $('body').animate({'padding-top': '50px'});

        $scope.rounds = rounds;
        $scope.showRound = false;

        $scope.songs = $firebaseArray(songsRef);

        $scope.songsAssocByKey = {};

        $scope.songs.$loaded().then(function (results) {
            angular.forEach(results, function (value, index) {
                $scope.songsAssocByKey[value.$id] = value;
            })
        });

        $scope.addToPlaylist = function (data) {
            playlistService.addSong(data, $scope.activeRound);
            $scope.loadPlaylist();
        };

        $scope.repairPossition = function (round) {
            var counter = 0;
            angular.forEach($scope.roundsongs, function (value, index) {
                counter++;
                $scope.roundsongs[index]['position'] = counter;
                $scope.roundsongs.$save(index);
            });
        };

        if (typeof $routeParams.round !== 'undefined') {
            $scope.showRound = true;
            $scope.activeRound = $routeParams.round;

            $scope.loadPlaylist = function () {
                var roundQuery = roundRef.child($scope.activeRound).orderByChild('position');
                $scope.roundsongs = $firebaseArray(roundQuery);
            };

            $scope.loadPlaylist();

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
                var ref = new Firebase(fbURL + '/playlist/').child($scope.activeRound).child(id);
                ref.remove(function (error) {
                    $scope.repairPossition($scope.activeRound);
                });
            }
        };
        $scope.sortableOptions = {
            stop: function (e, ui) {
                $scope.repairPossition()
            },
            handle: '.ui-sortable-item-handle'
        };

    }]);

/* use strict */
app.controller('PlayCtrl', [
    '$scope',
    'Song',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    '$sce',
    'playlistService',
    'playService',
    'authService',
    function ($scope, Song, $firebaseArray, $firebaseObject, $location,
              $routeParams, fbURL, $sce, playlistService, playService, authService) {


        var configRef = new Firebase(fbURL + 'config/');
        $scope.config = $firebaseObject(configRef);
        $scope.isLoggedIn = authService.isLoggedIn();


        $(".navbar-fixed-top").fadeOut();
        $('body').animate({'padding-top':'10px'});

        playService.setConfig($scope.config);

        $scope.config.$watch(function(){
            playService.getSong().then(function (song) {
                $scope.song = song;
            });
        });

        $scope.nextSong = function () {
            playService.nextSong();
        };

        $scope.prevSong = function () {
            playService.prevSong();
        };

        $scope.firstSong = function () {
            playService.firstSong();
        };


    }]);

app.factory("PlaylistFactory", ["$firebaseArray", 'fbURL',
    function ($firebaseArray, fbURL) {
        var Playlist = $firebaseArray.$extend({});

        return function () {
            var ref = new Firebase(fbURL + '/playlist/');
            return new Playlist(ref);
        }
    }
]);


app.factory("Song", ["$firebaseObject", 'fbURL',
    function ($firebaseObject, fbURL) {
        var Song = $firebaseObject.$extend({});

        return function (songId) {
            var ref = new Firebase(fbURL + '/songs/').child(songId);
            return new Song(ref);
        }
    }
]);


app.filter('rawHtml', ['$sce', function($sce){
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);

/* use strict */
app.service('playlistService', ['$filter', 'Song', 'fbURL', 'rounds', '$firebaseArray', '$firebaseObject', '$q',
    function ($filter, Song, fbURL, rounds, $firebaseArray, $firebaseObject, $q) {
        var service = this;

        var playlistRef = new Firebase(fbURL + 'playlist/');
        var ref = playlistRef.orderByChild("position");

        service.rounds = rounds;
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

        service.getSongsByRoundHmmm = function (round) {
            var deferred = $q.defer();
            var fb = new Firebase(fbURL);

            var norm = new Firebase.util.NormalizedCollection(
                [fb.child('playlist/' + round).orderByChild('position'), "round"],
                [fb.child('songs'), 'song', 'round.songId']
            );

            var ref = norm.select('round.songId', 'round.position', 'song.name').ref();
            ref.once("value", function (snap) {
                deferred.resolve(snap.val());
            });

            return deferred.promise;
        };

        service.getSongsByRound = function (round) {
            var deferred = $q.defer();
            var fb = new Firebase(fbURL);

            var norm = new Firebase.util.NormalizedCollection(
                [fb.child('playlist/' + round).orderByChild('position'), "round"],
                [fb.child('songs'), 'song', 'round.songId']
            );

            var ref = norm.select('round.songId', 'round.position', 'song.name').ref();
            ref.once("value", function (snap) {
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
                    new Firebase(fbURL + 'playlist/').child(round).child(value.$id).update({'position': counter});
                });
            })

        };
        return service;

    }]);

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
        .when('/addUser', {
            templateUrl: 'partials/addUser.html',
            controller: "AddUserCtrl"
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: "LoginCtrl"
        })
        .when('/logout', {
            template: '<h1>Logout</h1>',
            controller: "LogoutCtrl"
        })
        .otherwise({
            template: '<h1>404</h1>'
        })
});

/* use strict */
app.service('authService', ['fbURL', '$q',
    function (fbURL, $q) {
        var service = this;
        var ref = new Firebase(fbURL);
        service.isLoggedIn = function () {
            return (ref.getAuth()) ? true : false;
        };

        var deferredAuth = $q.defer();
        service.login = function (email, password) {
            ref.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    alert("Login Failed!", error);
                    deferredAuth.resolve(false);
                } else {
                    deferredAuth.resolve(authData);
                }
            });

            return deferredAuth.promise;
        };
        service.logout = function () {
            ref.unauth();
        };

        return service;

    }]);

///* use strict */
//app.service('firebaseService', [function () {
//    var service = this;
//
//    service.dateToYMD = function (date) {
//        var d = date.getDate();
//        var m = date.getMonth() + 1;
//        var y = date.getFullYear();
//        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
//    };
//
//    service.getDayRange = function (day) {
//        var labels = [];
//
//        for (var i = 0; i < day; i++) {
//            var dateObj = new Date();
//            dateObj.setDate(dateObj.getDate() - i);
//            labels.push(service.dateToYMD(dateObj));
//        }
//
//        return labels;
//    };
//
//    service.setDataWithDate = function (data) {
//        angular.forEach(data, function (value) {
//            var date = value.datetime.date;
//            if (date !== undefined) {
//                value.datetime.date = date.split(" ")[0];
//            }
//        });
//    };
//
//    service.getMapValuesToDate = function (data, attributes) {
//        var dataMapping = {};
//
//        angular.forEach(data, function (value) {
//            var date = value.datetime.date;
//            if (dataMapping[date] === undefined) {
//                dataMapping[date] = {};
//                angular.forEach(attributes, function (attribute) {
//                    dataMapping[date][attribute] = value[attribute];
//                });
//            } else {
//                angular.forEach(attributes, function (attribute) {
//                    dataMapping[date][attribute] += value[attribute];
//                });
//            }
//        });
//
//        return dataMapping;
//    };
//
//    service.setValuesToChart = function (dataMapping, attributes, labels, data) {
//        for (var i = 0; i < labels.length; i++) {
//            if (typeof dataMapping[labels[i]] === 'undefined') {
//                angular.forEach(attributes, function (attribute, key) {
//                    data[key].push(0);
//                });
//            } else {
//                angular.forEach(attributes, function (attribute, key) {
//                    data[key].push(dataMapping[labels[i]][attribute]);
//                });
//            }
//        }
//    };
//
//    service.getDataForChart = function (data, attributes) {
//        //set date to usable format
//        service.setDataWithDate(data);
//
//        //map values to date
//        return service.getMapValuesToDate(data, attributes);
//    };
//
//}]);

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