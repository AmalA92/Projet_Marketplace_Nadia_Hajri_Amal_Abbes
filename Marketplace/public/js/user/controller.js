angular.module('userModule', ['userService'])
    .controller('profileCtrl', ["user", "Flash", function (user, Flash) {

        Flash.clear()
        var vm = this
        var id = user.currentUser().id
        vm.form = {}
        user.get(id)
            .then(
                (resp) => {
                    vm.form = resp.data
                },
                (err) => {
                    vm.message = err.data.message
                    Flash.create('danger', vm.message, 0, {
                        container: 'flash'
                    })

                }
            )
        vm.submit = () => {
            if (vm.form.password === vm.form.confirm_password) {
                user.update(id, vm.form).then(
                    (resp) => {
                        vm.form = resp.data.data
                        vm.message = resp.data.message
                        Flash.create('success', vm.message, 0, {
                            container: 'flash'
                        })
                    }, (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })
                    }
                )
            } else {
                vm.message = 'Vérifier votre mot de passe'
                Flash.create('danger', vm.message, 0, {
                    container: 'flash'
                })

            }
        }

    }])
    .controller('userIndexCtrl', ["user", "article", "Flash", "$mdDialog", function (user, article, Flash, $mdDialog) {

        var vm = this
        Flash.clear()
        vm.id = user.currentUser().id

        vm.pageChange = function (event, page) {
            vm.articles = {}
            article.userarticles(vm.id, page)
                .then(
                    (resp) => {
                        vm.articles = resp.data.docs
                        vm.total = resp.data.pages
                        vm.currentPage = resp.data.page

                    },
                    (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })

                    }
                )
        }

        vm.pageChange('clicked', 1)

        vm.delete = (id) => {
            $mdDialog.show({
                controller: 'removeCtrl',
                templateUrl: 'views/partials/modals/deletearticle.html',
                clickOutsideToClose: true,
                fullscreen: false,
                locals: {
                    id: id
                }
            })
        }


    }])

    .controller('registerCtrl', ["user", "$routeParams", "Flash", '$location', function (user, $routeParams, Flash, $location) {
        var vm = this
        Flash.clear()
        if (user.isLoggedIn())
            $location.path('/')

        vm.form = {}
        vm.type = $routeParams.type
        vm.form.type = vm.type
        vm.submit = () => {
            if (vm.form.password == vm.form.confirm_password) {
                user.register(vm.form)
                    .then(
                        (resp) => {
                            vm.message = resp.data.message
                            Flash.create('success', vm.message, 0, {
                                container: 'flash'
                            })
                        },
                        (err) => {
                            vm.message = err.data.message
                            Flash.create('danger', vm.message, 0, {
                                container: 'flash'
                            })

                        }
                    )
            }
        }
    }])
    .controller('loginCtrl', ["user", "$routeParams", "$mdDialog", "$window", "$location", "Flash", function (user, $routeParams, $mdDialog, $window, $location, Flash) {

        var vm = this
        Flash.clear()
        if (user.isLoggedIn())
            $location.path('/')

        vm.form = {}
        vm.submit = () => {
            user.login(vm.form)
                .then(
                    (resp) => {
                        user.saveToken(resp.data.token)
                        $window.location.href = '/'

                    },
                    (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })
                        vm.resend_button = err.data.resend
                    }
                )
        }
        vm.renvoyer = () => {
            user.resend(vm.form.email)
                .then(
                    (resp) => {
                        vm.message = resp.data.message
                        Flash.create('success', vm.message, 0, {
                            container: 'flash'
                        })

                    },
                    (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })
                    }
                )
        }
        vm.reset = () => {
            user.reset(vm.form.email)
                .then(
                    (resp) => {
                        vm.message = resp.data.message
                        Flash.create('success', vm.message, 0, {
                            container: 'flash'
                        })

                    },
                    (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })
                    }
                )
        }

        vm.open = (ev) => {
            $mdDialog.show({
                controller: 'dismissCtrl',
                templateUrl: 'views/partials/modals/usertype.html',
                clickOutsideToClose: true,
                fullscreen: false // Only for -xs, -sm breakpoints.
            })
        }


    }])
    .controller('dismissCtrl', ['$mdDialog', 'article', 'Flash', '$scope', '$window', function ($mdDialog, article, Flash, $scope, $window) {

        var vm = $scope
        Flash.clear()

        vm.cancel = () => {
            $mdDialog.cancel()

        }

    }])


    .controller('resetCtrl', ["user", "$routeParams", "$window", "Flash", function (user, $routeParams, $window, Flash) {

        var vm = this
        Flash.clear()
        vm.token = false
        vm.form = {}
        if ($routeParams.token) {
            vm.token = true
            vm.form.token = $routeParams.token
        }
        vm.reset = () => {
            if (vm.form.password === vm.form.confirm_password) {
                user.resetpassword(vm.form)
                    .then(
                        (resp) => {
                            vm.message = resp.data.message
                            Flash.create('success', vm.message, 0, {
                                container: 'flash'
                            })
                        },
                        (err) => {
                            vm.message = err.data.message
                            Flash.create('danger', vm.message, 0, {
                                container: 'flash'
                            })
                        }
                    )
            } else {
                vm.message = 'Veuillez vérifier votre mot de passe'
                Flash.create('danger', vm.message, 0, {
                    container: 'flash'
                })

            }
        }
        vm.submit = () => {
            user.reset(vm.form.email)
                .then(
                    (resp) => {
                        vm.message = resp.data.message
                        Flash.create('success', vm.message, 0, {
                            container: 'flash'
                        })
                    },
                    (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })
                    }
                )
        }

    }])

    .controller('confirmCtrl', ["user", "$routeParams", 'Flash', function (user, $routeParams, Flash) {

        var vm = this
        Flash.clear()
        vm.token = $routeParams.token
        user.confirm(vm.token)
            .then(
                (resp) => {
                    vm.message = 'Félicitations ! Votre nouveau compte a été créé avec succès !'
                    Flash.create('danger', vm.message, 0, {
                        container: 'flash'
                    })

                },
                (err) => {
                    err.data
                    vm.message = 'Une erreur est survenue. Merci d\'essayer à nouveau ultérieurement, si non essayer de nous contacter sur: contact@marketplace.com '
                    Flash.create('danger', vm.message, 0, {
                        container: 'flash'
                    })
                }
            )

    }])
