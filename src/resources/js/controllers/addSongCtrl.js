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