angular.module('commonService', []).factory('common', ['$http', function ($http) {



    var contact = (data) => {
        return $http.post('/api/v1/contact', data)

    }
    var boutiques = () => {
        return $http.get('/api/v1/users')
    }
    var boutique = (nom, page) => {
        return $http.get('/api/v1/articles/boutiques/' + nom + '/' + page)
    }

    return {
        contact: contact,
        boutiques: boutiques,
        boutique: boutique
    }

}])
