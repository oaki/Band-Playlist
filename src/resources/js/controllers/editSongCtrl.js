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