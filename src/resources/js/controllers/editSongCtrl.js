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