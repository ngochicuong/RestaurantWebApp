var App = angular.module("app", ["ngRoute"]);
App.config(function($routeProvider) {
    $routeProvider
    .when('/main', {
    	controller: 'mainController',
    	templateUrl: "webapp/WEB-INF/views/Main.jsp"
    });
});
App.controller('app-ctrl',
	    function AppController($scope, $location) {
		console.log("app controller");
		$location.path('/main');
});
//
//function App() {
//	
//}

//function App() {
//	
//	
//	new ServiceManager();
////	var thiz = this;
////	App.module.controller("index-ctrl", function($scope, $timeout) {
////		var indexMain = new IndexMain();
////		$scope.init = indexMain.init;
////		$scope.init($scope, $timeout);
////	});
////	App.module.controller("main-ctrl", function($scope ,$http, $timeout, serviceManager, $compile) {
////		$scope.serviceManager = serviceManager;
////		$scope.init = function() {
////			$scope.serviceManager.registerService(new ServerService($http));
////			var mainContainer = document.querySelector("#main-container");
////			var thiz = this;
////			var callback = function(htmlText) {
////				mainContainer.innerHTML = htmlText;
////				var templateElement = angular.element('htmlText');
////				var clonedElement = $compile(templateElement)($scope, function() {
////					var indexMain = new IndexMain();
////				});
//////				$compile(mainContainer);
////				BusyHandler.unLoadding();
////			}
////			$scope.serviceManager.get("server-service").getHTML("/getIndexPage.do", "GET", callback);
////		};
////		$scope.init();
////	});
//
//}
//
//document.onreadystatechange = function(e)
//{
////	BusyHandler.loadding();
//    if (document.readyState === 'complete')
//    {
//    	var app = new App();
//    }
//};
