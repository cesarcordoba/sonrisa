var app = angular.module('myapp');

app.controller('imagenesCtrl', function($scope, $stateParams, $mdDialog, Imagen, alertas) {

    $scope.seccion = 'imagenes';

    var idProyecto = $stateParams.idProyecto;
    Imagen.obtenerStatus(idProyecto, $scope.proyecto.status_actual).then(function(data) {
        $scope.imagenes = data.data;
        $scope.$digest();
        console.log($scope.imagenes);

    })

    $scope.crearImagen = function(imagen, proyecto) {

        switch (proyecto.status_actual) {
            case 1:
                var IdStatus = proyecto.Status.Pendiente.id;
                var ruta = 'imagenesconpendiente';
                break;
            case 2:
                var IdStatus = proyecto.Status.Progreso.id;
                var ruta = 'imagenesconprogreso';
                break;
            case 3:
                var IdStatus = proyecto.Status.Terminado.id;
                var ruta = 'imagenesconterminado';
                break;
            default:
        }

        console.log(imagen);

        //let imagen = 'data:image/png;base64, ' + foto.base64;

        Imagen.crear(ruta, IdStatus, imagen).then(function(data) {
            console.log(data);
            $scope.imagenes.push(data.data.imagen);
            $scope.$digest();


        })

    }

    $scope.eliminarImagen = function($index, id) {

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar la imagen?').textContent('Para eliminar una imagen dale en aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Imagen.eliminar(id).then(function(data) {
                $scope.imagenes.splice($index,1);
                $scope.$digest();
            })

        }, function() {});

    }


    $scope.cambiarPortada = function(id) {
        var idProyecto = $stateParams.idProyecto;

        Imagen.portadaBorrar(id, idProyecto).then(function(data){

            Imagen.portadaCrear(id, idProyecto).then(function(data){
                alertas.mostrarToastEstandar("Se cambio la Portada");

            })

        })



    }

});
