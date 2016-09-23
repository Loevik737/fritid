app = angular.module('myApp',[]);

app.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 }
});

app.controller('myController', ['$scope', function($scope){
   //init for firebase 
  var config = {
        apiKey: "AIzaSyBoFf7BGELFes0uOTi9Z6PS5Z58pTmr0jA",
        authDomain: "example-d5b20.firebaseapp.com",
        databaseURL: "https://example-d5b20.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "383271213938"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
    
 //make a login form later
  firebase.auth().signInWithEmailAndPassword("hloevi@live.no", "arsenal74485").catch(function(error) {
  // Handle Errors here.
      console.log("Error code: "+error.code);
      console.log("Message: "+error.message);
  // ...
  });
    
    //gets all the planets from the database, call this then loaded later
    var getPlanets = database.ref('planets').limitToLast(10);
      getPlanets.on('value', function(snapshot) {
          setValues(snapshot.val());
      });
    function setValues(data){
        $scope.planets = data;
        
        $scope.$apply();
    }
    //send object with planet info
   $scope.send = function(){
       database.ref('planets').push({
            name: $scope.planet,
            size: $scope.size,
            distance : $scope.distance
        });  
       $scope.size ="";
       $scope.planet ="";
       $scope.distance = "";
   }    
   //set filter var for table   
   $scope.setFilter = function(filter){
       if(filter == "name"){
           $scope.myFilter =filter;
       }
       if(filter == "size"){
           $scope.myFilter =filter;
       }
       if(filter == "distance"){
           $scope.myFilter =filter;
       }
   }
}]);