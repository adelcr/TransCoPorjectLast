angular.module('starter.routes', ['starter.config'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, USER_ROLES) {
  $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.walkthrough', {
    cache: false,
    url: '/walkthrough',
    templateUrl: "views/auth/walkthrough.html"
  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })

  .state('auth.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/auth/forgot-password.html"
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl',
  })

  //MISCELLANEOUS

  .state('app.maps', {
    url: "/miscellaneous/maps",
    cache:false,
    views: {
      'menuContent': {
        cache:false,
        templateUrl: "views/app/miscellaneous/maps.html",
        controller: 'MapCtrl'
      }
    }
  })

  //Station
  .state('app.station', {
    url: "/station",
    cache:false,
    views: {
      'menuContent': {
        cache:false,
        templateUrl: "views/app/gestionnaire_voyage/station.html",
        controller: 'StationCtrl'
        }
    }
  })
  //voyage
  .state('app.voyage', {
    url: "/voyage",
    cache:false,
    views: {
      'menuContent': {
        cache:false,
        templateUrl: "views/app/gestionnaire_voyage/voyage.html",
        controller: 'VoyageCtrl'
        }
    }
  })
  //bus
    .state('app.bus', {
    url: "/bus",
    cache:false,
    views: {
      'menuContent': {
        cache:false,
        templateUrl: "views/app/gestionnaire_voyage/bus.html",
        controller: 'BusCtrl'
        }
    }
  })
  //voyageur
    .state('app.voyageur', {
    url: "/voyageur",
    cache:false,
    views: {
      'menuContent': {
        cache:false,
        templateUrl: "views/app/gestionnaire_admin/voyageur.html",
        controller: 'VoyageurCtrl'
        }
    }
  })
//agent
    .state('app.agent', {
    url: "/agent",
    cache:false,
    views: {
      'menuContent': {
        cache:false,
        templateUrl: "views/app/gestionnaire_admin/agent.html",
        controller: 'AgentCtrl'
        }
    }
  })
  //ligne
  .state('app.ligne', {
    url: "/ligne",
    cache:false,
    views: {
      'menuContent': {
        cache:false,
        templateUrl: "views/app/gestionnaire_voyage/ligne.html",
        controller: 'LigneCtrl'
        }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/walkthrough');
});
