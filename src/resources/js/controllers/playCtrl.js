/* use strict */
app.controller('PlayCtrl', [
    '$scope',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    function ($scope, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL) {

        var configRef = new Firebase(fbURL + 'config/');
        $scope.config = $firebaseObject(configRef);

        $scope.config.$loaded().then(function () {
            console.log($scope.config);
            if (typeof $scope.config.round == 'undefined') {
                $scope.config.round = 1;
            }

            if (typeof $scope.config.song == 'undefined') {
                $scope.config.song = 1;
            }

            $scope.config.$save();
        });
        var playlistRef = new Firebase(fbURL + 'playlist/');
        // download the data from a Firebase reference into a (pseudo read-only) array
        // all server changes are applied in realtime


        $scope.song = $firebaseObject(playlistRef);

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