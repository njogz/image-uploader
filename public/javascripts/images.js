var app = angular.module('images', ['ngResource', 'ngRoute']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-image', {
            templateUrl: 'partials/images-form.html',
            controller: 'AddImageCtrl'
        })
        .when('/image/:id', {
        templateUrl: 'partials/images-form.html',
        controller: 'EditImageCtrl'
    })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource){
        var Images = $resource('/api/images');
        Images.query(function(images){
          $scope.images = images;
        });
    }]);

app.controller('AddImageCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Images = $resource('/api/images');
            Images.save($scope.image, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('EditImageCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Images = $resource('/api/images/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Images.get({ id: $routeParams.id }, function(image){
            $scope.image = image;
        });

        $scope.save = function(){
            Images.update($scope.image, function(){
                $location.path('/');
            });
        }
    }]);
