const {contextBridge, ipcRenderer} = require('electron')

let transactions={
getBooks: (callback)=>ipcRenderer.on('update-trans-res', callback),
getTransactions:(data)=>ipcRenderer.send('get-tranactions',data),
getTransactionRes:(callback)=>ipcRenderer.on('get-transaction-res',callback),
fetchTr:(data)=>ipcRenderer.send('fetch-transaction',data),
fetchTrRes:(callback)=>ipcRenderer.on('transaction-detail',callback),
updateTrans:(data)=>ipcRenderer.send('update-transaction-final',data)
}

contextBridge.exposeInMainWorld('transactions',transactions)