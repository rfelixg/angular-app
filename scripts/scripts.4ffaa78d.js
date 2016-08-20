"use strict";angular.module("angularAppApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngStorage","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/current/:cityID",{templateUrl:"views/current.html",controller:"CurrentCtrl",controllerAs:"current"}).when("/forecast/:cityID",{templateUrl:"views/forecast.html",controller:"ForecastCtrl",controllerAs:"forecast"}).otherwise({redirectTo:"/"})}]),angular.module("angularAppApp").controller("MainCtrl",["$scope","gamedata","citysearch","$localStorage",function(a,b,c,d){a.gamedata=b.query(),a.refreshGamedata=function(){a.gamedata=b.query({game:a.game})},a.citiesFound=c.find(),a.storage=d,a.findCities=function(){a.citiesFound=c.find({query:a.location}),a.searchQuery=a.location}}]),angular.module("angularAppApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("angularAppApp").factory("gamedata",["$resource",function(a){return a("https://crossorigin.me/http://www.giantbomb.com/api/game/3030-54214/?api_key=462146f8df39099bfb7ff5cf34264daf79ba3763&format=json",{},{query:{method:"GET",params:{game:"Forza Horizon 3"},isArray:!1}})}]),angular.module("angularAppApp").factory("current",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/weather?q=:location&units=imperial&APPID=63ae02059a0d63bb70b02197be629a8d",{},{query:{method:"GET",params:{location:"Seattle.us"},isArray:!1}})}]),angular.module("angularAppApp").factory("citysearch",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/find?q=:query&type=like&mode=json&APPID=63ae02059a0d63bb70b02197be629a8d",{},{find:{method:"GET",params:{query:"Seattle"},isArray:!1}})}]),angular.module("angularAppApp").controller("CurrentCtrl",["$scope","$routeParams","current","$localStorage",function(a,b,c,d){a.cityID=b.cityID,a.currentWeather=c.query({cityID:b.cityID}),a.saveCity=function(b){var c={name:b.name,id:b.id};if(d.savedCities){for(var e=!0,f=0;f<d.savedCities.length;f++)d.savedCities[f].id==c.id&&(e=!1);1==e?(d.savedCities.push(c),a.citySaved={success:!0}):(console.log("city already saved"),a.citySaved={duplicate:!0})}else d.savedCities=[c]}}]),angular.module("angularAppApp").factory("forecast",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/forecast/daily?id=:cityID&cnt=16&units=imperial&APPID=63ae02059a0d63bb70b02197be629a8d",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("angularAppApp").controller("ForecastCtrl",["$scope","$routeParams","forecast",function(a,b,c){a.cityID=b.cityID,a.forecastData=c.query({cityID:b.cityID})}]),angular.module("angularAppApp").run(["$templateCache",function(a){a.put("views/about.html",'<p>This is the about view.</p> <h2>This is an &lt;h2&gt; tag in the about view</h2> <!-- Stretch Goal: Make an Adding Machine - p.290 --> <div ng-app ng-init="firstnum=1;secondnum=2"> <input type="number" min="0" ng-model="firstnum"> plus <input type="number" min="0" ng-model="secondnum"> equals <!-- <b>{{firstnum + secondnum}}</b> --> <span class="label label-success">{{firstnum + secondnum}}</span> </div> <!--\n1. the <ng> attribute lets AngularJS know that inside this <div> is going to be an AngularJS app\n\n2. add <input> elements. Each input defines a new variable, which AngularJS calls a "model"\nSo we use the ng-model attribute to assign a name to whatever value gets typed into those <input> elements.\n\n3. Output the sum of the two numbers.\nAngularJS templates use the double curly brace -> {{ ... }} <- syntax to output the value of a variable to the template.\n-->'),a.put("views/current.html",'<p>This is the current view.</p> <!-- p.410 --> <h1>Current Weather for {{currentWeather.name}}</h1> <dl> <dt>Currently</dt> <dd>{{currentWeather.weather[0].main}}</dd> <dd>{{currentWeather.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{currentWeather.main.temp}} &deg;F</dd> <dt>Wind</dt> <dd>{{currentWeather.wind.speed}} mph at {{currentWeather.wind.deg}} &deg;</dd> <dt>Clouds</dt> <dd>{{currentWeather.clouds.all}}%</dd> </dl> <p><a ng-href="/#/forecast/{{cityID}}" class="btn btn-lg btn-primary">View 16-day Forecast</a></p> <p><button class="btn btn-sm btn-primary" ng-click="saveCity(currentWeather)">Save City</button></p> <!-- Adding messages to the view template. This code sets up messages to be controlled by the $scope.citySaved object - p.501 --> <div ng-messages="citySaved"> <p class="city-saved-alert bg-success text-success" ng-message="success"> {{currentWeather.name}} has been saved to your list of cities. </p> <p class="city-saved-alert bg-warning text-warning" ng-message="duplicate"> {{currentWeather.name}} has already been saved to your list of cities. </p> </div>'),a.put("views/forecast.html",'<p>This is the forecast view.</p> <h1>16-day Forecast for {{forecastData.city.name}} {{forecastData.city.country}}</h1> <dl ng-repeat="prediction in forecastData.list" class="weather-forecast"> <dt>Forecast for {{weather.dt*1000 | date:\'MMM dd, yyyy\'}}</dt> <dd>{{prediction.weather[0].main}}</dd> <dd>{{prediction.weather[0].description}}</dd> <dt>Temperature</dt> <dd>Min: {{prediction.temp.min}} &deg;F Max: {{prediction.temp.max}} &deg;F</dd> </dl> <p><a ng-href="/#/current/{{cityID}}" class="btn btn-lg btn-primary">View Current Weather</a></p>'),a.put("views/main.html",'<!-- GiantBomb API --> <div ng-app class="jumbotron" ng-controller="MainCtrl"> <!-- GiantBomb api - gamedata --> <!-- <h1>The Game Engine</h1> --> <!-- <h1>{{gamedata.limit}}</h1> --> <!-- comment out --> <!-- <dd>{{current.results.name}}</dd> --> <!-- comment out --> <!-- <p class="lead">\n    <div ng-init="game=\'Forza Horizon 3\'">\n      <p>\n        <label for="game">Game:\n          <input type="text" name="game"\n          ng-model="game">\n        </label>\n      </p>\n      <p>\n        <button class="btn btn-lg btn-primary"\n        ng-click="refreshGamedata()">Search Game</button>\n      </p>\n\n      <dl>\n        <dt>Search Results</dt>\n        <dd>{{gamedata.results.name}}</dd> --> <!-- <dt>Genre</dt> --> <!-- comment out --> <!-- <dd>{{gamedata.genres.name}}</dd> --> <!-- comment out --> <!-- <dd>{{gamedata.genres[0].api_detail_url}}\n      </dl>\n    </div>\n  </p>\n</div> --> <!-- OpenWeatherMap api - cityserch --> <div ng-app class="jumbotron" ng-controller="MainCtrl"> <h1>Select Your City</h1> <p class="lead"> <div ng-init="location=\'Seattle\'"> <p> <label for="location">Location: <input type="text" name="location" ng-model="location"> </label> </p> <p> <button class="btn btn-lg btn-primary" ng-click="findCities()">Find City</button> <!-- findCities() function is attached to the button - p.394 --> </p> </div> <div ng-if="searchQuery"> <!-- results are wrapped in a <div> controlled by the ng-if directive - p.394 --> <!-- this directive only shows the element and its children if the conditional contianed in the ng-if attribute is true --> <p class="lead">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p> <dl ng-repeat="city in citiesFound.list"> <dt>{{city.name}}, {{city.sys.country}}</dt> <dd>{{city.weather[0].main}} {{city.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{city.main.temp}} &deg;F</dd> <dd><a ng-href="/#/current/{{city.id}}" class="btn btn-lg btn-primary">View Weather</a></dd> </dl> </div> </p> </div> <div ng-if="storage.savedCities"> <h2>Saved Cities</h2> <ul class="saved-cities-list"> <li ng-repeat="city in storage.savedCities"> <a ng-href="/#/current/{{city.id}}" class="btn btn-lg btn-primary">{{city.name}}</a> </li> </ul> </div> <!-- OpenWeatherMap API Part 2 - p.386 --> <!-- <h1>Select Your City</h1>\n<p class="lead">\n  <div ng-init="location=\'Seattle\'">\n    <p>\n      <label for="location">Location:\n        <input type="text" name="location" ng-model="location">\n      </label>\n    </p>\n    <p>\n      <button class="btn btn-lg btn-primary" ng-click="findCities()">Find City</button>\n    </p>\n  </div>\n\n  <div ng-if="searchQuery">\n    <p class="lead">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p>\n    <dl ng-repeat="city in citiesFound.list">\n      <dt>{{city.name}}, {{city.sys.country}}</dt>\n      <dd>{{city.weather[0].main}} - {{city.weather[0].description}}</dd>\n      <dt>Temperature</dt>\n      <dd>{{city.main.temp}} &deg;F</dd>\n      <dd><a ng-href="/#/current/{{city.id}}" class="btn btn-lg btn-primary">View Weather</a></dd>\n    </dl>\n  </div>\n</p>\n</div> --> <!-- OpenWeatherMap API Part 1 - p.338-339 --> <!-- <h1>Weather for {{current.name}}</h1>\n  <p class="lead">\n    <div ng-init="location=\'Seattle\'">\n      <p>\n        <label for="location">Location:\n          <input type="text" name="location" ng-model="location">\n        </label>\n      </p>\n      <p>\n        <button class="btn btn-lg btn-primary" ng-click="refreshCurrent()">Get Current Weather</button>\n      </p>\n      <dl>\n        <dt>Currently</dt>\n        <dd>{{current.weather[0].main}}</dd>\n        <dd>{{current.weather[0].description}}</dd>\n        <dt>Temperature</dt>\n        <dd>{{current.main.temp}}</dd>\n        <dt>Wind</dt>\n        <dd>{{current.wind.speed}} mpg at {{current.wind.deg}} degrees</dd>\n        <dt>Clouds</dt>\n        <dd>{{current.clouds.all}}%</dd>\n      </dl>\n    </div>\n  </p>\n</div> --> <!-- default - p.338 --> <!-- <div class="jumbotron">\n  <h1>Greetings and Salutations</h1>\n  <p class="lead">\n    <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br>\n    Always a pleasure scaffolding your apps.\n  </p>\n  <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p>\n</div>\n\n<div class="row marketing">\n  <h4>HTML5 Boilerplate</h4>\n  <p>\n    HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.\n  </p>\n\n  <h4>Angular</h4>\n  <p>\n    AngularJS is a toolset for building the framework most suited to your application development.\n  </p>\n\n  <h4>Karma</h4>\n  <p>Spectacular Test Runner for JavaScript.</p>\n</div> --></div>')}]);