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

let checkProductKey = (data)=>ipcRenderer.send('check-product-key', data);
let validKey = (callback)=>ipcRenderer.on('keyValid',callback);
let buyKey = ()=>ipcRenderer.send('buy-key');

let loginBridge = {
    createLogin: sendLogin,
    errorMessage: errorMessage,
    stopLogin:stopLogin,
    checkProductKey: checkProductKey,
    validKey,
    buyKey
}

contextBridge.exposeInMainWorld('loginBridge', loginBridge)