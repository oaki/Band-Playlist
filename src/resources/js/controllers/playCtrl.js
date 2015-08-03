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