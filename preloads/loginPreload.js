const {contextBridge, ipcRenderer} =  require('electron');

let sendLogin = (loginData)=>{
    console.log(loginData);
    ipcRenderer.send('loginResponse', loginData);
}

let errorMessage=(callback)=>{
    ipcRenderer.on('error',callback);
}

let loginBridge = {
    createLogin: sendLogin,
    errorMessage: errorMessage
}

contextBridge.exposeInMainWorld('loginBridge', loginBridge)