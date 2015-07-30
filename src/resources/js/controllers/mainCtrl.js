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