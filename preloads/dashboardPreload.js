const {contextBridge, ipcRenderer} = require('electron')

const dashboard = {
  logout: (logoutMessage) => ipcRenderer.send('logout', logoutMessage),
  newAccount: (commandMessage)=>ipcRenderer.send('new-account',commandMessage),
  loginUser: (callback) => ipcRenderer.on('user-details', callback),
  newCashBook: (msg)=>ipcRenderer.send('new-cashbook',msg),
  newRevenue: (msg)=>ipcRenderer.send('new-revenue-command',msg),
  newExpense: (msg)=>ipcRenderer.send('new-expense-command',msg),
  createContra:(msg)=>ipcRenderer.send('contra-command',msg),
  createAnalysis:(msg)=>ipcRenderer.send('analysis-command',msg),
  extractBalance:(msg)=>ipcRenderer.send('extract-command', msg),
  creareRecon:(msg)=>ipcRenderer.send('recon-command', msg),
  openCalcus:(msg)=>ipcRenderer.send('calcus-command', msg),
  viewCashBook:(msg)=>ipcRenderer.send('view-cashbook', msg),
  openActiveCashbook:(msg)=>ipcRenderer.send('view-active-cb',msg),
  cbReport:(msg)=>ipcRenderer.send('cashbook-report',msg),
  queryAccount:()=>ipcRenderer.send('query-account'),
  createPledge:()=>ipcRenderer.send('create-pledge'),
  viewPledge:()=>ipcRenderer.send('view-pledge'),
  updateEnt:()=>ipcRenderer.send('update-transaction'),
  printDaily:()=>ipcRenderer.send('print-daily-1')

}

contextBridge.exposeInMainWorld('dashboard', dashboard)

  