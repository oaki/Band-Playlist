/* use strict */
app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: "MainCtrl"
    })
        .when('/editRound/:show', {
            templateUrl: 'partials/home.html',
            controller: "MainCtrl"
        })
        .when('/round:round', {
            templateUrl: 'partials/home.html',
            controller: "MainCtrl"
        })
        .when('/addSong', {
            templateUrl: 'partials/addSong.html',
            controller: "AddSongCtrl"
        })
        .when('/play', {
            templateUrl: 'partials/play.html',
            controller: "PlayCtrl"
        })
        .when('/editSong/:id', {
            templateUrl: 'partials/editSong.html',
            controller: "EditSongCtrl"
        })
        .when('/addUser', {
            templateUrl: 'partials/addUser.html',
            controller: "AddUserCtrl"
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: "LoginCtrl"
        })
        .when('/logout', {
            template: '<h1>Logout</h1>',
            controller: "LogoutCtrl"
        })
        .otherwise({
            template: '<h1>404</h1>'
        })
});