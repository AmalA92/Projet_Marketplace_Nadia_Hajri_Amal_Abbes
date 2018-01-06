angular.module('commomModule', ['commonService', 'articleService', 'userService', 'jkAngularCarousel'])
    .controller('homeCtrl', ['$location', '$window', 'common', 'Flash', function ($location, $window, common, Flash) {

        var vm = this
        Flash.clear()
        vm.form = {}
        vm.boutiques = []
        common.boutiques().then(
            (resp) => {
                console.log(resp)
                vm.boutiques = resp.data
            }, (err) => {
                console.log(err)
            }
        )

        vm.submit = () => {
            $window.localStorage.setItem('data', JSON.stringify(vm.form))
            $location.path('/articles')
        }

    }])
    .controller('headerCtrl', ['user', '$window', function (user, $window) {

        var vm = this
        vm.isLoggedIn = user.isLoggedIn()
        if (user.isLoggedIn() && user.currentUser().type === 'vendeur')
            vm.vendeur = true
        if (user.isLoggedIn() && user.currentUser().type != 'vendeur')
            vm.vendeur = false

        vm.logout = () => {
            user.logout()
            $window.location.href = '/'
        }


    }])
    .controller('footerCtrl', ['common', 'user', '$window', 'Flash', function (common, user, $window, Flash) {

        var vm = this
        vm.form = {}
        vm.year = (new Date()).getFullYear()
        vm.submit = () => {
            Flash.clear()
            common.contact(vm.form).then((resp) => {
                message = resp.data.message
                Flash.create('success', message, 0, {
                    container: 'contact'
                })
                vm.form = {}
            }, (err) => {
                message = resp.data.message
                Flash.create('danger', message, 0, {
                    container: 'contact'
                })

            })
        }



    }])

    .controller('articleCtrl', ['article', 'user', '$routeParams', 'Flash', '$window', function (article, user, $routeParams, Flash, $window) {

        var vm = this
        vm.form = {}
        vm.form.quantite = 1
        Flash.clear()
        article.get($routeParams.id).then((resp) => {
            vm.article = resp.data
            vm.images = []
            if (vm.article.photo_principale)
                vm.images[0] = {
                    src: vm.article.photo_principale
                }
            if (vm.article.photo1)
                vm.images[1] = {
                    src: vm.article.photo1
                }
            if (vm.article.photo2)
                vm.images[2] = {
                    src: vm.article.photo2
                }
            if (vm.article.photo3)
                vm.images[3] = {
                    src: vm.article.photo3
                }
            if (vm.article.photo4)
                vm.images[4] = {
                    src: vm.article.photo4
                }

        }, (err) => {
            vm.message = err.data.message
            Flash.create('danger', vm.message, 0, {
                container: 'flash'
            })

        })
        vm.save = (ann) => {
            if ($window.localStorage['saved-articles']) {
                articles = JSON.parse($window.localStorage['saved-articles'])
                index = articles.findIndex(article => article._id == ann._id)
                if (index === -1) {
                    articles.push(ann)
                    $window.localStorage.setItem('saved-articles', JSON.stringify(articles))
                    message = 'Enregistrement effectué avec succès.'
                    Flash.create('success', message, 0, {
                        container: 'flash'
                    })

                } else {
                    message = 'article déjà enregistrée.'
                    Flash.create('danger', message, 0, {
                        container: 'flash'
                    })
                }

            } else {
                articles = []
                articles.push(ann)
                $window.localStorage.setItem('saved-articles', JSON.stringify(articles))
                message = 'Enregistrement effectué avec succès.'
                Flash.create('success', message, 0, {
                    container: 'flash'
                })

            }
        }
        vm.add_panier = (article) => {
            if (user.currentUser().type === 'acheteur') {
                if ($window.localStorage['panier']) {
                    panier = JSON.parse($window.localStorage['panier'])
                    index = panier.findIndex(article => article._id == article._id)
                    if (index === -1) {
                        article.quantite = vm.form.quantite
                        panier.push(article)
                        $window.localStorage.setItem('panier', JSON.stringify(articles))
                        message = 'Enregistrement effectué avec succès.'
                        Flash.create('success', message, 0, {
                            container: 'flash'
                        })

                    } else {
                        message = 'article est déjà dans votre panier.'
                        Flash.create('danger', message, 0, {
                            container: 'flash'
                        })
                    }

                } else {
                    article.quantite = vm.form.quantite
                    articles = []
                    articles.push(article)
                    $window.localStorage.setItem('panier', JSON.stringify(articles))
                    message = 'Enregistrement effectué avec succès.'
                    Flash.create('success', message, 0, {
                        container: 'flash'
                    })
                }
            } else {
                message = 'Vous etes un vendeur, veilleur creer un compte Acheteur.'
                Flash.create('warning', message, 0, {
                    container: 'flash'
                })

            }
        }
    }])

    .controller('articlesCtrl', ['$window', 'article', 'common', '$routeParams', 'Flash', function ($window, article, common, $routeParams, Flash) {

        var vm = this
        Flash.clear()
        vm.form = {}
        vm.search = false

        if ($window.localStorage['data']) {
            vm.search = true
            vm.form = JSON.parse($window.localStorage['data'])
            $window.localStorage.removeItem('data')
        }
        vm.pageChange = function (event, page) {
            vm.articles = {}
            if (vm.search) {
                vm.form.page = page
                article.search(vm.form).then(
                    (resp) => {
                        console.log(resp)
                        vm.articles = resp.data.docs
                        vm.total = resp.data.pages
                        vm.currentPage = resp.data.page
                    }, (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })

                    })

            } else {
                article.all(page)
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
        }

        vm.pageChange('clicked', 1)

        vm.submit = () => {
            vm.search = true
            vm.form.page = 1
            article.search(vm.form).then(
                (resp) => {
                    console.log(resp)
                    vm.articles = resp.data.docs
                    vm.total = resp.data.pages
                    vm.currentPage = resp.data.page
                }, (err) => {
                    vm.message = err.data.message
                    Flash.create('danger', vm.message, 0, {
                        container: 'flash'
                    })

                })

        }

    }])
    .controller('categoriesCtrl', ["article", 'common', '$routeParams', 'Flash', function (article, common, $routeParams, Flash) {

        var vm = this
        Flash.clear()
        vm.categorie = $routeParams.categorie
        vm.search = false
        vm.pageChange = function (event, page) {
            vm.articles = {}
            if (vm.search) {
                vm.form.page = page
                article.search(vm.form).then(
                    (resp) => {
                        vm.articles = resp.data.docs
                        vm.total = resp.data.pages
                        vm.currentPage = resp.data.page
                    }, (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })

                    })

            } else {
                article.categories(vm.categorie, page)
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
        }

        vm.pageChange('clicked', 1)

        vm.submit = () => {
            vm.search = true
            vm.form.page = 1
            article.search(vm.form).then(
                (resp) => {
                    vm.articles = resp.data.docs
                    vm.total = resp.data.pages
                    vm.currentPage = resp.data.page
                }, (err) => {
                    vm.message = err.data.message
                    Flash.create('danger', vm.message, 0, {
                        container: 'flash'
                    })

                })
        }

    }])
    .controller('villesCtrl', ["article", 'common', '$routeParams', 'Flash', function (article, common, $routeParams, Flash) {

        var vm = this
        Flash.clear()
        vm.ville = $routeParams.ville
        vm.search = false
        vm.pageChange = function (event, page) {
            vm.articles = {}
            if (vm.search) {
                vm.form.page = page
                article.search(vm.form).then(
                    (resp) => {
                        vm.articles = resp.data.docs
                        vm.total = resp.data.pages
                        vm.currentPage = resp.data.page
                    }, (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })

                    })

            } else {
                article.villes(vm.ville, page)
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
        }
        vm.pageChange('click', 1)

        vm.submit = () => {
            vm.search = true
            vm.form.page = 1
            article.search(vm.form).then(
                (resp) => {
                    vm.articles = resp.data.docs
                    vm.total = resp.data.pages
                    vm.currentPage = resp.data.page
                }, (err) => {
                    vm.message = err.data.message
                    Flash.create('danger', vm.message, 0, {
                        container: 'flash'
                    })

                })

        }

    }])
    .controller('boutiquesCtrl', ["article", 'common', '$routeParams', 'Flash', function (article, common, $routeParams, Flash) {

        var vm = this
        Flash.clear()
        vm.boutique = $routeParams.boutique
        vm.search = false
        vm.pageChange = function (event, page) {
            vm.articles = {}
            if (vm.search) {
                vm.form.page = page
                article.search(vm.form).then(
                    (resp) => {
                        vm.articles = resp.data.docs
                        vm.total = resp.data.pages
                        vm.currentPage = resp.data.page
                    }, (err) => {
                        vm.message = err.data.message
                        Flash.create('danger', vm.message, 0, {
                            container: 'flash'
                        })
                    })
            } else {
                common.boutique(vm.boutique, page)
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
        }
        vm.pageChange('click', 1)

        vm.submit = () => {
            vm.search = true
            vm.form.page = 1
            article.search(vm.form).then(
                (resp) => {
                    vm.articles = resp.data.docs
                    vm.total = resp.data.pages
                    vm.currentPage = resp.data.page
                }, (err) => {
                    vm.message = err.data.message
                    Flash.create('danger', vm.message, 0, {
                        container: 'flash'
                    })

                })

        }

    }])

    .controller('enregistrerCtrl', ['$window', 'Flash', function ($window, Flash) {

        var vm = this
        Flash.clear()
        vm.articles = []
        if ($window.localStorage['saved-articles'])
            vm.articles = JSON.parse($window.localStorage['saved-articles'])
        vm.delete = (id) => {
            index = vm.articles.findIndex(article => article._id == id)
            if (index != -1) {
                vm.articles.splice(index, 1)
                $window.localStorage.setItem('saved-articles', JSON.stringify(vm.articles))
            }
        }

    }])
    .controller('panierCtrl', ['$window', 'user', 'Flash', function ($window, user, Flash) {

        var vm = this
        Flash.clear()
        vm.articles = []
        if ($window.localStorage['panier'])
            vm.articles = JSON.parse($window.localStorage['panier'])
        vm.delete = (id) => {
            index = vm.articles.findIndex(article => article._id == id)
            if (index != -1) {
                vm.articles.splice(index, 1)
                $window.localStorage.setItem('panier', JSON.stringify(vm.articles))
            }
        }
        vm.total = 0
        vm.articles.forEach((article) => {
            vm.total += article.prix * article.quantite
        })
        vm.achat = () => {
            if (user.isLoggedIn() && user.currentUser().type === 'acheteur') {
                vm.message = 'Votre commande a ete validee avec succes !'
                Flash.create('success', vm.message, 0, {
                    container: 'flash'
                })
                $window.localStorage.removeItem('panier')
            } else {

                vm.message = 'Veilleur s\'identifier pour valider votre achat svp!'
                Flash.create('warning', vm.message, 0, {
                    container: 'flash'
                })

            }


        }

    }])
