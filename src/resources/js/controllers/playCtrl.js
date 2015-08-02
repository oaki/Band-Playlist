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
    function ($scope, Song, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL, $sce, playlistService, playService) {


        var configRef = new Firebase(fbURL + 'config/');
        $scope.config = $firebaseObject(configRef);

        $(".navbar-fixed-top").fadeOut();
        //console.log(nav);

        $scope.config.$loaded().then(function (config) {
            playService.setConfig(config);
            playService.getSong().then(function (song) {
                $scope.song = song;
            });
        });

        $scope.nextSong = function () {
            playService.nextSong();
            playService.getSong().then(function (song) {
                $scope.song = song;
            });
        };

        $scope.prevSong = function () {
            playService.prevSong();
            playService.getSong().then(function (song) {
                $scope.song = song;
            });
        };

        $scope.firstSong = function () {
            playService.firstSong();
        };

    }]);