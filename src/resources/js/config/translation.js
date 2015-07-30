app.config(['$translateProvider', function ($translateProvider) {
    var translations = {
        'Add food': 'Add food',
        'INTRO_TEXT': 'And it has i18n support!'
    };
    $translateProvider.translations('en', translations);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');


}]);