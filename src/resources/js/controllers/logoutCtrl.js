/* use strict */
app.controller('LogoutCtrl', [
    '$scope', 'authService', '$location',

    function ($scope, authService, $location) {
        authService.logout();
        $location.path('/');

    }]);