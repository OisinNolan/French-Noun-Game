var app = angular.module("myapp", []);
var alreadySeen = [];
alreadySeen.length = dict.length;
dictSize = dict.length * 0.1;
//use a random dictionary element to set the first vocab word displayed upon loading
var randomIndex = Math.floor(Math.random() * dictSize);

app.controller('controller', function($scope) {

    //initialise variables when page is loaded for the first time
    $scope.seenCounter = 1;
    $scope.score = 0;
    $scope.translated = false;
    $scope.random = dict[randomIndex].word;
    $scope.translation = "English Translation";
    $(".result").fadeToggle();
    $(".scoreChange").fadeToggle();

    //function to get a random word from the list
    $scope.getRandom = function() {
        if ($scope.seenCounter != alreadySeen.length) {
            do {
                randomIndex = Math.floor(Math.random() * dictSize);
            } while(alreadySeen[randomIndex] == 1);
            $scope.random = dict[randomIndex].word;
            //set the previous translation back to original text
            $scope.translation = "English Translation";
            $scope.addToSeen();
        } else {
            $scope.endGame();
        }
    };


    //function to get translation of a word
    $scope.getTranslation = function() {
        if($scope.translated)
        {
            $scope.translation = "English Translation";
            $scope.translated = false;
        }
        else
        {
            $scope.translation = dict[randomIndex].translation;
            $scope.translated = true;
        }
    };

    //function to check if answer is correct, and update score accordingly
    $scope.checkGender = function(gender) {
        $(".result").fadeToggle();
        $(".scoreChange").fadeToggle();
        if(gender == dict[randomIndex].gender) {
            $scope.result = "correct";
            // change colour to green if correct
            $scope.styleObj = {
                "color" : "green"
            }
            $scope.scoreChange = "+1";
            $scope.score++;

        } else {
            $scope.result = "incorrect";
            // change colour to red if correct
            $scope.styleObj = {
                "color" : "red"
            }
            $scope.scoreChange = "-1";
            $scope.score--;
        }
        $(".result").fadeOut("slow");
        $(".scoreChange").fadeOut("slow");
    };

    //function to store words that have already come up
    $scope.addToSeen = function() {
        alreadySeen[randomIndex] = 1;
        $scope.seenCounter++;
        if(dictSize < dict.length) {
            dictSize++;
        }
    };

    $scope.endGame = function() {
        window.location.href = "endScreen.html" + "?" + $scope.score;
    }

});

app.controller('endController', function($scope) {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    $scope.finalScore = queryString;
});
