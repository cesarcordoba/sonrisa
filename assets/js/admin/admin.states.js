app.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        function template(url, template, controller, oz) {
            let obj = {
                url: url,
                views: {
                    'main': {
                        templateUrl: template,
                        controller: controller + ' as ctrl'
                    }
                },
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([oz]);
                        }
                    ]
                }
            }
            return obj
        }

        function pequenin(url, template) {
            let obj = {
                url: url,
                views: {
                    'main': {
                        templateUrl: template
                    }
                }
            }
            return obj
        }

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home',                  pequenin('/', '/admin/home'))
        .state('proyectos',             pequenin('/proyectos', '/admin/proyectos'))
        .state('proyecto',              template('/proyecto/:idProyecto', '/admin/infoProyectos', 'proyectosCtrl', 'ozAdminProyectos'))
        .state('proyecto.info',         template('/info', '/admin/partials/info', 'infoCtrl', 'ozinfo'))
        .state('proyecto.eventos',      template('/eventos', '/admin/partials/eventos', 'eventosCtrl', 'ozeventos'))
        .state('proyecto.ubicaciones',  template('/ubicaciones', '/admin/partials/ubicaciones', 'ubicacionesCtrl', 'ozUbicaciones'))
        .state('proyecto.materiales',   template('/materiales', '/admin/partials/materiales', 'materialesCtrl', 'ozMaterias'))
        .state('proyecto.imagenes',     template('/imagenes', '/admin/partials/imagenes', 'imagenesCtrl', 'ozimagenes'))

        .state('area', {
            url: '/area/:idArea',
            views: {
                'main': {
                    templateUrl: '/admin/infoAreas',
                    controller: function($scope, $stateParams, $rootScope, $http) {
                        $scope.areas = {};
                        var idArea = $stateParams.idArea;
                        $http.get('/data/areas/' + idArea).then(function(data) {
                            $scope.areas = data.data;
                            console.log(data);
                        });
                    }

                }
            }
        })

        .state('campana', {
            url: '/campana/:idCampana',
            views: {
                'main': {
                    templateUrl: '/admin/infoCampanas',
                    controller: function($scope, $stateParams, $rootScope, $http) {
                        $scope.campanas = {};
                        var idCampana = $stateParams.idCampana;
                        $http.get('/data/campanas/' + idCampana).then(function(data) {
                            $scope.campanas = data.data;
                            console.log(data);
                        });
                    }

                }
            }
        })

        .state('nuevoproyecto', pequenin('/nuevoproyecto', '/admin/nuevoproyecto'))
        .state('campanas', pequenin('/campanas', '/admin/campanas'))
        .state('eventos', pequenin('/eventos', '/admin/eventos'))
        .state('areas', pequenin('/areas', '/admin/areas'))
        .state('materiales', pequenin('/materiales', '/admin/materiales'))
        .state('imagenes', pequenin('/imagenes', '/admin/imagenes'))

    }
]);
