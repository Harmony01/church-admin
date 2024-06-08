const {contextBridge, ipcRenderer} = require('electron')

let expense ={
          expenseItems:(callback)=>{
            ipcRenderer.on('expense-items', callback)
          },

          sendRevenue:(revData)=>{
           ipcRenderer.send('revenue-data',revData);
          },

          sendRevenueRes:(callback)=>{
           ipcRenderer.on('revenue-recorded',callback)
          },

          getBal:(data)=>{
            ipcRenderer.send('fetch-bal',data)
          },
          getBalRes:(callback)=>{
            ipcRenderer.on('fetch-res',callback)
          },

          sendExpense:(data)=>{
           ipcRenderer.send('post-expense',data)
          },

          sendExpenseRes:(callback)=>{
            ipcRenderer.on('expense-recorded', callback)
          }
}

contextBridge.exposeInMainWorld('expense',expense)