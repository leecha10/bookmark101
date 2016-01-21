
var app = angular.module("Bookmark", ['firebase']);
app.controller("Ctrl", function ($scope, $firebaseArray) {
	  $scope.url;

    var firebaseURL = "https://cyleebook.firebaseio.com/";

    $scope.getList = function() {
    	var echoRef = new Firebase(firebaseURL);
  		var query = echoRef.orderByChild("url");
  		$scope.urlArr = $firebaseArray(query);
    };

    $scope.add = function() {
      var regex = new RegExp("^http://([a-z0-9A-Z]+(\.){1,1})+[a-z0-9A-Z]+");

      if (!(regex.test($scope.url))) {
        alert("Submit Failed! Check your URL!");
        $scope.url = "";
      }
      else {
        $scope.urlArr.$add({
          url: $scope.url,
          title: "TBA"
        });
        $scope.url = "";
      }

    };

    $scope.remove = function (url) {
      $scope.urlArr.$remove(url);
    };


    $scope.FBLogin = function () {
      var ref = new Firebase(firebaseURL);
      ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $scope.$apply(function() {
        $scope.$authData = authData;
      });
      console.log("Authenticated successfully with payload:", authData);

      // do something with the login info
        }
      });
    };

    $scope.FBLogout = function () {
      var ref = new Firebase(firebaseURL);
      ref.unauth();
      delete $scope.$authData;

      // do something after logout
    };

    // load the list!
    $scope.getList();
});
