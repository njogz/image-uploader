var app = angular.module('images', ['ngResource', 'ngRoute', 'ngFileUpload']);


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
       .when('/image/delete/:id', {
        templateUrl: 'partials/image-delete.html',
        controller: 'DeleteImageCtrl'
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

app.controller('AddImageCtrl', ['$scope', '$resource', '$location', 'Upload',
    function($scope, $resource, $location, Upload){
        $scope.save = function(){
          $scope.upload($scope.image.file);
        };
        $scope.upload = function (file) {
          Upload.upload({
              url: 'api/images',
              data: {file: file, 'title': $scope.image.title}
          }).then(function () {
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

app.controller('DeleteImageCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Images = $resource('/api/images/:id');

        Images.get({ id: $routeParams.id }, function(image){
            $scope.image = image;
        })

        $scope.delete = function(){
          console.log("Delete: " + $routeParams.id);
            Images.delete({ id: $routeParams.id }, function(image){
                $location.path('/');
            });
        }
    }]);
