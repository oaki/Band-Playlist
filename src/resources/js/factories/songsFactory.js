///* use strict */
//app.factory('songsFactory', ['$firebaseObject', function ($firebaseObject) {
//    // create a new service based on $firebaseObject
//    var Songs = $firebaseArray.$extend({
//        // these methods exist on the prototype, so we can access the data using `this`
//        //getFullName: function () {
//        //    return this.name + " " + this.name;
//        //}
//    });
//
//    return function () {
//        var ref = firebase.child(songId);
//        return new Songs(ref);
//    }
//}
//]);