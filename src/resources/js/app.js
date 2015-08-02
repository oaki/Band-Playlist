/* use strict */
var firebase = new Firebase('https://scorching-inferno-4935.firebaseio.com/');

var app = angular.module('BandPlaylist',
    [
        'firebase',
        //'ngDraggable',
        'wysiwyg.module','colorpicker.module',
        'ngRoute',
        'ngFileUpload',
        'pascalprecht.translate',
        'ui.sortable'
    ]);