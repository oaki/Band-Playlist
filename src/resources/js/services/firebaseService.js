///* use strict */
//app.service('firebaseService', [function () {
//    var service = this;
//
//    service.dateToYMD = function (date) {
//        var d = date.getDate();
//        var m = date.getMonth() + 1;
//        var y = date.getFullYear();
//        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
//    };
//
//    service.getDayRange = function (day) {
//        var labels = [];
//
//        for (var i = 0; i < day; i++) {
//            var dateObj = new Date();
//            dateObj.setDate(dateObj.getDate() - i);
//            labels.push(service.dateToYMD(dateObj));
//        }
//
//        return labels;
//    };
//
//    service.setDataWithDate = function (data) {
//        angular.forEach(data, function (value) {
//            var date = value.datetime.date;
//            if (date !== undefined) {
//                value.datetime.date = date.split(" ")[0];
//            }
//        });
//    };
//
//    service.getMapValuesToDate = function (data, attributes) {
//        var dataMapping = {};
//
//        angular.forEach(data, function (value) {
//            var date = value.datetime.date;
//            if (dataMapping[date] === undefined) {
//                dataMapping[date] = {};
//                angular.forEach(attributes, function (attribute) {
//                    dataMapping[date][attribute] = value[attribute];
//                });
//            } else {
//                angular.forEach(attributes, function (attribute) {
//                    dataMapping[date][attribute] += value[attribute];
//                });
//            }
//        });
//
//        return dataMapping;
//    };
//
//    service.setValuesToChart = function (dataMapping, attributes, labels, data) {
//        for (var i = 0; i < labels.length; i++) {
//            if (typeof dataMapping[labels[i]] === 'undefined') {
//                angular.forEach(attributes, function (attribute, key) {
//                    data[key].push(0);
//                });
//            } else {
//                angular.forEach(attributes, function (attribute, key) {
//                    data[key].push(dataMapping[labels[i]][attribute]);
//                });
//            }
//        }
//    };
//
//    service.getDataForChart = function (data, attributes) {
//        //set date to usable format
//        service.setDataWithDate(data);
//
//        //map values to date
//        return service.getMapValuesToDate(data, attributes);
//    };
//
//}]);