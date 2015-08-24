/* use strict */
app.controller('LoginCtrl', [
    '$scope','$location','authService',

    function ($scope, $location, authService) {

        $scope.login = function () {

            authService.login($scope.email,$scope.password).then(function(result){
                if (result) {
                    $location.path('/');
                }
            });
        };

    }]);