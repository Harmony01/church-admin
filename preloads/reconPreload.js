const {contextBridge, ipcRenderer} = require('electron')

const recons ={
    receiveItems: (callback)=>{
        ipcRenderer.on('get-recon-item',callback)
    },
    fetchCb:(data)=>{
        ipcRenderer.send('fetch-cashbook',data)
    },
    cbRes:(callback)=>{
        ipcRenderer.on('cb-result', callback);
    },
    sendRecon:(data)=>{
        ipcRenderer.send('send-recon',data)
    }
}

contextBridge.exposeInMainWorld('getRecons',recons)