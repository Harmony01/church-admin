const {contextBridge, ipcRenderer} = require('electron')

let extractBalance={
    getAccounts:(callback)=>{
        ipcRenderer.on('get-accounts', callback);
    },
    seacAccount: (data)=>{
        ipcRenderer.send('search-account',data)
    },
    seachResult:(callback)=>{
        ipcRenderer.on('account-result', callback)
    },
    seacAccount2: (data)=>{
        ipcRenderer.send('search-account2',data)
    },
    seachResult2:(callback)=>{
        ipcRenderer.on('account-result2', callback)
    },
    postExtract:(data)=>{
        ipcRenderer.send('post-extract', data)
    },

    postExtractRes:(callback)=>{
        ipcRenderer.on('post-extract-res',callback)
    }

}

contextBridge.exposeInMainWorld('extractBalance',extractBalance);
