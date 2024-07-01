const Api = require('./api')

const login = (loginDdata)=>{
    return Api().post('app/login', loginDdata)
}

const logout = ()=>{
return Api().post('app/logout')
}

const getMachine = (mac)=>{
    return Api().get(`app/machine/${mac}`)
}

const checkKey = (key)=>{
    return Api().get(`check/key/${key}`)
}

module.exports = {
    login: login,
    logout: logout,
    getMachine:getMachine,
    checkKey:checkKey
}