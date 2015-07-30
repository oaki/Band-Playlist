///* use strict */
//app.factory('dataFactory', ['$firebaseObject', function ($firebaseObject) {
//
//    return $firebaseObject.$extend({
//        /**
//         * Called each time there is an update from the server
//         * to update our Book data
//         */
//        $$updated: function (snap) {
//            // call the super
//            var changed = $firebaseObject.prototype
//                .$$updated.apply(this, arguments);
//            // manipulate the date
//            if( changed ) {
//                this.date = new Date(this.date||0);
//            }
//            // inform the sync manager that it changed
//            return changed;
//        },
//
//        /**
//         * Used when our book is saved back to the server
//         * to convert our dates back to JSON
//         */
//        toJSON: function() {
//            return angular.extend({}, this, {
//                // revert Date objects to json data
//                date: this.date? this.date.getTime() : null
//            });
//        }});
//        //var dataFactory = {
//        //    'urlBase':'http://dogdiary.bincik.sk/server/api/'
//        //};
//        //
//        //dataFactory.getAll = function () {
//        //    return $http.get(this.urlBase);
//        //};
//        //
//        //dataFactory.get = function (id) {
//        //    return $http.get(this.urlBase + '/' + id);
//        //};
//        //
//        //dataFactory.insert = function (food) {
//        //    return $http.post(this.urlBase, JSON.stringify(food));
//        //};
//        //
//        //dataFactory.update = function (cust) {
//        //    return $http.put(this.urlBase + '/' + cust.ID, cust)
//        //};
//        //
//        //dataFactory.delete = function (id) {
//        //    return $http.delete(this.urlBase + '/' + id);
//        //};
//        //
//        //return dataFactory;
//    }]);