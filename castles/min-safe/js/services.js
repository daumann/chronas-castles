'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',  function($resource){
    return function(wikiLanguage){
        return $resource('wikidata/:wikiId.json', {}, {
          query: { 
              method :'GET', 
              params : {wikiId: 'castles_'+wikiLanguage },
              isArray : true
          }
        });
    }
  }]);
// 'castles_'+$scope.current.wikiId Z