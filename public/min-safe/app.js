'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  'infinite-scroll',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'ngDialog'
]);

phonecatApp.config(['$routeProvider','ngDialogProvider','$sceDelegateProvider',
  function($routeProvider,ngDialogProvider,sceDelegateProvider) {
      
      sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          'http://en.wikipedia.org/wiki/**',
          'https://en.wikipedia.org/wiki/**',
          'http://el.wikipedia.org/wiki/**',
          'https://el.wikipedia.org/wiki/**',
          'http://es.wikipedia.org/wiki/**',
          'https://es.wikipedia.org/wiki/**',
          'http://fr.wikipedia.org/wiki/**',
          'https://fr.wikipedia.org/wiki/**',
          'http://de.wikipedia.org/wiki/**',
          'https://de.wikipedia.org/wiki/**',
          'http://ja.wikipedia.org/wiki/**',
          'https://ja.wikipedia.org/wiki/**',
          'http://ru.wikipedia.org/wiki/**',
          'https://ru.wikipedia.org/wiki/**'
      ]);
      
      ngDialogProvider.setDefaults({
          className: 'ngdialog-theme-default'
      });
      
    $routeProvider.
      when('/wikidata', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/wikidata/:wikiId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/wikidata'
      });
  }]);
