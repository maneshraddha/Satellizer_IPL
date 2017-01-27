var app = angular.module("myApp",['ngRoute','satellizer','ui.bootstrap']);
app.config(function($routeProvider){

  var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }];

  var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }];

  $routeProvider
  .when('/',{
    templateUrl : "templates/signupForm.html",
    controller :"SignUpControl",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .when('/login', {
    templateUrl : "templates/loginForm.html",
    controller :"LogControl",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .when('/teams',{
    templateUrl : "templates/teamsPage.html",
    controller :"teamController",
    resolve: {
      loginRequired: loginRequired
    }

  })
  .when('/teams/:id',{
    templateUrl : "templates/playersPage.html",
    controller :"playerController",
    resolve: {
      loginRequired: loginRequired
    }
  })
  .when('/logout',{
    template : null,
    controller:"LogoutControl"
  })
  .otherwise({
    redirectTo : '/login'
  });
});
