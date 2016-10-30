/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(1);
	
	__webpack_require__(2);
	
	/**
	 * Created by jonayet on 10/28/16.
	 */
	__webpack_require__(11);
	
	
	function config(cfpLoadingBarProvider) {
	  cfpLoadingBarProvider.includeSpinner = false;
	}
	config.$inject = ['cfpLoadingBarProvider'];
	
	_app.appModule.config(config);
	angular.bootstrap(document, [_app.appModule.name]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by jonayet on 10/28/16.
	 */
	
	var appModule = angular.module('app', ['ui.router', 'ui.grid', 'ui.grid.selection', 'ui.grid.infiniteScroll', 'angular-loading-bar']);
	exports.appModule = appModule;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(1);
	
	var _app2 = __webpack_require__(3);
	
	/**
	 * Created by jonayet on 10/28/16.
	 */
	function routerConfig($stateProvider, $urlRouterProvider) {
	    $stateProvider.state({
	        name: 'repositories',
	        url: '/:userId',
	        template: __webpack_require__(10),
	        controller: _app2.appController,
	        controllerAs: 'vm'
	    });
	
	    $urlRouterProvider.otherwise('/');
	}
	routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	_app.appModule.config(routerConfig);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.appController = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by jonayet on 10/29/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _app = __webpack_require__(1);
	
	var _github = __webpack_require__(4);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AppController = function () {
	    function AppController($scope, $state, $q, githubService) {
	        var _this = this;
	
	        _classCallCheck(this, AppController);
	
	        Object.assign(this, {
	            $scope: $scope,
	            $state: $state,
	            $q: $q,
	            githubService: githubService
	        });
	
	        this.userId = '';
	        this.currentPage = 1;
	        this.isUserChecked = false;
	        this.loadingRepositories = false;
	        this.isUserIdValid = false;
	        this.hasRepository = false;
	
	        this.gridOptions = this.createGridOptions();
	        this.gridOptions.onRegisterApi = function (gridApi) {
	            _this.registerGridApi(gridApi);
	        };
	
	        this.onValidUserId = function (userId) {
	            _this.isUserIdValid = true;
	            _this.$state.go('.', { userId: userId }, { notify: false });
	            _this.showRepositories(userId);
	        };
	    }
	
	    _createClass(AppController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            var _this2 = this;
	
	            this.userId = this.$state.params['userId'];
	            this.checkUserId(this.userId).then(function () {
	                _this2.showRepositories(_this2.userId);
	            });
	        }
	    }, {
	        key: 'home',
	        value: function home() {
	            this.isUserIdValid = false;
	            this.gridOptions.data = [];
	        }
	    }, {
	        key: 'createGridOptions',
	        value: function createGridOptions() {
	            return {
	                enableFullRowSelection: true,
	                enableRowSelection: true,
	                multiSelect: false,
	                enableRowHeaderSelection: false,
	                infiniteScrollRowsFromEnd: 5,
	                infiniteScrollUp: false,
	                infiniteScrollDown: true,
	                columnDefs: [{ field: 'name', displayName: 'Name' }, { field: 'stargazers_count', displayName: 'Stars', width: 100 }, { field: 'forks_count', displayName: 'Forks', width: 100 }, { field: 'url', displayName: 'Url' }]
	            };
	        }
	    }, {
	        key: 'registerGridApi',
	        value: function registerGridApi(gridApi) {
	            var _this3 = this;
	
	            gridApi.selection.on.rowSelectionChanged(this.$scope, function (row) {
	                //console.log(row.entity)
	            });
	
	            gridApi.infiniteScroll.on.needLoadMoreData(this.$scope, function () {
	                _this3.infiniteScrollLoadMore(gridApi);
	            });
	        }
	    }, {
	        key: 'checkUserId',
	        value: function checkUserId(userId) {
	            var _this4 = this;
	
	            this.isUserChecked = false;
	            this.isUserIdValid = false;
	            return this.githubService.isUserExist(userId).then(function () {
	                _this4.isUserIdValid = true;
	            }).finally(function () {
	                _this4.isUserChecked = true;
	            });
	        }
	    }, {
	        key: 'showRepositories',
	        value: function showRepositories(userId) {
	            var _this5 = this;
	
	            this.loadingRepositories = true;
	            this.githubService.getRepositories(userId).then(function (repositories) {
	                _this5.loadingRepositories = false;
	                _this5.currentPage = 1;
	                _this5.generateGridData(repositories);
	            }, function (error) {
	                _this5.error = error;
	            });
	        }
	    }, {
	        key: 'infiniteScrollLoadMore',
	        value: function infiniteScrollLoadMore(gridApi) {
	            var _this6 = this;
	
	            gridApi.infiniteScroll.saveScrollPercentage();
	            this.githubService.getRepositories(this.userId, this.currentPage + 1, 10).then(function (repositories) {
	                var hasNewData = repositories.length !== 0;
	                if (hasNewData) {
	                    var currentData = _this6.gridOptions.data;
	                    _this6.generateGridData(currentData.concat(repositories));
	                    _this6.currentPage++;
	                }
	                gridApi.infiniteScroll.dataLoaded(false, hasNewData);
	            }, function (error) {
	                _this6.error = error;
	                gridApi.infiniteScroll.dataLoaded(false, true);
	            });
	        }
	    }, {
	        key: 'generateGridData',
	        value: function generateGridData(repositories) {
	            if (!repositories.length) {
	                this.hasRepository = false;
	                return;
	            }
	            this.hasRepository = true;
	            this.gridOptions.data = repositories.map(function (repository) {
	                var name = repository.name,
	                    stargazers_count = repository.stargazers_count,
	                    forks_count = repository.forks_count,
	                    url = repository.url;
	
	                return {
	                    name: name,
	                    stargazers_count: stargazers_count,
	                    forks_count: forks_count,
	                    url: url
	                };
	            });
	        }
	    }, {
	        key: 'shouldPromptUser',
	        value: function shouldPromptUser() {
	            return this.isUserChecked && !this.isUserIdValid;
	        }
	    }, {
	        key: 'shouldShowRepositories',
	        value: function shouldShowRepositories() {
	            return this.isUserChecked && this.isUserIdValid && this.hasRepository;
	        }
	    }, {
	        key: 'shouldShowEmpty',
	        value: function shouldShowEmpty() {
	            return this.isUserChecked && this.isUserIdValid && !this.loadingRepositories && !this.hasRepository;
	        }
	    }]);
	
	    return AppController;
	}();
	
	AppController.$inject = ['$scope', '$state', '$q', _github.githubService];
	
	var appController = exports.appController = 'appController';
	_app.appModule.controller(appController, AppController);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.githubService = exports.GithubService = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by jonayet on 10/29/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _app = __webpack_require__(1);
	
	var _accessToken = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GithubService = exports.GithubService = function () {
	    function GithubService($http, $q) {
	        _classCallCheck(this, GithubService);
	
	        Object.assign(this, {
	            $http: $http,
	            $q: $q
	        });
	        this.requestAbroatTimeout = 20000;
	        this.userId = '';
	        this.accessToken = _accessToken.accessToken;
	    }
	
	    _createClass(GithubService, [{
	        key: 'isUserExist',
	        value: function isUserExist(userId) {
	            this.userId = userId;
	            if (!userId) return this.$q.reject('user-id is empty.');
	            return this.httpGet(this.addToken('https://api.github.com/users/' + this.userId));
	        }
	    }, {
	        key: 'getRepositories',
	        value: function getRepositories(userId) {
	            var pageNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	            var itemPerPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	
	            this.userId = userId;
	            var url = this.addToken('https://api.github.com/users/' + userId + '/repos');
	            url = this.addParam(url, 'page', pageNo);
	            url = this.addParam(url, 'per_page', itemPerPage);
	            return this.httpGet(url).then(function (response) {
	                return response.data;
	            });
	        }
	    }, {
	        key: 'addToken',
	        value: function addToken(url) {
	            if (!this.accessToken) return url;
	            return this.addParam(url, 'access_token', this.accessToken);
	        }
	    }, {
	        key: 'addParam',
	        value: function addParam(url, key, value) {
	            if (!value) return;
	            var joiner = url.indexOf('?') === -1 ? '?' : '&';
	            return url + joiner + key + '=' + value;
	        }
	    }, {
	        key: 'httpGet',
	        value: function httpGet(url) {
	            var _this = this;
	
	            return this.$http({
	                method: 'GET',
	                url: url,
	                timeout: this.requestAbroatTimeout
	            }).catch(function (error) {
	                var errorMessage = error.status == 404 ? '\'' + _this.userId + '\' doesn\'t exist.' : 'Unknown error occurred.';
	                return _this.$q.reject(errorMessage);
	            });
	        }
	    }]);
	
	    return GithubService;
	}();
	
	GithubService.$inject = ['$http', '$q'];
	
	var githubService = exports.githubService = 'githubService';
	_app.appModule.service(githubService, GithubService);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by jonayet on 10/29/16.
	 */
	
	var accessToken = exports.accessToken = '8aac9a63212eb9b675be6e8cb541a1833a2febb6';

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.githubUser = undefined;
	
	var _app = __webpack_require__(1);
	
	var _github = __webpack_require__(4);
	
	__webpack_require__(7);
	
	function factory() {
	    controller.$inject = [_github.githubService];
	    function controller(githubService) {
	        var _this = this;
	
	        this.checkUserId = function () {
	            return githubService.isUserExist(_this.userId).then(function () {
	                _this.onValidUserId(_this.userId);
	            }, function (error) {
	                _this.error = error;
	            });
	        };
	    }
	
	    return {
	        restrict: 'E',
	        template: __webpack_require__(9),
	        scope: {
	            onValidUserId: '=',
	            userId: '='
	        },
	        controller: controller,
	        controllerAs: 'vm',
	        bindToController: true
	    };
	} /**
	   * Created by jonayet on 10/29/16.
	   */
	
	factory.$inject = [];
	
	var githubUser = exports.githubUser = 'githubUser';
	_app.appModule.directive(githubUser, factory);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.errorViewer = undefined;
	
	var _app = __webpack_require__(1);
	
	function factory() {
	    controller.$inject = ['$scope', '$timeout'];
	    function controller($scope, $timeout) {
	        var vm = this;
	        vm.show = false;
	
	        $scope.$watch('vm.error', function (newValue, oldValue) {
	            if (!newValue) {
	                return;
	            }
	            vm.show = true;
	
	            if (!vm.duration) {
	                return;
	            }
	            $timeout(function () {
	                vm.show = false;
	                vm.error = '';
	            }, vm.duration);
	        });
	    }
	
	    return {
	        restrict: 'E',
	        template: __webpack_require__(8),
	        scope: {
	            error: '=',
	            duration: '='
	        },
	        controller: controller,
	        controllerAs: 'vm',
	        bindToController: true
	    };
	} /**
	   * Created by jonayet on 10/29/16.
	   */
	
	factory.$inject = [];
	
	var errorViewer = exports.errorViewer = 'errorViewer';
	_app.appModule.directive(errorViewer, factory);

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div ng-if=\"vm.show\">\n    <div class=\"error\">{{vm.error}}</div>\n</div>";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <form ng-submit=\"vm.checkUserId()\">\n        <div class=\"row\">\n            <div class=\"col-md-offset-4 col-sm-offset-3 col-xs-offset-2\">\n                <div class=\"col-md-4 col-sm-6 col-xs-8\">\n                    <label>Enter a GitHub user name:</label>\n                    <input ng-model=\"vm.userId\" type=\"text\" required class=\"form-control\">\n                </div>\n                <div class=\"col-md-2 col-sm-2 col-xs-2\">\n                    <button type=\"submit\" class=\"btn btn-default show-button\">Show</button>\n                </div>\n            </div>\n        </div>\n    </form>\n    <error-viewer error=\"vm.error\" duration=\"3000\"></error-viewer>\n</div>";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container app\">\n    <h2 class=\"app-title \">GitHub Integration</h2>\n    <hr>\n    <div ng-if=\"!vm.isUserChecked\" class=\"wait\">Please wait...</div>\n    <github-user ng-if=\"vm.shouldPromptUser()\" user-id=\"vm.userId\" on-valid-user-id=\"vm.onValidUserId\"></github-user>\n    <div ng-if=\"vm.shouldShowRepositories()\">\n        <button ng-click=\"vm.home()\" class=\"btn btn-default show-button\">Back</button>\n        <h3>Repository list</h3>\n        <div ui-grid=\"vm.gridOptions\" ui-grid-selection ui-grid-infinite-scroll></div>\n    </div>\n    <div ng-if=\"vm.shouldShowEmpty()\" class=\"no-repository\">\n        <div>\n            No Repositories.\n        </div>\n        <button ng-click=\"vm.home()\" class=\"btn btn-default show-button\">Back</button>\n    </div>\n    <error-viewer error=\"vm.error\" duration=\"3000\"></error-viewer>\n    <div class=\"github-link\" >\n        <label>GitHub: </label>\n        <a href=\"https://github.com/jonayet/angular-es6-github-integration\">https://github.com/jonayet/angular-es6-github-integration</a>\n    </div>\n</div>";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./app.style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./app.style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".app {\n\n}\n\n.app-title {\n    text-align: center;\n}\n\n.wait {\n    text-align: center;\n    font-size: x-large;\n}\n\n.no-repository {\n    text-align: center;\n    font-size: x-large;\n}\n\n.show-button {\n    margin-top: 24px;\n}\n\n.error {\n    margin: 20px;\n    padding: 10px;\n    color: white;\n    background-color: crimson;\n    border-radius: 5px;\n}\n\n.github-link {\n    position: fixed;\n    bottom: 20px;\n}", ""]);
	
	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map