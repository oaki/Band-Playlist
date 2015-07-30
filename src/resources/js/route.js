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
        .otherwise({
            template: '<h1>404</h1>'
        })
});