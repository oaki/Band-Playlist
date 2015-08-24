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