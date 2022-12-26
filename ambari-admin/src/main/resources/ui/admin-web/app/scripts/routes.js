/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

angular.module('ambariAdminConsole')
.constant('ROUTES', {
  authentication: {
    main: {
      url: '/authentication',
      templateUrl: 'views/authentication/main.html',
      controller: 'AuthenticationMainCtrl'
    }
  },
  loginActivities: {
    loginMessage: {
      url: '/loginMessage',
      templateUrl: 'views/loginActivities/main.html',
      controller: 'LoginActivitiesMainCtrl'
    },
    homeDirectory: {
      url: '/homeDirectory',
      templateUrl: 'views/loginActivities/main.html',
      controller: 'LoginActivitiesMainCtrl'
    }
  },
  userManagement: {
    main: {
      url: '/userManagement',
      templateUrl: 'views/userManagement/main.html',
      controller: 'UserManagementCtrl',
      label: '用户'
    },
    editUser: {
      url: '/users/:id/edit',
      templateUrl: 'views/userManagement/userEdit.html',
      controller: 'UserEditCtrl',
      label: '用户'
    },
    editGroup: {
      url: '/groups/:id/edit',
      templateUrl: 'views/userManagement/groupEdit.html',
      controller: 'GroupEditCtrl',
      label: '群组'
    },
  },
  views: {
    list: {
      url: '/views',
      templateUrl: 'views/ambariViews/viewsList.html',
      controller: 'ViewsListCtrl',
      label: '视图'
    },
    edit: {
      url: '/views/:viewId/versions/:version/instances/:instanceId/edit',
      templateUrl: 'views/ambariViews/edit.html',
      controller: 'ViewsEditCtrl',
      label: '视图'
    },
    createViewUrl: {
      url: '/urls/new',
      templateUrl: 'views/urls/create.html',
      controller: 'ViewUrlCtrl',
      label: '视图'
    },
    linkViewUrl: {
      url: '/urls/link/:viewName/:viewVersion/:viewInstanceName',
      templateUrl: 'views/urls/create.html',
      controller: 'ViewUrlCtrl',
      label: '视图'
    },
    editViewUrl: {
      url: '/urls/edit/:urlName',
      templateUrl: 'views/urls/edit.html',
      controller: 'ViewUrlEditCtrl',
      label: '视图'
    }
  },
  stackVersions: {
    list: {
      url: '/stackVersions',
      templateUrl: 'views/stackVersions/list.html',
      controller: 'StackVersionsListCtrl',
      label: '版本'
    },
    create: {
      url: '/stackVersions/create',
      templateUrl: 'views/stackVersions/stackVersionPage.html',
      controller: 'StackVersionsCreateCtrl',
      label: '版本'
    },
    edit: {
      url: '/stackVersions/:stackName/:versionId/edit',
      templateUrl: 'views/stackVersions/stackVersionPage.html',
      controller: 'StackVersionsEditCtrl',
      label: '版本'
    }
  },
  remoteClusters: {
    list: {
      url: '/remoteClusters',
      templateUrl: 'views/remoteClusters/list.html',
      controller: 'RemoteClustersListCtrl',
      label: '远程集群'
    },
    create: {
      url: '/remoteClusters/create',
      templateUrl: 'views/remoteClusters/remoteClusterPage.html',
      controller: 'RemoteClustersCreateCtrl',
      label: '远程集群'
    },
    edit: {
      url: '/remoteClusters/:clusterName/edit',
      templateUrl: 'views/remoteClusters/editRemoteClusterPage.html',
      controller: 'RemoteClustersEditCtrl',
      label: '远程集群'
    }
  },
  clusters: {
    clusterInformation: {
      url: '/clusterInformation',
      templateUrl: 'views/clusters/clusterInformation.html',
      controller: 'ClusterInformationCtrl',
      label: '集群信息'
    }
  },
  dashboard: {
    url: '/dashboard',
    controller: ['$window', function ($window) {
      $window.location.replace('/#/main/dashboard');
    }],
    template: ''
  }
})
.config(['$routeProvider', '$locationProvider', 'ROUTES', function ($routeProvider, $locationProvider, ROUTES) {
  $locationProvider.hashPrefix('');
  var createRoute = function (routeObj) {
    if (routeObj.url) {
      $routeProvider.when(routeObj.url, routeObj);
    } else {
      angular.forEach(routeObj, createRoute);
    }
  };
  var rootUrl = ROUTES['clusters']['clusterInformation'].url;
  angular.forEach(ROUTES, createRoute);
  $routeProvider.otherwise({
    redirectTo: rootUrl
  });
}])
.run(['$rootScope', 'ROUTES', 'Settings', function ($rootScope, ROUTES, Settings) {
  // Make routes available in every template and controller
  $rootScope.ROUTES = ROUTES;
  $rootScope.$on('$locationChangeStart', function (e, nextUrl) {
    if (/\/authentication$/.test(nextUrl) && !Settings.isLDAPConfigurationSupported) {
      e.preventDefault();
    }
  });
  $rootScope.$on('$locationChangeStart', function (e, nextUrl) {
    if ((/\/loginMessage$/.test(nextUrl) || /\/homeDirectory$/.test(nextUrl)) && !Settings.isLoginActivitiesSupported) {
      e.preventDefault();
    }
  });

  /**
   * Method using to generate full URI from site root, this method should be used
   * along with all 'href' attribute or methods which invoke redirect to Ambari Web.
   * This method is useful to determine actual site root when ambari run under proxy server.
   *
   * @param {string} url
   * @returns {string}
   */
  $rootScope.fromSiteRoot = function (url) {
    var path = url[0] === '/' ? url.substring(1) : url;
    return Settings.siteRoot + path;
  };
}]);
