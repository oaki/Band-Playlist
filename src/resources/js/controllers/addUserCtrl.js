/* use strict */
app.controller('AddUserCtrl', [
    '$scope',
    '$firebaseArray',
    '$location',
    'fbURL',
    function ($scope, $firebaseArray, $location, fbURL) {
        var ref = new Firebase(fbURL);
        ref.createUser({
            email    : "pavolbincik@gmail.com",
            password : "palosralo"
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });
    }]);