'use strict';

/* Controllers */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.directive('cesiumDirective', function($interval){
    return {
        restrict: "EA",
        controllerAs: "cesiumCtrl",
        scope: {
            data: "="
        },
        controller: function($scope){

        },
        link: function(scope, element, attr, ctrl){

            ctrl.cesium = new Cesium.Viewer(element[0], {
                fullscreenButton: false,
                navigationInstructionsInitiallyVisible: true,
                homeButton: false,
                sceneModePicker: true,
                timeline: false,
                animation: false
            });

            //Grand Island, Nebraska in radiansf
            var startingLocation = {
                centerLong: (7.690430 * Math.PI / 180),
                centerLat: (48.864715 * Math.PI / 180)
            };

            ctrl.cesium.camera.flyTo({
                destination: new Cesium.Cartesian3.fromDegrees(startingLocation.centerLong * 180/Math.PI, startingLocation.centerLat * 180/Math.PI, 5000000)
            });

            
            var parentScope = scope.$parent;
            parentScope.child = scope;

            parentScope.addMarkers();
        }
    };
});

phonecatControllers.controller('CastleListCtrl', ['$scope', 'Phone', 'ngDialog',
  function($scope, Phone, ngDialog) {
      $scope.child = {}     // declare it in parent controller (scope)
          
      $scope.locale = {           
              "en" : {
                  "loadingMessage" : "... loading all castles with an English Wikipedia article ...",
                  "showingEng1" : "Showing",
                  "showingEng2" : "out of",
                  "showingEng3" : "castles",
                  "View" : "View",
                  "MapTooltip" : "Click on a castle icon to open the related Wikipedia article"
          },
              "de" : {
                  "loadingMessage" : "... alle Burgen mit deutschen Wikipedia Artikeln werden geladen ...",
                  "showingEng1" : "Angezeigt werden",
                  "showingEng2" : "von",
                  "showingEng3" : "Burgen",
                  "View" : "Ansicht",
                  "MapTooltip" : "Klicken Sie auf ein Burg-Symbol um den Wikipedia Artikel zu öffnen"
          },
              "fr" : {
                  "loadingMessage" : "... tous les châteaux avec un article Wikipedia anglais sont chargés ...",
                  "showingEng1" : "Affichage",
                  "showingEng2" : "sur",
                  "showingEng3" : "châteaux",
                  "View" : "Vue",
                  "MapTooltip" : "Cliquez sur l'icône du château pour ouvrir l'article de Wikipedia liés"
          },
              "el" : {
                  "loadingMessage" : "... όλα τα κάστρα με το άρθρο αγγλική Wikipedia είναι φορτωμένο ...",
                  "showingEng1" : "εμφανίζοντας",
                  "showingEng2" : "από",
                  "showingEng3" : "κάστρα",
                  "View" : "Θέα",
                  "MapTooltip" : "Κάντε κλικ σε ένα εικονίδιο για την αναζήτηση Wikipedia"
          },
              "es" : {
                  "loadingMessage" : "... todos los castillos con un artículo de Wikipedia Inglés se están cargando ...",
                  "showingEng1" : "Mostrando",
                  "showingEng2" : "de",
                  "showingEng3" : "castillos",
                  "View" : "Vista",
                  "MapTooltip" : "clic en un icono para consultar artículo de Wikipedia"
          },
              "ja" : {
                  "loadingMessage" : "... 英語版ウィキペディアの記事とのすべての城がロードされています ...",
                  "showingEng1" : "を表示",
                  "showingEng2" : "城のうち",
                  "showingEng3" : "",
                  "View" : "ビュー",
                  "MapTooltip" : "ウィキペディアを照会するには、アイコンをクリックし"
          },
              "ru" : {
                  "loadingMessage" : "... все замки со статьей английской Википедии загружаются ...",
                  "showingEng1" : "Показаны",
                  "showingEng2" : "из",
                  "showingEng3" : "замков",
                  "View" : "вид",
                  "MapTooltip" : "Нажмите на иконку , чтобы увидеть статью в Википедии"
          }          
      }

      var wikiLanguage = (getParameterByName("lng") === null) ? "en" : getParameterByName("lng");
      $scope.current = {
          "wikiId" : (wikiLanguage === null) ? "en" : wikiLanguage,
          "loadingMessage" : $scope.locale[wikiLanguage]["loadingMessage"],
          "showingEng1" : $scope.locale[wikiLanguage]["showingEng1"],
          "showingEng2" : $scope.locale[wikiLanguage]["showingEng2"],
          "showingEng3" : $scope.locale[wikiLanguage]["showingEng3"],
          "View" : $scope.locale[wikiLanguage]["View"],
          "MapTooltip" : $scope.locale[wikiLanguage]["MapTooltip"]
      };

      console.debug("#"+wikiLanguage+"Btn")
      $("#"+wikiLanguage+"Btn").addClass("activeLanguage")

      $scope.changeLanguage = function (lngId) {
          var curr_page = window.location.href,
              next_page = "";
          
          if (lngId !== $scope.current.wikiId){
              $("#loading").removeClass("fadingOut").addClass("fadingIn");
              setTimeout(function (){
                  $scope.setCesiumActive(false);
                  if(curr_page.indexOf("?") > -1) {
                      curr_page = curr_page.substring(0,curr_page.indexOf("?"));
                  }
                      next_page = curr_page+"?lng="+lngId;
                  $("#loading").find("p").html($scope.locale[lngId]["loadingMessage"])
                  
                  window.location.replace(next_page);
                  $("#loading").find("p").css("display","block");
                  
              }, 1000)
          }
          
      }
      
      $scope.setCesiumActive = function (isActive) {
          if(isActive){
              $scope.cesiumActive = true;
              $(".cesiumContainer").css("display","block");
              $(".cesiumContainer").css("top","60px");
              $(".fa-map").css("opacity","1");
              $(".fa-th").css("opacity","0.3");
              $("body").css("overflow-y","hidden");
              $(".navbar").css("padding-right","15px");
              $(".log").css("opacity","0");
              $(".mapTooltip").css("display","block");
              $(".search-filter").css("opacity","0");
          }
          else {
              $scope.cesiumActive = false;
              $(".cesiumContainer").css("display","none");
              $(".fa-map").css("opacity","0.3");
              $(".fa-th").css("opacity","1");
              $("body").css("overflow-y","scroll");
              $(".navbar").css("padding-right","0px");
              $(".log").css("opacity","1");
              $(".mapTooltip").css("display","none");
              $(".search-filter").css("opacity","1");
          }
      }
      $scope.flyTo = function (event) {
          $scope.setCesiumActive(true);
          var latlng = JSON.parse($(event.currentTarget).attr("data-coo"));
          var n = latlng[1];
          console.debug("flyTo",latlng,typeof latlng,n ,parseFloat(latlng[1]), parseFloat(latlng[0]));
          $scope.child.cesiumCtrl.cesium.camera.flyTo({
              destination: new Cesium.Cartesian3.fromDegrees(parseFloat(latlng[1]), parseFloat(latlng[0]), 2500)
          });
      }
      $scope.addMarkers = function () {
          console.debug("inside addMarkers with"+$scope.phones.length+"castles")
          for (var i=0; i< $scope.phones.length; i++){              
              if ($scope.child.cesiumCtrl !== undefined)
                  $scope.child.cesiumCtrl.cesium.entities.add({
                      position: new Cesium.Cartesian3.fromDegrees(parseFloat($scope.phones[i][1][1]), parseFloat($scope.phones[i][1][0]), 50),
                      id: $scope.phones[i][0],
                      name: $scope.phones[i][0],
                      billboard : {
                          image : 'rook.png',
                          width : 32,
                          height : 32
                      },
                      description: '<iframe style="padding: 10px; width: calc(100% - 15px); opacity: 0.9; height: calc(100% - 60px); background: white;" class="wikiframe" src="http://'+ $scope.current.wikiId +'.wikipedia.org/wiki/'+$scope.phones[i][0]+'?printable=yes"  frameborder="0">                      <p>Your browser does not support iframes.</p>              </iframe>'
                  });

              
          }
      }
      
      $scope.open = function (event) {          
          $scope.currImage = $($(event.currentTarget).find("img")).attr("data-fullurl");
          if ($scope.currImage !== "")
            ngDialog.open({ template: 'firstDialogId' , scope: $scope});
      };
      $scope.openWiki = function (event) {
          $scope.currURL = $(event.currentTarget).attr("data-wikiURL");
          console.debug($scope.currURL);
          ngDialog.open({ template: 'wikiDialogId' , scope: $scope});
      }
      $scope.initialLoad = false;
      $scope.cesiumActive = false;
      $scope.currImage = "";
      $scope.currURL = "";
      console.debug(" language id ", $scope.current.wikiId)
      $scope.phones = Phone($scope.current.wikiId).query();
      $scope.castleAmount = 0;

      $scope.lookAdv = function (obj) {
          console.debug("inside lookAdv(query) with",obj)
          obj = obj.toUpperCase();
          var added = 0;
          for(var i = 0; i < $scope.phones.length; i++) {
              if ($scope.phones[i][0].toUpperCase().indexOf(obj) !== -1){
                  if ($scope.images.indexOf($scope.phones[i]) == -1){
                      console.debug("found and added",$scope.phones[i][0])
                      $scope.images.push($scope.phones[i]);
                      added++;
                      if (added === 10) {
                          break;
                      }
                  }
                  else{

                      console.debug("!added",$scope.phones[i][0])
                  }
              }
          }
          
      };
      
      $scope.phones.$promise.then(function(phones){
          $scope.castleAmount = phones.length;
          console.debug("castles full", phones)
          for (var i=0; i< phones.length; i++){
              
              if (phones[i][2] === null || phones[i][3] === null || phones[i][3].indexOf("…") !== -1 ){
                  phones[i][2] = "rook3.png";
              }
              else if (phones[i][2].indexOf("…") !== -1){
                  phones[i][2] = phones[i][3];
              }             
          }
          $scope.phones = phones;

          $scope.images = [];
          for(var i = 1; i <= 40; i++) {
              $scope.images.push($scope.phones[i]);
          }
          if (!$scope.initialLoad){
              $scope.initialLoad=true;
              $scope.addMarkers();
          }

          setTimeout(function(){
              $(".cesiumContainer").css("display","none");
              $("#loading").addClass("fadingOut");
              $("#loading").find("p").css("display","none");
          }, 1000);
          
      });

      $scope.loadMore = function() {
          var last = $scope.images.length+1;
          
          for(var i = last; i < last+8; i++) {
              if ($scope.images.indexOf($scope.phones[i]) == -1){
                  $scope.images.push($scope.phones[i]);                   
              }
          }
      };
      
      $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({wikiId: $routeParams.wikiId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
