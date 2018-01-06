angular.module('articleModule', ['articleService', 'commonService'])
    .controller('deposerCtrl', ['$location', 'user', 'common', 'article', 'Upload', 'Flash', function ($location, user, common, article, Upload, Flash) {

        var vm = this
        if (user.currentUser().type != 'vendeur')
            $location.path('/')
        Flash.clear()
        vm.form = {}
        vm.form._user = user.currentUser().id
        vm.submit = () => {
            Upload.upload({
                url: '/api/v1/articles',
                data: vm.form,
                headers: {
                    'Authorization': 'Bearer ' + user.getToken()
                }

            }).then((resp) => {
                vm.message = resp.data.message
                Flash.create('success', vm.message, 0, {
                    container: 'flash'
                })
                vm.form = {}
            }, (err) => {
                vm.message = err.data.message
                Flash.create('danger', vm.message, 0, {
                    container: 'flash'
                })
            })
        }

    }])
    .controller('editCtrl', ['user', 'article', 'Upload', 'Flash', '$routeParams', function (user, article, Upload, Flash, $routeParams) {
        var vm = this
        Flash.clear()
        article.get($routeParams.id).then((resp) => {
                vm.form = resp.data
            },
            (err) => {
                vm.message = err.data.message
                Flash.create('danger', vm.message, 0, {
                    container: 'flash'
                })

            })
        vm.submit = () => {
            Upload.upload({
                url: '/api/v1/articles/' + $routeParams.id,
                method: 'PUT',
                data: vm.form,
                headers: {
                    'Authorization': 'Bearer ' + user.getToken()
                }

            }).then((resp) => {
                vm.message = resp.data.message
                Flash.create('success', vm.message, 0, {
                    container: 'flash'
                })
            }, (err) => {
                vm.message = err.data.message
                Flash.create('danger', vm.message, 0, {
                    container: 'flash'
                })
            })
        }
    }])
    .controller('removeCtrl', ['$mdDialog', 'article', 'Flash', 'id', '$scope', '$window', function ($mdDialog, article, Flash, id, $scope, $window) {

        var vm = $scope
        Flash.clear()

        vm.cancel = () => {
            $mdDialog.cancel()
            $window.location.href = '/user'

        }

        vm.remove = () => {
            article.remove(id).then((resp) => {
                vm.message = resp.data.message
                Flash.create('success', vm.message, 0, {
                    container: 'flash'
                })
            }, (err) => {
                vm.message = err.data.message
                Flash.create('danger', vm.message, 0, {
                    container: 'flash'
                })
            })
        }
    }])
