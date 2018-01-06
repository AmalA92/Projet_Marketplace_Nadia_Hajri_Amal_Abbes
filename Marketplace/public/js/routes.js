angular.module("routes", []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider

            // home page
            .when('/', {
                templateUrl: 'views/index.html',
                requireUserLogin: false,
                title: 'Accueil'
            })
            .when('/user', {
                templateUrl: 'views/user/index.html',
                requireUserLogin: true,
                title: 'Tableau de bord'
            }).when('/login', {
                templateUrl: 'views/login.html',
                requireUserLogin: false,
                title: 'S\'identifier'
            }).when('/register/:type', {
                templateUrl: 'views/register.html',
                requireUserLogin: false,
                title: 'S\'inscrire'
            })
            .when('/confirmation/:token', {
                templateUrl: 'views/confirmation.html',
                requireUserLogin: false,
                title: 'Confirmation'
            })
            .when('/panier', {
                templateUrl: 'views/panier.html',
                requireUserLogin: false,
                title: 'Panier'
            })
            .when('/articles', {
                templateUrl: 'views/articles.html',
                requireUserLogin: false,
                title: 'articles'
            })
            .when('/boutiques/:boutique', {
                templateUrl: 'views/boutiques.html',
                requireUserLogin: false,
                title: 'Boutiques'
            })
            .when('/article/:id', {
                templateUrl: 'views/article.html',
                requireUserLogin: false,
                title: 'articles'
            })
            .when('/categories/:categorie', {
                templateUrl: 'views/categories.html',
                requireUserLogin: false,
                title: 'Categories'
            })
            .when('/villes/:ville', {
                templateUrl: 'views/villes.html',
                requireUserLogin: false,
                title: 'Villes'
            })
            .when('/enregistrer', {
                templateUrl: 'views/enregistrer.html',
                requireUserLogin: false,
                title: 'articless enregistrées'
            })
            .when('/reset', {
                templateUrl: 'views/reset.html',
                requireUserLogin: false,
                title: 'Réinitialiser votre mot de passe'
            })
            .when('/reset/:token', {
                templateUrl: 'views/reset.html',
                requireUserLogin: false,
                title: 'Réinitialiser votre mot de passe'
            })
            .when('/profile', {
                templateUrl: 'views/user/profile.html',
                requireUserLogin: true,
                title: 'Votre profil'
            })
            .when('/user/articles/deposer', {
                templateUrl: 'views/user/article/add.html',
                requireUserLogin: true,
                title: 'Deposer une articles'
            })
            .when('/user/articles/edit/:id', {
                templateUrl: 'views/user/article/edit.html',
                requireUserLogin: true,
                title: 'Editer votre articles'
            })
            .when('/regles-d-utilisation', {
                templateUrl: 'views/regles.html',
                requireUserLogin: false,
                title: 'Règles d’ utilisation'
            })
            .when('/services', {
                templateUrl: 'views/services.html',
                requireUserLogin: false,
                title: 'Services de Marketplace'
            })
            .otherwise('/')

        $locationProvider.html5Mode(true)

    }])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false)
        $compileProvider.commentDirectivesEnabled(false)
        $compileProvider.cssClassDirectivesEnabled(false)
}])
    .run(['$rootScope', '$location', '$route', 'user', function ($rootScope, $location, $route, user) {

        $rootScope.$on("$locationChangeStart", function (event, next, current) {

            if ($route.routes[$location.path()] && $route.routes[$location.path()].requireUserLogin && !user.isLoggedIn()) {
                event.preventDefault()
                $location.path('/login')
            }
            if ($location.path().indexOf('user') != -1 && !user.isLoggedIn()) {
                event.preventDefault()
                $location.path('/login')

            }
        })

        $rootScope.$on("$routeChangeSuccess", function (currentRoute, previousRoute) {
            //Change page title, based on Route information
            if ($route.current)
                $rootScope.title = 'Marketplace | ' + $route.current.title
        })
    }])
