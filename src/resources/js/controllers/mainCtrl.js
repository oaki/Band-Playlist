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

        $(".navbar-fixed-top").fadeIn();
        $('body').animate({'padding-top':'50px'});

        $scope.rounds = [1, 2, 3, 4, 5, 6, 7];
        $scope.showRound = false;
        

        $scope.songs = $firebaseArray(songsRef);

        $scope.songsAssocByKey = {};

        $scope.songs.$loaded().then(function(results){
            angular.forEach(results, function(value, index){
                $scope.songsAssocByKey[value.$id] = value;
            })
        });

        $scope.addToPlaylist = function (data) {
            playlistService.addSong(data,$scope.activeRound);
            $scope.loadPlaylist();
        };

        $scope.repairPossition = function (round) {
            var counter = 0;
            angular.forEach($scope.roundsongs, function(value, index){
                counter++;
                $scope.roundsongs[index]['position'] = counter;
                $scope.roundsongs.$save(index);
            });
        };

        $scope.rounds = [1, 2, 3, 4, 5, 6, 7];
        $scope.showRound = false;

        if (typeof $routeParams.round !== 'undefined') {
            $scope.showRound = true;
            $scope.activeRound = $routeParams.round;

            $scope.loadPlaylist = function(){
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
            stop: function(e, ui) {
                $scope.repairPossition()
            },
            handle: '.ui-sortable-item-handle'
        };

    }]);