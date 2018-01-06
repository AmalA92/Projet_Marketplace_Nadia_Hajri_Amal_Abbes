angular.module('articleService', [])
    .factory('article', ['user', '$http', (user, $http) => {
        userarticles = (id, page) => {
            return $http.get('/api/v1/articles/' + page, {
                headers: {
                    Authorization: 'Bearer ' + user.getToken()
                }
            })
        }
        all = (page) => {
            return $http.get('/api/v1/articles/' + page)
        }
        categories = (categorie, page) => {
            return $http.get('/api/v1/articles/categories/' + categorie + '/' + page)
        }
        villes = (ville, page) => {
            return $http.get('/api/v1/articles/villes/' + ville + '/' + page)
        }

        get = (id) => {
            return $http.get('/api/v1/articles/single/' + id)

        }
        remove = (id) => {
            return $http.delete('/api/v1/articles/' + id, {
                headers: {
                    Authorization: 'Bearer ' + user.getToken()
                }
            })

        }
        search = (data) => {
            return $http.post('/api/v1/articles/search', data)

        }
        return {
            userarticles: userarticles,
            all: all,
            categories: categories,
            villes: villes,
            get: get,
            remove: remove,
            search: search
        }

}])
