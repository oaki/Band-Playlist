    describe('Testing MainCtrl', function() {
        var scope;
        var ctrl;

        beforeEach(function() {
            var mockFoodDataFactory = {};
            var mockPoopDataFactory = {};

            module('BandPlaylist', function($provide) {
                $provide.value('foodDataFactory', mockFoodDataFactory);
                $provide.value('poopDataFactory', mockPoopDataFactory);
            });

            inject(function($q) {
                mockFoodDataFactory.data = [
                    {"data":{"foods":[{"id":17,"name":"Sssssss","datetime":{"date":"2017-06-18 15:56:02","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":0},{"id":11,"name":"palorwear","datetime":{"date":"2015-06-25 15:49:09","timezone_type":3,"timezone":"Europe/Prague"},"weight":74,"dufalact":2},{"id":22,"name":"Granule","datetime":{"date":"2015-06-21 06:26:48","timezone_type":3,"timezone":"Europe/Prague"},"weight":180,"dufalact":5},{"id":21,"name":"granule","datetime":{"date":"2015-06-20 20:54:03","timezone_type":3,"timezone":"Europe/Prague"},"weight":40,"dufalact":5},{"id":6,"name":"Granula","datetime":{"date":"2015-06-19 22:00:00","timezone_type":3,"timezone":"Europe/Prague"},"weight":131,"dufalact":4},{"id":20,"name":"1","datetime":{"date":"2015-06-19 09:14:14","timezone_type":3,"timezone":"Europe/Prague"},"weight":500,"dufalact":5},{"id":4,"name":"s","datetime":{"date":"2015-06-18 22:00:00","timezone_type":3,"timezone":"Europe/Prague"},"weight":1,"dufalact":1},{"id":19,"name":"","datetime":{"date":"2015-06-18 18:48:06","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":2},{"id":18,"name":"","datetime":{"date":"2015-06-18 15:56:07","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":3},{"id":16,"name":"Test","datetime":{"date":"2015-06-18 15:55:42","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":0},{"id":14,"name":"Dddd","datetime":{"date":"2015-06-18 15:55:25","timezone_type":3,"timezone":"Europe/Prague"},"weight":120,"dufalact":0},{"id":15,"name":"Poooooo","datetime":{"date":"2015-06-18 15:54:33","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":0},{"id":13,"name":"Jrhrhe","datetime":{"date":"2015-06-18 15:54:23","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":0},{"id":12,"name":"","datetime":{"date":"2015-06-18 15:54:05","timezone_type":3,"timezone":"Europe/Prague"},"weight":373,"dufalact":8},{"id":10,"name":"","datetime":{"date":"2015-06-17 15:01:13","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":0},{"id":9,"name":"","datetime":{"date":"2015-06-17 15:01:13","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":0},{"id":8,"name":"","datetime":{"date":"2015-06-17 15:01:13","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":0},{"id":7,"name":"","datetime":{"date":"2015-06-17 15:01:06","timezone_type":3,"timezone":"Europe/Prague"},"weight":0,"dufalact":2},{"id":1,"name":"Granule","datetime":{"date":"2015-06-16 12:32:00","timezone_type":3,"timezone":"Europe/Prague"},"weight":40,"dufalact":4},{"id":3,"name":"lala","datetime":{"date":"2015-06-15 22:00:00","timezone_type":3,"timezone":"Europe/Prague"},"weight":8,"dufalact":8},{"id":2,"name":"d","datetime":{"date":"2015-06-15 22:00:00","timezone_type":3,"timezone":"Europe/Prague"},"weight":1,"dufalact":1},{"id":5,"name":"2","datetime":"0000-00-00 00:00:00","weight":289,"dufalact":1}]}}
                ];

                mockPoopDataFactory.data = [
                    {"data":{"poops":[{"id":16,"consistency":4,"size":5,"datetime":{"date":"2015-06-21 08:30:00","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":27},{"id":15,"consistency":5,"size":5,"datetime":{"date":"2015-06-21 06:26:16","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":26},{"id":14,"consistency":2,"size":3,"datetime":{"date":"2015-06-20 20:53:41","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":25},{"id":10,"consistency":5,"size":5,"datetime":{"date":"2015-06-20 20:42:44","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":23},{"id":9,"consistency":5,"size":5,"datetime":{"date":"2015-06-20 19:44:41","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":22},{"id":8,"consistency":5,"size":5,"datetime":{"date":"2015-06-20 19:30:33","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":21},{"id":7,"consistency":5,"size":5,"datetime":{"date":"2015-06-20 19:23:34","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":20},{"id":6,"consistency":5,"size":5,"datetime":{"date":"2015-06-20 19:20:56","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1462108597","longitude":"17.1066866889","fileId":18},{"id":5,"consistency":5,"size":5,"datetime":{"date":"2015-06-20 19:19:11","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":17},{"id":4,"consistency":3,"size":5,"datetime":{"date":"2015-06-20 19:14:34","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"","longitude":"","fileId":0},{"id":11,"consistency":5,"size":5,"datetime":{"date":"2015-06-19 20:00:00","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":0},{"id":3,"consistency":7,"size":8,"datetime":{"date":"2015-06-19 10:41:30","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"","longitude":"","fileId":0},{"id":2,"consistency":4,"size":5,"datetime":{"date":"2015-06-17 15:00:59","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"","longitude":"","fileId":0},{"id":1,"consistency":0,"size":0,"datetime":{"date":"2015-06-17 14:57:39","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"","longitude":"","fileId":0},{"id":12,"consistency":5,"size":5,"datetime":{"date":"2015-06-14 07:45:00","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":24},{"id":13,"consistency":5,"size":5,"datetime":{"date":"2015-06-02 03:25:00","timezone_type":3,"timezone":"Europe/Prague"},"latitude":"48.1458923","longitude":"17.1071373","fileId":0}]}}
                ];

                mockFoodDataFactory.getAll = function() {
                    var defer = $q.defer();

                    defer.resolve(this.data[0]);

                    return defer.promise;
                };

                mockPoopDataFactory.getAll = function() {
                    var defer = $q.defer();

                    defer.resolve(this.data[0]);

                    return defer.promise;
                };

            });
        });

        beforeEach(inject(function($controller, $rootScope, chartService) {
            scope = $rootScope.$new();

            spyOn(chartService, "getDayRange").and.callFake(function() {
                return ['2015-06-21', '2015-06-20', '2015-06-19', '2015-06-18', '2015-06-17'];
            });

            ctrl = $controller('MainCtrl', {$scope: scope});

            scope.$digest();
        }));

        it('data for chart are correct', function() {
            ctrl.createChart();
            expect(JSON.stringify(scope.data)).toEqual("[[180,40,631,494,0],[5,5,9,14,2],[10,38,13,0,5]]");
        });

    });