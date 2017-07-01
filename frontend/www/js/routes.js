angular.module('starter.routes', ['starter.config'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, USER_ROLES) {
  $stateProvider

  //INTRO
  
  .state('app', {
    url: "/app",
    abstract: true,
    cache: false,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  
  .state('app.login', {
    url: "/login",
    cache: false,

    views: {
      'menuContent': {
        templateUrl: "views/app/auth/login.html",
        controller: 'LoginCtrl'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.visiteur_role]
    }
  })
  .state('app.signup', {
    url: "/signup",

    views: {
      'menuContent': {
        templateUrl: "views/app/auth/signup.html",
        controller: 'SignupCtrl'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.visiteur_role]
    }
  })

 

  .state('app.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/app/auth/forgot-password.html"
  })


  //MISCELLANEOUS

  .state('app.profile', {
    url: "/profile",

    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html",
        controller: 'ProfileCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.voyageur_role]
    }
  })
  .state('app.reclamation', {
    url: "/reclamation",

    views: {
      'menuContent': {
        templateUrl: "views/app/reclamation/reclamation.html",
        controller: 'ReclamationCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.voyageur_role]
    }
  })
  //Station

  .state('app.station', {
    url: "/station",
        cache:false,
    views: {
      'menuContent': {
        templateUrl: "views/app/station/station.html",
        controller: 'StationCtrl'
        }
    }
  })
    //Station

  .state('app.favorie', {
    url: "/favorie",
        cache:false,
    views: {
      'menuContent': {
        templateUrl: "views/app/favorie.html",
        controller: 'FavorieCtrl'
        }
    }
  })
   .state('app.notification', {
    url: "/notification",
        cache:false,
    views: {
      'menuContent': {
        templateUrl: "views/app/notification.html",
        controller: 'NotificationCtrl'
        }
    }
  })


  //ligne
  .state('app.ligne', {
    url: "/ligne",
        cache:false,
    views: {
      'menuContent': {
        templateUrl: "views/app/recherche/ligne.html",
        controller: 'LigneCtrl'
        }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/ligne');
});
