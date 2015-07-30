/* use strict */
app.controller('PlayCtrl', [
    '$scope',
    '$location',
    'Song',
    '$firebaseArray',
    '$firebaseObject',
    '$location',
    '$routeParams',
    'fbURL',
    '$sce',
    function ($scope, $location, Song, $firebaseArray, $firebaseObject, $location, $routeParams, fbURL, $sce) {


        var configRef = new Firebase(fbURL + 'config/');
        $scope.config = $firebaseObject(configRef);

        var playlistRef = new Firebase(fbURL + 'playlist/');

        $scope.config.$loaded().then(function () {
            if (typeof $scope.config.round == 'undefined')
                $scope.config.round = 1;

            if (typeof $scope.config.playlistIndex == 'undefined')
                $scope.config.playlistIndex = 0;

            $scope.config.$save();

            var ref = playlistRef.orderByChild("round")
                .equalTo($scope.config.round);

            var t = $firebaseArray(ref);

            t.$loaded().then(function (data) {
                if(typeof data[$scope.config.playlistIndex] == 'undefined'){
                    $scope.config.playlistIndex = 0;
                }

                var loadSong = function(){
                    Song(data[$scope.config.playlistIndex].songId).$loaded().then(function(data){
                        $scope.song = data;
                        $scope.song.lyrics = $sce.trustAsHtml($scope.song.lyrics);
                    });
                };


                $scope.nextSong= function(){
                    if(typeof data[$scope.config.playlistIndex+1] != 'undefined'){
                        $scope.config.playlistIndex++;
                        $scope.config.$save();
                        loadSong();
                    }
                };

                $scope.prevSong= function(){
                    var tmp = $scope.config.playlistIndex-1;
                    if(tmp>=0 && typeof data[tmp] != 'undefined'){
                        $scope.config.playlistIndex--;
                        $scope.config.$save();
                        loadSong();
                    }
                }
            });
        });



    }]);