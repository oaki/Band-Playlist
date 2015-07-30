///* use strict */
//app.factory('songFactory', ['$firebaseObject', function ($firebaseObject) {
//    // create a new service based on $firebaseObject
//    var Song = $firebaseObject.$extend({
//        // these methods exist on the prototype, so we can access the data using `this`
//        //getFullName: function () {
//        //    return this.name + " " + this.name;
//        //}
//    });
//
//    return function (songId) {
//        var ref = firebase.child(songId);
//        return new Song(ref);
//    }
//}
//]);
//app.factory("SongFactory", function ($firebaseObject) {
//    return $firebaseObject.$extend({});
//});

//
//app.factory("SongF", '$firebaseObject','fbURL', function ( $firebaseObject, fbURL) {
//    return new Firebase(fbURL + "/songs/");
//    //return function (songId) {
//    //    return new $firebaseObject(ref.child(songId));
//    //}
//});


app.factory("Song", ["$firebaseObject", 'fbURL',
    function ($firebaseObject, fbURL) {
        // create a new service based on $firebaseObject
        var Song = $firebaseObject.$extend({});

        return function (songId) {
            var ref = new Firebase(fbURL + '/songs/').child(songId);

            // create an instance of User (the new operator is required)
            return new Song(ref);
        }
    }
]);
