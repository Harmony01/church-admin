const Api = require('./api')

const login = (loginDdata)=>{
    return Api().post('app/login', loginDdata)
}

const logout = ()=>{
return Api().post('app/logout')
}

module.exports = {
    login: login,
    logout: logout
}