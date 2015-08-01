/* use strict */
app.controller('MainCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    'Song',
    '$filter',
    'playlistService',

    function ($scope, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL, Song, $filter, playlistService) {
        var songsRef = new Firebase(fbURL + 'songs/');
        var roundRef = new Firebase(fbURL + 'playlist/');

        $scope.rounds = [1, 2, 3, 4, 5, 6, 7];
        $scope.showRound = false;

        $scope.songs = $firebaseArray(songsRef);

        $scope.addToPlaylist = function (data) {
            playlistService.addSong(data,$scope.activeRound);
            $scope.loadPlaylist();
        };

        $scope.repairPossition = function (round) {
            playlistService.repairPossition(round);
            $scope.loadPlaylist();
        };

        $scope.rounds = [1, 2, 3, 4, 5, 6, 7];
        $scope.showRound = false;

        if (typeof $routeParams.round !== 'undefined') {
            $scope.showRound = true;
            $scope.activeRound = $routeParams.round;

            $scope.loadPlaylist = function(){
                playlistService.getSongsByRound($scope.activeRound).then(function(list){
                    $scope.roundsongs = list;
                });
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
            containment: '#sortable-container',
            orderChanged: function (event) {
                console.log(event);
                $scope.repairPossition($scope.activeRound)
            },
        };

    }]);