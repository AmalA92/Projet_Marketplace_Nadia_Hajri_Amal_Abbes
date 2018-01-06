angular.module('userService', []).factory('user', ['$http', '$window', function ($http, $window) {

    var saveToken = function (token) {
        $window.localStorage['user-token'] = token
    };

    var getToken = function () {
        return $window.localStorage['user-token']
    };
    var isLoggedIn = function () {
        var token = getToken()
        var payload

        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000
        } else {
            return false
        }
    }
    currentUser = function () {
        if (isLoggedIn()) {
            var token = getToken()
            var payload = token.split('.')[1]
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                id: payload._id,
                email: payload.email,
                type: payload.type
            }
        }
    }

    logout = function () {
        $window.localStorage.removeItem('user-token');
    }

    var register = function (user) {
        return $http.post('/api/v1/register', user);
    }
    var resend = function (email) {
        return $http.get('/api/v1/resend/' + email)
    }
    var reset = function (email) {
        return $http.get('/api/v1/reset/' + email)
    }
    var resetpassword = function (data) {
        return $http.post('/api/v1/reset', data)
    }

    login = function (user) {
        return $http.post('/api/v1/login', user)

    }
    confirm = function (token) {
        console.log(token)
        return $http.get('/api/v1/confirm/' + token)

    }
    get = function (id) {
        return $http.get('/api/v1/users/single/' + id, {
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })

    }
    update = function (id, data) {
        return $http.put('/api/v1/users/' + id, data, {
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })

    }


    return {
        currentUser: currentUser,
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        register: register,
        login: login,
        confirm: confirm,
        logout: logout,
        resend: resend,
        reset: reset,
        resetpassword: resetpassword,
        get: get,
        update: update


    }


}])
