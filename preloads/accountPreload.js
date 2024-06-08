const {contextBridge, ipcRenderer}= require('electron');

const Api = {
  newAccount: (accountData)=>ipcRenderer.send('post-account',accountData),
  queryAccountRes:(callback)=>{
    ipcRenderer.on('acounts',callback)
  },

  searchAccount: (data)=>{
    ipcRenderer.send('search-account',data)
  },

  seachResult:(callback)=>{
    ipcRenderer.on('account-result', callback)
  },
  getAccoutTransactions:(data)=>ipcRenderer.send('get-account-transaction',data),
  accountQueryRes:(callback)=>{
    ipcRenderer.on('account-query-result',callback)
  },
  
  printStatement:(msg)=>ipcRenderer.send('print-account-statement',msg),

}

contextBridge.exposeInMainWorld('accounts',Api)

