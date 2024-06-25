const {contextBridge, ipcRenderer} =  require('electron');

let sendLogin = (loginData)=>{
    console.log(loginData);
    ipcRenderer.send('loginResponse', loginData);
}

let errorMessage=(callback)=>{
    ipcRenderer.on('error',callback);
}

let stopLogin = ()=>{
    ipcRenderer.send('stop-login');
}

let loginBridge = {
    createLogin: sendLogin,
    errorMessage: errorMessage,
    stopLogin:stopLogin
}

contextBridge.exposeInMainWorld('loginBridge', loginBridge)