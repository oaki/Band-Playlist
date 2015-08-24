/* use strict */
app.service('authService', ['fbURL', '$q',
    function (fbURL, $q) {
        var service = this;
        var ref = new Firebase(fbURL);
        service.isLoggedIn = function () {
            return (ref.getAuth()) ? true : false;
        };

        var deferredAuth = $q.defer();
        service.login = function (email, password) {
            ref.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    alert("Login Failed!", error);
                    deferredAuth.resolve(false);
                } else {
                    deferredAuth.resolve(authData);
                }
            });

            return deferredAuth.promise;
        };
        service.logout = function () {
            ref.unauth();
        };

        return service;

    }]);